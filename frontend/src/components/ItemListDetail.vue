<template>
  <router-link :to="`/detail/${item.id}`">
    <li class="item-container">
      <div class="img-container">
        <img
          :srcset="item['product-image']"
          alt="{{item['product-name']}}"
        >
      </div>
      <h3 class="title">
        {{ item['product-name'] }}
      </h3>
      <div class="prices">
        <span class="default-price">{{ defaultPrice }}</span>
        <span class="new-price">{{ item.price }} €</span>
      </div>
      <SSDDetails
        v-if="item['product-type'] === 'SSD Hard Disk'"
        :item="item"
      />
      <RAMDetails
        v-else-if="item['product-type'] === 'RAM Memory'"
        :item="item"
      />
      <MonitorDetails
        v-else-if="item['product-type'] === 'Monitor'"
        :item="item"
      />
    </li>
  </router-link>
</template>

<script>
import { computed } from 'vue'
import SSDDetails from './SSDDetails.vue'
import RAMDetails from './RAMDetails.vue'
import MonitorDetails from './MonitorDetails.vue'

export default {
  components: {
    SSDDetails,
    MonitorDetails,
    RAMDetails
  },
  props: {
    item: { type: Object, default: () => ({}) }
  },
  setup (props) {
    const defaultPrice = computed(() => `${(props.item.price * 1.4).toFixed(2)} €`)

    return {
      defaultPrice
    }
  }
}
</script>

<style lang="scss" scoped>
.item-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 555px;
  width: 445px;
  background-color: #f6f6f6;
  margin: 8px;
  transition: 0.3s box-shadow ease-out;

  &:hover {
    box-shadow: 0px 0px 15px #adadad;
  }
}

.title {
  text-transform: uppercase;
  font-size: 24px;
  margin: 15px 0;
}

.img-container {
  width: 300px;
  height: 300px;
  margin: 35px 10px 25px;
  overflow: hidden;
  box-shadow: 0px 0px 15px #adadad;

  img {
    width: 300px;
    height: 300px;
  }
}

.prices {
  display: flex;
  margin-bottom: 12px;
}

.default-price {
  font-size: 20px;
  color: lightgray;
  text-decoration: line-through lightgray;
  font-weight: bold;
  margin-right: 8px;
}

.new-price {
  font-size: 20px;
  font-weight: bold;
  color: red;
}

.details {
  color: gray;
  font-size: 15px;
  display: flex;
  flex-wrap: wrap;
}
</style>
