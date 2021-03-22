import axios from 'axios'
import { baseServerUrl } from '../constants/urls'

export async function getItems (context) {
  try {
    const { data } = await axios.get(baseServerUrl)

    context.commit('setItemList', data)
  } catch (error) {
    console.log(error)
  }
}

export async function getItem (context, itemId) {
  try {
    const { data } = await axios.get(`${baseServerUrl}${itemId}`)

    context.commit('setItem', data)
  } catch (error) {
    console.log(error)
  }
}

export async function getCart (context) {
  try {
    const { data } = await axios.get(`${baseServerUrl}shoppingcart`)
    context.commit('setCart', data)
    context.commit('setCartSize', data)
  } catch (error) {
    console.log(error)
  }
}

export async function increaseItemInCart (context, { item, quantity }) {
  console.log('item', item)
  console.log('quantity', quantity)
  try {
    const { data } = await axios.patch(`${baseServerUrl}shoppingcart`, { item, quantity })
    console.log(data)

    context.commit('updateItem', data)
  } catch (error) {
    console.log(error)
  }
}
