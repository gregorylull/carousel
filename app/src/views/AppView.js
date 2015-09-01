/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var CarouselView = require('./CarouselView');
    // var ScrollItemView = require('./ScrollItemView');


    /*
     * @name AppView
     * @constructor
     * @description
     */

     function unique (urls) {
        var dictionary = {};
        var results = [];

        urls.forEach(function (url){
            if (dictionary[url] === undefined) {
                dictionary[url] = true;
                results.push(url);
            }
        });

        return results;
     }

    function AppView() {
        View.apply(this, arguments);
        createScrollView.call(this);
        _setListeners.call(this);
        this.depthCount = 1;
    }

    var netflixUrls = unique(['http://cdn0.nflximg.net/webp/9488/3459488.webp','http://cdn0.nflximg.net/webp/9396/21609396.webp','http://cdn1.nflximg.net/webp/1119/21841119.webp','http://cdn0.nflximg.net/webp/0376/8960376.webp','http://cdn0.nflximg.net/webp/5748/21875748.webp','http://cdn0.nflximg.net/webp/9184/3929184.webp','http://cdn0.nflximg.net/webp/5218/22595218.webp','http://cdn1.nflximg.net/webp/5881/20085881.webp','http://cdn1.nflximg.net/webp/3699/12043699.webp','http://cdn0.nflximg.net/webp/2502/21662502.webp','http://cdn0.nflximg.net/webp/1740/12121740.webp','http://cdn1.nflximg.net/webp/3713/9283713.webp','http://cdn0.nflximg.net/webp/6418/8836418.webp','http://cdn0.nflximg.net/webp/0572/21040572.webp','http://cdn0.nflximg.net/webp/9488/3459488.webp','http://cdn0.nflximg.net/webp/9396/21609396.webp','http://cdn1.nflximg.net/webp/1119/21841119.webp','http://cdn0.nflximg.net/webp/0376/8960376.webp','http://cdn0.nflximg.net/webp/5748/21875748.webp','http://cdn0.nflximg.net/webp/9184/3929184.webp','http://cdn0.nflximg.net/webp/5218/22595218.webp','http://cdn1.nflximg.net/webp/5881/20085881.webp','http://cdn1.nflximg.net/webp/3699/12043699.webp','http://cdn0.nflximg.net/webp/2502/21662502.webp','http://cdn0.nflximg.net/webp/1740/12121740.webp','http://cdn1.nflximg.net/webp/3713/9283713.webp','http://cdn0.nflximg.net/webp/6418/8836418.webp','http://cdn0.nflximg.net/webp/0572/21040572.webp\",null,\"http://cdn0.nflximg.net/webp/5900/20075900.webp','http://cdn0.nflximg.net/webp/2680/10602680.webp\",null,null,\"http://cdn1.nflximg.net/webp/3379/9913379.webp','http://cdn1.nflximg.net/webp/7661/11067661.webp','http://cdn1.nflximg.net/webp/1889/21551889.webp','http://cdn1.nflximg.net/webp/9631/21019631.webp','http://cdn0.nflximg.net/webp/7146/3417146.webp','http://cdn0.nflximg.net/webp/9388/11379388.webp','http://cdn0.nflximg.net/webp/1156/20981156.webp','http://cdn0.nflximg.net/webp/9488/3459488.webp','http://cdn1.nflximg.net/webp/3063/13013063.webp','http://cdn0.nflximg.net/webp/2316/21802316.webp','http://cdn1.nflximg.net/webp/4569/11344569.webp','http://cdn0.nflximg.net/webp/5748/21875748.webp\",null,\"http://cdn1.nflximg.net/webp/7825/22107825.webp','http://cdn0.nflximg.net/webp/5034/22395034.webp','http://cdn1.nflximg.net/webp/8437/21258437.webp','http://cdn0.nflximg.net/webp/2316/21802316.webp','http://cdn0.nflximg.net/webp/7606/21507606.webp','http://cdn0.nflximg.net/webp/8334/20068334.webp','http://cdn1.nflximg.net/webp/7263/21557263.webp','http://cdn1.nflximg.net/webp/1119/21841119.webp','http://cdn0.nflximg.net/webp/0376/8960376.webp','http://cdn0.nflximg.net/webp/2502/21662502.webp','http://cdn1.nflximg.net/webp/3713/9283713.webp','http://cdn0.nflximg.net/webp/1862/22371862.webp\",null,\"http://cdn0.nflximg.net/webp/7806/3787806.webp','http://cdn0.nflximg.net/webp/8594/3448594.webp\",null,\"http://cdn0.nflximg.net/webp/0124/13030124.webp','http://cdn0.nflximg.net/webp/3656/9993656.webp','http://cdn1.nflximg.net/webp/1413/2901413.webp','http://cdn0.nflximg.net/webp/9680/11949680.webp','http://cdn1.nflximg.net/webp/3063/13013063.webp','http://cdn0.nflximg.net/webp/9488/3459488.webp','http://cdn0.nflximg.net/webp/0422/3520422.webp','http://cdn0.nflximg.net/webp/3068/9163068.webp','http://cdn0.nflximg.net/webp/7306/11097306.webp','http://cdn1.nflximg.net/webp/9631/21019631.webp','http://cdn0.nflximg.net/webp/5962/3535962.webp','http://cdn0.nflximg.net/webp/5614/3535614.webp','http://cdn0.nflximg.net/webp/7250/9747250.webp','http://cdn1.nflximg.net/webp/3761/2913761.webp','http://cdn1.nflximg.net/webp/3001/2933001.webp','http://cdn0.nflximg.net/webp/9176/8879176.webp','http://cdn1.nflximg.net/webp/2241/21662241.webp','http://cdn1.nflximg.net/webp/3607/3153607.webp','http://cdn1.nflximg.net/webp/3313/9223313.webp\",null,\"http://cdn0.nflximg.net/webp/7250/9747250.webp','http://cdn0.nflximg.net/webp/6040/20996040.webp\",null,\"http://cdn0.nflximg.net/webp/9224/11719224.webp\",null,\"http://cdn1.nflximg.net/webp/8065/21448065.webp\",null,\"http://cdn0.nflximg.net/webp/5748/21875748.webp','http://cdn1.nflximg.net/webp/5881/20085881.webp','http://cdn1.nflximg.net/webp/5003/8295003.webp','http://cdn1.nflximg.net/webp/2243/21662243.webp','http://cdn0.nflximg.net/webp/9184/3929184.webp','http://cdn0.nflximg.net/webp/5218/22595218.webp','http://cdn1.nflximg.net/webp/3713/9283713.webp','http://cdn0.nflximg.net/webp/7050/9647050.webp','http://cdn0.nflximg.net/webp/1418/3341418.webp','http://cdn1.nflximg.net/webp/8767/11138767.webp','http://cdn1.nflximg.net/webp/5669/9735669.webp','http://cdn1.nflximg.net/webp/1923/20981923.webp','http://cdn1.nflximg.net/webp/3753/2913753.webp\",null,null,\"http://cdn0.nflximg.net/webp/7892/4177892.webp\",null,\"http://cdn1.nflximg.net/webp/3699/12043699.webp','http://cdn0.nflximg.net/webp/0572/21040572.webp\",null,\"http://cdn0.nflximg.net/webp/2680/10602680.webp','http://cdn1.nflximg.net/webp/4627/3754627.webp','http://cdn1.nflximg.net/webp/9179/8879179.webp','http://cdn1.nflximg.net/webp/2243/21662243.webp','http://cdn0.nflximg.net/webp/9396/21609396.webp','http://cdn1.nflximg.net/webp/5881/20085881.webp','http://cdn0.nflximg.net/webp/6418/8836418.webp','http://cdn0.nflximg.net/webp/1832/11171832.webp','http://cdn1.nflximg.net/webp/5165/8705165.webp','http://cdn0.nflximg.net/webp/0838/8320838.webp','http://cdn0.nflximg.net/webp/2746/8112746.webp','http://cdn0.nflximg.net/webp/4256/4194256.webp','http://cdn0.nflximg.net/webp/8334/20068334.webp','http://cdn0.nflximg.net/webp/5748/21875748.webp','http://cdn0.nflximg.net/webp/9680/11949680.webp','http://cdn0.nflximg.net/webp/1862/22371862.webp','http://cdn0.nflximg.net/webp/1132/13021132.webp','http://cdn0.nflximg.net/webp/4492/12144492.webp','http://cdn0.nflximg.net/webp/3750/8793750.webp','http://cdn1.nflximg.net/webp/6355/20866355.webp','http://cdn1.nflximg.net/webp/7263/21557263.webp','http://cdn0.nflximg.net/webp/3816/2943816.webp','http://cdn0.nflximg.net/webp/8240/9658240.webp','http://cdn0.nflximg.net/webp/3550/2923550.webp','http://cdn1.nflximg.net/webp/1183/11631183.webp','http://cdn1.nflximg.net/webp/7877/12117877.webp','http://cdn0.nflximg.net/webp/3106/11723106.webp','http://cdn0.nflximg.net/webp/2454/3082454.webp','http://cdn1.nflximg.net/webp/9653/2919653.webp','http://cdn1.nflximg.net/webp/5003/8295003.webp','http://cdn1.nflximg.net/webp/1413/2901413.webp','http://cdn0.nflximg.net/webp/5720/11165720.webp','http://cdn1.nflximg.net/webp/0663/3780663.webp','http://cdn0.nflximg.net/webp/8590/2898590.webp','http://cdn1.nflximg.net/webp/1277/21631277.webp','http://cdn0.nflximg.net/webp/4962/4034962.webp','http://cdn0.nflximg.net/webp/6066/3816066.webp','http://cdn1.nflximg.net/webp/9719/2919719.webp','http://cdn1.nflximg.net/webp/8691/11698691.webp','http://cdn0.nflximg.net/webp/3852/13023852.webp','http://cdn0.nflximg.net/webp/8684/3218684.webp','http://cdn0.nflximg.net/webp/4176/9654176.webp','http://cdn1.nflximg.net/webp/1539/11341539.webp','http://cdn1.nflximg.net/webp/1923/2921923.webp','http://cdn0.nflximg.net/webp/4436/4214436.webp','http://cdn1.nflximg.net/webp/0087/9950087.webp','http://cdn1.nflximg.net/webp/1119/21841119.webp','http://cdn0.nflximg.net/webp/2502/21662502.webp','http://cdn0.nflximg.net/webp/2474/21842474.webp','http://cdn0.nflximg.net/webp/4212/3794212.webp','http://cdn0.nflximg.net/webp/5830/4065830.webp','http://cdn0.nflximg.net/webp/9742/20979742.webp','http://cdn1.nflximg.net/webp/8785/21918785.webp','http://cdn0.nflximg.net/webp/0070/11600070.webp','http://cdn0.nflximg.net/webp/3206/22383206.webp','http://cdn1.nflximg.net/webp/1595/22261595.webp','http://cdn0.nflximg.net/webp/1192/22261192.webp','http://cdn0.nflximg.net/webp/1408/22261408.webp','http://cdn0.nflximg.net/webp/3248/22383248.webp','http://cdn1.nflximg.net/webp/3179/3603179.webp','http://cdn0.nflximg.net/webp/1386/4161386.webp','http://cdn1.nflximg.net/webp/0979/2950979.webp','http://cdn1.nflximg.net/webp/2175/4012175.webp','http://cdn0.nflximg.net/webp/1740/12121740.webp','http://cdn0.nflximg.net/webp/5900/20075900.webp','http://cdn0.nflximg.net/webp/3964/21553964.webp','http://cdn0.nflximg.net/webp/9502/11139502.webp','http://cdn0.nflximg.net/webp/8248/4198248.webp','http://cdn0.nflximg.net/webp/4396/20864396.webp','http://cdn1.nflximg.net/webp/2337/21762337.webp\",null,null,\"http://cdn1.nflximg.net/webp/5935/11185935.webp','http://cdn1.nflximg.net/webp/0075/21530075.webp','http://cdn1.nflximg.net/webp/9955/20999955.webp','http://cdn1.nflximg.net/webp/3157/11333157.webp','http://cdn0.nflximg.net/webp/8130/3978130.webp','http://cdn1.nflximg.net/webp/0731/21260731.webp','http://cdn1.nflximg.net/webp/3171/22623171.webp','http://cdn1.nflximg.net/webp/7521/11327521.webp','http://cdn0.nflximg.net/webp/0376/8960376.webp','http://cdn0.nflximg.net/webp/8402/4118402.webp','http://cdn0.nflximg.net/webp/7470/9957470.webp','http://cdn1.nflximg.net/webp/5737/2835737.webp','http://cdn0.nflximg.net/webp/9676/20889676.webp','http://cdn1.nflximg.net/webp/3387/3003387.webp','http://cdn1.nflximg.net/webp/5079/11665079.webp','http://cdn0.nflximg.net/webp/3450/11173450.webp','http://cdn1.nflximg.net/webp/0851/2940851.webp','http://cdn0.nflximg.net/webp/9870/2949870.webp','http://cdn1.nflximg.net/webp/5857/2835857.webp','http://cdn0.nflximg.net/webp/7876/4237876.webp','http://cdn0.nflximg.net/webp/6544/3696544.webp','http://cdn1.nflximg.net/webp/4185/4054185.webp','http://cdn1.nflximg.net/webp/1143/3131143.webp','http://cdn0.nflximg.net/webp/9502/11139502.webp','http://cdn1.nflximg.net/webp/2669/9972669.webp','http://cdn1.nflximg.net/webp/6747/3866747.webp','http://cdn1.nflximg.net/webp/3049/12173049.webp','http://cdn1.nflximg.net/webp/3233/12173233.webp','http://cdn1.nflximg.net/webp/7735/11977735.webp','http://cdn1.nflximg.net/webp/1389/4111389.webp','http://cdn0.nflximg.net/webp/3492/12173492.webp','http://cdn1.nflximg.net/webp/1637/11921637.webp\",null,\"http://cdn0.nflximg.net/webp/3852/9953852.webp','http://cdn0.nflximg.net/webp/3242/13013242.webp','http://cdn1.nflximg.net/webp/1701/9701701.webp','http://cdn1.nflximg.net/webp/5797/9345797.webp','http://cdn0.nflximg.net/webp/6806/3496806.webp','http://cdn0.nflximg.net/webp/3340/3473340.webp','http://cdn0.nflximg.net/webp/2878/2972878.webp','http://cdn0.nflximg.net/webp/3696/4073696.webp','http://cdn1.nflximg.net/webp/9337/22059337.webp','http://cdn1.nflximg.net/webp/3521/3993521.webp','http://cdn0.nflximg.net/webp/6342/9646342.webp','http://cdn1.nflximg.net/webp/1751/3111751.webp','http://cdn1.nflximg.net/webp/2705/4072705.webp','http://cdn0.nflximg.net/webp/4962/4034962.webp','http://cdn0.nflximg.net/webp/5830/4065830.webp','http://cdn0.nflximg.net/webp/6312/11216312.webp','http://cdn0.nflximg.net/webp/1150/8501150.webp\",null,\"http://cdn0.nflximg.net/webp/7478/11317478.webp\",null,\"http://cdn1.nflximg.net/webp/5479/4185479.webp','http://cdn0.nflximg.net/webp/7162/11097162.webp','http://cdn0.nflximg.net/webp/0634/21370634.webp','http://cdn0.nflximg.net/webp/1378/4221378.webp','http://cdn0.nflximg.net/webp/8678/20878678.webp','http://cdn1.nflximg.net/webp/8839/20878839.webp','http://cdn1.nflximg.net/webp/6843/3906843.webp','http://cdn1.nflximg.net/webp/0941/4020941.webp','http://cdn1.nflximg.net/webp/9687/12869687.webp','http://cdn1.nflximg.net/webp/6001/9966001.webp','http://cdn1.nflximg.net/webp/1143/20871143.webp','http://cdn0.nflximg.net/webp/1158/22071158.webp','http://cdn1.nflximg.net/webp/6355/20866355.webp','http://cdn1.nflximg.net/webp/1923/20981923.webp','http://cdn0.nflximg.net/webp/2454/3082454.webp','http://cdn1.nflximg.net/webp/1541/8841541.webp','http://cdn1.nflximg.net/webp/5499/3005499.webp','http://cdn0.nflximg.net/webp/2746/8112746.webp\",null,\"http://cdn1.nflximg.net/webp/0255/3840255.webp','http://cdn0.nflximg.net/webp/8488/8168488.webp','http://cdn1.nflximg.net/webp/2705/11662705.webp','http://cdn1.nflximg.net/webp/1941/11731941.webp','http://cdn0.nflximg.net/webp/3450/11173450.webp','http://cdn1.nflximg.net/webp/3649/9323649.webp','http://cdn0.nflximg.net/webp/1490/9041490.webp','http://cdn1.nflximg.net/webp/3707/9153707.webp','http://cdn1.nflximg.net/webp/5669/9735669.webp','http://cdn1.nflximg.net/webp/3543/11583543.webp','http://cdn1.nflximg.net/webp/4087/11654087.webp','http://cdn0.nflximg.net/webp/3886/21373886.webp','http://cdn1.nflximg.net/webp/8631/21288631.webp','http://cdn0.nflximg.net/webp/0976/21100976.webp','http://cdn1.nflximg.net/webp/4185/4054185.webp','http://cdn0.nflximg.net/webp/4892/8984892.webp','http://cdn0.nflximg.net/webp/3632/12143632.webp','http://cdn1.nflximg.net/webp/5079/11665079.webp','http://cdn1.nflximg.net/webp/9607/20979607.webp','http://cdn0.nflximg.net/webp/8532/11318532.webp','http://cdn0.nflximg.net/webp/7814/11977814.webp','http://cdn1.nflximg.net/webp/7419/11857419.webp','http://cdn0.nflximg.net/webp/1790/3391790.webp','http://cdn1.nflximg.net/webp/8827/4008827.webp','http://cdn1.nflximg.net/webp/5555/2905555.webp','http://cdn0.nflximg.net/webp/6670/21876670.webp','http://cdn0.nflximg.net/webp/8946/2948946.webp','http://cdn0.nflximg.net/webp/6066/3816066.webp','http://cdn1.nflximg.net/webp/7227/3947227.webp','http://cdn0.nflximg.net/webp/3048/21903048.webp','http://cdn0.nflximg.net/webp/5760/3935760.webp','http://cdn0.nflximg.net/webp/3046/9303046.webp','http://cdn0.nflximg.net/webp/2182/10922182.webp','http://cdn1.nflximg.net/webp/7521/11327521.webp','http://cdn1.nflximg.net/webp/2141/21832141.webp','http://cdn0.nflximg.net/webp/1242/11671242.webp\",null,\"http://cdn0.nflximg.net/webp/9020/21369020.webp','http://cdn1.nflximg.net/webp/1229/11191229.webp\",null,\"http://cdn0.nflximg.net/webp/3750/8793750.webp','http://cdn0.nflximg.net/webp/0754/8130754.webp','http://cdn1.nflximg.net/webp/9129/8919129.webp','http://cdn0.nflximg.net/webp/6546/11016546.webp','http://cdn1.nflximg.net/webp/5691/21035691.webp','http://cdn0.nflximg.net/webp/8748/3548748.webp','http://cdn0.nflximg.net/webp/1184/10891184.webp','http://cdn1.nflximg.net/webp/8465/21238465.webp','http://cdn1.nflximg.net/webp/0831/11340831.webp','http://cdn0.nflximg.net/webp/4396/20864396.webp','http://cdn1.nflximg.net/webp/2337/21762337.webp','http://cdn0.nflximg.net/webp/5980/20965980.webp','http://cdn0.nflximg.net/webp/4892/8984892.webp','http://cdn1.nflximg.net/webp/1897/4101897.webp','http://cdn1.nflximg.net/webp/1143/3131143.webp','http://cdn0.nflximg.net/webp/4020/20994020.webp','http://cdn0.nflximg.net/webp/3106/11723106.webp','http://cdn0.nflximg.net/webp/4040/8994040.webp','http://cdn0.nflximg.net/webp/8788/11908788.webp','http://cdn0.nflximg.net/webp/2814/21042814.webp','http://cdn0.nflximg.net/webp/1490/9041490.webp','http://cdn1.nflximg.net/webp/6119/2906119.webp','http://cdn0.nflximg.net/webp/1174/11121174.webp','http://cdn1.nflximg.net/webp/1101/9141101.webp','http://cdn0.nflximg.net/webp/4486/21614486.webp','http://cdn0.nflximg.net/webp/6270/3996270.webp','http://cdn0.nflximg.net/webp/9054/2909054.webp','http://cdn1.nflximg.net/webp/6093/12166093.webp','http://cdn0.nflximg.net/webp/7218/2947218.webp','http://cdn1.nflximg.net/webp/8281/2958281.webp','http://cdn0.nflximg.net/webp/0872/2970872.webp','http://cdn0.nflximg.net/webp/5900/20075900.webp','http://cdn0.nflximg.net/webp/1868/9891868.webp','http://cdn1.nflximg.net/webp/3001/4223001.webp','http://cdn0.nflximg.net/webp/1790/3391790.webp','http://cdn0.nflximg.net/webp/1934/3391934.webp','http://cdn1.nflximg.net/webp/8827/4008827.webp','http://cdn0.nflximg.net/webp/9044/11229044.webp','http://cdn0.nflximg.net/webp/5106/9645106.webp','http://cdn1.nflximg.net/webp/6211/13066211.webp','http://cdn1.nflximg.net/webp/8641/2908641.webp','http://cdn1.nflximg.net/webp/6239/2936239.webp','http://cdn0.nflximg.net/webp/4020/20994020.webp','http://cdn1.nflximg.net/webp/1835/21131835.webp','http://cdn0.nflximg.net/webp/3472/3743472.webp','http://cdn1.nflximg.net/webp/1493/3841493.webp','http://cdn1.nflximg.net/webp/5181/12965181.webp','http://cdn1.nflximg.net/webp/8439/2948439.webp','http://cdn0.nflximg.net/webp/3046/9303046.webp','http://cdn0.nflximg.net/webp/0968/4230968.webp','http://cdn0.nflximg.net/webp/5418/2945418.webp','http://cdn0.nflximg.net/webp/1010/8661010.webp','http://cdn0.nflximg.net/webp/7608/4227608.webp','http://cdn1.nflximg.net/webp/9067/11899067.webp','http://cdn1.nflximg.net/webp/3023/21323023.webp','http://cdn1.nflximg.net/webp/8489/11718489.webp','http://cdn1.nflximg.net/webp/8263/4118263.webp','http://cdn0.nflximg.net/webp/6546/11016546.webp','http://cdn1.nflximg.net/webp/2705/4072705.webp','http://cdn1.nflximg.net/webp/1885/8191885.webp','http://cdn1.nflximg.net/webp/6585/20996585.webp','http://cdn1.nflximg.net/webp/2161/3692161.webp','http://cdn1.nflximg.net/webp/3521/3993521.webp','http://cdn0.nflximg.net/webp/3708/2973708.webp','http://cdn0.nflximg.net/webp/5776/11215776.webp','http://cdn0.nflximg.net/webp/5916/3935916.webp','http://cdn0.nflximg.net/webp/1936/2911936.webp','http://cdn0.nflximg.net/webp/9322/2919322.webp','http://cdn0.nflximg.net/webp/8484/2978484.webp']);

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
    };

    function createScrollView(options) {
        var scrollItemViews = [];
        options = options ||
        {
            lowerBound: 0.3,
            upperBound: 0.7,
            rotateRadian: null
        };
        var createScrollItemArray = function (num, sizeX, sizeY) {
            for (var i = 0; i < num; i += 1) {
                var picUrl = netflixUrls[i];
                var image = '<div class="netflix-wrap"><div class="netflix-pics" style="background-image: url(' + picUrl + ');"></div></div>'
                var scrollItemView = new Surface({
                    content: image,
                    size: [sizeX, sizeY]
                });
                scrollItemViews.push(scrollItemView);
                this.carousel.subscribe(scrollItemView);
            }
        }.bind(this);
        this.carousel = new CarouselView(options);
        this.carouselModifier = new StateModifier({
            origin: [0, 0.3]
        });

        createScrollItemArray(100, 221, 126);
        this.carousel.sequenceFrom(scrollItemViews);

        this.add(this.carouselModifier).add(this.carousel);
    }

    function _setListeners() {

        this._eventInput.on('fade', function() {
            this.carousel.setOptions({
                minOpacity: 0.5,
                maxOpacity: 1
            });
        }.bind(this));

        this._eventInput.on('depth', function() {
            this.depthCount = this.depthCount + 100;
            this.carousel.setOptions({maxDepth:this.depthCount});
        }.bind(this));

        this._eventInput.on('swivel', function() {
            this.carousel.setOptions({rotateRadian: Math.PI / 2});
        }.bind(this));

        this._eventInput.on('bounce', function() {
            this.carousel.setOptions({
                edgeDamp: 0.1,
                edgePeriod: 1000
            });

        }.bind(this));

    }

    module.exports = AppView;
});