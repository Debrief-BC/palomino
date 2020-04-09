import Vue from 'vue'
import Vuex from 'vuex'

import user from "./modules/user"
import session from "./modules/session"

Vue.use(Vuex)

const getters = {
    isLogin: state => !(!state.user.privateKey),
    isRegister: state => state.user.nickname,
    isSigned: state => state.user.signed
};

export default new Vuex.Store({
    modules: {
        user,
        session
    },
    getters
})