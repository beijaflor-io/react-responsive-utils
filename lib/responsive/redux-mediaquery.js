'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MEDIA_CHANGED = exports.MEDIA_MOUNTED = undefined;
exports.reducer = reducer;
exports.mediaChanged = mediaChanged;
exports.mediaQueryTracker = mediaQueryTracker;

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _matchmedia = require('matchmedia');

var _matchmedia2 = _interopRequireDefault(_matchmedia);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // Forked from https://github.com/Yaska/redux-mediaquery
// MIT licensed


var MEDIA_MOUNTED = exports.MEDIA_MOUNTED = 'rdx-mqt/MEDIA_MOUNTED';
var MEDIA_CHANGED = exports.MEDIA_CHANGED = 'rdx-mqt/MEDIA_CHANGED';

// Reducer
function reducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case MEDIA_CHANGED:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

// Actions
function mediaChanged(data) {
  return {
    type: MEDIA_CHANGED,
    payload: data
  };
}

var trackInnerWidth = false;
var trackInnerHeight = false;
var onResize = void 0;

var getSizes = function getSizes(data) {
  if (trackInnerWidth) {
    data.innerWidth = global.innerWidth;
  }
  if (trackInnerHeight) {
    data.innerHeight = global.innerHeight;
  }
};

var makeOnResize = function makeOnResize(dispatch) {
  return (0, _debounce2.default)(function () {
    var data = {};
    getSizes(data);
    dispatch(mediaChanged(data));
  }, 500);
};

function trackMediaQuery(label, query, dispatch, initData) {
  // special queries
  if (label === 'innerWidth' || label === 'innerHeight') {
    if (label === 'innerWidth') {
      trackInnerWidth = true;
    }

    if (label === 'innerHeight') {
      trackInnerHeight = true;
    }

    if (!onResize) {
      onResize = makeOnResize(dispatch);
      if (global.addEventListener) {
        global.addEventListener('resize', onResize, true);
      }
    }

    getSizes(initData);
  }

  var mq = (0, _matchmedia2.default)(query);

  var listener = function listener() {
    return dispatch(mediaChanged(_defineProperty({}, label, mq.matches)));
  };

  mq.addListener(listener);

  initData[label] = mq.matches;
  return;
}

function mediaQueryTracker(queries) {
  return function (dispatch) {
    var initData = {};
    if (_matchmedia2.default) {
      (0, _each2.default)(queries, function (query, label) {
        trackMediaQuery(label, query, dispatch, initData);
      });

      dispatch(mediaChanged(initData));
    }

    return {
      type: MEDIA_MOUNTED
    };
  };
}