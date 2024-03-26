import axios from "axios";

const serviceAxios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // 基础请求地址
    timeout: 10000, // 请求超时设置
    withCredentials: true, // 跨域请求是否需要携带 cookie
  });

  serviceAxios.interceptors.response.use(
    (response) => {
      // 如果响应返回正常，则直接返回数据
      return response;
    },
    (error) => {
      // 如果响应返回错误
      if (error.response && error.response.status === 401) {
        // 如果是401状态码，则重定向到'/'
        location.href = "/"
      }
      return Promise.reject(error);
    }
  );

export default serviceAxios