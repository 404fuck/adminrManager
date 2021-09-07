import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import store from '../store'
import zh from '../assets/i18n/zh'
import en from '../assets/i18n/en'
import elezh from 'element-ui/lib/locale/lang/zh-CN'
import eleen from 'element-ui/lib/locale/lang/en'
Vue.use(VueI18n)

// 以下为语言包单独设置的场景，单独设置时语言包需单独引入
const messages = {
    'zh_CN': Object.assign(zh, elezh), // 中文语言包
    'en_US': Object.assign(en, eleen) // 英文语言包
}

const i18n = new VueI18n({
    locale: store.getters.language, // set locale
    messages: messages, // set locale messages
})

Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
})

// // 最后 export default，这一步肯定要写的。
export default (i18n)