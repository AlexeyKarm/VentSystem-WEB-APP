'use strict';

exports.__esModule = true;
exports.InkBar = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InkBar = exports.InkBar = function InkBar(_ref) {
  var left = _ref.left,
      width = _ref.width;
  return _react2.default.createElement(
    'div',
    { className: 'RRT__inkbar-wrapper' },
    _react2.default.createElement('div', { className: 'RRT__inkbar', style: { left: left, width: width } })
  );
};

exports.default = InkBar;


InkBar.propTypes = {
  left: _propTypes2.default.number,
  width: _propTypes2.default.number
};

InkBar.defaultProps = {
  left: 0,
  width: 0
};