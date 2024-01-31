import axios from "axios";

const serviceAxios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // 基础请求地址
    timeout: 10000, // 请求超时设置
    withCredentials: true, // 跨域请求是否需要携带 cookie
  });


export default serviceAxios