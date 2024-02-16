import React, { Component } from 'react';

function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
        if (head.firstChild) {
            head.insertBefore(style, head.firstChild);
        } else {
            head.appendChild(style);
        }
    } else {
        head.appendChild(style);
    }

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
}

var css = "/* add css styles here (optional) */\n\n.styles_ReactSwipeButton__2WML2 {\n  float: left;\n  width: 100%;\n  height: 50px;\n  position: relative;\n}\n.styles_ReactSwipeButton__2WML2,\n.styles_ReactSwipeButton__2WML2 * {\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none;   /* Chrome/Safari/Opera */\n  -khtml-user-select: none;    /* Konqueror */\n  -moz-user-select: none;      /* Firefox */\n  -ms-user-select: none;       /* Internet Explorer/Edge */\n  user-select: none;           /* Non-prefixed version, currently\n                                  not supported by any browser */\n}\n.styles_rsbContainer__KXpXK{\n  float: left;\n  width: 100%;\n  height: 100%;\n  background: #eee;\n  border-radius: 50px;\n  position: relative;\n  /* box-shadow: inset 1px 1px 4px rgba(0,0,0,0.1); */\n  overflow: hidden;\n}\n.styles_rsbContainerUnlocked__1T0vd{\n  transition: 0.5s;\n  cursor: default;\n}\n.styles_rsbContainerUnlocked__1T0vd .styles_rsbcSlider__1yYxD{\n  left: 100%!important;\n  cursor: default;\n  pointer-events: none;\n}\n.styles_rsbContainerUnlocked__1T0vd .styles_rsbcSliderArrow__2D9q4 {\n  transition: 0.5s;\n  margin-right: -60px;\n}\n.styles_rsbContainerUnlocked__1T0vd .styles_rsbcSliderCircle__3G0Zs {\n  transition: 0.5s;\n  margin-right: -60px;\n}\n.styles_rsbcSlider__1yYxD {\n  float: left;\n  width: 100%;\n  position: absolute;\n  height: 50px;\n  top:0;\n  left: 50px;\n  margin-left:-100%;\n  background: #333;\n  border-radius: 25px;\n  z-index: 100;\n  /* box-shadow: 1px 1px 5px rgba(0,0,0,0.3); */\n  cursor: pointer;\n}\n.styles_rsbcSliderText__3h08j{\n  position: absolute;\n  top:0;\n  left:0;\n  right:0;\n  line-height: 50px;\n  text-align: center;\n  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;\n  letter-spacing: 2px;\n  color: #fff;\n  font-size: 13px;\n\n}\n.styles_rsbcSliderArrow__2D9q4{\n  float: left;\n  position: absolute;\n  transform: rotate(45deg);\n  height: 8px;\n  width: 8px;\n  top:11%;\n  right: 18px;\n  margin-top: -6px;\n  border-left-color: transparent;\n  border-bottom-color: transparent;\n  transform-origin: center;\n  z-index: 10;\n}\n.styles_rsbcSliderCircle__3G0Zs {\n  position: absolute;\n  right: 0;\n  background: #444;\n  top:0;\n  height: 50px;\n  width: 50px;\n  border-radius: 100%;\n}\n.styles_rsbcText__16wA0 {\n  float: left;\n  position: absolute;\n  top:0;\n  left:0;\n  right:0;\n  height: 50px;\n  line-height: 50px;\n  text-align: center;\n  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;\n  letter-spacing: 2px;\n  font-size: 13px;\n  color: #aaa;\n}";
var styles = { "ReactSwipeButton": "styles_ReactSwipeButton__2WML2", "rsbContainer": "styles_rsbContainer__KXpXK", "rsbContainerUnlocked": "styles_rsbContainerUnlocked__1T0vd", "rsbcSlider": "styles_rsbcSlider__1yYxD", "rsbcSliderArrow": "styles_rsbcSliderArrow__2D9q4", "rsbcSliderCircle": "styles_rsbcSliderCircle__3G0Zs", "rsbcSliderText": "styles_rsbcSliderText__3h08j", "rsbcText": "styles_rsbcText__16wA0" };
styleInject(css);

var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
};

var createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var slider = React.createRef();
var container = React.createRef();
var isTouchDevice = 'ontouchstart' in document.documentElement;

