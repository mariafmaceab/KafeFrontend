import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home.vue";
import Admin from "./components/Admin.vue";
import Cart from "./components/Cart.vue";

const routes = [
  {
    path: "/",
    name: "root",
    component: App,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
