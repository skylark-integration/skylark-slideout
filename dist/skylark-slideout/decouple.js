/**
 * skylark-slideout - A version of slideout.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-slideout/
 * @license MIT
 */
define([],function(){"use strict";var n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(n){window.setTimeout(n,1e3/60)};return function(e,t,i){var o,r=!1;function u(e){o=e,r||(n(a),r=!0)}function a(){i.call(e,o),r=!1}return e.addEventListener(t,u,!1),u}});
//# sourceMappingURL=sourcemaps/decouple.js.map
