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
    <div class="btn-container">
      <button
        class="clear-filter-btn"
        @click="clearFilter"
      >
        Clear filter
      </button>
    </div>
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

h4 {
  margin: 25px 0 15px;
}

input {
margin-right: 10px;
}

.btn-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.clear-filter-btn {
  margin-top: 35px;
}
</style>
