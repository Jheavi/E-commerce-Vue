<template>
  <div class="slide-container">
    <button @click="itemsToRight">
      <i class="el-icon-arrow-left" />
    </button>
    <ul class="slide">
      <SlideCartDetail
        v-for="item in listSliced"
        :key="item"
        :item="item"
      />
    </ul>
    <button @click="itemsToLeft">
      <i class="el-icon-arrow-right" />
    </button>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import SlideCartDetail from '@/components/SlideCartDetail.vue'

export default {
  components: {
    SlideCartDetail
  },
  setup () {
    const store = useStore()
    const itemList = computed(() => store.state.itemList)
    const listSliced = computed(() => itemList.value.slice(0, 10))

    const itemsToLeft = () => {
    }

    const itemsToRight = () => {
    }

    const getItems = () => store.dispatch('getItems')

    onMounted(() => {
      if (!store.state.itemList.length) {
        getItems()
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

button {
  width: 30px;
  background-color: transparent;
  color: inherit;
  padding: 0;
  height: 300px;
}

.slide-container {
  display: flex;
  align-items: center;
}

.slide {
  display: flex;
  overflow-x: hidden;
}

</style>
