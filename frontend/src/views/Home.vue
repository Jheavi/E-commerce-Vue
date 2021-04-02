<template>
  <div class="home">
    <FilterAside />
    <div class="list-container">
      <ul class="item-list">
        <ItemListDetail
          v-for="item in itemList"
          :key="item"
          :item="item"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ItemListDetail from '@/components/ItemListDetail.vue'
import FilterAside from '@/components/FilterAside.vue'

export default {
  name: 'Home',
  components: {
    FilterAside,
    ItemListDetail
  },
  setup () {
    const store = useStore()
    const checkedTypes = computed(() => store.state.checkedProductTypes)
    const checkedManufacturers = computed(() => store.state.checkedProductManufacturers)
    const itemList = computed(() => checkedTypes.value.length && checkedManufacturers.value.length
      ? store.state.itemList.filter((item) => (
        checkedTypes.value.includes(item['product-type']) &&
        checkedManufacturers.value.includes(item.manufacturer)
      ))
      : checkedTypes.value.length
        ? store.state.itemList.filter((item) => (
          checkedTypes.value.includes(item['product-type'])
        ))
        : checkedManufacturers.value.length
          ? store.state.itemList.filter((item) => (
            checkedManufacturers.value.includes(item.manufacturer)
          ))
          : store.state.itemList
    )

    const getItems = () => store.dispatch('getItems')

    const setCheckedProductTypes = (types) => store.commit('setCheckedProductTypes', types)
    const setCheckedProductManufacturers = (manufacturers) => store.commit('setCheckedProductManufacturers', manufacturers)

    const clearFilter = () => {
      setCheckedProductTypes([])
      setCheckedProductManufacturers([])
    }

    onMounted(() => {
      getItems()
      clearFilter()
    })

    return {
      itemList
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;
}

.list-container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex: 7;
  margin: 0 auto;
}

.item-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
