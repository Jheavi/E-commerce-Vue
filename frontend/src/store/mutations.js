export function setItemList (state, items) {
  state.itemList = items
  state.productTypes = items.reduce(
    (acc, cur) => !acc.includes(cur['product-type'])
      ? [...acc, cur['product-type']]
      : acc,
    []
  )
  state.productManufacturers = items.reduce(
    (acc, cur) => !acc.includes(cur.manufacturer)
      ? [...acc, cur.manufacturer]
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

export function getItem (state, itemId) {
  state.item = state.itemList.find((item) => item.id === itemId)
}
