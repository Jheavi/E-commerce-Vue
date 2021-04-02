<template>
  <SlideCartDetail
    v-for="item in listSliced"
    :key="item"
    :item="item"
  />
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import SlideCartDetail from '@/components/SlideCartDetail.vue'

export default {
  components: {
    SlideCartDetail
  },
  setup () {
    const store = useStore()
    const itemList = computed(() => store.state.itemList)
    const listSliced = computed(() => itemList.value.slice(0, 3))

    return {
      listSliced
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
