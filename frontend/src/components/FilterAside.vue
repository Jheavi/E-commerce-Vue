<template>
  <aside>
    <h4>Filter By Type</h4>
    <ul>
      <div
        v-for="productType in productTypes"
        :key="productType"
        class="product-type"
      >
        <input
          :id="productType"
          v-model="checkedTypes"
          :value="productType"
          type="checkbox"
        >
        <label :for="productType">{{ productType }}</label>
      </div>
    </ul>
    <h4>Filter by manufacturer</h4>
    <ul>
      <div
        v-for="manufacturer in productManufacturers"
        :key="manufacturer"
        class="product-type"
      >
        <input
          :id="manufacturer"
          v-model="checkedManufacturers"
          :value="manufacturer"
          type="checkbox"
        >
        <label :for="manufacturer">{{ manufacturer }}</label>
      </div>
    </ul>
    <button
      class="clear-filter"
      @click="clearFilter"
    >
      Clear filter
    </button>
  </aside>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    const productTypes = computed(() => store.state.productTypes)
    const productManufacturers = computed(() => store.state.productManufacturers)
    const checkedTypes = ref([])
    const checkedManufacturers = ref([])

    const setCheckedProductTypes = (types) => store.commit('setCheckedProductTypes', types)
    const setCheckedProductManufacturers = (manufacturers) => store.commit('setCheckedProductManufacturers', manufacturers)

    const clearFilter = () => {
      setTimeout(() => {
        checkedTypes.value = []
        checkedManufacturers.value = []
        setCheckedProductTypes([])
        setCheckedProductManufacturers([])
      }, 300)
    }

    watch(checkedTypes, () => {
      console.log('filter watch:', checkedTypes.value)
      setCheckedProductTypes(checkedTypes.value)
    })

    watch(checkedManufacturers, () => {
      setCheckedProductManufacturers(checkedManufacturers.value)
    })

    return {
      productManufacturers,
      productTypes,
      checkedTypes,
      checkedManufacturers,
      clearFilter
    }
  }
}
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 220px;
  height: 570px;
  margin-left: 30px;
  box-shadow: 10px 10px 5px 1px lightgray;
}

ul {
  padding: 0;
}

.clear-filter {
  color: white;
  background-color: #416bf3;
  border: none;
  height: 30px;
  padding: 3px 20px;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4345fb;
  }

  &:focus {
    outline: none;
  }
}
</style>
