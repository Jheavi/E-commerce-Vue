<template>
  <div class="container">
    <div class="img-container">
      <img
        :srcset="item['product-image']"
        :alt="item['product-name']"
      >
    </div>
    <div class="details">
      <h1>{{ item['product-name'] }}</h1>
      <div class="data">
        <span>{{ item['product-type'] }}</span>
        <span>Manufacturer: {{ item.manufacturer }}</span>
      </div>
      <div class="buy">
        <div class="quantity-btns">
          <button
            class="square less"
            @click="decreaseQuantity"
          >
            -
          </button>
          <div class="square quantity">
            {{ quantity }}
          </div>
          <button
            class="square plus"
            @click="increaseQuantity"
          >
            +
          </button>
        </div>
        <button @click="buyAndResetQuantity">
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  props: {
    id: { type: String, default: '0' }
  },
  setup (props) {
    const store = useStore()
    const propId = computed(() => props.id)
    const item = computed(() => store.state.item)
    const quantity = ref(1)

    const getItem = (itemId) => store.dispatch('getItem', itemId)

    const increaseItemInCart = (item, quantity) => store.dispatch(
      'increaseItemInCart',
      { item: item.value, quantity: quantity.value }
    )

    const buyAndResetQuantity = () => {
      increaseItemInCart(item, quantity)
      quantity.value = 1
    }

    const increaseQuantity = () => { quantity.value += 1 }
    const decreaseQuantity = () => {
      if (quantity.value > 1) {
        quantity.value -= 1
      }
    }

    onMounted(() => getItem(propId.value))

    return {
      propId,
      item,
      quantity,
      increaseQuantity,
      decreaseQuantity,
      buyAndResetQuantity
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
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.data {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;

  span {
    margin-bottom: 20px;
  }
}

.buy {
  display: flex;
  align-items: center;
  margin-top: 35px;
}

.quantity-btns {
  display: flex;
  margin-right: 15px;
}

.square {
  width: 35px;
  height: 35px;
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  background-color: #ffffff;
  color: black;
  padding: 0;
}
</style>
