import {
    toast
} from '@/utils/toast'
import store from '../store'
var stringutils = function () {
    var self = {};

    //判断字符串是否为空
    self.isEmpty = function (data) {
        return data == null || data == undefined || data == '';
    };
    self.isNotEmpty = function (data) {
        return !self.isEmpty(data);
    };
    //判断是否为手机号
    self.isMobileNumber = function (phone) {

        var flag = false;
        var message = "";
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
        if (phone == '') {
            // console.log("手机号码不能为空");
            message = "手机号码不能为空！";
        } else if (phone.length != 11) {
            //console.log("请输入11位手机号码！");
            message = "请输入11位手机号码！";
        } else if (!myreg.test(phone)) {
            //console.log("请输入有效的手机号码！");
            message = "请输入有效的手机号码！";
        } else {
            flag = true;
        }
        if (message != "") {
            toast.warning(message);
        }
        return flag;

    };
    self.getJsonLength = function (json) {
        var jsonLength = 0;
        if (json.length === 0 || json === null) {
            return 0;
        }
        for (var i in json) {
            jsonLength++;
        }
        return jsonLength;
    }

    //深复制对象方法     
    self.simpleCopy = function (obj) {
        var _obj = JSON.stringify(obj),
            objClone = JSON.parse(_obj);
        return objClone;
    }

    //数组种插入数组的方法
    self.insert = function (arrfirst, arrlast, index) {
        if (index < 0) {
            index = 0;
        } else if (index > arrfirst.length) {
            index = arrfirst.length;
        }
        for (var i = arrlast.length - 1; i >= 0; i--) {
            arrfirst.splice(index, 0, arrlast[i]); //是在index位置用arrlast[i]替换掉arrfirst数组中的0个元素
        }
        return arrfirst;
    }

    self.getBaseUrl = function () {
        var base_url = ''
        switch (process.env.NODE_ENV) {
            case 'development':
                base_url = "http://www.shule666.com:18083" //这里是本地的请求url
                break
            case 'alpha': // 注意这里的名字要和步骤二中设置的环境名字对应起来  http://149.129.72.29:8091
                base_url = "http://www.shule666.com:18083" //这里是测试环境中的url
                break
            case 'production': //http://www.shule666.com:18083
                base_url = "http://www.shule666.com:18083" //生产环境url
                break
        }
        return base_url;
    }

    self.clearData = function () {
        store.dispatch('setToken', null)
    }
    

    //获取时间段包含的星期
    self.getWeeksFromDate = function (date) {
        let arr = date
        let beginDateObj = new Date(arr[0]);
        let endDateObj = new Date(arr[1]);
        var weeksArr = [];
        while (beginDateObj <= endDateObj) { //直到结束日期，跳出循环
            if (weeksArr.indexOf(beginDateObj.getDay()) == -1) { //数组中不存在，则push到数组中
                let weekNum = beginDateObj.getDay();
                weeksArr.push(weekNum);
            }
            beginDateObj.setTime(beginDateObj.getTime() + 24 * 60 * 60 * 1000); //每次递增1天
        }
        var titleArr = [];
        for (var i in weeksArr) {
            if (weeksArr[i] == 0) {
                titleArr.push('星期日')
            } else if (weeksArr[i] == 1) {
                titleArr.push('星期一')
            } else if (weeksArr[i] == 2) {
                titleArr.push('星期二')
            } else if (weeksArr[i] == 3) {
                titleArr.push('星期三')
            } else if (weeksArr[i] == 4) {
                titleArr.push('星期四')
            } else if (weeksArr[i] == 5) {
                titleArr.push('星期五')
            } else if (weeksArr[i] == 6) {
                titleArr.push('星期六')
            }
        }
        return titleArr;
    }

    self.formatPrice = function (value) {
        if (!value) {
            return '0.00'
        }
        value = Math.round(parseFloat(value) * 100) / 100;
        var xsd = value.toString().split(".");
        if (xsd.length == 1) {
            value = value.toString() + ".00";
            return value;
        }
        if (xsd.length > 1) {
            if (xsd[1].length < 2) {
                value = value.toString() + "0";
            }
            return value;
        }
        return value;
    }

    self.formatEmpty = function (date) {
        if (date.length > 0) {
            return date;
        }
        return '无'
    }

    self.arrRemove = function (arr, delVal) {
        if (arr instanceof Array) {
            var index = arr.indexOf(delVal);
            if (index > -1) {
                arr.splice(index, 1);
            }
        }
    }
    self.checkUrl = function (url) {
        var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        if (!reg.test(url)) {
            return false
        } else {
            return true
        }
    }

    self.en_US = function () {
        return 'en_US'
    };
    self.ms_MY = function () {
        return 'ms_MY'
    };
    self.zh_CN = function () {
        return 'zh_CN'
    };

    return self;
}();

export {
    stringutils
}