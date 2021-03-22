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
      Carro
    </button>
    <div class="flex1" />
    <span>User</span>
    <div class="flex2" />
  </header>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    const getCart = () => store.dispatch('getCart')

    onMounted(() => getCart())
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
  margin: 0;
}

</style>
