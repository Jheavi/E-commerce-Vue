<template>
  <h2>Your cart content</h2>
  <div
    v-if="cartList.length"
    class="cart-container"
  >
    <div class="list-more-products">
      <ul class="cart-list">
        <ItemCartDetail
          v-for="item in cartList"
          :key="item"
          :item="item"
        />
      </ul>
      <span>More products of your interest...</span>
      <div class="more-products">
        <SlideCartItem :items-for-slide="itemsForSlide" />
      </div>
    </div>
    <div class="total-cart-calculation">
      <div class="total-with-taxes">
        <span>Total (taxes incl.)</span>
        <span>{{ totalWithTaxes }} €</span>
      </div>
      <div class="shipping">
        <span>Shipping</span>
        <span>{{ shipping }} €</span>
      </div>
      <div class="total-without-taxes">
        <span>Total (taxes excl.)</span>
        <span>{{ totalWithoutTaxes }} €</span>
      </div>
      <div class="taxes">
        <span>Taxes</span>
        <span>{{ taxes }} €</span>
      </div>
      <div class="total-price">
        <span>Total</span>
        <span>{{ totalPrice }} €</span>
      </div>
      <button class="finish-btn">
        Finalize order
      </button>
    </div>
  </div>
  <div
    v-else
    class="empty-cart"
  >
    <h3>
      Your cart is empty
    </h3>
    <router-link to="/">
      <button>Continue buying</button>
    </router-link>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

import ItemCartDetail from '@/components/ItemCartDetail.vue'
import SlideCartItem from '@/components/SlideCartItem.vue'

export default {
  components: {
    ItemCartDetail,
    SlideCartItem
  },
  setup () {
    const store = useStore()
    const itemsToShow = 10
    const itemList = computed(() => store.state.itemList)

    const cartList = computed(() => store.state.cartList.filter((item) => (
      item.quantity > 0
    )))

    const itemsForSlide = computed(() => itemList.value.filter((item) => (
      !cartList.value.some((cartItem) => (cartItem.product.id === item.id
      ))
    )).slice(0, itemsToShow))

    const shipping = ref(parseFloat(5).toFixed(2))
    const totalWithTaxes = computed(() => cartList.value.reduce(
      (acc, currentItem) => acc + currentItem.quantity * currentItem.product.price,
      0
    ).toFixed(2))

    const totalPrice = computed(() => (
      parseFloat(+totalWithTaxes.value + +shipping.value).toFixed(2)
    ))

    const productsWithoutTaxes = computed(() => (totalWithTaxes.value / 1.21).toFixed(2))
    const shippingWithoutTaxes = computed(() => (shipping.value / 1.21).toFixed(2))

    const totalWithoutTaxes = computed(() => (
      parseFloat(+productsWithoutTaxes.value + +shippingWithoutTaxes.value)
        .toFixed(2)
    ))

    const taxes = computed(() => (totalWithoutTaxes.value * 0.21).toFixed(2))

    const getCart = () => store.dispatch('getCart')
    const getItems = () => store.dispatch('getItems')

    onMounted(() => {
      if (!cartList.value.length) {
        getCart()
      }
      if (!itemList.value.length) {
        getItems()
      }
    })

    return {
      cartList,
      itemsForSlide,
      shipping,
      taxes,
      totalPrice,
      totalWithoutTaxes,
      totalWithTaxes
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-container {
  display: flex;
  justify-content: center;

  .list-more-products {
    display: flex;
    flex-direction: column;

    & > span {
      text-align: left;
      margin: 15px 0 15px 15px;
      font-weight: bold;

    }

    .more-products {
      width: 700px;
      box-shadow: 0px 0px 12px  #d3d3d3;
      padding: 20px;
      margin-left: 15px;
      height: 380px;
    }
  }

  .total-cart-calculation {
    width: 340px;
    height: 300px;
    padding: 40px 20px 20px;
    box-shadow: 0px 0px 12px  #d3d3d3;
    margin: 15px 0;

    .total-with-taxes,
    .shipping,
    .total-without-taxes,
    .taxes,
    .total-price {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;

      span:nth-child(1) {
        font-weight: bold;
      }
    }

    .shipping,
    .taxes {
      padding-bottom: 20px;
      border-bottom: 1px solid #3b3b3b;
    }

    .total-price {
      font-size: 21px;

      span:nth-child(2) {
        font-weight: bold;
        font-size: 23px;
      }
    }

    .finish-btn {
      margin-top: 10px;
      font-size: 17px;
      width: 100%;
      height: initial;
      padding: 10px 0;
    }
  }
}

.empty-cart {
  margin-top: 80px;

  button {
    margin-top: 30px;

  }
}
</style>
