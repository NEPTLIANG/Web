!function(){"use strict";var e,r,n,t,o,i,c,a,u,d,f={},l={};function s(e){var r=l[e];if(void 0!==r){if(void 0!==r.error)throw r.error;return r.exports}var n=l[e]={id:e,exports:{}};try{var t={id:e,module:n,factory:f[e],require:s};s.i.forEach((function(e){e(t)})),n=t.module,t.factory.call(n.exports,n,n.exports,t.require)}catch(e){throw n.error=e,e}return n.exports}s.m=f,s.c=l,s.i=[],e=[],s.O=function(r,n,t,o){if(!n){var i=1/0;for(d=0;d<e.length;d++){n=e[d][0],t=e[d][1],o=e[d][2];for(var c=!0,a=0;a<n.length;a++)(!1&o||i>=o)&&Object.keys(s.O).every((function(e){return s.O[e](n[a])}))?n.splice(a--,1):(c=!1,o<i&&(i=o));if(c){e.splice(d--,1);var u=t();void 0!==u&&(r=u)}}return r}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[n,t,o]},s.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(r,{a:r}),r},n=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},s.t=function(e,t){if(1&t&&(e=this(e)),8&t)return e;if("object"==typeof e&&e){if(4&t&&e.__esModule)return e;if(16&t&&"function"==typeof e.then)return e}var o=Object.create(null);s.r(o);var i={};r=r||[null,n({}),n([]),n(n)];for(var c=2&t&&e;"object"==typeof c&&!~r.indexOf(c);c=n(c))Object.getOwnPropertyNames(c).forEach((function(r){i[r]=function(){return e[r]}}));return i.default=function(){return e},s.d(o,i),o},s.d=function(e,r){for(var n in r)s.o(r,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},s.f={},s.e=function(e){return Promise.all(Object.keys(s.f).reduce((function(r,n){return s.f[n](e,r),r}),[]))},s.u=function(e){return"js/calc.bundle.js"},s.hu=function(e){return e+"."+s.h()+".hot-update.js"},s.miniCssF=function(e){return"css/built.73ddf563e9.css"},s.hmrF=function(){return"runtime."+s.h()+".hot-update.json"},s.h=function(){return"545cd0b879f83e1b91be"},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t={},o="webpackNumbers:",s.l=function(e,r,n,i){if(t[e])t[e].push(r);else{var c,a;if(void 0!==n)for(var u=document.getElementsByTagName("script"),d=0;d<u.length;d++){var f=u[d];if(f.getAttribute("src")==e||f.getAttribute("data-webpack")==o+n){c=f;break}}c||(a=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.setAttribute("data-webpack",o+n),c.src=e),t[e]=[r];var l=function(r,n){c.onerror=c.onload=null,clearTimeout(p);var o=t[e];if(delete t[e],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((function(e){return e(n)})),r)return r(n)},p=setTimeout(l.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=l.bind(null,c.onerror),c.onload=l.bind(null,c.onload),a&&document.head.appendChild(c)}},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},function(){var e,r,n,t,o={},i=s.c,c=[],a=[],u="idle";function d(e){u=e;for(var r=[],n=0;n<a.length;n++)r[n]=a[n].call(null,e);return Promise.all(r)}function f(e){if(0===r.length)return e();var n=r;return r=[],Promise.all(n).then((function(){return f(e)}))}function l(e){if("idle"!==u)throw new Error("check() is only allowed in idle status");return d("check").then(s.hmrM).then((function(t){return t?d("prepare").then((function(){var o=[];return r=[],n=[],Promise.all(Object.keys(s.hmrC).reduce((function(e,r){return s.hmrC[r](t.c,t.r,t.m,e,n,o),e}),[])).then((function(){return f((function(){return e?h(e):d("ready").then((function(){return o}))}))}))})):d(v()?"ready":"idle").then((function(){return null}))}))}function p(e){return"ready"!==u?Promise.resolve().then((function(){throw new Error("apply() is only allowed in ready status")})):h(e)}function h(e){e=e||{},v();var r=n.map((function(r){return r(e)}));n=void 0;var o=r.map((function(e){return e.error})).filter(Boolean);if(o.length>0)return d("abort").then((function(){throw o[0]}));var i=d("dispose");r.forEach((function(e){e.dispose&&e.dispose()}));var c,a=d("apply"),u=function(e){c||(c=e)},f=[];return r.forEach((function(e){if(e.apply){var r=e.apply(u);if(r)for(var n=0;n<r.length;n++)f.push(r[n])}})),Promise.all([i,a]).then((function(){return c?d("fail").then((function(){throw c})):t?h(e).then((function(e){return f.forEach((function(r){e.indexOf(r)<0&&e.push(r)})),e})):d("idle").then((function(){return f}))}))}function v(){if(t)return n||(n=[]),Object.keys(s.hmrI).forEach((function(e){t.forEach((function(r){s.hmrI[e](r,n)}))})),t=void 0,!0}s.hmrD=o,s.i.push((function(h){var v,m,y,g,b=h.module,E=function(n,t){var o=i[t];if(!o)return n;var a=function(r){if(o.hot.active){if(i[r]){var a=i[r].parents;-1===a.indexOf(t)&&a.push(t)}else c=[t],e=r;-1===o.children.indexOf(r)&&o.children.push(r)}else console.warn("[HMR] unexpected require("+r+") from disposed module "+t),c=[];return n(r)},l=function(e){return{configurable:!0,enumerable:!0,get:function(){return n[e]},set:function(r){n[e]=r}}};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&"e"!==s&&Object.defineProperty(a,s,l(s));return a.e=function(e){return function(e){switch(u){case"ready":return d("prepare"),r.push(e),f((function(){return d("ready")})),e;case"prepare":return r.push(e),e;default:return e}}(n.e(e))},a}(h.require,h.id);b.hot=(v=h.id,m=b,g={_acceptedDependencies:{},_acceptedErrorHandlers:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:y=e!==v,_requireSelf:function(){c=m.parents.slice(),e=y?void 0:v,s(v)},active:!0,accept:function(e,r,n){if(void 0===e)g._selfAccepted=!0;else if("function"==typeof e)g._selfAccepted=e;else if("object"==typeof e&&null!==e)for(var t=0;t<e.length;t++)g._acceptedDependencies[e[t]]=r||function(){},g._acceptedErrorHandlers[e[t]]=n;else g._acceptedDependencies[e]=r||function(){},g._acceptedErrorHandlers[e]=n},decline:function(e){if(void 0===e)g._selfDeclined=!0;else if("object"==typeof e&&null!==e)for(var r=0;r<e.length;r++)g._declinedDependencies[e[r]]=!0;else g._declinedDependencies[e]=!0},dispose:function(e){g._disposeHandlers.push(e)},addDisposeHandler:function(e){g._disposeHandlers.push(e)},removeDisposeHandler:function(e){var r=g._disposeHandlers.indexOf(e);r>=0&&g._disposeHandlers.splice(r,1)},invalidate:function(){switch(this._selfInvalidated=!0,u){case"idle":n=[],Object.keys(s.hmrI).forEach((function(e){s.hmrI[e](v,n)})),d("ready");break;case"ready":Object.keys(s.hmrI).forEach((function(e){s.hmrI[e](v,n)}));break;case"prepare":case"check":case"dispose":case"apply":(t=t||[]).push(v)}},check:l,apply:p,status:function(e){if(!e)return u;a.push(e)},addStatusHandler:function(e){a.push(e)},removeStatusHandler:function(e){var r=a.indexOf(e);r>=0&&a.splice(r,1)},data:o[v]},e=void 0,g),b.parents=c,b.children=[],c=[],h.require=E})),s.hmrC={},s.hmrI={}}(),function(){var e;s.g.importScripts&&(e=s.g.location+"");var r=s.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var n=r.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=e+"../"}(),i=function(e,r,n,t){var o=document.createElement("link");return o.rel="stylesheet",o.type="text/css",o.onerror=o.onload=function(i){if(o.onerror=o.onload=null,"load"===i.type)n();else{var c=i&&("load"===i.type?"missing":i.type),a=i&&i.target&&i.target.href||r,u=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");u.code="CSS_CHUNK_LOAD_FAILED",u.type=c,u.request=a,o.parentNode.removeChild(o),t(u)}},o.href=r,document.head.appendChild(o),o},c=function(e,r){for(var n=document.getElementsByTagName("link"),t=0;t<n.length;t++){var o=(c=n[t]).getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(o===e||o===r))return c}var i=document.getElementsByTagName("style");for(t=0;t<i.length;t++){var c;if((o=(c=i[t]).getAttribute("data-href"))===e||o===r)return c}},a=[],u=[],d=function(e){return{dispose:function(){for(var e=0;e<a.length;e++){var r=a[e];r.parentNode&&r.parentNode.removeChild(r)}a.length=0},apply:function(){for(var e=0;e<u.length;e++)u[e].rel="stylesheet";u.length=0}}},s.hmrC.miniCss=function(e,r,n,t,o,f){o.push(d),e.forEach((function(e){var r=s.miniCssF(e),n=s.p+r,o=c(r,n);o&&t.push(new Promise((function(r,t){var c=i(e,n,(function(){c.as="style",c.rel="preload",r()}),t);a.push(o),u.push(c)})))}))},function(){var e={666:0};s.f.j=function(r,n){var t=s.o(e,r)?e[r]:void 0;if(0!==t)if(t)n.push(t[2]);else if(666!=r){var o=new Promise((function(n,o){t=e[r]=[n,o]}));n.push(t[2]=o);var i=s.p+s.u(r),c=new Error;s.l(i,(function(n){if(s.o(e,r)&&(0!==(t=e[r])&&(e[r]=void 0),t)){var o=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;c.message="Loading chunk "+r+" failed.\n("+o+": "+i+")",c.name="ChunkLoadError",c.type=o,c.request=i,t[1](c)}}),"chunk-"+r,r)}else e[r]=0};var r,n,t,o,i={};function c(e){return new Promise((function(r,n){i[e]=r;var t=s.p+s.hu(e),o=new Error;s.l(t,(function(r){if(i[e]){i[e]=void 0;var t=r&&("load"===r.type?"missing":r.type),c=r&&r.target&&r.target.src;o.message="Loading hot update chunk "+e+" failed.\n("+t+": "+c+")",o.name="ChunkLoadError",o.type=t,o.request=c,n(o)}}))}))}function a(i){function c(e){for(var r=[e],n={},t=r.map((function(e){return{chain:[e],id:e}}));t.length>0;){var o=t.pop(),i=o.id,c=o.chain,u=s.c[i];if(u&&(!u.hot._selfAccepted||u.hot._selfInvalidated)){if(u.hot._selfDeclined)return{type:"self-declined",chain:c,moduleId:i};if(u.hot._main)return{type:"unaccepted",chain:c,moduleId:i};for(var d=0;d<u.parents.length;d++){var f=u.parents[d],l=s.c[f];if(l){if(l.hot._declinedDependencies[i])return{type:"declined",chain:c.concat([f]),moduleId:i,parentId:f};-1===r.indexOf(f)&&(l.hot._acceptedDependencies[i]?(n[f]||(n[f]=[]),a(n[f],[i])):(delete n[f],r.push(f),t.push({chain:c.concat([f]),id:f})))}}}}return{type:"accepted",moduleId:e,outdatedModules:r,outdatedDependencies:n}}function a(e,r){for(var n=0;n<r.length;n++){var t=r[n];-1===e.indexOf(t)&&e.push(t)}}s.f&&delete s.f.jsonpHmr,r=void 0;var u={},d=[],f={},l=function(e){console.warn("[HMR] unexpected require("+e.id+") to disposed module")};for(var p in n)if(s.o(n,p)){var h,v=n[p],m=!1,y=!1,g=!1,b="";switch((h=v?c(p):{type:"disposed",moduleId:p}).chain&&(b="\nUpdate propagation: "+h.chain.join(" -> ")),h.type){case"self-declined":i.onDeclined&&i.onDeclined(h),i.ignoreDeclined||(m=new Error("Aborted because of self decline: "+h.moduleId+b));break;case"declined":i.onDeclined&&i.onDeclined(h),i.ignoreDeclined||(m=new Error("Aborted because of declined dependency: "+h.moduleId+" in "+h.parentId+b));break;case"unaccepted":i.onUnaccepted&&i.onUnaccepted(h),i.ignoreUnaccepted||(m=new Error("Aborted because "+p+" is not accepted"+b));break;case"accepted":i.onAccepted&&i.onAccepted(h),y=!0;break;case"disposed":i.onDisposed&&i.onDisposed(h),g=!0;break;default:throw new Error("Unexception type "+h.type)}if(m)return{error:m};if(y)for(p in f[p]=v,a(d,h.outdatedModules),h.outdatedDependencies)s.o(h.outdatedDependencies,p)&&(u[p]||(u[p]=[]),a(u[p],h.outdatedDependencies[p]));g&&(a(d,[h.moduleId]),f[p]=l)}n=void 0;for(var E,w=[],_=0;_<d.length;_++){var k=d[_],O=s.c[k];O&&(O.hot._selfAccepted||O.hot._main)&&f[k]!==l&&!O.hot._selfInvalidated&&w.push({module:k,require:O.hot._requireSelf,errorHandler:O.hot._selfAccepted})}return{dispose:function(){var r;t.forEach((function(r){delete e[r]})),t=void 0;for(var n,o=d.slice();o.length>0;){var i=o.pop(),c=s.c[i];if(c){var a={},f=c.hot._disposeHandlers;for(_=0;_<f.length;_++)f[_].call(null,a);for(s.hmrD[i]=a,c.hot.active=!1,delete s.c[i],delete u[i],_=0;_<c.children.length;_++){var l=s.c[c.children[_]];l&&(r=l.parents.indexOf(i))>=0&&l.parents.splice(r,1)}}}for(var p in u)if(s.o(u,p)&&(c=s.c[p]))for(E=u[p],_=0;_<E.length;_++)n=E[_],(r=c.children.indexOf(n))>=0&&c.children.splice(r,1)},apply:function(e){for(var r in f)s.o(f,r)&&(s.m[r]=f[r]);for(var n=0;n<o.length;n++)o[n](s);for(var t in u)if(s.o(u,t)){var c=s.c[t];if(c){E=u[t];for(var a=[],l=[],p=[],h=0;h<E.length;h++){var v=E[h],m=c.hot._acceptedDependencies[v],y=c.hot._acceptedErrorHandlers[v];if(m){if(-1!==a.indexOf(m))continue;a.push(m),l.push(y),p.push(v)}}for(var g=0;g<a.length;g++)try{a[g].call(null,E)}catch(r){if("function"==typeof l[g])try{l[g](r,{moduleId:t,dependencyId:p[g]})}catch(n){i.onErrored&&i.onErrored({type:"accept-error-handler-errored",moduleId:t,dependencyId:p[g],error:n,originalError:r}),i.ignoreErrored||(e(n),e(r))}else i.onErrored&&i.onErrored({type:"accept-errored",moduleId:t,dependencyId:p[g],error:r}),i.ignoreErrored||e(r)}}}for(var b=0;b<w.length;b++){var _=w[b],k=_.module;try{_.require(k)}catch(r){if("function"==typeof _.errorHandler)try{_.errorHandler(r,{moduleId:k,module:s.c[k]})}catch(n){i.onErrored&&i.onErrored({type:"self-accept-error-handler-errored",moduleId:k,error:n,originalError:r}),i.ignoreErrored||(e(n),e(r))}else i.onErrored&&i.onErrored({type:"self-accept-errored",moduleId:k,error:r}),i.ignoreErrored||e(r)}}return d}}}self.webpackHotUpdatewebpackNumbers=function(e,r,t){for(var c in r)s.o(r,c)&&(n[c]=r[c]);t&&o.push(t),i[e]&&(i[e](),i[e]=void 0)},s.hmrI.jsonp=function(e,r){n||(n={},o=[],t=[],r.push(a)),s.o(n,e)||(n[e]=s.m[e])},s.hmrC.jsonp=function(i,u,d,f,l,p){l.push(a),r={},t=u,n=d.reduce((function(e,r){return e[r]=!1,e}),{}),o=[],i.forEach((function(n){s.o(e,n)&&void 0!==e[n]&&(f.push(c(n)),r[n]=!0)})),s.f&&(s.f.jsonpHmr=function(n,t){r&&!s.o(r,n)&&s.o(e,n)&&void 0!==e[n]&&(t.push(c(n)),r[n]=!0)})},s.hmrM=function(){if("undefined"==typeof fetch)throw new Error("No browser support: need fetch API");return fetch(s.p+s.hmrF()).then((function(e){if(404!==e.status){if(!e.ok)throw new Error("Failed to fetch update manifest "+e.statusText);return e.json()}}))},s.O.j=function(r){return 0===e[r]};var u=function(r,n){var t,o,i=n[0],c=n[1],a=n[2],u=0;for(t in c)s.o(c,t)&&(s.m[t]=c[t]);if(a)var d=a(s);for(r&&r(n);u<i.length;u++)o=i[u],s.o(e,o)&&e[o]&&e[o][0](),e[i[u]]=0;return s.O(d)},d=self.webpackChunkwebpackNumbers=self.webpackChunkwebpackNumbers||[];d.forEach(u.bind(null,0)),d.push=u.bind(null,d.push.bind(d))}()}();
//# sourceMappingURL=runtime.70e4ee6888.bundle.js.map