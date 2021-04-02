<template>
  <li class="container">
    <div class="img-container">
      <img
        :srcset="image"
        :alt="name"
      >
    </div>
    <div class="flex1" />
    <div class="info flex4">
      <router-link
        class="details"
        :to="`/detail/${id}`"
      >
        <span class="details info__name">{{ name }}</span>
      </router-link>
      <span class="details info__default-price">{{ defaultPrice }}</span>
      <span class="details info__new-price">{{ price }} €</span>
    </div>
    <div class="flex2" />
    <div class="quantity-price flex4">
      <div class="quantity-btns">
        <button
          class="quantity-btn"
          @click="decreaseItemInCart"
        >
          -
        </button>
        <span>{{ quantity }}</span>
        <button
          class="quantity-btn"
          @click="increaseItemInCart"
        >
          +
        </button>
      </div>
      <div class="total-price">
        <span>TOTAL: </span>
        <span class="price"> {{ totalQuantity }} €</span>
      </div>
    </div>
    <div class="flex2" />
    <div class="erase">
      <span>Eliminar</span>
      <button
        class="erase-btn"
        @click="deleteItemInCart"
      >
        <i class="el-icon-close" />
      </button>
    </div>
  </li>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  props: {
    item: { type: Object, default: () => ({ product: {} }) }
  },
  setup (props) {
    const store = useStore()
    const id = computed(() => props.item.product.id)
    const name = computed(() => props.item.product['product-name'])
    const image = computed(() => props.item.product['product-image'])
    const defaultPrice = computed(() => `${(props.item.product.price * 1.4).toFixed(2)} €`)
    const price = computed(() => props.item.product.price)
    const quantity = computed(() => props.item.quantity)
    const totalQuantity = computed(() => (quantity.value * price.value).toFixed(2))

    const increaseItemInCart = () => store.dispatch(
      'increaseItemInCart',
      { item: props.item.product, quantity: 1 }
    )

    const decreaseItemInCart = () => store.dispatch(
      'decreaseItemInCart',
      props.item.product
    )
    const deleteItemInCart = () => store.dispatch(
      'increaseItemInCart',
      { item: props.item.product, quantity: -props.item.quantity }
    )

    return {
      id,
      name,
      image,
      defaultPrice,
      price,
      quantity,
      totalQuantity,
      increaseItemInCart,
      decreaseItemInCart,
      deleteItemInCart
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100px;
  width: 700px;
  margin: 15px;
  padding: 5px 20px;
  box-shadow: 0px 0px 12px  #d3d3d3;
  display: flex;
  align-items: center;
}

.img-container {
  height: 90px;
  width: 90px;

  img {
    height: 90px;
    width: 90px;
  }
}

.info {
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 16px;
}

.details {
  font-weight: bold;
  margin-bottom: 8px;
  text-align: left;
}

.info__default-price {
  color: lightgray;
  text-decoration: line-through lightgray;
}

.info__new-price {
  color: red;
}

.quantity-price {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.quantity-btns {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  background-color: #f6f6f6;
  border-radius: 20px;

  .quantity-btn, span {
    background-color: transparent;
    color: #b1b1b1;
    transition: color 0.4s;
    display: flex;
    align-items: center;

    &:hover {
      color: #000000;
    }
  }

  span {
    color: #000000;
  }
}

.total-price {
  display: flex;

  span {
    margin-right: 4px;
  }

  .price {
    font-weight: bolder;
  }
}

.erase {
  margin-top: 6px;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 13px;
    color: #416bf3;
    opacity: 0;
    transition: 0.4s opacity;
    margin-bottom: 3px;
  }

  &:hover {
    span {
      opacity: 1;
    }
  }

  .erase-btn {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    &:hover {
      background-color: #416bf3;
    }
  }
}

</style>
