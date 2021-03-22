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
