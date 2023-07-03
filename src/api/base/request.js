import axios from 'axios';
import store from '@/store';
import { MessageBox, Message } from 'element-ui';
import { Loading } from 'element-ui';
import { toEncrypt, toDecrypt, md5, random } from './aes';
import { k1, i1, merge } from './secret1';

const baseEncrypt = false;

// if(window.sessionStorage.getItem('CommonCryptoFlag') && Number(window.sessionStorage.getItem('CommonCryptoFlag')) === 1){
//   baseEncrypt = true

// }else{
//   baseEncrypt = false
// }
// create an axios instance
const axiosService = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
});

const [key, iv] = merge('k2', 'i2');

const sign = function () {
  const time = new Date().getTime();
  const randomStr = random(6);
  return [time, randomStr, md5(time + randomStr + 'Ie89igOtoSK4FeijWsQu7If3z93KtFCm')];
};

// request interceptor
axiosService.interceptors.request.use(
  config => {
    // do something before request is sent
    // console.log(JSON.parse(localStorage.getItem("settings")).local, "+++++",)

    if (store.getters.token) {
      //  config.headers["Authorization"] = getToken();
      // console.log(store.state.CLEAR_USER, "+++++", localStorage.getItem("setting"))
      // 获取token
      config.headers['Authorization'] = store.getters.token;
    }
    if (localStorage.getItem('settings')) {
      config.headers['Accept-Language'] = JSON.parse(localStorage.getItem('settings')).local;
    }
    // if (store.getters.local) {
    //   //  config.headers["Authorization"] = getToken();
    //   // console.log(store.state.CLEAR_USER, "+++++", localStorage.getItem("setting"))
    //   // 获取token
    //   config.headers["Accept-Language"] = store.getters.local;

    // }
    // console.log(store.getters.local)
    // 加密
    if (baseEncrypt && config.data) {
      config.data = {
        data: toEncrypt(JSON.stringify(config.data), key, iv)
      };
    }
    // 签名
    const [st, sr, ss] = sign();
    config.headers['st'] = st;
    config.headers['sr'] = sr;
    config.headers['ss'] = ss;
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
axiosService.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    // 解密
    // if (baseEncrypt && res.data) {
    //   res = JSON.parse(toDecrypt(res.data, key, iv));
    // }
    // if the custom code is not 20000, it is judged as an error.
    if (res.code >= 200 && res.code < 300) {
      return response.data;
    } else {
      // Message({
      //   showClose: true,
      //   message: 'response error：' + res.message || 'Error',
      //   type: 'error',
      //   duration: 3 * 1000
      // });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/clearUser').then(() => {
            location.reload();
          });
        });
      }
      // token过期，重返登录界面
      if (res.code === 401) {
        window.localStorage.clear();
        window.location.reload();
      }

      return Promise.reject(res);
    }
  },
  error => {
    Message({
      showClose: true,
      message: 'Network request failed：' + error || 'Error',
      type: 'error',
      duration: 4 * 1000
    });
    return Promise.reject(error);
  }
);

// 返回数据转换
axiosService.defaults.transformResponse.push((data, headers) => {
  // 处理返回的data
  let res = data;
  // 解密
  if (baseEncrypt && data.data) {
    res = JSON.parse(toDecrypt(data.data, key, iv));
  }
  return res;
});
// 发送 POST 请求
export const post = function (url, needToken = true, encrypt = true, loadding = '加载中...') {
  return params => {
    let loaddingSevice;

    if (loadding) {
      loaddingSevice = Loading.service({ text: loadding });
    }

    let userToken = '';
    if (needToken) {
      userToken = store.getters.token;
    }

    // console.log("[REQUEST]", url, params);

    return new Promise(function (resolve, reject) {
      axiosService({
        url,
        method: 'post',
        data: params,
        headers: {
          Authorization: userToken,
          'Content-Type': 'application/json',
          platform: 'WEB',
          version: '1.0.0'
        }
      })
        .then(res => {
          if (loadding) {
            loaddingSevice.close();
          }

          console.log('[RESPONSE]', url, res);
          resolve(res);
        })
        .catch(err => {
          if (loadding) {
            loaddingSevice.close();
          }

          if (err.response && err.response.status === 401) {
            localStorage.clear();
            window.location.href = '/';
          } else {
            reject(err);
          }
        });
    });
  };
};

export default axiosService;
