import { Message } from 'element-ui';
var toast = function () {
    var self = {};
    var duration = 1500;
    //判断消息提示 
    self.info = function (msg) {
        Message({
            showClose: true,
            message: msg,
            type: 'info',
            duration: duration
        })
    };

    //判断消息提示 
    self.success = function (msg) {
        Message({
            showClose: true,
            message: msg,
            type: 'success',
            duration: duration
        })
    };

    //判断消息提示 
    self.warning = function (msg) {
        Message({
            showClose: true,
            message: msg,
            type: 'warning',
            duration: duration
        })
    };

    //判断消息提示 
    self.error = function (msg) {
        Message({
            showClose: true,
            message: msg,
            type: 'error',
            duration: duration
        })
    };

    return self;
}();

export {
    toast
}