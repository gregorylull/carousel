/*
  plan: 
    create wave effect
*/

/*globals define*/
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Surface = require('famous/core/Surface');
    var Scrollview = require('famous/views/Scrollview');
    var Utility = require('famous/utilities/Utility');
    var RenderNode = require('famous/core/RenderNode');
    var Transform = require('famous/core/Transform');
    var View = require('famous/core/View');
    var Draggable = require('famous/modifiers/Draggable');

    // create the main context
    var mainContext = Engine.createContext();

    var surfaces = [];

    // create an array of surfaces 
    function createSurfaceArray(n, arr, size) {
        for (var i = 0; i < n; i++) {
            var color = "hsl(" + (i * 360 / 10) + ", 100%, 50%)";
            var surface = createSurface(color, size);
            surfaces.push(surface);
        }
    }

    // create surface
    function createSurface (color, size) {
        var surface = new Surface({
            size : [size, size],
            properties: {
                backgroundColor: color
            }
        });

        // addings events
        var surfaceModifier = new StateModifier();
        var sizeModifier = new StateModifier({
            size: [size, size]
        });
        // var renderNode = new RenderNode(surfaceModifier);
        var renderNode = new RenderNode();

        renderNode.add(sizeModifier).add(surfaceModifier).add(surface);

        // var view = new View();
        surface.pipe(scrollDrag);


        surface.modifier = surfaceModifier;
        surface.sizeModifier = sizeModifier;
        
        addEvent('click', surface, renderNode);

        // return view.add(surfaceModifier).add(surface);
        // console.log('rn size: ', renderNode.getSize());
        return renderNode;
    }

    function addEvent (listener, surface, cb) {
        surface.on(listener, function (e) {
            console.log('scroll init pos: ', scrollView.getPosition());
            // scrollView.goToNextPage();
            surface.modifier.setTransform(
                Transform.scale(2,2,1),
                {duration: 1000} 
            );
            surface.sizeModifier.setSize([200, 200], {duration: 1000});
            // console.log('rn size: ', cb.getSize());
            console.log('scroll getPosition: ', scrollView.getPosition());
            // console.log('scroll setPosition: ', scrollView.setPosition(2));

        });
    }

    ///////////////// for testing
    var testSurface = new Surface({
        size : [100, 100],
        properties: {
            backgroundColor: 'red'
        }
    });

    var testSurface2 = new Surface({
        size : [100, 100],
        properties: {
            backgroundColor: 'blue'
        }
    });

    var dragMod = new Draggable({
        xRange: [-220, 220],
        scale: 1,
        // yRange: [-220, 220],
        projection: ['x']
    });

    testSurface.pipe(dragMod);
    testSurface2.pipe(dragMod);

    // testSurface.pipe(Engine);

    ////// 
    testSurface.on('dragmove', function () {
        console.log('asd');
    });
    // console.log('exectued');

    var modifier = new StateModifier({
        transform: Transform.translate(150,0)
    });

    var trans = {
      method: 'snap',
      period: 300,
      dampingRatio: 0.3,
      velocity: 0
    };

    // testSurface.on('', function () {
    //     // scrollView.goToNextPage();
    //     dragMod.setPosition([0,0,0], trans);
    // });

    // testSurface.on('', function () {
    //     // scrollView.goToNextPage();
    //     dragMod.setPosition([0,0,0], trans);
    // });

    var masterView = new View();
    var view1 = new View();
    var view2 = new View();

    view1.add(modifier).add(testSurface);
    view2.add(testSurface2);

    masterView.add(view1);
    masterView.add(view2);

    mainContext.add(dragMod).add(masterView);

    // view.add(modifier).add(testSurface);
    // mainContext.add(view);
    // mainContext.add(dragMod).add(modifier).add(testSurface);
    /////////////////////// for testing

    createSurfaceArray(50, surfaces, 100);

    var scrollView = new Scrollview({
        // paginated: true,
        direction: Utility.Direction.X,
    });


    var scrollViewModifier = new StateModifier({
        origin: [0, 0.5]
    });

    scrollView.sequenceFrom(surfaces);
    
    mainContext.setPerspective(500);
    mainContext.add(scrollViewModifier).add(scrollView);

});