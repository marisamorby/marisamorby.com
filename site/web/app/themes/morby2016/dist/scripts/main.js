/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _floatingNav = __webpack_require__(1);

	var _floatingNav2 = _interopRequireDefault(_floatingNav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __config = {
	  className: 'floating-nav',
	  classModifier: '--fixed-top',
	  classLink: 'floating-nav__nav-link',
	  classLinkModifier: 'floating-nav__nav-item--current',
	  triggerEl: 'banner'
	};
	var __sections = [];

	// Grab the viewport dimensions.
	var viewport = {
	  height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
	  width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
	};

	var __floatingBar = false;
	var __triggerElement = false;
	var __triggerY = false;

	var FloatingNav = function () {
	  function FloatingNav() {
	    _classCallCheck(this, FloatingNav);

	    __floatingBar = document.getElementsByClassName(__config.className)[0];

	    if (!!__floatingBar) {

	      /*
	       * After the trigger element scrolls out of frame (bottom hits the top of
	       * the screen), the nav bar's modifier class is added.
	       *
	       * If no trigger element is found, the modifer is added immediately.
	       */
	      __triggerElement = document.getElementsByClassName(__config.triggerEl)[0];
	      __triggerY = !!__triggerElement ? __triggerElement.offsetHeight : 0;

	      // Set up a scroll listener to determine when to detach the nav bar.
	      window.addEventListener('scroll', (0, _utils.throttle)(this.setActiveSection, 25), false);
	      window.addEventListener('scroll', (0, _utils.throttle)(this.setBarVisibility, 25), false);

	      window.addEventListener('click', this.scrollToSection);

	      this.getLinkedSections();
	    }
	  }

	  _createClass(FloatingNav, [{
	    key: 'setBarVisibility',
	    value: function setBarVisibility() {
	      var marginClass = '--hack_floating-nav__sibling--add-top-margin';
	      if (window.scrollY >= __triggerY) {
	        __floatingBar.classList.add('' + __config.className + __config.classModifier);
	        __floatingBar.nextElementSibling.classList.add(marginClass);
	      } else {
	        __floatingBar.classList.remove('' + __config.className + __config.classModifier);
	        __floatingBar.nextElementSibling.classList.remove(marginClass);
	      }
	    }
	  }, {
	    key: 'getLinkedSections',
	    value: function getLinkedSections() {
	      var links = (0, _utils.toArray)(__floatingBar.getElementsByClassName(__config.classLink));
	      links.forEach(function (link) {
	        if (!!link.href) {
	          __sections.push({
	            section: document.getElementById(link.href.split('#')[1]),
	            link: link
	          });
	        }
	      });
	    }
	  }, {
	    key: 'setActiveSection',
	    value: function setActiveSection() {
	      __sections.forEach(function (obj) {
	        if (isOnScreen(obj.section)) {
	          obj.link.parentNode.classList.add(__config.classLinkModifier);
	        } else {
	          obj.link.parentNode.classList.remove(__config.classLinkModifier);
	        }
	      });
	    }
	  }, {
	    key: 'scrollToSection',
	    value: function scrollToSection(event) {
	      if (document.body && document.body.scrollTop === 0) {

	        // Addresses a weird Chrome bug where scrollTop doesn't work when
	        // scrolled all the way to the top (document.body.scrollTop === 0).
	        document.body.scrollTop = 1;
	      }

	      var doc = getElementToScroll();
	      var targetHref = event.target.href;
	      var targetObj = __sections.filter(function (s) {
	        return s.link.href === targetHref;
	      });

	      if (targetObj.length) {
	        event.preventDefault();

	        // Section top, minus the floating nav height. Add 5 to avoid weirdness.
	        var newY = targetObj[0].section.offsetTop - __floatingBar.offsetHeight + 5;

	        scrollTo(doc, newY, 750);
	      }
	    }
	  }]);

	  return FloatingNav;
	}();

	;

	var instance = new FloatingNav();

	exports.default = instance;


	function scrollTo(element, targetPos, duration) {
	  return new Promise(function (resolve, reject) {
	    var currentPos = element.scrollTop;
	    var posChange = targetPos - currentPos;
	    var increment = 20;

	    // Quadratic easing (in/out) from http://gizma.com/easing/#quad3 (modified)
	    var easeInOut = function easeInOut(elapsed, start, change, length) {
	      elapsed /= length / 2;

	      if (elapsed < 1) {
	        return change / 2 * elapsed * elapsed + start;
	      }

	      elapsed--;

	      return -change / 2 * (elapsed * (elapsed - 2) - 1) + start;
	    };

	    // Sets up a loop that executes for the length of time set in duration
	    var animateScroll = function animateScroll(elapsedTime) {
	      elapsedTime += increment;

	      var newPos = easeInOut(elapsedTime, currentPos, posChange, duration);

	      // Actually sets the document's scroll setting
	      element.scrollTop = newPos;

	      if (elapsedTime < duration) {
	        setTimeout(function () {
	          animateScroll(elapsedTime);
	        }, increment);
	      } else {
	        resolve();
	      }
	    };

	    // Starts the animation
	    animateScroll(0);
	  });
	}

	function getElementToScroll() {
	  return document.body.scrollTop ? document.body : document.documentElement;
	}

	function isOnScreen(node) {
	  var offsetY = window.scrollY + __floatingBar.offsetHeight;
	  var top = node.offsetTop;
	  var bottom = top + node.offsetHeight;

	  return top <= offsetY && bottom >= offsetY;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.debounce = debounce;
	exports.throttle = throttle;
	exports.arrayIntersect = arrayIntersect;
	exports.toArray = toArray;
	function debounce(func) {
	  var _arguments = arguments,
	      _this = this;

	  var wait = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];

	  var timeout = void 0;

	  return function () {
	    var args = _arguments;
	    var later = function later() {
	      timeout = null;
	      func.apply(_this, args);
	    };

	    clearTimeout(timeout);

	    timeout = setTimeout(later, wait);
	  };
	}

	/**
	 * Prevents a function from firing too often.
	 * @param  {Function} func  the function to throttle
	 * @param  {Number}   limit the amount of milliseconds to wait between calls
	 * @return {Function}       function to check if the function should be called
	 */
	function throttle(func) {
	  var limit = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];

	  var wait = false;

	  return function () {
	    if (!wait) {
	      func.call();
	      wait = true;
	      setTimeout(function () {
	        wait = false;
	      }, limit);
	    }
	  };
	}

	/**
	 * Finds all shared values between two arrays in an efficient way. This
	 * function is lifted almost verbatim from phant0m's answer on StackOverflow.
	 *
	 * NOTE: The arrays MUST contain the same types; mixed values WILL NOT work.
	 *
	 * @link http://stackoverflow.com/a/12437683/463471 phant0m on StackOverflow
	 *
	 * @param  {array} arrOne an array to compare
	 * @param  {array} arrTwo another array to compare
	 * @return {array}       matched values
	 */
	function arrayIntersect(arrOne, arrTwo) {

	  // Bail if the arrays aren't arrays.
	  if (typeof arrOne.concat !== 'function' || typeof arrTwo.concat !== 'function') {
	    console.error('intersect() requires arguments to be arrays or array-like objects.');
	    console.dir(arrOne);
	    console.dir(arrTwo);
	    return [];
	  }

	  // Sort the arrays so the values match in order.
	  var sortedA = arrOne.concat().sort();
	  var sortedB = arrTwo.concat().sort();
	  var commonValues = [];
	  var iA = 0;
	  var iB = 0;

	  // Loop until we run out of values in one or both arrays.
	  while (iA < arrOne.length && iB < arrTwo.length) {

	    /*
	     * If the values at the current indices match, add them to the common array
	     * and increment both counters.
	     */
	    if (sortedA[iA] === sortedB[iB]) {
	      commonValues.push(sortedA[iA]);
	      iA++;
	      iB++;
	    }

	    /*
	     * If the values _don't_ match, only update the counter for the array with
	     * the lower value.
	     */
	    else if (sortedA[iA] < sortedB[iB]) {
	        iA++;
	      } else {
	        iB++;
	      }
	  }

	  return commonValues;
	}

	function toArray(val) {

	  // Or array-like objects.
	  var arr = void 0;

	  if (typeof val.concat === 'function') {
	    return val;
	  }

	  switch (typeof val === 'undefined' ? 'undefined' : _typeof(val)) {

	    case 'object':
	      arr = Object.keys(val).map(function (key) {
	        return val[key];
	      });
	      break;

	    /*
	     * This will help with strings and integers, but otherwise you'll probably
	     * see unexpected results. It's only here to avoid an error.
	     */
	    default:
	      arr = [val];
	  }

	  return arr;
	}

/***/ }
/******/ ]);