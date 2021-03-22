<template>
  <div class="container">
    <div class="img-container">
      <img
        :srcset="item['product-image']"
        alt=""
      >
    </div>
    <div class="details">
      <h1>{{ item['product-name'] }}</h1>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  props: {
    id: { type: String, default: '0' }
  },
  setup (props) {
    const store = useStore()
    const propId = computed(() => props.id)
    const item = computed(() => store.state.item)

    const getItem = (itemId) => store.commit('getItem', itemId)

    onMounted(() => getItem(propId.value))

    return {
      propId,
      item
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-evenly;
}

.img-container {
  width: 45%;
  height: 45%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.details {
  width: 45%;
}
</style>
