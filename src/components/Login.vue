<template>
  <div class="login-user">
    <div class="container-login-user">
      <h2 class="kafe-title">Tapetes <span>Kafe</span></h2>

      <form v-on:submit.prevent="processLoginUser" class="form-login">
        <input type="text" v-model="user.username" placeholder="Usuario" />
        <input
          type="password"
          v-model="user.password"
          placeholder="Contraseña"
        />
        <button type="submit" class="login-button">Iniciar sesión</button>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable*/
import axios from "axios";

export default {
  name: "login",

  data: function () {
    return {
      user: {
        username: "",
        password: "",
      },
      userData: {},
    };
  },

  methods: {
    processLoginUser: function () {
      axios
        .post(
          "https://kafe-backend-api.herokuapp.com/api/login",
          JSON.stringify(this.user),
          {
            headers: {},
          }
        )
        .then((result) => {
          console.log(result);
          let dataLogin = {
            username: result.data.username,
            tokenAccess: result.data.access,
            tokenRefresh: result.data.refresh,
          };
          localStorage.setItem("tokenAccess", dataLogin.tokenAccess);
          localStorage.setItem("tokenRefresh", dataLogin.tokenRefresh);
          localStorage.setItem("username", dataLogin.username);
          this.$emit("completedLogin");
        })
        .catch((error) => {
          alert("No fue posible loguearse");
          if (error.response.status == "401") {
            alert("ERROR 401: credenciales incorrectas.");
          }
        });
    },
  },
};
</script>

<style>
.login-user {
  width: 100%;
  height: 100%;
}

.container-login-user {
  border: 1px solid lightgray;
  box-shadow: 2px 2px 5px gray;
  background-color: var(--white-color);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 35%;
  height: 70%;
  margin-top: 10%;
  margin-left: 25%;
}

.form-login {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

input[type="text"],
[type="password"] {
  margin-block: 5%;
  padding: 5%;
  width: 80%;
  border-radius: 10px;
  border: 1px solid lightgray;
}

.login-button {
  margin-block: 10%;
  padding: 3%;
  border-radius: 10px;
  background-color: var(--purple-color);
  color: var(--white-color);
  font-family: Arial, Helvetica, sans-serif;
  font-size: large;
  width: 80%;
}

.login-button:hover {
  background-color: var(--dark-purple-color);
  cursor: pointer;
}

h2 {
  text-align: left;
  width: 100%;
}

.kafe-title {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  color: var(--purple-color);
}
</style>
