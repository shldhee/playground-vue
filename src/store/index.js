// Dependencies ===============

import { Auth } from 'aws-amplify'
const store = { namespaced: true }

// State ======================

store.state = {
  authorized: false,
  user: null,
  loginError: '',
  signupError: '',
  confirm: false,
  confirmError: ''
}

// Mutations ==================

store.mutations = {
  user(state, user) {
    state.authorized =
      !!user && user.attributes && user.attributes.email_verified
    state.user = user
  },
  confirm(state, showConfirm) {
    state.confirm = !!showConfirm
  }
}

// Actions ====================

store.actions = {
  async login({ dispatch, state }, { email, password }) {
    state.loginError = ''
    try {
      await Auth.signIn(email, password)
    } catch (err) {
      console.log(`Login Error [${err}]`)
      if (err) state.loginError = err.message || err
      return
    }
    await dispatch('fetchUser')
  },
  async signup({ commit, state }, { email, password }) {
    state.signupError = ''
    try {
      await Auth.signUp({
        username: email,
        email: email,
        password: password,
        attributes: {
          email: email
        },
        validationData: []
      })
      //switch email confirmation form
      commit('confirm', true)
    } catch (err) {
      console.log(`Signup Error [${err}]`)
      if (err) state.signupError = err.message || err
      commit('confirm', false)
    }
  },
  async confirm({ commit, dispatch, state }, { email, code }) {
    state.confirmError = ''
    try {
      await Auth.confirmSignUp(email, code, {
        forceAliasCreation: true
      })
    } catch (err) {
      console.log(`Confirm Error [${err}]`)
      if (err) state.confirmError = err.message || err
      return
    }
    commit('confirm', false)
  },
  async authState({ commit, dispatch }, state) {
    if (state === 'signedIn') await dispatch('fetchUser')
    else commit('user', null)
  },
  async fetchUser({ commit, dispatch }) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      const expires =
        user.getSignInUserSession().getIdToken().payload.exp -
        Math.floor(new Date().getTime() / 1000)
      console.log(`Token expires in ${expires} seconds`)
      setTimeout(async () => {
        console.log('Renewing Token')
        await dispatch('fetchUser')
      }, expires * 1000)
      commit('user', user)
    } catch (err) {
      commit('user', null)
    }
  },
  async logout({ commit }) {
    await Auth.signOut()
    commit('user', null)
  }
}

// Getters ====================

store.getters = {}

// Export =====================

export default store
