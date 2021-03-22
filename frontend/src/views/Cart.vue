<template>
  <h2>Your cart content</h2>
  <div class="cart-container">
    <ul class="cart-list">
      <ItemCartDetail
        v-for="item in cartList"
        :key="item"
        :item="item"
      />
    </ul>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import ItemCartDetail from '@/components/ItemCartDetail.vue'

export default {
  components: {
    ItemCartDetail
  },
  setup () {
    const store = useStore()
    const cartList = computed(() => store.state.cartList.filter((item) => (
      item.quantity > 0
    )))

    const getCart = () => store.dispatch('getCart')

    onMounted(() => {
      if (!cartList.value.length) {
        getCart()
      }
    })

    return {
      cartList
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-container {
  display: flex;
}
</style>
