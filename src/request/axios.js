import axios from 'axios'

const Axios = axios.create({
  baseURL: 'http://192.168.148.88:8080'
})

Axios.interceptors.request.use(
    config => {
      // 在发送请求之前做一些处理，比如添加请求头
      config.headers['Content-Type'] = 'application/json;charset=UTF-8';
      return config;
    },
    error => {
      // 对请求错误做处理
      return Promise.reject(error);
    }
);

export default Axios
