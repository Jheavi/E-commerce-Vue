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
        <button
          :disabled="alert"
          class="buy-btn"
          @click="buyAndResetQuantity"
        >
          Add to cart
        </button>
        <transition name="slide-fade">
          <span
            v-if="alert"
            class="alert"
          >
            You have successfully added {{ quantityToShow }} item{{ `${quantityToShow > 1 ? 's' : ''}` }}!
          </span>
        </transition>
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
    const quantityToShow = ref(1)
    const alert = ref(false)

    const getItem = (itemId) => store.dispatch('getItem', itemId)

    const increaseItemInCart = (item, quantity) => store.dispatch(
      'increaseItemInCart',
      { item: item.value, quantity: quantity.value }
    )

    const buyAndResetQuantity = () => {
      quantityToShow.value = quantity.value
      alert.value = true
      increaseItemInCart(item, quantity)
      quantity.value = 1
      setTimeout(() => {
        alert.value = false
      }, 2000)
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
      buyAndResetQuantity,
      alert,
      quantityToShow
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-evenly;
  position: relative;
  overflow-x: hidden;
}

.img-container {
  width: 35%;
  height: 35%;

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
  border: 1px solid #000000;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  background-color: #ffffff;
  color: #000000;
  padding: 0;
}

.alert {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 12px;
  background-color: #fff3e2;
  color: #000000;
}

.buy-btn {
  &:disabled {
    opacity: 0.7;

    &:hover {
      background-color: #416bf3;
    }
  }
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: right 0.3s;
}

.slide-fade-enter-from, .slide-fade-leave-to  {
  right: -300px;
}
</style>
