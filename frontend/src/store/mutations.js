export function setItemList (state, items) {
  state.itemList = items
  state.productTypes = items.reduce(
    (acc, currentItem) => !acc.includes(currentItem['product-type'])
      ? [...acc, currentItem['product-type']]
      : acc,
    []
  )
  state.productManufacturers = items.reduce(
    (acc, currentItem) => !acc.includes(currentItem.manufacturer)
      ? [...acc, currentItem.manufacturer]
      : acc,
    []
  )
}

export function setCheckedProductTypes (state, checkedTypes) {
  state.checkedProductTypes = checkedTypes
}

export function setCheckedProductManufacturers (state, checkedManufacturers) {
  state.checkedProductManufacturers = checkedManufacturers
}

export function setCart (state, cartList) {
  state.cartList = cartList
}

export function setCartSize (state, cartList) {
  state.cartSize = cartList.reduce((acc, current) => acc + current.quantity, 0)
  console.log(state.cartSize)
}

export function setItem (state, item) {
  state.item = item
}

export function updateItem (state, cartItem) {
  const index = state.cartList.findIndex((item) => item._id === cartItem._id)

  if (index !== -1) {
    state.cartList = state.cartList.splice(index, 1, cartItem)
  } else {
    state.cartList = [...state.cartList, cartItem]
  }
}
