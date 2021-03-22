import { createStore } from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'

const state = {
  itemList: [],
  item: {},
  productTypes: [],
  checkedProductTypes: [],
  productManufacturers: [],
  checkedProductManufacturers: [],
  cartList: [],
  cartSize: 0
}

export default createStore({
  state,
  mutations,
  actions,
  modules: {
  }
})
