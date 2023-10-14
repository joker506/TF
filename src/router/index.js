import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/note/:id",
    name: "About",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about.[hash].js" */ "../views/NoteView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
