Component({
    options: {
        addGlobalClass: true
    },
    properties: {
        extClass: {
            type: String,
            value: ''
        },
        show: {
            type: Boolean,
            value: true,
            observer: function observer(newValue) {
                this._computedStyle(newValue, this.data.animated);
            }
        },
        animated: {
            type: Boolean,
            value: false,
            observer: function observer(newValue) {
                this._computedStyle(this.data.show, newValue);
            }
        },
        duration: {
            type: Number,
            value: 350
        },
        type: {
            type: String,
            value: 'dot-gray'
        },
        tips: {
            type: String,
            value: '加载中'
        }
    },
    data: {
        animationData: {},
        animationInstance: {},
        displayStyle: 'none'
    },
    methods: {
        _computedStyle: function _computedStyle(show, animated) {
            if (!show) {
                if (!animated) {
                    this.setData({
                        displayStyle: 'none'
                    });
                } else {
                    this._startAnimation();
                }
            } else {
                this.setData({
                    displayStyle: ''
                });
            }
        },
        _startAnimation: function _startAnimation() {
            var _this = this;

            setTimeout(function () {
                var data = _this.data;
                var animation = data.animationInstance;
                animation.height(0).step();
                _this.setData({
                    animationData: animation.export()
                });
            }, 0);
        }
    },
    lifetimes: {
        attached: function attached() {
            var data = this.data;
            var animationInstance = wx.createAnimation({
                duration: data.duration,
                timingFunction: 'ease'
            });
            this.setData({ animationInstance: animationInstance });
            this._computedStyle(this.data.show, this.data.animated);
        }
    }
});
