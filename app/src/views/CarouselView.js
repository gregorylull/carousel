/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Utility = require('famous/utilities/Utility');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ScrollView = require('famous/views/ScrollView');
    var ScrollItemView = require('./ScrollItemView');
    var Group = require('famous/core/Group');
    var OptionsManager = require('famous/core/OptionsManager');

    /*
     * @name CarouselView
     * @constructor
     * @description
     */

    function CarouselView (options) {
        ScrollView.apply(this, arguments);
        this.setOptions(CarouselView.DEFAULT_OPTIONS);
        this.setOptions(options);

        this._scroller.group = new Group();
        this._scroller.group.add({render: _customInnerRender.bind(this._scroller)});

        this._scroller.ourGetPosition = this.getPosition.bind(this);
        // this._eventInput.on('update', _customHandleMove);
    }

    CarouselView.prototype = Object.create(ScrollView.prototype);
    CarouselView.prototype.constructor = CarouselView;
    // CarouselView.prototype.outputFrom  = undefined;

    CarouselView.DEFAULT_OPTIONS = {
        direction: Utility.Direction.X,
        paginated: false,
        startScale: 1,
        endScale: 1,
        startFade: 0.1,
        endFade: 1
    };

    function _output(node, offset, target) {
        var direction = this.options.direction;
        var size = node.getSize ? node.getSize() : this._contextSize;

        var transform = translateAndScale.call(this, offset, size[0]);
        var opacity = customFade.call(this, offset, size[0]);

        var xScale = transform[0];
        var yScale = transform[5];

        target.push({transform: transform, opacity: opacity, target: node.render()});
        var scale = direction === Utility.Direction.X ? xScale : yScale;

        return size[direction] * scale;
    }

    function scalingFactor (screenWidth, startScale, endScale, currentPosition) {
        // currentPosition will be along x or y axis
        var midpoint = screenWidth / 2;

        // from 0 to midpoint
        if (currentPosition <= midpoint && currentPosition >= 0) {
            return ((endScale - startScale) / midpoint) * currentPosition + startScale;
        }
        // from midpoint to screenWidth
        else if (currentPosition > midpoint && currentPosition <= screenWidth){
            return (-(endScale - startScale) / midpoint) * currentPosition + (2 * (endScale - startScale) + startScale);
        }
        // when its offscreen
        else {
            return startScale;
        }
    }

    function translateAndScale (offset, size) {
        var direction = this.options.direction;
        var screenWidth = this.options.direction === Utility.Direction.X ? window.innerWidth : window.innerHeight;
        var startScale = this.options.startScale;
        var endScale = this.options.endScale;
        var position = offset + size / 2 - this.ourGetPosition();

        // for scaling
        var scaleVector = [1, 1, 1];
        var scaling = scalingFactor(screenWidth, startScale, endScale, position);

        // for depth
        var depth = scalingFactor(screenWidth, 1, 200, position);

        scaleVector[0] = scaling;
        scaleVector[1] = scaling;

        // for translation
        var vector = [0, 0, 0];
        vector[direction] = offset;
            vector[2] = depth;




        var transform = Transform.thenMove(Transform.scale.apply(null, scaleVector), vector);
        return transform;
    }

    function customFade (offset, size) {
        var screenWidth = this.options.direction === Utility.Direction.X ? window.innerWidth : window.innerHeight;
        var startFade = this.options.startFade;
        var endFade = this.options.endFade;
        var position = offset + size / 2;

        var fadeAmt = scalingFactor(screenWidth, startFade, endFade, position);
        return fadeAmt;
    }

    // COPIED OVER FROM SCROLLER
    function _customInnerRender() {
        var size = null;
        var position = this._position;
        var result = [];

        this._onEdge = 0;

        var offset = -this._positionOffset;
        var clipSize = _getClipSize.call(this);
        var currNode = this._node;
        while (currNode && offset - position < clipSize + this.options.margin) {
            offset += _output.call(this, currNode, offset, result);
            currNode = currNode.getNext ? currNode.getNext() : null;
        }

        var sizeNode = this._node;
        var nodesSize = _sizeForDir.call(this, sizeNode.getSize());
        if (offset < clipSize) {
            while (sizeNode && nodesSize < clipSize) {
                sizeNode = sizeNode.getPrevious();
                if (sizeNode) nodesSize += _sizeForDir.call(this, sizeNode.getSize());
            }
            sizeNode = this._node;
            while (sizeNode && nodesSize < clipSize) {
                sizeNode = sizeNode.getNext();
                if (sizeNode) nodesSize += _sizeForDir.call(this, sizeNode.getSize());
            }
        }

        var edgeSize = (nodesSize !== undefined && nodesSize < clipSize) ? nodesSize : clipSize;

        if (!currNode && offset - position <= edgeSize) {
            this._onEdge = 1;
            this._eventOutput.emit('edgeHit', {
                position: offset - edgeSize
            });
        }
        else if (!this._node.getPrevious() && position <= 0) {
            this._onEdge = -1;
            this._eventOutput.emit('edgeHit', {
                position: 0
            });
        }

        // backwards
        currNode = (this._node && this._node.getPrevious) ? this._node.getPrevious() : null;
        offset = -this._positionOffset;
        if (currNode) {
            size = currNode.getSize ? currNode.getSize() : this._contextSize;
            offset -= _sizeForDir.call(this, size);
        }

        while (currNode && ((offset - position) > -(_getClipSize.call(this) + this.options.margin))) {
            _output.call(this, currNode, offset, result);
            currNode = currNode.getPrevious ? currNode.getPrevious() : null;
            if (currNode) {
                size = currNode.getSize ? currNode.getSize() : this._contextSize;
                offset -= _sizeForDir.call(this, size);
            }
        }

        _normalizeState.call(this);
        return result;
    }

    function _sizeForDir(size) {
        if (!size) size = this._contextSize;
        var dimension = (this.options.direction === Utility.Direction.X) ? 0 : 1;
        return (size[dimension] === undefined) ? this._contextSize[dimension] : size[dimension];
    }

    function _getClipSize() {
        if (this.options.clipSize) return this.options.clipSize;
        else return _sizeForDir.call(this, this._contextSize);
    }

    function _normalizeState() {
        var nodeSize = _sizeForDir.call(this, this._node.getSize());
        var nextNode = this._node && this._node.getNext ? this._node.getNext() : null;
        while (nextNode && this._position + this._positionOffset >= nodeSize) {
            this._positionOffset -= nodeSize;
            this._node = nextNode;
            nodeSize = _sizeForDir.call(this, this._node.getSize());
            nextNode = this._node && this._node.getNext ? this._node.getNext() : null;
        }
        var prevNode = this._node && this._node.getPrevious ? this._node.getPrevious() : null;
        while (prevNode && this._position + this._positionOffset < 0) {
            var prevNodeSize = _sizeForDir.call(this, prevNode.getSize());
            this._positionOffset += prevNodeSize;
            this._node = prevNode;
            prevNode = this._node && this._node.getPrevious ? this._node.getPrevious() : null;
        }
    }

    module.exports = CarouselView;
});