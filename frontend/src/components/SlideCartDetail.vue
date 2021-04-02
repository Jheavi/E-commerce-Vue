<template>
  <div class="container">
    <h5>{{ title }}</h5>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props: {
    item: { type: Object, default: () => ({}) }
  },
  setup (props) {
    const title = computed(() => props.item['product-value'])

    return {
      title
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 200px;
  height: 340px;
  background-color: red($color: #000000);
  display: flex;
}
</style>
