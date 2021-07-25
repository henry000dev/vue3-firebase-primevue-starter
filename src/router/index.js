import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import LogIn from "../views/LogIn.vue";
import SignUp from "../views/SignUp.vue";
import ResetPassword from "../views/ResetPassword.vue";
import Main from "../views/Main.vue";
import firebase from "../firebase/firebase";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/resetPassword",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
    meta: {
      // A flag indicating this page requires user logged in first.
      requiresAuth: true,
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/**
 * Put some route-guards for some routes, for example some of them are only
 * accessible if user is logged in.
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.getUser()) {
      next({
        name: "LogIn",
        query: {
          redirect: to.fullPath,
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
