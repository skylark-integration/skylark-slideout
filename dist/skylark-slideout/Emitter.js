/**
 * skylark-slideout - A version of slideout.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-slideout/
 * @license MIT
 */
define([],function(){function t(){}return t.prototype.on=function(t,e){return this._eventCollection=this._eventCollection||{},this._eventCollection[t]=this._eventCollection[t]||[],this._eventCollection[t].push(e),this},t.prototype.once=function(t,e){var n=this;function i(){n.off(t,i),e.apply(this,arguments)}return i.listener=e,this.on(t,i),this},t.prototype.off=function(t,e){var n=void 0;return this._eventCollection&&(n=this._eventCollection[t])?(n.forEach(function(t,i){t!==e&&t.listener!==e||n.splice(i,1)}),0===n.length&&delete this._eventCollection[t],this):this},t.prototype.emit=function(t){for(var e=this,n=arguments.length,i=Array(n>1?n-1:0),o=1;o<n;o++)i[o-1]=arguments[o];var l=void 0;return this._eventCollection&&(l=this._eventCollection[t])?((l=l.slice(0)).forEach(function(t){return t.apply(e,i)}),this):this},t});
//# sourceMappingURL=sourcemaps/Emitter.js.map
