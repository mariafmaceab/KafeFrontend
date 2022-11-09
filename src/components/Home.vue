<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="discount-header">
    <h4>25% de descuento en referencias seleccionadas</h4>
  </div>
  <div class="icons-bar">
    <div class="shop-div" @click="loadCart">
      <img
        src="https://cdn-icons-png.flaticon.com/512/5948/5948550.png"
        alt="shop bag icon"
      />
      <img
        v-if="this.localStorageCartSize > 0"
        id="new-item-in-cart"
        src="https://cdn-icons-png.flaticon.com/512/1353/1353984.png"
        alt="new item in cart"
      />
    </div>
    <img
      src="https://cdn-icons-png.flaticon.com/512/3031/3031293.png"
      alt="search icon"
    />
    <a target="_blank" href="https://www.instagram.com/kafe.hogar/">
      <img
        class="contact-logo"
        src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
        alt="instagram"
    /></a>
    <a
      target="_blank"
      href="https://api.whatsapp.com/send/?phone=573043597697&text=Hola%2C+estoy+interesado+en+uno+de+tus+productos&type=phone_number&app_absent=0"
    >
      <img
        class="contact-logo"
        src="https://cdn-icons-png.flaticon.com/512/5968/5968841.png"
        alt="whatsapp"
    /></a>
  </div>
  <h1 class="our-products">Nuestros productos</h1>
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
          <img
            @click="addProductToCart(product)"
            class="plus-icon"
            src="https://cdn-icons-png.flaticon.com/512/107/107256.png"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="our-products"></div>
  <div class="first-image-section"></div>
  <div class="second-image-section"></div>
  <div class="third-image-section"></div>
  <div class="about-us"></div>
</template>

<script>
import axios from "axios";

/* eslint-disable*/
export default {
  name: "home",
  data: function () {
    return {
      username: localStorage.getItem("username") || "none",
      products: [],
      userData: {},
      cart: [],
      localStorageCartSize: 0,
    };
  },
  created: function () {
    axios
      .get("https://kafe-backend-api.herokuapp.com/api/token/refresh", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenRefresh")}`,
        },
      })
      .then((result) => {
        localStorage.setItem("tokenAccess", result.data.access);
      });
  },
  mounted: function () {
    axios
      .get("https://kafe-backend-api.herokuapp.com/api/product/products")
      .then((result) => {
        for (const product of result.data) {
          this.products.push(product);
        }
      })
      .catch((error) => {
        alert(error);
      });

    axios
      .get(
        `https://kafe-backend-api.herokuapp.com/api/user/${localStorage.getItem(
          "username"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        }
      )
      .then((result) => {
        this.userData = result.data;
        localStorage.setItem("userRoles", this.userData.roles);
        for (const role of this.userData.roles) {
          if (role.name === "ROLE_ADMIN") {
            localStorage.setItem("isAdmin", true);
          }
        }
      })
      .catch((error) => {
        alert(error);
      });
  },
  methods: {
    addProductToCart: function (product) {
      let productsAlreadyInCart =
        JSON.parse(localStorage.getItem("cart")) || [];
      console.log("Obtained", productsAlreadyInCart);
      productsAlreadyInCart.push(product);
      console.log("Updated", productsAlreadyInCart);
      this.cart = productsAlreadyInCart;
      localStorage.setItem("cart", JSON.stringify(this.cart));
      let itemsInCart = JSON.parse(localStorage.getItem("cart"));
      localStorage.setItem("itemsInCart", itemsInCart.length);
      this.localStorageCartSize = itemsInCart.length;
    },
    loadCart: function () {
      let carItems = JSON.parse(localStorage.getItem("cart")) || 0;
      if (carItems.length > 0) {
        this.$router.push("cart");
      } else {
        alert("No tienes ningún artículo en la bolsa de compras");
      }
    },
    checkAdminPanelActive: function () {
      return localStorage.getItem("isPanelAdminActive") === "true";
    },
  },
};
</script>
<style>
html {
  color: var(--dark-purple-color);
  width: 100vw;
  height: 100vh;
  background-color: var(--light-green-color);
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
  background-color: var(--light-green-color);
}

.discount-header {
  display: flex;
  background-color: var(--purple-color);
  color: var(--white-color);
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 5%;
}

.discount-header h4 {
  display: flex;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 5px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: var(--light-pink-color);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

img {
  border-radius: 5px 5px 0 0;
}

.container {
  padding: 2px 16px;
}

.price {
  text-align: right;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}

.card-container {
  margin-left: 5%;
  margin-bottom: 5%;
  width: 25%;
}

.icons-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 5%;
  margin: 0;
  background-color: var(--mint-green-color);
}

.icons-bar img {
  width: 30px;
  height: 30px;
  margin-inline: 1%;
  object-fit: cover;
}

.our-products {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--mint-green-color);
  background-color: var(--light-green-color);
  margin: 0;
  padding-block: 2%;
}

.plus-icon {
  width: 30px;
  height: 30px;
  z-index: 50;
}

.shop-div {
  display: flex;
  justify-content: center;
  cursor: pointer;
}

#new-item-in-cart {
  position: relative;
  left: 90;
  width: 15px;
  height: 15px;
}
</style>
