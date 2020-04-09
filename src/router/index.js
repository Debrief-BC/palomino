import Vue from "vue";
import Router from "vue-router";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Chat from "../pages/Chat";
import Sign from "../pages/Sign";

import store from '../store/index'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/login",
            component: Login
        },
        {
            path: "/register",
            component: Register
        },
        {
            path: "/sign",
            component: Sign
        },
        {
            path: "/chat",
            component: Chat
        },
        {
            path: "/",
            redirect: "/login"
        }
    ]
});

router.beforeEach((to, from, next) => {
    var toPath = "/login";
    if (store.getters.isLogin) {
        toPath = "/register";
    }
    if (store.getters.isRegister) {
        toPath = "/sign";
    }
    if (store.getters.isSigned) {
        toPath = "/chat";
    }
    if (to.path === toPath) {
        next();
        return;
    } else {
        next({ path: toPath })
    }
});

export default router;