(function () {
  var global = global || window || this;
  var nx = global.nx || require('nx-js-core');
  var navigator = global.navigator;
  var UA = navigator.userAgent;
  var docStyle = document.documentElement.style;
  var toString = Object.prototype.toString;
  var OBJECT_OPERA = '[object Opera]';
  var JS_PREFIX_MAP = {
    trident: 'ms',
    gecko: 'Moz',
    webkit: 'Webkit',
    presto: 'O'
  };


  var CSS_PREFIX_MAP = {
    trident: '-ms-',
    gecko: '-moz-',
    webkit: '-webkit-',
    presto: '-o-'
  };

  var Browser = nx.declare('nx.Browser', {
    statics: {
      init: function () {
        nx.mix(this, {
          trident: UA.indexOf('Trident') > -1, //IE内核
          presto: UA.indexOf('Presto') > -1, //opera内核
          webKit: UA.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: UA.indexOf('Gecko') > -1 && UA.indexOf('KHTML') == -1,//火狐内核
          mobile: !!UA.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1, //android终端
          iPhone: UA.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
          iPad: UA.indexOf('iPad') > -1, //是否iPad
          webApp: UA.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
          weixin: UA.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
          qq: UA.match(/\sQQ/i) == " qq", //是否QQ
          ios8: UA.indexOf('OS 8') > -1//判断是否ios8
        });
      },
      engine: function () {
        if (global.opera && toString.call(opera) === OBJECT_OPERA) {
          return 'presto';
        } else if ('MozAppearance' in docStyle) {
          return 'gecko';
        } else if ('WebkitAppearance' in docStyle) {
          return 'webkit';
        } else if (typeof navigator.cpuClass === 'string') {
          return 'trident';
        } else {
          return 'unknown';
        }
      },
      language: function () {
        return (navigator.browserLanguage || navigator.language).toLowerCase();
      },
      jsPrefix: function () {
        return JS_PREFIX_MAP[Browser.engine()];
      },
      cssPrefix: function () {
        return CSS_PREFIX_MAP[Browser.engine()];
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Browser;
  }

}());
