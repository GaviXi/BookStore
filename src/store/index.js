import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// });
import user from './modules/user.js'
import cart from './modules/cart.js'
import path from './modules/path.js'
import order from './modules/order.js'
export default new Vuex.Store({
  modules:{
	  user,
    cart,
    path,
    order
  }
});