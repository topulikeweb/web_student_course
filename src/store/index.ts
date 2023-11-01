/* eslint-disable */
import {createStore} from 'vuex'

export default createStore({
  state: {
    UserName: '',
    Token: ''
  },
  getters: {},
  mutations: {
    setUserName(state) {
      localStorage.setItem('UserName', JSON.stringify(state.UserName))
    },
    getUserName(state) {
      JSON.parse(localStorage.getItem('UserName') || "[]")
    },
    updateUserName(state, UserName) {
      state.UserName = UserName
      // eslint-disable-next-line
      // @ts-ignore
      this.commit('setUserName')
    },
    setToken(state) {
      localStorage.setItem('Token', JSON.stringify(state.Token))
    },
    getToken() {
      JSON.parse(localStorage.getItem('Token') || '')
    },
    updateToken(state, Token) {
      state.Token = Token
      // @ts-ignore
      this.commit('setToken')
    }
  },
  actions: {},
  modules: {}
})
