import http from 'axios'
import {
  toast
} from '../utils/toast'
import store from '../store'
import {
  Header
} from 'element-ui';
import {
  stringutils
} from '../utils/stringutils'
import router from '../router'

//dev

//导入axios组件
var base_url = stringutils.getBaseUrl()

console.log(base_url)

var axios = http.create({
  baseUrl: base_url,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-REQUESTED-WITH': 'xmlhttprequest',
    'Request-App': 'web',
    'lang': store.getters.language
  },
  transformRequest: [function (data) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    var token = store.getters.token
    if (token !== null && token !== "" && typeof (token) !== "undefined") {
      data['token'] = token;
    }
    return JSON.stringify(data);
  }]
});

export const ajax = function (action, data, async, type, successfn, noLoading, errorFun) {

  var url = action;
  async = (async ==null || async =="" || typeof (async) == "undefined") ? true : async;
  type = (type == null || type == "" || typeof (type) == "undefined") ? "post" : type;
  data = (data == null || data == "" || typeof (data) == "undefined") ? {
    "date": new Date().getTime()
  } : data;

  //使用get 方法的时候将参数拼入url中
  if (type == 'get') {
    for (let i in data) {
      if (url.indexOf("?") != -1) {
        url += '&' + i + '=' + data[i]
      } else {
        url += '?' + i + '=' + data[i]
      }

    }
  }

  // 发送 ajax 请求
  axios({
      method: (type == null || type == "" || typeof (type) == "undefined") ? "post" : type, // default,
      url: base_url + url,
      data: data
    }).then(function (info) {

      // Toast.clear();
      let res = info.data;

      if (res.code == '-107' || res.code == '-5' || res.code == '401') {
        // toast.fail('')
        store.dispatch('setToken', null)
        router.push({
          name: "login",
        });
        return
      }

      var token = res.token
      if (token !== null && token !== "" && typeof (token) !== "undefined") {
        //token不为空将token存储起来;
        //toast.error('token不为空将token存储起来')
        store.dispatch('setToken', token)
      }
      successfn(res);
    })
    .catch(function (e) {
      // Toast.clear();
      // Dialog.alert({
      //   title: '提示',
      //   message: '网络超时'
      // }).then(() => {
      // });
      // toast.error('网络异常：' + e)
      successfn({
        code: '500',
        msg: e,
      });
      window.console.log(e);
    });
}



//google map
var axiosMap = http.create({
  baseUrl: "https://maps.googleapis.com/maps/api/place/queryautocomplete/output=json?parameters",
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-REQUESTED-WITH': 'xmlhttprequest',
    'Request-App': 'web',
    'lang': store.getters.language
  },
  transformRequest: [function (data) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    var token = store.getters.token
    data['key'] = "AIzaSyAr4LR7t5RuMCB125gZahnC4-1wgg9w2_c";
    return JSON.stringify(data);
  }]
});

export const ajaxMap = function (action, data, async, type, successfn, noLoading, errorFun) {
  var url = action;
  async = (async ==null || async =="" || typeof (async) == "undefined") ? true : async;
  type = (type == null || type == "" || typeof (type) == "undefined") ? "post" : type;
  data = (data == null || data == "" || typeof (data) == "undefined") ? {
    "date": new Date().getTime()
  } : data;

  //使用get 方法的时候将参数拼入url中
  if (type == 'get') {
    for (let i in data) {
      if (url.indexOf("?") != -1) {
        url += '&' + i + '=' + data[i]
      } else {
        url += '?' + i + '=' + data[i]
      }
    }
  }

  // 发送 ajax 请求
  axiosMap({
      method: (type == null || type == "" || typeof (type) == "undefined") ? "post" : type, // default,
      url: base_url + url,
      data: data
    }).then(function (info) {

      // Toast.clear();
      let res = info.data;

      successfn(res);
    })
    .catch(function (e) {
      successfn({
        code: '500',
        msg: e,
      });
      window.console.log(e);
    });
}