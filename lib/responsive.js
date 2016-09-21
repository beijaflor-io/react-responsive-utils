'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.small = exports.medium = exports.large = exports.responsiveReducer = exports.matchMedia = exports.MediaQuery = undefined;
exports.mountResponsive = mountResponsive;
exports.mediaQuery = mediaQuery;
exports.isSmall = isSmall;
exports.isMedium = isMedium;
exports.isLarge = isLarge;
exports.MediaSmall = MediaSmall;
exports.MediaMedium = MediaMedium;
exports.MediaLarge = MediaLarge;

var _reactResponsive = require('react-responsive');

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _matchmedia = require('matchmedia');

var _matchmedia2 = _interopRequireDefault(_matchmedia);

var _reduxMediaquery = require('./responsive/redux-mediaquery');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/prop-types */
var matchMedia = void 0;
if (!process.env.IS_BROWSER) {
  exports.matchMedia = matchMedia = function server$matchMedia() {
    return {
      matches: false
    };
  };
} else {
  exports.matchMedia = matchMedia = _matchmedia2.default;
}
global.matchMedia = _matchmedia2.default;

exports.MediaQuery = _reactResponsive2.default;
exports.matchMedia = matchMedia;
exports.responsiveReducer = _reduxMediaquery.reducer;
var large = exports.large = '(min-width: 64.063em)';
var medium = exports.medium = '(min-width: 40.063em)';
var small = exports.small = '(max-width: 40.063em)';

function mountResponsive(store) {
  if (process.env.IS_BROWSER) {
    (function () {
      var tracker = (0, _reduxMediaquery.mediaQueryTracker)({
        isPhone: small,
        isTablet: medium,
        isDesktop: large,
        isSmall: small,
        isMedium: medium,
        isLarge: large,
        innerWidth: true,
        innerHeight: true
      });

      var dispatch = store.dispatch.bind(store);
      store.dispatch(function () {
        return tracker(dispatch);
      });
    })();
  }
}

function mediaQuery() {
  for (var _len = arguments.length, queries = Array(_len), _key = 0; _key < _len; _key++) {
    queries[_key] = arguments[_key];
  }

  return queries.filter(function (x) {
    return x;
  }).join(' and ');
}

function isSmall() {
  return matchMedia(small).matches && !matchMedia(medium).matches;
}

function isMedium() {
  return matchMedia(medium).matches && !matchMedia(large).matches;
}

function isLarge() {
  return matchMedia(large).matches;
}

function MediaSmall(props) {
  if (!process.env.IS_BROWSER) {
    return null;
  }

  return _react2.default.createElement(
    _reactResponsive2.default,
    { query: mediaQuery(small, props.query) },
    props.children
  );
}

function MediaMedium(props) {
  if (!process.env.IS_BROWSER) {
    return _react2.default.createElement(
      'div',
      null,
      props.children
    );
  }

  return _react2.default.createElement(
    _reactResponsive2.default,
    { query: mediaQuery(medium, props.query) },
    props.children
  );
}

function MediaLarge(props) {
  if (!process.env.IS_BROWSER) {
    return _react2.default.createElement(
      'div',
      null,
      props.children
    );
  }

  return _react2.default.createElement(
    _reactResponsive2.default,
    { query: mediaQuery(large, props.query) },
    props.children
  );
}