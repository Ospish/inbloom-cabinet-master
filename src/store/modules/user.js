// The main module of site, handling the most of functions

import axios from 'axios'
import router from '../../router.js'
const API_SERVER = 'https://api.inbloomshop.ru/public'
//const API_SERVER = 'http://localhost:8001'

function JSCloseAll () {
  document.getElementsByClassName('requestion-wrap').forEach(function(element) {
    element.classList.remove('opened')
  })
}


// CONTENT
var photo = ''
export default {
  state: {
    user: {
      isLoggedIn: false,
      id: null,
      email: null,
      key: false,
      role: 0,
      info: [],
      socials: [],
      photo: null
    },
    stats: {},
    products: [],
    categories: ["Руза", "Щакура", "Гертензия", "Горбера", "Гуоргин", "Пяон", "Хрюзантема", "Гвоздика"],
    stocks: [],
    history: [
      /*
      {
        date: '11.04.18',
        name: 'Продажа лида',
        status: 'Принят',
        item: 'Розы'
      },
      {
        date: '11.04.18',
        name: 'Закупка',
        status: 'Рассматривается',
        item: 'Ромашки'
      }
      */
    ],
    requests: [],     //  id: 0, code: '', date: '', name: '', type: '', value: 0, phone: '', posInfo: { size: '', flowers: '', colors: '', boxColor: '' }, congrats: '', photo: ''
    basket: [],
    partners: [{ photo: '', name: '', city: '', vk: '', instagram: '', telegram: '', whatsapp: '' }],
    content: [{ photo: '' }],
    app: {
      shopType: 0,
      isEdited: null,
      apiKey: 'AKL1Zl0BAAAAJy3IWgIAUCwv2cL8il9GhLu_tJ0n4ZmkKtgAAAAAAAAAAAB8Gmpha5mGNCpyMl23SB6DZwb6GQ==',
      // apiKey: 'AIzaSyDXHslmOlqcpGyr9SVYvXv2ku6zAU29p-E',
      basketCount: 0,
      basketSum: 0,
      isLoaded: 0,
      noPhoto: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACNCAIAAADq/gXMAAAAA3NCSVQICAjb4U/gAAAFWklEQVR4nO3d61MTVwDG4ZPdhGxIbC4grToVRCkXMzCMtjqIdNRSpo6Obf/QjtO7DqUVixesAlG5WCiEi1YCSSTJkmTZ3X7Ysd1CRERY8jrv8yksZ89Z9sduFr7EZZqmoPIm7fUB0Ou5U6nUXh8DvYZbCOELvLfXh0GvtJpd4e0OACMBYCQAjASAkQAwEgBGAsBIABgJACMBYCQAjASAkQAwEgBGAsBIABgJACMBYCQAjASAkQAwEgBGAsBIABgJACMBYCQAjASAkQAwEgBGAsBIABgJACMBYCQAjASAkQAwEgBGAsBIABgJACMBYCQAjASAkQAwEgBGAsBIABgJACMBYCQAjASAkQAwEgBGAsBIABgJACMBYCQAjASAkQAwEoB3JNJSIrH4/PleH8VucSiSmst9d/UbXdftGwfv3Jp8MrEj8y8tJRKLjkbSNK33+s8vXqQdWOsduZKc92RivLp6fzAYcmAttwNrbIVhGKOPHi7Mzwkhat7/INra5vF4fvj2qmEY9mGXv/x6475qLpfNZEzTWFVVX2Wlfc6x0ccLc7OapoXCkWhrazAYSiaXB/pv2Hevqt7f0Xm25OB1Cw3c7K+pqWlobNJ1fS4+c6rjzI79/Jsql0gT42Oqmus6d0GSpEex4djw0ImPP7l4+YoQ4vHDmGma0da2jXsVi8WRofvpdFqWZdM0f+//LRyJtLWf8Hg8QojxsdHU8nJHZ5dXUWbjM3dvDZzv7olEqi5d+UoI0f9rX0Nj44GDh6ypSg52u/93fmRZkt1uIcTy0pIsy+FwZLdPi8XRSNd+/N7+pWEYkUiV9WJ6avLchW6fzyeE+Kip+UbfL4ZhSJIkhHC5XKZpulyujRPGhockSb7Q3fNkYlxfW2s+Hn3wx+Cj2Ej7iZPWnB1nuwL79gkhjh5r+PvZs9n4TP3RY7apXNbrTQbblzvd0Wm9SKWSoXB4Z0/OJhyNdPbTc9Z5t4wMP7BerKqqrut9vdftgwv5vP3etZGmac+eLpz/7PN/55Qkqbkl2td7PdraVsjnDcOw37KCoVA2kyk5lZrLbX2wdcA+32bHtrMcjVTp98uy/N/aL28m1gcS91y8tO72sjlVzVlz2jf6AwGXy6WquY1XXokr8SXDNNZt2WSwEELX1xSfb+uH+pbK4umu0u+XJCmVTL7RXl6vIoQoFov2jZqmmabp9Sp+f0CWZfsjcjqd9gcCJad6o8FCCFl2r2naGx3t2yiLSJIk1R9reBgbTi4vaZq2svJifm72tXspihIKhedn4/aNs/GZYDCkKIosy7VH6h/HYtlMRtO0qck/s5mVw7V1Jafa4uB7d2//NTUphPAqSj6/ur0fdhvK5emusalZCHH/3mChUPAqyqvO5jqt7e2Dd25nMplCIW8YxsjQg8Ti85OnTlvfbTkeHR8bvT1ws1gshsKRUx1nrKe+krYyuJAvGLouhAiHI+t+OXaVK5lMQn9ic7FYfLowH5+eFkLU1dcfOHiooqJitxfVNK332k+nz3Q68BS+ml0plytp2yoqKuqO1OeyWSFEbd0RZxb1eDwfHq6NT08786dSWbwnIWpsbkkkFp353x38lbRXPB5Pd88XzqwF/570zlvNrvB2B4CRADASAEYCwEgAGAkAIwFgJACMBICRADASAEYCwEgAGAkAIwFgJACMBICRADASAEYCwEgAGAkAIwFgJACMBICRADASAEYCwEgAGAkAIwFgJACMBICRADASAEYCwEgAGAkAIwFgJACMBICRADASAEYCwEgAGAkAIwFgJACMBICRADASAEYCwEgAGAkAIwFgJACMBICRADASgH8A4wDbCRoU9yoAAAAASUVORK5CYII='    },
      apiServer: 'https://api.inbloomshop.ru/public'
      },

  // getters
  getters: {
    isLoggedIn (state) { return state.user.isLoggedIn },
    apiServer (state) { return state.app.apiServer },
    basketCount (state) { return state.app.basketCount },
    basketSum (state) { return state.app.basketSum },
    basketInfo (state) { return state.basket },
    userInfo (state) { return state.user.info },
    userPhoto (state) { return state.user.photo },
    userSocials (state) { return state.user.socials },
    userId (state) { return state.user.id },
    userRole (state) { return state.user.role },
    userStats (state) { return state.stats },
    historyInfo (state) { return state.history },
    isAdmin (state) { return parseInt(state.user.role) < 2 },
    requestInfo (state) { return state.requests },
    shopInfo (state) { return state.products[1] },
    stockInfo (state) { return state.products[0] },
    productsInfo (state) { return state.products },
    contentInfo (state) { return state.content },
    categoriesInfo (state) { return state.categories },
    partnersInfo (state) { return state.partners },
    shopType (state) { return state.app.shopType },
    isEdited (state) { return state.app.isEdited },
    isLoaded (state) { return state.app.isLoaded },
    noPhoto (state) { return state.app.noPhoto },
  },
  // mutations
  mutations: {
    basketCount (state, count) {
      state.app.basketCount = state.app.basketCount++
      //console.log('state.app.basketCount: ' + state.app.basketCount)
    },
    basketSum (state, sum) {
      state.app.basketSum = sum
    },
    basketFlush (state) {
      state.basket = []
      state.app.basketSum = 0
      state.app.basketCount = 0
      state.products[0].forEach(function (item) {
        item.quantity = 0
      })
      state.products[1].forEach(function (item) {
        item.quantity = 0
      })
    },
    basketPull (state, item) {
      let index = state.basket.findIndex(product => product.id === item.id)
      if (item.quantity == 1) {
        state.basket[index].quantity--
        state.basket.splice(index, 1)
      } else {
        state.basket[index].quantity--
      }
      state.app.basketSum -= item.price
      if (state.app.basketCount > 0) --state.app.basketCount
      console.log('state.app.basketCount: ' + state.app.basketCount)
    },
    basketPush (state, item) {
      let index = state.basket.findIndex(product => product.id === item.id)
      if (index != -1) {
        state.basket[index].quantity++
      } else {item.quantity = 1; state.basket.push(item)}
      state.app.basketSum += item.price
      state.app.basketCount++
      console.log('state.app.basketCount: ' + state.app.basketCount)
    },
    updateStatus (state, status) {
      if (status === undefined) status = state.user.isLoggedIn
      state.user.isLoggedIn = status
      //console.log('state.user.isLogin UPDATED: ' + state.user.isLogin)
    },
    updateRole (state, role) {
      state.user.role = role;
      //console.log('state.user.role UPDATED: ' + state.user.role)
    },
    updateKey (state, key) {
      state.user.key = key;
      //console.log('state.user.key UPDATED: ' + state.user.key)
    },
    updateId (state, id) {
      state.user.id = id;
      //console.log('state.user.id UPDATED: ' + state.user.id)
    },
    updateEmail (state, email) {
      //state.user.email = email;
      //console.log('state.user.email UPDATED: ' + state.user.email)
    },
    updateInfo (state, info) {
      state.user.info = info;
      //console.log('state.user.info UPDATED');
      //console.log(state.user.info)
    },
    updateUserPhoto (state, photo) {
      state.user.info.photo = photo;
      console.log('state.user.info.photo UPDATED');
      console.log(state.user.info.photo)
    },
    updateShopPhoto (state, [ id, photo ]) {
      let type
      if (id < 500) {
        type = 1
      }
      else {
        type = 0
      }
      let index = state.products[type].findIndex(product => product.id == id)
      if (typeof state.products[type][index] == 'undefined') {console.log(index + 'NOT FOUND');}
      else {
        state.products[type][index].photo = photo;
       // console.log('state.products.photo UPDATED: ' + index);
        //console.log(state.products[type][index].photo)
      }
      state.app.isLoaded++
    },
    updateContentPhoto (state, [ id, photo ]) {
      let index = state.content.findIndex(content => content.id == id)
      if (typeof state.content[index] == 'undefined') {console.log('NOT FOUND')}
      else {
        state.content[index].photo = photo;
        //console.log('state.content[index].photo UPDATED');
        //console.log(photo.substring(0, 32))
      }
      state.app.isLoaded++
    },
    updatePartnersPhoto (state, [ id, photo ]) {
      let index = state.partners.findIndex(partners => partners.id == id)
      if (typeof state.partners[index] == 'undefined') {}
      else state.partners[index].photo = photo;
      //console.log('state.partners[index].photo UPDATED');
      //console.log(photo.substring(0, 32))
      state.app.isLoaded++
    },
    updateCategories (state, categories) {
      state.categories = categories;
      //console.log('state.user.info.coords UPDATED ');
      //console.log(state.user.info.coords)
    },
    updateCoords (state, coords) {
      state.user.info.coords = coords;
      //console.log('state.user.info.coords UPDATED ');
      //console.log(state.user.info.coords)
    },
    updateProducts (state, products) {
      state.products = products;
      //console.log('state.products UPDATED');
      //console.log(state.products)
    },
    updateRequests (state, requests) {
      state.requests = requests;
      //console.log('state.requests UPDATED');
      //console.log(state.requests)
    },
    updateRequest (state, [request, id]) {
      state.request[id] = request;
      //console.log('request UPDATED');
      //console.log(state.requests)
    },
    updateStats (state, stats) {
      state.stats = stats;
      //console.log('state.stats UPDATED');
      //console.log(state.stats)
    },
    addStatsRecord (state, record) {
      state.stats.day.values.push(record.value)
      state.stats.day.count++
      //console.log('state.stats UPDATED');
      //console.log(state.stats)
    },
    updateHistory (state, history) {
      state.history = history;
      //console.log('state.history UPDATED');
      //console.log(state.history)
    },
    pullStocks (state, [id, quantity]) {
      let index = state.products[0].findIndex(product => product.id === id)
      state.products[0][index][state.user.id] = state.products[0][index][state.user.id] - quantity
      //console.log('Stocksindex: ' + index)
      //console.log('Stocks>>')
      //console.log(state.stocks)
    },
    pushStocks (state, [id, quantity]) {
      let index = state.products[0].findIndex(product => product.id === id)
      state.products[0][index][state.user.id] = state.products[0][index][state.user.id] + quantity;
      console.log('Stocks UPDATED');
      console.log(state.products[0][index][state.user.id])
    },
    updatePartners (state, partners) {
      state.partners = partners;
      console.log('state.partners UPDATED')
      console.log(state.partners)
    },
    updateContent (state, content) {
      state.content = content;
      console.log('state.content UPDATED')
      console.log(state.content)
    },
    getSocialsFromDB (state, socials) {
      state.user.socials.ids = socials[0][0]
      state.user.socials.active = socials[1][0]
    },
    updateSocials (state, socials) {
      state.user.socials = socials
      console.log('state.user.socials UPDATED')
      console.log(state.user.socials)
    },
    updateSocialsActive (state, [id, value]) {
      state.user.socials.active[id] = value
      console.log('state.user.socials UPDATED')
      console.log(state.user.socials.active)
    },
    addRequest (state, request) {
      state.requests.push(request)
    },
    addProduct (state, [product, type]) {
      state.products[type].push(product)
    },
    addCategory (state, category) {
      state.categories.push(category)
    },
    addSubCategory (state, subcategory) {
      state.categories[subcategory.id].subs.push(subcategory)
    },
    deleteCategory (state, category) {
      let index = state.categories.findIndex(categories => categories.id === category.id)
      state.categories.splice(index, 1)
      console.log('state.categories: ')
      console.log(state.categories)
    },
    deleteSubCategory (state, subcategory) {
      let index = state.requests.findIndex(subcategories => subcategories.id === subcategory.id)
      state.categories[subcategory.parent].subs.splice(index, 1)
      console.log('state.subcategories: ')
      console.log(state.categories[subcategory.parent].subs)
    },
    deleteProduct (state, id) {
      let index = state.products[state.app.shopType].findIndex(product => product.id === id)
      state.products[state.app.shopType].splice(index, 1)
      console.log('state.products UPDATED')
      console.log(state.products)
    },

    deletePartner (state, id) {
      let index = state.partners.findIndex(partners => partners.id === id)
      state.partners.splice(index, 1)
      console.log('state.partners: ')
      console.log(state.partners)
    },
    deleteRequest (state, id) {
      let index = state.requests.findIndex(requests => requests.id === id)
      state.requests.splice(index, 1)
      console.log('state.requests: ')
      console.log(state.requests)
    },
    deleteContent (state, id) {
      let index = state.content.findIndex(content => content.id === id)
      state.content.splice(index, 1)
      console.log('state.products UPDATED')
    },
    changeStore (state, shopType) {
      state.app.shopType = shopType
      //console.log('state.app.shopType: ' + state.app.shopType)
    },
    openEditor (state, id) {
      // mutate state
      if (state.app.isEdited == id) {
        state.app.isEdited = null
        state.app.isEdited = id
      }
      else state.app.isEdited = id
      //console.log('state.app.isEdited: ' + state.app.isEdited)
    },
    editProductM (state, info) {
      let type
      if (info.id < 500) { type = 1 }
      else { type = 0 }
      let index = state.products[type].findIndex(products => products.id == info.id)
      console.log(index)
      //console.log(info.id)
      state.products[type][parseInt(index)] = info
      console.log(state.products[type][parseInt(index)])
    },
    isLoaded (state, info) {
      state.app.isLoaded++
      console.log('IS LOADED')
    }
  },


  // actions

  actions: {
    isAdmin (ctx) {
      return parseInt(ctx.state.role) < 2
    },
    reg (ctx, email, password, invite) {
      email = document.getElementsByName('email')[0].value
      password = document.getElementsByName('pass')[0].value
      invite = document.getElementsByName('invite')[0].value
      axios
        .post(API_SERVER + '/api/user/register', {
          email: email,
          password: password,
          invite: invite
        })
        .then(function (response) {
          //ctx.commit('updateStatus', true)
          //router.push('/home')
          console.log(response.data)
          setTimeout(function () {
            ctx.dispatch('login')
          }, 250)

        })
        .catch(function (error) {
          console.error(error)
        })

    },
    login (ctx, id, email, password) {
      if (typeof document.getElementsByName('email')[0] != 'undefined') {email = document.getElementsByName('email')[0].value}
      if (typeof document.getElementsByName('pass')[0] != 'undefined') {password = document.getElementsByName('pass')[0].value}
      //console.log('Action: auth')
      //console.log(ctx + id + email + password)
      axios
        .post(API_SERVER + '/api/user/login', {
          email: email,
          password: password,
          id: id
        })
        .then(function (response) {
          ctx.commit('updateStatus', true)
          console.log('Login RESPONSE')
          console.log(response.data.data)
          if (response.data) {
            let token = response.data.data.api_token
            let role = response.data.data.role
            localStorage.setItem('id', response.data.data.id)
            localStorage.setItem('token', token)
            localStorage.setItem('role', role)
            ctx.commit('updateId', response.data.data.id)
            ctx.commit('updateKey', token)
            ctx.commit('updateRole', role)
            ctx.dispatch('getInfo', response.data.data.id)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            if (id) router.push('/home/profile/password')
            else router.push('/home')
          }
        })
        .catch(function (error) {
          console.log(error)
          alert('Ошибка')
        })
    },
    checkAuth (ctx, id, key, role) {
      id = localStorage.getItem('id')
      key = localStorage.getItem('token')
      role = localStorage.getItem('role')
      console.log('Action: checkAuth, ID: ' + id)
      axios
        .get(API_SERVER + '/api/user/checkAuth/' + id)
        .then(function (response) {
          if (key == response.data[0].api_token) console.log('API Keys handshake SUCCESS')
          else console.log('API Keys handshake FAILURE')
          if (response.data[0].api_token == key) {
            ctx.commit('updateStatus', true)
            ctx.commit('updateRole', role)
            ctx.commit('updateId', id)
            if (ctx.state.user.info == "") {ctx.dispatch('getInfo', id)}
            router.push('/home')
          }
        })
        .catch(function (error) {
          console.log(error)
          ctx.commit('updateStatus', false)
        })
      // ctx.commit('updateStatus')
    },
    logOut (ctx) {
      ctx.commit('updateStatus', false)
      ctx.state.key = ''
      localStorage.removeItem('token')
    },

    changePwd (ctx, pwd) {
      console.log('Action: setInfo: ' + ctx.state.user.id)
      axios
        .post(API_SERVER + '/api/user/changePwd/' + ctx.state.user.id, {
          password: pwd
        })
        .then(response => (console.log(response)))
        .catch(function (error) {
          console.log(error)
        })
    },

    setInfo (ctx) {
      console.log('Action: setInfo: ' + ctx.state.user.id)
      let info = ctx.state.user.info
      if (info.phone != '') info.phone = info.phone.replace(/\D+/g, "");
      axios
        .post(API_SERVER + '/api/user/info/' + ctx.state.user.id, info)
        .then(response => (console.log(response)))
        .catch(function (error) {
          console.log(error)
        })
    },

    getInfo (ctx, id) {
      var photo = null
        axios
          .get(API_SERVER + '/api/file/one/profile/' + id)
          .then(function (response) {
            photo = response.data
            //console.log(photo)
          })
          .catch(function (error) { console.log(error) })
        axios
          .get(API_SERVER + '/api/user/info/' + id)
          .then(function (response) {
            console.log('UserInfo LOADED')
            console.log(response.data[0])
            response.data[0].photo = photo
            ctx.commit('updateInfo', response.data[0])
            if ((response.data[0].coords == '' || response.data[0].coords == null) && response.data[0].city != 'null') ctx.dispatch('getCoords')
          })
          .catch(function (error) {
            console.log(error)
          })
      ctx.dispatch('getSocials', id)
      if (ctx.state.user.role < 2 ) ctx.dispatch('getRequests')
      else ctx.dispatch('getUserRequests')
      ctx.dispatch('loadStats')
      ctx.dispatch('loadHistory')
      ctx.dispatch('loadProducts')
      ctx.dispatch('loadContent')
      ctx.dispatch('loadPartners')
      ctx.dispatch('loadCategories')
    },
    async getCoords (ctx) {
      let info = ctx.state.user.info
      if (info.street == null || typeof info.street == 'undefined') info.street = ''
      if (info.building == null || typeof info.building == 'undefined') info.street = ''
      let request = 'https://geocode-maps.yandex.ru/1.x/?format=json&apikey=51dd1116-29b8-4a97-ac52-d4d1197d0d80&geocode=' + info.city + ', ' + info.street + ', ' + info.building
      axios
        .get(request)
        .then(function (response) {
          console.log(response.data)
          let point = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
          console.log('Coords LOADED')
          console.log(point)
          ctx.commit('updateCoords', point)
          ctx.dispatch('setInfo')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    loadStats (ctx) {
      axios
        .get(API_SERVER + '/api/user/stats/' + ctx.state.user.id)
        .then(function (response) {
          //console.log('Stats LOADED')
          //console.log(response.data)
          if (response.data != "") {
            let stats = []; stats.day = {}; stats.month = {}; stats.year = {}
            stats.day.values = response.data[0][0]
            stats.day.count = response.data[0][1]
            stats.day.midval = response.data[0][2]
            stats.day.sum = response.data[0][3]
            stats.day.time = response.data[0][4]
            stats.month.values = response.data[1][0]
            stats.month.count = response.data[1][1]
            stats.month.midval = response.data[1][2]
            stats.month.sum = response.data[1][3]
            stats.month.days = response.data[1][4]
            stats.year.values = response.data[2][0]
            stats.year.count = response.data[2][1]
            stats.year.midval = response.data[2][2]
            stats.year.sum = response.data[2][3]
            stats.year.months = response.data[2][4]

            ctx.commit('updateStats', stats)
          }
          console.log(ctx.state.stats)
        })
        .catch(function (error) {
          console.log(error)
        })
    },


    // HISTORY

    loadHistory (ctx) {
      if (ctx.state.history == "") {
        axios
          .get(API_SERVER + '/api/user/history/' + ctx.state.user.id)
          .then(function (response) {
            let history = response.data
            /*
            for (let x; x < response.data.length; x++) {
              history[x].name = 'Заявка'
            }*/
            ctx.commit('updateHistory', history)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },


    // SOCIALS

    getSocials (ctx) {
      let id = ctx.state.user.id
      axios
        .get(API_SERVER + '/api/user/socials/' + id)
        .then(function (response) {
          ctx.commit('getSocialsFromDB', response.data)
          console.log('Action: getSocials: ' + id)
          console.log(ctx.state.user.socials)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    setSocials (ctx, socials) {
      let id = ctx.state.user.id
      let active = []
      //console.log('Action: setSocials: ')
      //console.log(Object.keys(socials.active))
      Object.keys(socials.active).forEach(function (item) {
        if (socials.active[item] == true) {socials.active[item] = 1}
        else {socials.active[item] = 0}
      })
      axios
        .post(API_SERVER + '/api/user/socials/' + id, socials)
        .then(function (response) {
          console.log(response)
            ctx.commit('updateSocials', socials)
          })
        .catch(function (error) {
          console.log(error)
        })
    },

    // PARTNERS

    loadPartners (ctx) {
      //console.log('Action: loadPartners')
      axios
        .get(API_SERVER + '/api/user/partners')
        .then(function (response) {
          console.log(response.data)
          ctx.commit('updatePartners', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
      axios
        .get(API_SERVER + '/api/file/profile/shown')
        .then(function (response) {
          photo = response.data
          console.log('Partners Photo LOADED: ' + photo.length)
          //console.log(response.data)
          photo.forEach(function(element) {
            ctx.commit('updatePartnersPhoto', [ element.id, element.value ])
          })
        })
        .catch(function (error) { console.log(error) })

    },
    deletePartner (ctx, info) {
      console.log('Action: deletePartner')
      axios
        .delete(API_SERVER + '/api/user/partner/' + info.id + '/' + info.email)
        .then(function (response) {
          console.log(response.data)
          ctx.commit('deletePartner', info.id)
        })
        .catch(function (error) {
          console.log(error)
        })
    },


    // CONTENT
    loadContent (ctx) {
      console.log('Action: loadContent')
      axios
        .get(API_SERVER + '/api/content')
        .then(function (response) {
          console.log('Content LOADED')
          console.log(response.data)
          ctx.commit('updateContent', response.data)
        })
        .catch(function (error) { console.log(error) })
      axios
        .get(API_SERVER + '/api/file/all/content')
        .then(function (response) {
          //console.log('Content Photo LOADED')
          //console.log(response.data)
          photo = response.data
          photo.forEach(function(element) {
            ctx.commit('updateContentPhoto', [ element.id, element.value ])
          })
        })
        .catch(function (error) { console.log(error) })


    },
    addContent(ctx, content) {
      //console.log('Action: addContent')
      axios
        .post(API_SERVER + '/api/content', content)
        .then(function (response) {
          console.log(response.data)
          //ctx.commit('addContent', content)
        })
        .catch(function (error) {
          console.log(error)
        })
      },
    editContent(ctx, content) {
      //console.log('Action: editContent')
      axios
        .post(API_SERVER + '/api/content/' + content.id, content)
        .then(function (response) {
          console.log(response.data)
          //ctx.commit('addContent', content)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteContent (ctx, content) {
      //console.log('Action: deleteContent')
      axios
        .delete(API_SERVER + '/api/content/' + content.id)
        .then(function (response) {
          console.log(content.id)
          ctx.commit('deleteContent', content.id)
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    loadCategories (ctx) {
      axios
        .get(API_SERVER + '/api/store/categories')
        .then(function (response) {
          //console.log('getRequests RESPONSE')
          //console.log(response)
          ctx.commit('updateCategories', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    addCategory (ctx, category) {
      axios
        .post(API_SERVER + '/api/store/categories/0', {id: category.id, name: category.name})
        .then(function (response) {
          //console.log('getRequests RESPONSE')
          //console.log(response)
          ctx.commit('addCategory', category)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    editCategory (ctx, subcategory) {
      axios
        .put(API_SERVER + '/api/store/categories/0', {id: subcategory.id, name: subcategory.name})
        .then(function (response) {
          //console.log('getRequests RESPONSE')
          //console.log(response)
          //ctx.commit('editCategory', subcategory)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    addSubCategory (ctx, subcategory) {
      axios
        .post(API_SERVER + '/api/store/categories/1', {id: subcategory.id, name: subcategory.name})
        .then(function (response) {
          //console.log('getRequests RESPONSE')
          //console.log(response)
          ctx.commit('addSubCategory', subcategory)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    editSubCategory (ctx, subcategory) {
      axios
        .put(API_SERVER + '/api/store/categories/1', {id: subcategory.id, name: subcategory.name})
        .then(function (response) {
          //console.log('getRequests RESPONSE')
          //console.log(response)
          //ctx.commit('addSubCategory', subcategory)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteCategory (ctx, category) {
      axios
        .delete(API_SERVER + '/api/store/categories/' + category.id)
        .then(function (response) {
          //console.log('getRequests RESPONSE')
          //console.log(response)
          ctx.commit('deleteCategory', category)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteSubCategory (ctx, subcategory) {
      axios
        .delete(API_SERVER + '/api/store/categories/' + subcategory.id + '/' + subcategory.parent)
        .then(function (response) {
          //console.log('getRequests RESPONSE')
          //console.log(response)
          ctx.commit('deleteSubCategory', subcategory)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // REQUESTS

    getRequests (ctx) {
      axios
        .get(API_SERVER + '/api/requests')
        .then(function (response) {
          //console.log('getRequests RESPONSE')
          //console.log(response)
          ctx.commit('updateRequests', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getUserRequests (ctx) {
      axios
        .get(API_SERVER + '/api/requests/' + ctx.state.user.id)
        .then(function(response) {
          //console.log('getUserRequests RESPONSE')
          //console.log(response)
          ctx.commit('updateRequests', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    addRequest (ctx, request) {
      request.userid = ctx.state.user.id
      request.posInfo_email = ctx.state.user.info.corp_email
      request.phone = ctx.state.user.info.phone
      request.city = ctx.state.user.info.city
      request.posInfo_name = ctx.state.user.info.name
      request.type = 2
      axios
        .post(API_SERVER + '/api/requests', request)
        .then(function(response) {
          console.log('addRequest RESPONSE')
          console.log(response.data)
          ctx.commit('updateRequests', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
      console.log(ctx.state.user.email)
      axios
        .post(API_SERVER + '/api/user/notify', request)
        .then(function(response) {
          console.log('notify RESPONSE')
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteRequest (ctx, request) {
      //console.log('deleteRequest: ' + request.id)
      axios
        .post(API_SERVER + '/api/requests/delete', request)
        .then(function(response) {
          console.log('deleteRequest RESPONSE')
          console.log(response)
          ctx.commit('deleteRequest', request.id)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    editRequest (ctx, [request, status]) {
      //console.log('editRequest: ' + request.id)
      request.userid = ctx.state.user.id
      request.status = status
      axios
        .put(API_SERVER + '/api/request/' + request.id, request)
        .then(function(response) {
          console.log(response)

        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // PRODUCTS
    addProduct (ctx, product) {
      product.userid = ctx.state.user.id
      let type = ctx.state.app.shopType
      /*
      if (type != 0) {
        product.price_premium = product.price
        product.price_vip = product.price
      }
       */
      axios
        .post(API_SERVER + '/api/store/add/' + type, product)
        .then(function (response) {
          console.log(response)
          console.log('Action: addProduct ' + product.name + ' ' + product.price)
          ctx.commit('addProduct', [product, type])
          ctx.commit('openEditor', null)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    loadProducts (ctx) {
        var photo = null
        axios
          .get(API_SERVER + '/api/store/products/' + ctx.state.user.id  )
          .then(function (response) {
            console.log(response.data)
            axios
              .get(API_SERVER + '/api/file/all/stock')
              .then(function (response) {
                photo = response.data
                console.log('Stock Products Photo LOADED: ' + photo.length)
                //console.log(response.data)
                photo.forEach(function(element) {
                  ctx.commit('updateShopPhoto', [ element.id, element.value ])
                })
              })
              .catch(function (error) { console.log(error) })
            axios
              .get(API_SERVER + '/api/file/userproducts/store/' + ctx.state.user.id )
              .then(function (response) {
                photo = response.data
                console.log('Store Products Photo LOADED: ' + photo.length)
                //console.log(response.data)
                photo.forEach(function(element) {
                  ctx.commit('updateShopPhoto', [ element.id, element.value ])
                })

              })
              .catch(function (error) { console.log(error) })
            console.log('Action: loadProducts')
            /*
            for (let x = 0; x < response.data.length; x++) {
              axios
                .get(API_SERVER + '/api/file/profile/' + id)
                .then(function (response) { photo = response.data }).catch(function (error) { console.log(error) })
              response.data[x].posInfo = JSON.parse(response.data[x].posInfo)
            }*/
            ctx.commit('updateProducts', response.data)
          })
          .catch(function (error) {
            console.log(error)
          })

      /*
      if ((ctx.state.stocks == "") && (ctx.state.user.id != null)) {
        axios
          .get(API_SERVER + '/api/store/stock/' + ctx.state.user.id)
          .then(function (response) {
            console.log('Action: loadStock:' + ctx.state.user.id)
            console.log(response.data)
            ctx.commit('updateStocks', response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
       */
    },
    editProduct (ctx, product) {
      let type = ctx.state.app.shopType
      console.log('Action: editProduct')
      /*
      if (type != 0) {
        product.price_premium = product.price
        product.price_vip = product.price
      }
       */
      //product.posInfo = JSON.stringify(product.posInfo)
      axios
        .post(API_SERVER + '/api/store/set/' + type, product)
        .then(function (response) {
          ctx.commit('editProductM', product)
          ctx.commit('openEditor', null)
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteProduct (ctx, product) {
      console.log('Action: deleteProduct')
      axios
        .delete(API_SERVER + '/api/store/delete/'+ product.type + '/' + product.id)
        .then(function (response) {
          console.log(product.id)
          ctx.commit('deleteProduct', product.id)
          ctx.commit('openEditor', null)
        })
        .catch(function (error) {
          console.log(error)
        })

    },
    pullProductStock (ctx, product) {
      axios
        .post(API_SERVER + '/api/store/stock/-', {
          id: product.id,
          quantity: product.quantity,
          userid: ctx.state.user.id
        })
        .then(function (response) {
          console.log('Action: pullProduct')
          console.log(product.quantity)
          ctx.commit('pullStocks', [product.id, product.quantity])
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    pushProductStock (ctx, product) {
      product.userid = ctx.state.user.id
      product.value = ctx.state.app.basketSum
      axios
        .post(API_SERVER + '/api/store/stock/+', product)
        .then(function (response) {
          console.log('Action: pushProduct')
          console.log(product.quantity)
          ctx.commit('pushStocks', [product.id, product.quantity])
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    // PASSWORDS
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

    sendInvite (ctx, data) {
      console.log(data.email)
      axios
        .post(API_SERVER + '/api/user/invite', {
          email: data.email,
          type : data.partnerType
        })
        .then(response => (console.log(response)))
        .catch(function (error) {
          console.log(error)
        })
    },
    uploadImage ({ commit, state }, image) {
      let formData = new FormData()
      formData.append('file', image.file)
      formData.append('type', image.type)
      //if (typeof image.id == 'undefined') formData.append('name', Math.max(state.products[state.app.shopType].id))      else
      formData.append('name', image.id)
      console.log(image.file)
      axios.post(API_SERVER + '/api/file', formData, { headers: { 'content-type': 'multipart/form-data' } }
      ).then(function (response) {
        console.log(response.data)
      })
      .catch(function (response) {
        console.error(response.data)
      })
    },
    generateBase64(url) {
      var _this = this;
      var canvas = document.createElement('CANVAS');
      var img = document.createElement('img');
      img.src = url;
      img.onload = function () {
        canvas.height = img.height;
        canvas.width = img.width;
        _this.base64 = canvas.toDataURL('image/png');
        canvas = null;
      };
      img.onerror = function (error) {
        _this.error = 'Could not load image, please check that the file is accessible and an image!';
      };
    }
  }
}
