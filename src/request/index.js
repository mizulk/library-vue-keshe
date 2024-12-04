import axios from "axios";
import { useUserStore } from "@/stores/user";
import { Toast } from "@/components/toast";
import router from "@/router";

const request = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    config.headers.token = userStore.token;
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (
    /**@type {import("axios").AxiosResponse<import("./types").Result<any>,any>}*/ response,
  ) => {
    if (response.data.code == 200) return response;
    else Toast.danger(`服务器响应出现错误：${response.data.msg}`);

    return Promise.reject(response);
  },
  (/**@type {import('axios').AxiosError} */ error) => {
    console.log(error);
    if (error.response.status == 401) {
      const userStore = useUserStore();
      if (userStore.isUserLogin) {
        Toast.warning("你的登录状态已经过期！3秒后跳转登录界面！");
        userStore.logout();
      } else {
        Toast.warning("你还没有登录！3秒后跳转登录界面！");
      }
      console.log(router);

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
    return Promise.reject(error);
  },
);

export default request;
