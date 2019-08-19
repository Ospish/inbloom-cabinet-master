export default {
  state: {
    id: false,
    key: false, // TODO: или password (закодированный)
    info: {
      name: '',
      email: ''
      // TODO: добавить необходимые поля
    },
    isLogin: true
  },
  
  // getters
  getters: {
    isLoginned(state) {
      return state.isLogin
    }
  },
  
  // actions
  actions: {
    auth (user) {
      // TODO: написать функцию авторизации (отправка на API user.email & user.password)
      return true
    },
    checkAuth(ctx) {
      // TODO: написать функцию проверки авторизован пользователь или нет (отправка на API id & key)
      ctx.commit('updateStatus')
    },
    logOut(ctx) {
      const auth = false
      ctx.commit('updateStatus', auth)
    },
    getInfo (id) {
      // TODO: написать функцию получение информации о пользователе по id (отправка на API id)
      const userInfo = {
        name: 'Name',
        email: 'mail@mail.ru'
      }
      return userInfo
    }
  },
  
  // mutations
  mutations: {
    updateStatus(state, status) {
      if (status === undefined) status = state.isLogin
      state.isLogin = status
    }
  }
}
