<template>
  <div class="details">
    <span>
      {{ item['product-type'] }} |
    </span>
    <span>
      {{ item.manufacturer }} |
    </span>
    <span>
      {{ item.mhz }} mHz |
    </span>
    <span>
      {{ item['capacity-gb'] }} GB
    </span>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, default: () => ({}) }
  },
  setup () {

  }
}
</script>

<style lang="scss" scoped>
span {
  margin-right: 4px;
}
</style>
