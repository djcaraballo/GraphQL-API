require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apiKey.js":
/*!*******************!*\
  !*** ./apiKey.js ***!
  \*******************/
/*! exports provided: apiKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apiKey", function() { return apiKey; });
const apiKey = "00c79cf82f7d0908c63dbd3bc3d8e61e";

/***/ }),

/***/ "./src/NomicsConnector.js":
/*!********************************!*\
  !*** ./src/NomicsConnector.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var memoizee__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! memoizee */ "memoizee");
/* harmony import */ var memoizee__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(memoizee__WEBPACK_IMPORTED_MODULE_1__);



class NomicsConnector {
  constructor(apiKey) {
    this.client = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
      baseURL: 'https://api.nomics.com/v1',
      method: 'get',
      repsonseType: 'json',
      params: {
        key: apiKey
      }
    });
    this.getPricesByCurrencyCached = memoizee__WEBPACK_IMPORTED_MODULE_1___default()(this.getPricesByCurrency, {
      maxAge: 300000,
      //5 minutes til cache expiration
      preFetch: 0.05,
      //pre-fetch 15s before expiration
      promise: 'then' //handle async

    });
  }

  async getPrices() {
    const response = await this.client('/prices');
    return response.data;
  }

  async getPricesByCurrency() {
    const prices = await this.getPrices();
    return prices.reduce((pricesByCurrency, {
      currency,
      price
    }) => {
      pricesByCurrency[currency] = price;
      return pricesByCurrency;
    }, {});
  }

  async getPrice(currency) {
    const pricesByCurrency = await this.getPricesByCurrencyCached();
    return pricesByCurrency[currency];
  }

}

/* harmony default export */ __webpack_exports__["default"] = (NomicsConnector);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql_yoga__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-yoga */ "graphql-yoga");
/* harmony import */ var graphql_yoga__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_yoga__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _NomicsConnector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NomicsConnector */ "./src/NomicsConnector.js");
/* harmony import */ var _apiKey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../apiKey */ "./apiKey.js");



const NOMICS_API_KEY = _apiKey__WEBPACK_IMPORTED_MODULE_2__["apiKey"];
const typeDefs = `
  type Query {
    exchangeRate(currency: String!): Float
  }
  `;
const resolvers = {
  Query: {
    exchangeRate: (root, variables, context) => context.nomics.getPrice(variables.currency)
  }
};
const server = new graphql_yoga__WEBPACK_IMPORTED_MODULE_0__["GraphQLServer"]({
  typeDefs,
  resolvers,
  context: {
    nomics: new _NomicsConnector__WEBPACK_IMPORTED_MODULE_1__["default"](NOMICS_API_KEY)
  }
}); //  Go to http://localhost:4000 to test your API

server.start(() => console.log('Server running on :4000'));

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/djcaraballo/Turing 2.0/StudyProjects/crypto-pricefeed/src/index.js */"./src/index.js");


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "graphql-yoga":
/*!*******************************!*\
  !*** external "graphql-yoga" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-yoga");

/***/ }),

/***/ "memoizee":
/*!***************************!*\
  !*** external "memoizee" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("memoizee");

/***/ })

/******/ });
//# sourceMappingURL=main.map