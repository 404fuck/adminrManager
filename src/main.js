import Vue from 'vue'
import 'babel-polyfill';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'
import './static/css/iconfont/1.0.0/index.css' /* icofont*/
import 'lib-flexible'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment/moment'
Vue.prototype.moment = moment
import VueLazyload from 'vue-lazyload'
import echarts from 'echarts'

import "./utils/excel/Blob.js"
import "./utils/excel/Export2Excel.js"
import 'xlsx'

import locale from 'element-ui/lib/locale/lang/zh-CN'
import localeEN from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, {
  locale,
  localeEN
})

import format from 'vue-text-format';
Vue.use(format);

Vue.prototype.$echarts = echarts

//http请求
import {
  request
} from './http/apiService'
Vue.prototype.request = request
//字符工具类
import {
  stringutils
} from './utils/stringutils'
Vue.prototype.stringutils = stringutils

//上传头像工具类
import {
  uploadUtils
} from './utils/uploadUtils'
Vue.prototype.uploadUtils = uploadUtils

//上传PDF工具类
import {
  uploadPDF
} from './utils/uploadPDF'
Vue.prototype.uploadPDF = uploadPDF

import {
  toast
} from './utils/toast'
Vue.prototype.toast = toast

//日期
Vue.filter('moment', function (value, formatString) {
  if (!value) {
    return '-'
  }
  formatString = formatString || 'YYYY-MM-DD'
  return moment(value).format(formatString)
})
//日期
Vue.filter('moment_ss', function (value, formatString) {
  if (!value) {
    return '-'
  }
  formatString = formatString || 'YYYY/MM/DD  HH:mm:ss'
  return moment(value).format(formatString)
})
//价格
Vue.filter('price', function (value) {
	if (!value||Number(value<0)) {
		return '0.00'
	}
	value = Number(value).toFixed(2); //保留两位小数 四舍五入
	return value;
})
//字段
Vue.filter('empty', function (value) {
	if (!value) {
		return '-'
	}
	return value
})
Vue.config.productionTip = false
//路由拦截
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    // console.log(token)
    var token = store.getters.token


    // 验证是否需要登陆
    if (token !== '' && token !== null && token !== undefined) {
      // 查询本地存储信息是否已经登陆 sessionStorage.getItem('sid')
      next()
    } else {
      next({
        path: '/login' // 未登录则跳转至login页面
        //  query: {redirect: to.fullPath} // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
      })
    }
  } else {
    next()
  }
})

Vue.use(VueLazyload)

// Internationalization
import i18n from './utils/i18n'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')