import Vue from 'vue'
import axios from 'axios'

// 设置基地址
axios.defaults.baseURL = 'http://localhost:3000/api/'

// 拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (wx.getStorageSync('token')) {
      config.headers.Authorization = wx.getStorageSync('token')
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 适配器
axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '拼命加载中...', // 提示的内容,
      mask: true // 显示透明蒙层，防止触摸穿透,
    })
    wx.request({
      url: config.url, // 开发者服务器接口地址",
      data: config.data || config.params, // 请求的参数",
      header: config.headers,
      method: config.method,
      dataType: 'json', // 如果设为json，会尝试对返回的数据做一次 JSON.parse
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  })
}

// 挂载到Vue的原型上
Vue.prototype.$axios = axios
