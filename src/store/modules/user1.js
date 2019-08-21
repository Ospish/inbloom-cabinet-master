import axios from 'axios'
import router from '../../router.js'
import { fillTable } from '@/components/profile/PersonalData.vue'
const API_SERVER = 'http://192.168.0.100/landings/inbloom_laravel/ibapi/public'

export default {
  name: 'Main',
  state: {
    id: 0,
    key: localStorage.getItem('token'), // TODO: или password (закодированный)
    info: {
      name: '1',
      email: '2',
      surname: '3',
      patronymic: '4',
      city: '5',
      street: '6',
      house: '7',
      phone: '8',
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
    isLogin: false
  },

  // getters
  getters: {
    isLoginned(state) {
      console.log(state.info.surname);
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
    },
  },
  data: {
  },
  // actions
  actions: {
    login (ctx, dispatch, email, password) {
      email = document.getElementsByName('email')[0].value;
      password = document.getElementsByName('pass')[0].value;
      console.log('Action: auth');
      axios
        .post(API_SERVER + '/api/user/login', {
          email: email,
          password: password
        })
        .then(function (response) {
          console.log(response.data.data);
          if (response.data) {
            let token = response.data.data.api_token;
            ctx.commit('updateStatus', true);
            localStorage.setItem('token', token);
            localStorage.setItem('user', response.data.data.email);
            localStorage.setItem('id', response.data.data.id);
            ctx.commit('updateId', response.data.data.id);
            ctx.commit('updateKey', token);
            ctx.dispatch('getInfo', localStorage.getItem('id'));
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            router.push('/home');
          }
        })
        .catch(function (error) {
          console.log(error);
          alert('Ошибка')
        })
    },
    checkAuth(ctx, id, key) {
      id = localStorage.getItem('id');
      key = localStorage.getItem('token');
      console.log('Action: checkAuth');
      axios
        .get(API_SERVER + '/api/user/checkAuth/' + id)
        .then(function (response) {
          console.log('app_token: ' + key);
          console.log('api_token: ' + response.data[0].api_token);
          if (response.data[0].api_token === key) {
            ctx.commit('updateStatus', true)
            router.push('/home');
          }
        })
        .catch(function (error) {
          console.log(error);
          ctx.commit('updateStatus', false)
        })
      //ctx.commit('updateStatus')
    },
    logOut(ctx) {
      ctx.commit('updateStatus', false);
      localStorage.removeItem('token');
    },
    setInfo (id) {
      id = localStorage.getItem('id');
      console.log('Action: setInfo: ' + id);
      axios
        .post(API_SERVER + '/api/user/info/' + id, {
          id: id,
          name: document.getElementsByName('name')[0].value,
          surname: document.getElementsByName('surname')[0].value,
          patronymic: document.getElementsByName('patronymic')[0].value,
          corp_email: document.getElementsByName('email')[0].value,
          city: document.getElementsByName('city')[0].value,
          street: document.getElementsByName('street')[0].value,
          building: document.getElementsByName('house')[0].value,
          phone: document.getElementsByName('phone')[0].value,
          terminal: document.getElementsByName('termAddr')[0].value
        })
        .then(response => (console.log(response)))
        .catch(function (error) {
          console.log(error)
        })
    },
    getInfo (ctx, id) {
      console.log('Action: getInfo: ' + id);
      axios
        .get(API_SERVER + '/api/user/info/' + id)
        .then(function (response) {
          console.log(response.data[0]);
          ctx.commit('updateInfo', response.data[0]);
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    /*
    getRequest (id) {
      id = 1
      console.log('Action: getRequest: ' + id)
      axios
        .get(API_SERVER + '/api/user/info/' + id)
        .then(response => (console.log(response)))
        .catch(function (error) {
          console.log(error)
        })
    },
    setRequest (id) {
      id = 1
      console.log('Action: setRequest: ' + id)
      axios
        .get(API_SERVER + '/api/user/info/' + id)
        .then(response => (console.log(response)))
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteRequest (id) {
      id = 1
      console.log('getInfo: ' + id)
      axios
        .get(API_SERVER + '/api/user/info/' + id)
        .then(response => (console.log(response)))
        .catch(function (error) {
          console.log(error)
        })
    },
    */
    getSocials (id) {
      id = localStorage.getItem('id');
      console.log('Action: getInfo: ' + id);
      axios
        .get(API_SERVER + '/api/user/socials/' + id)
        .then(function (response) {
          console.log(userInfo);
          fillTable(response.data[0]);
          return(response.data[0])
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    setSocials (id) {
      id = localStorage.getItem('id');
      console.log('Action: setInfo: ' + id);
      axios
        .post(API_SERVER + '/api/user/socials/' + id, {
          id: id,
          name: document.getElementsByName('name')[0].value,
          surname: document.getElementsByName('surname')[0].value,
          patronymic: document.getElementsByName('patronymic')[0].value,
          corp_email: document.getElementsByName('email')[0].value,
          city: document.getElementsByName('city')[0].value,
          street: document.getElementsByName('street')[0].value,
          building: document.getElementsByName('house')[0].value,
          phone: document.getElementsByName('phone')[0].value,
          terminal: document.getElementsByName('termAddr')[0].value
        })
        .then(response => (console.log(response)))
        .catch(function (error) {
          console.log(error)
        })
    },
    restorePass (email) {
      email = document.getElementsByName('email')[0].value
      console.log('resetPassword: ' + email)
      axios
        .post(API_SERVER + '/api/password/email', {
          email: email
        })
        .then(response => (console.log(response)))
        .catch(function (error) {
          console.log(error)
        })
    },
    reg (email, password) {
      email = document.getElementsByName('email')[0].value
      password = document.getElementsByName('pass')[0].value
      console.log('reg')
      axios
        .post(API_SERVER + '/api/user/register', {
          email: email,
          password: password
        })
        .then(response => (console.log(response)))
        .catch(function (error) {
          console.log(error)
        })
      console.log(email + ' ' + password)
      router.push('/auth');
    }
  },

  // mutations
  mutations: {
    updateStatus(state, status) {
      if (status === undefined) status = state.isLogin;
      state.isLogin = status;
      console.log('state.isLogin: ' + state.isLogin)
    },
    updateKey(state, key) {
      state.key = key;
      console.log('state.key: ' + state.key)
    },
    updateId(state, id) {
      state.id = id;
      console.log('state.id: ' + state.id);
    },
    updateInfo(state, info) {
      state.name = info.name;
      state.email = info.email;
      state.surname = info.surname;
      state.patronymic = info.patronymic;
      state.city = info.city;
      state.street = info.street;
      state.house = info.house;
      state.phone = info.phone;
      state.office = info.office;
      state.termAddr = info.termAddr;
      state.points = info.points;
      console.log('state.surname: ' + state.surname)
    }
  }
}
