'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = function (_Component) {
  _inherits(Tab, _Component);

  function Tab() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tab.__proto__ || Object.getPrototypeOf(Tab)).call.apply(_ref, [this].concat(args))), _this), _this.onTabClick = function () {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          originalKey = _this$props.originalKey;

      onClick(originalKey);
    }, _this.renderRemovableTab = function () {
      var _this$props2 = _this.props,
          children = _this$props2.children,
          onRemove = _this$props2.onRemove;

      return _react2.default.createElement(
        'div',
        { className: 'RRT__removable' },
        _react2.default.createElement(
          'div',
          { className: 'RRT__removable-text' },
          children
        ),
        _react2.default.createElement(
          'div',
          { className: 'RRT__removable-icon', onClick: onRemove },
          'x'
        )
      );
    }, _this.renderTab = function () {
      var _this$props3 = _this.props,
          children = _this$props3.children,
          allowRemove = _this$props3.allowRemove;


      if (allowRemove) {
        return _this.renderRemovableTab();
      }

      return children;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tab, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var _props = this.props,
          children = _props.children,
          selected = _props.selected,
          classNames = _props.classNames;

      return children !== nextProps.children || selected !== nextProps.selected || classNames !== nextProps.classNames;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          id = _props2.id,
          classNames = _props2.classNames,
          selected = _props2.selected,
          disabled = _props2.disabled,
          panelId = _props2.panelId,
          onFocus = _props2.onFocus,
          onBlur = _props2.onBlur,
          originalKey = _props2.originalKey;


      return _react2.default.createElement(
        'div',
        {
          ref: function ref(e) {
            return _this2.tab = e;
          },
          role: 'tab',
          className: classNames,
          id: id,
          'aria-selected': selected ? 'true' : 'false',
          'aria-expanded': selected ? 'true' : 'false',
          'aria-disabled': disabled ? 'true' : 'false',
          'aria-controls': panelId,
          tabIndex: '0',
          onClick: this.onTabClick,
          onFocus: onFocus(originalKey),
          onBlur: onBlur
        },
        this.renderTab()
      );
    }
  }]);

  return Tab;
}(_react.Component);

exports.default = Tab;


Tab.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
  disabled: _propTypes2.default.bool,

  // generic props
  panelId: _propTypes2.default.string.isRequired,
  selected: _propTypes2.default.bool.isRequired,
  onClick: _propTypes2.default.func.isRequired,
  onRemove: _propTypes2.default.func,
  onFocus: _propTypes2.default.func.isRequired,
  onBlur: _propTypes2.default.func.isRequired,
  allowRemove: _propTypes2.default.bool,
  id: _propTypes2.default.string.isRequired,
  originalKey: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  classNames: _propTypes2.default.string.isRequired
};

Tab.defaultProps = {
  children: undefined,
  onRemove: function onRemove() {},
  allowRemove: false,
  disabled: false
};