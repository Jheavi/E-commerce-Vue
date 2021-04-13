<template>
  <div class="slide-container">
    <button
      class="left-arrow"
      @click="itemsToRight"
    >
      <i class="el-icon-arrow-left" />
    </button>
    <ul class="slide">
      <SlideCartDetail
        v-for="item in listSliced"
        :key="item"
        :item="item"
      />
    </ul>
    <button
      class="right-arrow"
      @click="itemsToLeft"
    >
      <i class="el-icon-arrow-right" />
    </button>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import SlideCartDetail from '@/components/SlideCartDetail.vue'
import { moveElementToPosition } from '../utils/functions'

export default {
  components: {
    SlideCartDetail
  },
  setup () {
    const store = useStore()
    const itemList = computed(() => store.state.itemList)
    const cartList = computed(() => store.state.cartList)
    const maxItems = 10
    const position = ref(0)

    const listSliced = computed(() => itemList.value.filter((item) => (
      !cartList.value.some((cartItem) => (
        cartItem.product.id === item.id && cartItem.quantity > 0
      ))
    )).slice(0, maxItems))

    const itemsToLeft = () => {
      const slide = document.querySelector('.slide')
      if (position.value > -listSliced.value.length + 3) position.value -= 1
      moveElementToPosition(slide, position.value)
    }

    const itemsToRight = () => {
      const slide = document.querySelector('.slide')
      if (position.value < 0) position.value += 1
      moveElementToPosition(slide, position.value)
    }

    const getItems = () => store.dispatch('getItems')

    onMounted(() => {
      const slide = document.querySelector('.slide')
      const millisecondsToAutoMoveSlide = 3000

      if (!store.state.itemList.length) {
        getItems()
      }

      setInterval(() => {
        if (position.value > -listSliced.value.length + 3) {
          position.value -= 1
        } else if (position.value === -listSliced.value.length + 3) {
          position.value = 0
        }
        moveElementToPosition(slide, position.value)
      }, millisecondsToAutoMoveSlide)
    })

    return {
      listSliced,
      itemsToLeft,
      itemsToRight
    }
  }
}
</script>

<style lang="scss" scoped>
i {
  font-size: 30px;
}

.left-arrow, .right-arrow {
  position: absolute;
}

.right-arrow {
  right: 0;
}

button {
  width: 30px;
  background-color: #ffffff;
  color: inherit;
  padding: 0;
  height: 300px;
  z-index: 10;
}

.slide-container {
  display: flex;
  align-items: center;
  overflow-x: hidden;
  position: relative;
}

.slide {
  display: flex;
  transition: transform 0.8s;
  margin-left: 15px;
}

</style>
