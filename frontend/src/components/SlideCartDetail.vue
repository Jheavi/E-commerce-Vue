<template>
  <div class="container">
    <h5>{{ item['product-name'] }}</h5>
    <img
      :srcset="item['product-image']"
      :alt="item['product-name']"
    >
    <span class="price">{{ item.price }} €</span>
    <router-link :to="`/detail/${item.id}`">
      <button>See details</button>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, default: () => ({}) }
  },
  setup (props) {

  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 185px;
  height: 340px;
  background-color: red($color: #000000);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 15px;
}

.price {
  font-weight: bold;
  margin-bottom: 30px;
}
</style>
