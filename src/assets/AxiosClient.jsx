// src/Additions/axiosClient.js
import axios from "axios";
import Cookies from "universal-cookie";
import { Api_link } from './Api_link';

const cookie = new Cookies();

const axiosClient = axios.create({
  baseURL: `${Api_link}`, // غيّر حسب مشروعك
});

// Interceptor للتعامل مع انتهاء صلاحية access_token
axiosClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // إذا كان التوكن منتهي وصدر خطأ 401 ولم نعيد المحاولة بعد
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh_token = cookie.get("Nazya_refresh_token");
        const res = await axios.post(`${Api_link}token/refresh`, {
          refresh_token: refresh_token,
        });

        const new_access_token = res.data.access_token;
        cookie.set("Nazya_access_token", new_access_token, { path: "/" });

        // إعادة الطلب السابق بنفس الـ access_token الجديد
        originalRequest.headers["Authorization"] = `Bearer ${new_access_token}`;
        return axiosClient(originalRequest);

      } catch (refreshError) {
        console.error("Failed To Refresh Token Please Reload And Log In", refreshError);
        // احذف التوكنات أو رجع المستخدم لتسجيل الدخول
        cookie.remove("Nazya_access_token");
        cookie.remove("Nazya_refresh_token");
        // window.location.href = "/login"; // أو كما يناسبك
      }
    }

    return Promise.reject(error);
  }
);

// Interceptor لإرسال التوكن في كل الطلبات
axiosClient.interceptors.request.use(
  config => {
    const access_token = cookie.get("Nazya_access_token");
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosClient;