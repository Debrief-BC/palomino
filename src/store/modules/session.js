const Debrief = require("../../debrief");

const state = {
    currentSessionAddress: false,
    sessions: []
}

const getters = {
    currentSession: state => {
        return state.sessions.find(item => item.address === state.currentSessionAddress);
    }
}

const actions = {
    updateSessionList({ commit, state, rootState }) {
        return Debrief.getUsers().then(users => {
            var list = [];
            users.forEach(user => {
                if (user.Address != rootState.user.address) {
                    try {
                        var key = Debrief.ecdh(rootState.user.privateKey, user.PublicKey).toString("hex");
                        list.push({
                            address: user.Address,
                            nickname: user.Nickname,
                            key: key,
                            messages: []
                        })
                    } catch (ex) {
                        console.log(ex.message)
                    }
                }
            });
            commit('UPATE_SESSION_LIST', list)
        })
    },
    selectSession({ commit }, address) {
        let session = state.sessions.find(item => item.address === address);
        if (!session) {
            return
        }
        commit('SELECT_SESSION', address)
        var lastTime = 0;
        if (session.messages.length > 0) {
            lastTime = session.messages[session.messages.length - 1].timestamps
        }
        return {
            to: address,
            lastTime: lastTime
        }
    },
    sendMessage({ commit, state }, content) {
        var message = {
            content: content,
            to: state.currentSessionAddress,
            self: true,
            timestamps: Math.round(new Date().getTime() / 1000)
        }
        commit('UPDATE_MESSAGE', message)
        let session = state.sessions.find(item => item.address === state.currentSessionAddress);
        if (!session) {
            return;
        }
        return {
            to: state.currentSessionAddress,
            content: Debrief.encrypt(message.content, session.key)
        };
    },
    updateMessages({ commit, state, rootState }, messages) {
        messages.forEach(message => {
            var temp = {
                timestamps: message.timestamps,
                self: rootState.user.address == message.from,
            }
            var to = message.to;
            if (!temp.self) {
                to = message.from;
            }
            let session = state.sessions.find(item => item.address === to);
            if (!session) {
                return;
            }
            temp.to = to;
            temp.content = Debrief.decrypt(message.content, session.key)
            commit('UPDATE_MESSAGE', temp)
        });
    }
}

const mutations = {
    SELECT_SESSION(state, address) {
        state.currentSessionAddress = address;
    },
    UPATE_SESSION_LIST(state, list) {
        state.sessions = list;
    },
    UPDATE_MESSAGE({ sessions }, message) {
        let session = sessions.find(item => item.address === message.to);
        if (!session) {
            return;
        }
        delete message.to;
        session.messages.push(message);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}