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
    <button>Carro</button>
    <div class="flex1" />
    <span>User</span>
    <div class="flex2" />
  </header>
</template>

<script>
export default {
  setup () {

  }
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 70%;
  background-color: #000000;
  color: #ffffff;
  display: flex;
  align-items: center;
}

ul {
  display: flex;
}

li {
  margin: 0 15px;
}

</style>
