export default {
  state: {
    id: false,
    key: false, // TODO: или password (закодированный)
    info: {
      name: 'Дмитрий',
      email: 'deamon1309@gmail.com',
      surname: 'Марчук',
      patronymic: 'Викторович',
      city: 'Пинск',
      street: 'Южная',
      house: '21',
      phone: '80165305223',
      office: '8',
      termAddr: '9',
      points: 999
    },
    socials: {
      vk: '',
      instagram: '',
      twitter: '',
      facebook: '',
      ok: '',
      telegram: '',
      whatsapp: '',
    },
    isLogin: true
  },
  
  // getters
  getters: {
    isLoginned(state) {
      return state.isLogin
    },
    userInfo(state) {
      return state.info
    },
    userSocials(state) {
      return state.socials
    },
    userId(state) {
      return state.id
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
    },
    changeInfo(ctx, userInfo) { // userInfo - Новые данные, полученные из полей
      // TODO: написать функцию отправки новых данный на бэкэнд
      ctx.commit('updateInfo', userInfo)
    }
  },
  
  // mutations
  mutations: {
    updateStatus(state, status) {
      if (status === undefined) status = state.isLogin
      state.isLogin = status
    },
    updateInfo(state, newInfo) {
      state.info = newInfo
    }
  }
}
