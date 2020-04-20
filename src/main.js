import Vue from 'vue'
import App from './App'

// 这里导入它，就是为了让webpack能运行它
import './api'

// 导入字体图标
import '../static/styles/fonts/iconfont.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
