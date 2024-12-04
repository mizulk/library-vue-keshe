import router from ".";
import { useUserStore } from "@/stores/user";

router.beforeEach((to, from) => {
  const userStore = useUserStore();
  if ((to.path == "/user" || to.path == "/cart") && !userStore.isUserLogin)
    return { path: "/login" };
  document.title = to.meta.title;
});
