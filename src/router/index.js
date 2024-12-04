import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/index",
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
    {
      path: "/404",
      name: "NotFound",
      component: import("@/views/common/NotFound.vue"),
      meta: { title: "没有这个页面喔" },
    },
    {
      path: "/login",
      name: "登录页面",
      component: import("@/views/common/LoginView.vue"),
      meta: { title: "欢迎登录" },
    },
    {
      path: "/register",
      name: "注册页面",
      component: import("@/views/common/RegisterView.vue"),
      meta: { title: "欢迎注册" },
    },
    {
      path: "/index",
      name: "首页",
      component: import("@/views/IndexView.vue"),
      meta: { title: "阅读•时光" },
    },
    {
      path: "/book/:id",
      name: "图书详细",
      component: import("@/views/BookView.vue"),
      props: true,
      meta: { title: "图书详细" },
    },
    {
      path: "/author/:id",
      name: "作者详细",
      component: import("@/views/AuthorView.vue"),
      props: true,
      meta: { title: "作者详细" },
    },
    {
      path: "/author-list",
      name: "作者列表",
      component: import("@/views/AuthorListView.vue"),
      meta: { title: "作者列表" },
    },
    {
      path: "/category",
      name: "图书分类",
      component: import("@/views/CategoryView.vue"),
      meta: { title: "图书分类" },
    },
    {
      path: "/cart",
      name: "购物车",
      component: import("@/views/CartView.vue"),
      meta: { title: "我的购物车" },
    },
    {
      path: "/search",
      name: "搜索",
      component: import("@/views/SearchView.vue"),
      meta: { hiddenSearchBar: true, title: "搜索页面" },
      children: [
        {
          path: "book",
          name: "图书搜索",
          component: import("@/views/search/Book.vue"),
          meta: { hiddenSearchBar: true, title: "图书搜索" },
        },
        {
          path: "author",
          name: "作者搜索",
          component: import("@/views/search/Author.vue"),
          meta: { hiddenSearchBar: true, title: "作者搜索" },
        },
        {
          path: "user",
          name: "用户搜索",
          component: import("@/views/search/User.vue"),
          meta: { hiddenSearchBar: true, title: "用户搜索" },
        },
      ],
    },
    {
      path: "/user/:id",
      name: "个人中心",
      component: import("@/views/UserView.vue"),
      meta: { title: "个人中心" },
      children: [
        {
          path: "collection",
          name: "我的收藏",
          component: import("@/views/user/MyCollection.vue"),
          meta: { title: "收藏" },
        },
        {
          path: "author",
          name: "关注的作者",
          component: import("@/views/user/FollowAuthor.vue"),
          meta: { title: "关注的作者" },
        },
      ],
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
