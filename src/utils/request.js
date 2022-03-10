import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import store from '@/store'

// 每次请求携带cookies信息
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

export function getDomainUrl() {
    return 'http://124.223.171.21:8080'
}

// create an axios instance
const service = axios.create({

  // baseURL:'https://api.guisu.fun:6001/api/',
  baseURL: getDomainUrl() + '/api',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000, // request timeout
  //withCredentials: true
  async:true,
  crossDomain:true,

})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        if (localStorage.getItem('Authorization')) {
            config.headers.Token = localStorage.getItem('Authorization');
        }
        config.headers = {
            'Content-Type': 'application/json'
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)


service.interceptors.response.use(
    response => {
        console.log("response:", response);
        // if the custom code is not 200, it is judged as an error.
        if (response.status != 200) {

            //判断token是否失效
            if (response.status == 400) {
                //清除当前token信息
                store.commit('delLogin');
                //打开登录界面
                startLogin()
                //前往首页
                //this.$router.replace('/');

                Message({
                    message: '您尚未登录，请先登录',
                    type: 'error',
                    duration: 5 * 1000
                })


                return Promise.reject(new Error('您尚未登录' || 'Error'))
            }

            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return response
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default service
