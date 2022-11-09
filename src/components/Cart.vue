<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="cart-container">
    <h2 class="cart-header">
      Tu carrito tiene {{ this.products.length }}
      {{ this.products.length > 1 ? "productos" : "producto" }}
    </h2>
    <div class="image-row-section">
      <div
        class="card-container"
        v-for="product in this.products"
        v-bind:key="product.image_link"
      >
        <div class="card">
          <img
            v-bind:src="`${product.image_link}`"
            alt=""
            class="product-image"
          />
          <div class="container">
            <h4 class="product-name">
              <b>{{ product.name }}</b>
            </h4>
            <p class="product-desc">{{ product.description }}</p>
            <p class="price"><span>$</span>{{ product.final_price }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="button-container">
      <button v-if="this.products.length > 0" @click="clearCart">
        Vaciar carrito
      </button>
      <button v-if="this.products.length > 0" @click="purchaseOrder">
        Comprar productos
      </button>
      <img
        class="shop-bag-icon"
        src="https://cdn-icons-png.flaticon.com/512/5948/5948550.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "cart",

  data: function () {
    return {
      products: JSON.parse(localStorage.getItem("cart")),
    };
  },

  methods: {
    clearCart() {
      localStorage.removeItem("cart");
      this.$router.go(0);
    },
    purchaseOrder() {
      window.open(
        `https://api.whatsapp.com/send/?phone=573043597697&text=Hola%2C+estoy+interesado+en+uno+de+tus+productos:%20${this.products[0].name},%20que vale %20${this.products[0].final_price},%20y%20se%20ve%20así%20${this.products[0].image_link}&type=phone_number&app_absent=0`,
        "_blank"
      );
    },
  },
};
</script>

<style scoped>
html {
  color: var(--dark-purple-color);
  width: 100vw;
  height: 100vh;
}

body {
  background-color: var(--light-pink-color);
}

.cart-container {
  width: 100vw;
  height: 100vh;
}

.cart-container h2 {
  background-color: var(--light-green-color);
  margin: 0;
}

.button-container {
  margin-top: 5%;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.cart-container div button {
  padding: 2%;
  background-color: var(--purple-color);
  font-family: Arial, Helvetica, sans-serif;
  color: var(--white-color);
  border-radius: 5px;
  width: 15%;
}

.cart-container div button:hover {
  background-color: var(--dark-purple-color);
  cursor: pointer;
}

.product-name {
  font-size: 20px;
  margin: 10px 0 10px 0;
}

.product-desc {
  margin: 0;
  font-size: 80%;
}

.product-image {
  width: 100%;
  height: 70%;
  object-fit: cover;
}

.image-row-section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: var(--light-pink-color);
}

.cart-header {
  color: var(--mint-green-color);
  text-align: center;
  margin-block: 5%;
}

.shop-bag-icon {
  width: 15%;
  background-color: var(--light-pink-color);
}

.card {
  background-color: var(--dark-purple-color);
  color: var(--white-color);
}
</style>
