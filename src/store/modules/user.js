const state = {
  id: false,
  key: false, // TODO: или password (закодированный)
  info: {
    name: '',
    email: ''
    // TODO: добавить необходимые поля
  }
}

// getters
const getters = {

}

// actions
const actions = {
  auth (user) {
    // TODO: написать функцию авторизации (отправка на API user.email & user.password)
    return true
  },
  checkAuth ({ commit }) {
    // TODO: написать функцию проверки авторизован пользователь или нет (отправка на API id & key)
    const auth = (true === false)
    return auth
  },
  getInfo (id) {
    // TODO: написать функцию получение информации о пользователе по id (отправка на API id)
    const userInfo = {
      name: 'Name',
      email: 'mail@mail.ru'
    }
    return userInfo
  }
}

// mutations
const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
