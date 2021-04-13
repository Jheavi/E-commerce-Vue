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
import { computed, onUnmounted, onMounted, ref } from 'vue'
import SlideCartDetail from '@/components/SlideCartDetail.vue'
import { moveElementToPosition } from '../utils/functions'

export default {
  components: {
    SlideCartDetail
  },
  props: {
    itemsForSlide: { type: Array, default: () => [] },
    shouldAutoMove: { type: Boolean, default: () => true },
    secondsForAutoMove: { type: Number, default: () => 3 }
  },
  setup (props) {
    const position = ref(0)
    const millisecondsToAutoMoveSlide = 1000 * props.secondsForAutoMove
    let stopInterval

    const listSliced = computed(() => props.itemsForSlide)

    const autoMovement = () => {
      const slide = document.querySelector('.slide')
      if (position.value > -listSliced.value.length + 3) {
        position.value -= 1
      } else if (position.value === -listSliced.value.length + 3) {
        position.value = 0
      }
      moveElementToPosition(slide, position.value)
    }

    const itemsToLeft = () => {
      const slide = document.querySelector('.slide')

      if (position.value > -listSliced.value.length + 3) position.value -= 1

      moveElementToPosition(slide, position.value)

      if (props.shouldAutoMove) {
        clearInterval(stopInterval)
        stopInterval = setInterval(autoMovement, millisecondsToAutoMoveSlide)
      }
    }

    const itemsToRight = () => {
      const slide = document.querySelector('.slide')

      if (position.value < 0) position.value += 1

      moveElementToPosition(slide, position.value)

      if (props.shouldAutoMove) {
        clearInterval(stopInterval)
        stopInterval = setInterval(autoMovement, millisecondsToAutoMoveSlide)
      }
    }

    onMounted(() => {
      if (props.shouldAutoMove) {
        stopInterval = setInterval(autoMovement, millisecondsToAutoMoveSlide)
      }
    })

    onUnmounted(() => {
      if (props.shouldAutoMove) {
        clearInterval(stopInterval)
      }
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
  width: 700px;
}

.slide {
  display: flex;
  transition: transform 0.8s;
  margin-left: 15px;
}

</style>
