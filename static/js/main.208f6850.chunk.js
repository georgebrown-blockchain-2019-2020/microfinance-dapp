(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[4],{172:function(e,n,t){e.exports=t(420)},18:function(e,n,t){"use strict";t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return a})),t.d(n,"a",(function(){return u})),t.d(n,"e",(function(){return c})),t.d(n,"f",(function(){return o})),t.d(n,"d",(function(){return i})),t.d(n,"g",(function(){return l})),t.d(n,"h",(function(){return f}));var r="AUTH_START",a="AUTH_SUCCESS",u="AUTH_FAIL",c="GET_INFORMATION_START",o="GET_INFORMATION_SUCCESS",i="GET_INFORMATION_FAIL",l="GET_USD_RATE",f="SET_DIRECT_PATH"},186:function(e,n){},209:function(e,n){},211:function(e,n){},27:function(e,n,t){"use strict";t.d(n,"i",(function(){return m})),t.d(n,"h",(function(){return b})),t.d(n,"f",(function(){return g})),t.d(n,"g",(function(){return p})),t.d(n,"e",(function(){return O})),t.d(n,"d",(function(){return E})),t.d(n,"a",(function(){return v})),t.d(n,"b",(function(){return j})),t.d(n,"c",(function(){return R}));var r=t(168),a=t(60),u=t(93),c=t(61),o=t.n(c),i=t(88),l=t.n(i),f=t(0),s=t.n(f),d=t(48);function h(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}var m=function(e,n){return function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?h(t,!0).forEach((function(n){Object(u.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):h(t).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({},e,{},n)},b=function(e){for(var n="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=t.length,a=0;a<e;a++)n+=t.charAt(Math.floor(Math.random()*r));return n},g=function(e){return 0===e?0:o.a.utils.fromWei(e,"ether")},p=function(e,n){var t=g(e);return new l.a(t).mul(new l.a(n)).toString()},O=function(e){return e?o.a.utils.toWei(e,"ether"):0};function E(e){var n=e.inputRef,t=e.onChange,r=Object(a.a)(e,["inputRef","onChange"]);return s.a.createElement(d.a,Object.assign({},r,{getInputRef:n,onValueChange:function(n){t({target:{name:e.name,value:n.value}})},thousandSeparator:!0,isNumericString:!0,prefix:"$"}))}function v(e){var n=e.inputRef,t=e.onChange,r=Object(a.a)(e,["inputRef","onChange"]);return s.a.createElement(d.a,Object.assign({},r,{getInputRef:n,onValueChange:function(n){t({target:{name:e.name,value:n.value}})},thousandSeparator:!0,isNumericString:!0}))}function j(e){var n=e.inputRef,t=e.onChange,r=Object(a.a)(e,["inputRef","onChange"]);return s.a.createElement(d.a,Object.assign({},r,{getInputRef:n,onValueChange:function(n){t({target:{name:e.name,value:n.value}})},thousandSeparator:!0,isNumericString:!0,format:"+1 (###) ###-####",mask:"_"}))}function R(e){var n=Object(r.a)({},e);return s.a.createElement(d.a,Object.assign({},n,{displayType:"text",format:"+1 (###) ###-####",mask:"_"}))}},281:function(e,n){},414:function(e,n,t){},415:function(e,n,t){},416:function(e,n,t){},420:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),u=t(49),c=t.n(u),o=t(31),i=t(18),l=t(27),f={address:null,infor:null,error:null,loading:!1,authRedirectPath:"/",usdRate:0},s=function(e,n){return Object(l.i)(e,{error:null,loading:!0})},d=function(e,n){return Object(l.i)(e,{address:n.address,loading:!1})},h=function(e,n){return Object(l.i)(e,{error:n.error,loading:!1})},m=function(e,n){return Object(l.i)(e,{infor:n.infor,loading:!1})},b=function(e,n){return Object(l.i)(e,{authRedirectPath:n.path})},g=function(e,n){return Object(l.i)(e,{usdRate:n.rate})},p=t(50),O=t(170),E=(t(414),t(415),t(20)),v=t(92),j=t(95),R=t.n(j),S=a.a.lazy((function(){return t.e(10).then(t.bind(null,558))})),y=a.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(12)]).then(t.bind(null,545))})),T=a.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(3),t.e(13)]).then(t.bind(null,549))}));var w=Object(p.b)((function(e){return{address:e.address}}))((function(e){var n=null;return Object(r.useEffect)((function(){t.e(14).then(t.bind(null,435)).then((function(n){n.default.options.from=e.address}))}),[e.address]),n=e.address?a.a.createElement(E.d,null,a.a.createElement(E.b,{path:"/infor",render:function(e){return a.a.createElement(T,e)}}),a.a.createElement(E.b,{path:"/",render:function(e){return a.a.createElement(S,e)}}),a.a.createElement(E.a,{to:"/"})):a.a.createElement(E.d,null,a.a.createElement(E.b,{path:"/login",render:function(e){return a.a.createElement(y,e)}}),a.a.createElement(E.a,{to:"/login"})),a.a.createElement(r.Suspense,{fallback:a.a.createElement(v.a,{open:!0},a.a.createElement(R.a,null))},n)}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var C=t(63),_=o.c,A=Object(o.d)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case i.b:case i.e:return s(e);case i.c:return d(e,n);case i.a:case i.d:return h(e,n);case i.f:return m(e,n);case i.h:return b(e,n);case i.g:return g(e,n);default:return e}}),_(Object(o.a)(O.a)));c.a.render(a.a.createElement(p.a,{store:A},a.a.createElement(C.a,{basename:"/microfinance-dapp"},a.a.createElement(w,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},92:function(e,n,t){"use strict";var r=t(0),a=t.n(r);t(416);n.a=function(e){return e.show?a.a.createElement("div",{className:"backdrop",onClick:e.clicked},e.children):null}},95:function(e,n,t){e.exports=t.p+"static/media/loading-heart.40ab1b0a.svg"}},[[172,5,6]]]);
//# sourceMappingURL=main.208f6850.chunk.js.map