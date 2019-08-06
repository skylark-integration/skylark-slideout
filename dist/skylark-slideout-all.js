/**
 * skylark-slideout - A version of slideout.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-slideout/
 * @license MIT
 */
!function(t,e){var n=e.define,i=e.require,o="function"==typeof n&&n.amd,s=!o&&"undefined"!=typeof exports;if(!o&&!n){var r={};n=e.define=function(t,e,n){"function"==typeof n?(r[t]={factory:n,deps:e.map(function(e){return function(t,e){if("."!==t[0])return t;var n=e.split("/"),i=t.split("/");n.pop();for(var o=0;o<i.length;o++)"."!=i[o]&&(".."==i[o]?n.pop():n.push(i[o]));return n.join("/")}(e,t)}),resolved:!1,exports:null},i(t)):r[t]={factory:null,resolved:!0,exports:n}},i=e.require=function(t){if(!r.hasOwnProperty(t))throw new Error("Module "+t+" has not been defined");var n=r[t];if(!n.resolved){var o=[];n.deps.forEach(function(t){o.push(i(t))}),n.exports=n.factory.apply(e,o)||null,n.resolved=!0}return n.exports}}if(!n)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(t,e){t("skylark-slideout/decouple",[],function(){"use strict";var t=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};return function(e,n,i){var o,s=!1;function r(e){o=e,s||(t(a),s=!0)}function a(){i.call(e,o),s=!1}return e.addEventListener(n,r,!1),r}}),t("Emitter",[],function(){function t(){}return t.prototype.on=function(t,e){return this._eventCollection=this._eventCollection||{},this._eventCollection[t]=this._eventCollection[t]||[],this._eventCollection[t].push(e),this},t.prototype.once=function(t,e){var n=this;function i(){n.off(t,i),e.apply(this,arguments)}return i.listener=e,this.on(t,i),this},t.prototype.off=function(t,e){var n=void 0;return this._eventCollection&&(n=this._eventCollection[t])?(n.forEach(function(t,i){t!==e&&t.listener!==e||n.splice(i,1)}),0===n.length&&delete this._eventCollection[t],this):this},t.prototype.emit=function(t){for(var e=this,n=arguments.length,i=Array(n>1?n-1:0),o=1;o<n;o++)i[o-1]=arguments[o];var s=void 0;return this._eventCollection&&(s=this._eventCollection[t])?((s=s.slice(0)).forEach(function(t){return t.apply(e,i)}),this):this},t}),t("skylark-slideout/Slideout",["./decouple","Emitter"],function(t,e){var n,i,o,s=!1,r=window.document,a=r.documentElement,l=window.navigator.msPointerEnabled,u={start:l?"MSPointerDown":"touchstart",move:l?"MSPointerMove":"touchmove",end:l?"MSPointerUp":"touchend"},h=function(){var t=/^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/,e=r.getElementsByTagName("script")[0].style;for(var n in e)if(t.test(n))return"-"+n.match(t)[0].toLowerCase()+"-";return"WebkitOpacity"in e?"-webkit-":"KhtmlOpacity"in e?"-khtml-":""}();function c(t){t=t||{},this._startOffsetX=0,this._currentOffsetX=0,this._opening=!1,this._moved=!1,this._opened=!1,this._preventOpen=!1,this._touch=void 0===t.touch||t.touch&&!0,this._side=t.side||"left",this.panel=t.panel,this.menu=t.menu,this.panel.classList.contains("slideout-panel")||this.panel.classList.add("slideout-panel"),this.panel.classList.contains("slideout-panel-"+this._side)||this.panel.classList.add("slideout-panel-"+this._side),this.menu.classList.contains("slideout-menu")||this.menu.classList.add("slideout-menu"),this.menu.classList.contains("slideout-menu-"+this._side)||this.menu.classList.add("slideout-menu-"+this._side),this._fx=t.fx||"ease",this._duration=parseInt(t.duration,10)||300,this._tolerance=parseInt(t.tolerance,10)||70,this._padding=this._translateTo=parseInt(t.padding,10)||256,this._orientation="right"===this._side?-1:1,this._translateTo*=this._orientation,this._touch&&this._initTouchEvents()}return o=e,(i=c).prototype=function(t,e){for(var n in e)e[n]&&(t[n]=e[n]);return t}(i.prototype||{},o.prototype),c.prototype.open=function(){var t=this;return this.emit("beforeopen"),a.classList.contains("slideout-open")||a.classList.add("slideout-open"),this._setTransition(),this._translateXTo(this._translateTo),this._opened=!0,setTimeout(function(){t.panel.style.transition=t.panel.style["-webkit-transition"]="",t.emit("open")},this._duration+50),this},c.prototype.close=function(){var t=this;return this.isOpen()||this._opening?(this.emit("beforeclose"),this._setTransition(),this._translateXTo(0),this._opened=!1,setTimeout(function(){a.classList.remove("slideout-open"),t.panel.style.transition=t.panel.style["-webkit-transition"]=t.panel.style[h+"transform"]=t.panel.style.transform="",t.emit("close")},this._duration+50),this):this},c.prototype.toggle=function(){return this.isOpen()?this.close():this.open()},c.prototype.isOpen=function(){return this._opened},c.prototype._translateXTo=function(t){return this._currentOffsetX=t,this.panel.style[h+"transform"]=this.panel.style.transform="translateX("+t+"px)",this},c.prototype._setTransition=function(){return this.panel.style[h+"transition"]=this.panel.style.transition=h+"transform "+this._duration+"ms "+this._fx,this},c.prototype._initTouchEvents=function(){var e=this;return this._onScrollFn=t(r,"scroll",function(){e._moved||(clearTimeout(n),s=!0,n=setTimeout(function(){s=!1},250))}),this._preventMove=function(t){e._moved&&t.preventDefault()},r.addEventListener(u.move,this._preventMove),this._resetTouchFn=function(t){void 0!==t.touches&&(e._moved=!1,e._opening=!1,e._startOffsetX=t.touches[0].pageX,e._preventOpen=!e._touch||!e.isOpen()&&0!==e.menu.clientWidth)},this.panel.addEventListener(u.start,this._resetTouchFn),this._onTouchCancelFn=function(){e._moved=!1,e._opening=!1},this.panel.addEventListener("touchcancel",this._onTouchCancelFn),this._onTouchEndFn=function(){e._moved&&(e.emit("translateend"),e._opening&&Math.abs(e._currentOffsetX)>e._tolerance?e.open():e.close()),e._moved=!1},this.panel.addEventListener(u.end,this._onTouchEndFn),this._onTouchMoveFn=function(t){if(!(s||e._preventOpen||void 0===t.touches||function(t){for(;t.parentNode;){if(null!==t.getAttribute("data-slideout-ignore"))return t;t=t.parentNode}return null}(t.target))){var n=t.touches[0].clientX-e._startOffsetX,i=e._currentOffsetX=n;if(!(Math.abs(i)>e._padding)&&Math.abs(n)>20){e._opening=!0;var o=n*e._orientation;if(e._opened&&o>0||!e._opened&&o<0)return;e._moved||e.emit("translatestart"),o<=0&&(i=n+e._padding*e._orientation,e._opening=!1),e._moved&&a.classList.contains("slideout-open")||a.classList.add("slideout-open"),e.panel.style[h+"transform"]=e.panel.style.transform="translateX("+i+"px)",e.emit("translate",i),e._moved=!0}}},this.panel.addEventListener(u.move,this._onTouchMoveFn),this},c.prototype.enableTouch=function(){return this._touch=!0,this},c.prototype.disableTouch=function(){return this._touch=!1,this},c.prototype.destroy=function(){return this.close(),r.removeEventListener(u.move,this._preventMove),this.panel.removeEventListener(u.start,this._resetTouchFn),this.panel.removeEventListener("touchcancel",this._onTouchCancelFn),this.panel.removeEventListener(u.end,this._onTouchEndFn),this.panel.removeEventListener(u.move,this._onTouchMoveFn),r.removeEventListener("scroll",this._onScrollFn),this.open=this.close=function(){},this},c}),t("skylark-slideout/main",["./Slideout"],function(t){return t}),t("skylark-slideout",["skylark-slideout/main"],function(t){return t});try{e("skylark-slideout")}catch(t){console.error("please use skylark-requirejs")}}(n,i),!o){var a=i("skylark-langx/skylark");s?module.exports=a:e.skylarkjs=a}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-slideout-all.js.map
