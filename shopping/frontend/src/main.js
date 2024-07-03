import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store/index.js";
import App from "./App.vue";
import User from "./components/ShopUser.vue";
import Cart from "./components/ShopCart.vue";
import Liked from "./components/ShopLiked.vue";
import Men from "./components/MensProducts.vue";
import Women from "./components/WomensProducts.vue";
import Modal from "./components/ShopModal.vue";
import jQuery from "jquery";
import axios from "axios";

window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Men },
  { path: "/cart", component: Cart },
  { path: "/liked", component: Liked },
  { path: "/user", component: User },
  { path: "/women", component: Women },
  { path: "/modal", component: Modal },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // 페이지 간 이동 시 Vuex 상태를 초기화하지 않도록 설정
  next();
});

export default router;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
