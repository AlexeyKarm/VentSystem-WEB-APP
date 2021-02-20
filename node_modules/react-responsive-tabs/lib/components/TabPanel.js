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

var TabPanel = function (_Component) {
  _inherits(TabPanel, _Component);

  function TabPanel() {
    _classCallCheck(this, TabPanel);

    return _possibleConstructorReturn(this, (TabPanel.__proto__ || Object.getPrototypeOf(TabPanel)).apply(this, arguments));
  }

  _createClass(TabPanel, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var _props = this.props,
          children = _props.children,
          getContent = _props.getContent,
          classNames = _props.classNames;

      return getContent !== nextProps.getContent || children !== nextProps.children || classNames !== nextProps.classNames;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          classNames = _props2.classNames,
          id = _props2.id,
          tabId = _props2.tabId,
          children = _props2.children,
          getContent = _props2.getContent;


      return _react2.default.createElement(
        'div',
        { className: classNames, role: 'tabpanel', id: id, 'aria-labelledby': tabId, 'aria-hidden': 'false' },
        getContent && getContent(),
        !getContent && children
      );
    }
  }]);

  return TabPanel;
}(_react.Component);

exports.default = TabPanel;


TabPanel.propTypes = {
  getContent: _propTypes2.default.func,
  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
  id: _propTypes2.default.string.isRequired,

  // generic props
  classNames: _propTypes2.default.string.isRequired,
  tabId: _propTypes2.default.string.isRequired
};

TabPanel.defaultProps = {
  getContent: undefined,
  children: undefined
};