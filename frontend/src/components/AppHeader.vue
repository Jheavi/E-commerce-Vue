<template>
  <header>
    <div class="flex2" />
    <router-link to="/">
      <h1>
        VuePC
      </h1>
    </router-link>
    <ul>
      <li>Gaming accesories</li>
      <li>Monitors</li>
      <li>Hard Drives</li>
      <li>RAM memories</li>
    </ul>
    <div class="flex10" />
    <button class="cart-btn">
      <i class="el-icon-goods" />
      <span class="cart-size">{{ cartSize }}</span>
    </button>
    <div class="flex1" />
    <span>User</span>
    <div class="flex2" />
  </header>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    const cartSize = computed(() => store.state.cartSize)
    const getCart = () => store.dispatch('getCart')

    onMounted(() => getCart())

    return {
      cartSize
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 70px;
  background-color: #000000;
  color: #ffffff;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

ul {
  display: flex;
}

li {
  margin: 0 15px;
}

.cart-btn {
  height: 45px;
  border-radius: 5px;
  font-weight: bold;
  background-color: #000000;
  font-size: 35px;
  position: relative;
}

.cart-size {
  width: 20px;
  height: 20px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 15px;
  bottom: 0;
  font-size: 11px;
  color: #000000;
  background-color: #ffffff;
  border-radius: 15px;

}

</style>
