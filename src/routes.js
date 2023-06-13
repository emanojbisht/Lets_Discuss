import { createRouter, createWebHistory } from "vue-router";
import MainPage from "./pages/MainPage";
import AboutUs from "./pages/AboutUs.vue";
import CheckThread from "./pages/CheckThread.vue";
import ThreadPlay from "./pages/ThreadPlay.vue";
import store from "./store";
const ContactUs = () => import("./pages/ContactUs.vue");
const TheLogin = () => import("./pages/TheLogin.vue");
const TheRegister = () => import("./pages/TheRegister.vue");
const NotFound = () => import("./pages/NotFound.vue");
const StartThread = () => import("./pages/StartThread.vue");
const TheHome = () => import("./pages/TheHome.vue");
const MyThreads = () => import("./pages/MyThreads.vue");
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: MainPage, meta: { requireAuth: true } },
    { path: "/login", component: TheLogin, meta: { requireAuth: true } },
    {
      path: "/register",
      component: TheRegister,
      meta: { requireAuth: true },
    },
    {
      path: "/contactus",
      component: ContactUs,
    },
    // {
    //   path: "/profile",
    //   component: TheProfile,
    //   meta: { requireUnAuth: true },
    // },
    {
      path: "/home",
      component: TheHome,
      meta: { requireUnAuth: true },
    },
    {
      path: "/aboutus",
      component: AboutUs,
    },
    {
      path: "/thread",
      component: StartThread,
      meta: { requireUnAuth: true },
    },
    {
      path: "/mythreads",
      component: MyThreads,
      meta: { requireUnAuth: true },
    },
    {
      path: "/threadPlay",
      component: ThreadPlay,
    },
    {
      path: "/home/:threadId",
      component: CheckThread,
      props: true,
    },
    {
      path: "/:notFound(.*)",
      component: NotFound,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

//routing guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["userIsAuthenticated"];
  if (to.meta.requireAuth) {
    //true
    if (isAuthenticated) {
      //true
      next("/home");
    } else {
      //false
      next();
    }
  } else if (to.meta.requireUnAuth) {
    //true
    if (!isAuthenticated) {
      // true -> false
      next("/login");
    } else {
      //false -> true
      next();
    }
  } else {
    next();
  }
});

export default router;