var ReactSwipeButton = function (_Component) {
    inherits(ReactSwipeButton, _Component);

    function ReactSwipeButton() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, ReactSwipeButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ReactSwipeButton.__proto__ || Object.getPrototypeOf(ReactSwipeButton)).call.apply(_ref, [this].concat(args))), _this), _this.isDragging = false, _this.sliderLeft = 0, _this.state = {}, _this.onDrag = function (e) {
            if (_this.unmounted || _this.state.unlocked) return;
            if (_this.isDragging) {
                if (isTouchDevice) {
                    _this.sliderLeft = Math.min(Math.max(0, e.touches[0].clientX - _this.startX), _this.containerWidth);
                } else {
                    _this.sliderLeft = Math.min(Math.max(0, e.clientX - _this.startX), _this.containerWidth);
                }
                _this.updateSliderStyle();
            }
        }, _this.updateSliderStyle = function () {
            if (_this.unmounted || _this.state.unlocked) return;
            // slider.current.style.left = _this.sliderLeft + 50 + 'px';
        }, _this.stopDrag = function () {
            _this.setState({
                unlocked: _this.props.unlocked
            });
            if (_this.unmounted || _this.state.unlocked) return;
            if (_this.isDragging) {
                _this.isDragging = false;
                if (_this.sliderLeft > _this.containerWidth * 0.9) {
                    _this.sliderLeft = _this.containerWidth;
                    _this.onSuccess();
                    if (_this.props.onSuccess) {
                        _this.props.onSuccess();
                    }
                } else {
                    _this.sliderLeft = 0;
                    if (_this.props.onFailure) {
                        _this.props.onFailure();
                    }
                }
                _this.updateSliderStyle();
            }
        }, _this.startDrag = function (e) {
            if (_this.unmounted || _this.state.unlocked) return;
            _this.isDragging = true;
            if (isTouchDevice) {
                _this.startX = e.touches ? e.touches[0].clientX : null;
            } else {
                _this.startX = e.clientX;
            }


        }, _this.onSuccess = function () {
            if(container.current && container.current.style){
                container.current.style.width = container.current.clientWidth + 'px';
            }
            _this.setState({
                unlocked: true
            });

            if(_this.props.balance > 0 && _this.props.balance >= _this.props.betAmount && _this.props.token){

            }

        }, _this.getText = function () {
            return _this.state.unlocked ? _this.props.text_unlocked || 'UNLOCKED' : _this.props.text || 'SLIDE';
        }, _this.getIcon = function(){
            return !_this.state.unlocked ? (<i className="fa fa-futbol-o" aria-hidden="true"></i>) : null
        }, _this.reset = function () {
            if (_this.unmounted) return;
            _this.setState({ unlocked: false }, function () {
                _this.sliderLeft = 0;
                _this.updateSliderStyle();
            });
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(ReactSwipeButton, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (isTouchDevice) {
                document.addEventListener('touchmove', this.onDrag);
                document.addEventListener('touchend', this.stopDrag);
            } else {
                document.addEventListener('mousemove', this.onDrag);
                document.addEventListener('mouseup', this.stopDrag);
            }
            this.containerWidth = container.current.clientWidth - 50;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unmounted = true;
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: styles.ReactSwipeButton },
                this.props.key,
                React.createElement(
                    'div',
                    { className: styles.rsbContainer + ' ' + (this.state.unlocked ? styles.rsbContainerUnlocked : ''), ref: container },
                    React.createElement(
                        'div',
                        { className: styles.rsbcSlider,
                            ref: slider,
                            onMouseDown: this.startDrag,
                            style: { background: this.props.color },
                            onTouchStart: this.startDrag },
                        React.createElement(
                            'span',
                            { className: styles.rsbcSliderText },
                            this.getText()
                        ),
                        React.createElement('span',
                            { className: styles.rsbcSliderArrow},

                            this.getIcon()
                        ),
                        React.createElement('span', { className: styles.rsbcSliderCircle, style: { background: this.props.color } })
                    ),
                    React.createElement(

                        'div',
                        { className: styles.rsbcText },
                        this.getText()
                    )
                )
            );
        }
    }]);
    return ReactSwipeButton;
}(Component);

export default ReactSwipeButton;
//# sourceMappingURL=index.es.js.map
