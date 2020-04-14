const Debrief = require("../../debrief");
const HashAvataaars = require("hash-avataaars");

const state = {
    address: false,
    privateKey: false,
    publicKey: false,
    nickname: false,
    avatar: false,
    signed: false,
}

const getters = {
}



const actions = {
    login({ commit, dispatch }, data) {
        data.address = data.address.toLowerCase();
        commit('LOGIN', data)
        return dispatch("update")
    },
    sign({ commit }) {
        commit('SIGN')
    },
    update({ dispatch, commit, state }) {
        return Debrief.getUserInfo(state.address).then(userInfo => {
            if (userInfo) {
                commit('SET_NICKNAME', userInfo.Nickname);
                commit('SET_AVATAR', HashAvataaars(userInfo.PublicKey));
                return dispatch("session/updateSessionList", {}, { root: true }).then(() => {
                    return true;
                })
            }
            return false;
        });
    }
}

const mutations = {
    LOGIN(state, data) {
        state.address = data.address;
        state.privateKey = data.privateKey;
        state.publicKey = data.publicKey;
    },
    SIGN(state) {
        state.signed = true;
    },
    SET_NICKNAME(state, nickname) {
        state.nickname = nickname;
    },
    SET_AVATAR(state, avatar) {
        state.avatar = avatar;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}