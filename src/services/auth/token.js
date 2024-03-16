import axios from "axios";
import AuthService from "services/auth/auth.service";

axios.interceptors.request.use(
  (config) => {
    const user = AuthService.getCurrentUser();
    if (user && user.accessToken) {
      const tokenExpired = AuthService.isTokenExpired(user.accessToken);
      if (tokenExpired) {
        AuthService.logout(); // Đăng xuất nếu token hết hạn
      } else {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
