<template>
  <div class="signupUser">
    <div class="containerSignupUser">
      <h2>Registrarse</h2>

      <form v-on:submit.prevent="processSignup">
        <input type="text" v-model="user.username" placeholder="Username" />
        <input type="text" v-model="user.password" placeholder="Password" />
        <input type="text" v-model="user.name" placeholder="Name" />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable*/
import axios from "axios";

export default {
  name: "signup",

  data: function () {
    return {
      user: {
        username: "",
        password: "",
        name: "",
      },
    };
  },

  methods: {
    processSignup: function () {
      axios
        .post("http:localhost:8080/api/user/save", JSON.stringify(this.user))
        .then((result) => {
          let dataSignup = {
            username: this.user.username,
            tokenAccess: result.data.access,
            tokenRefresh: result.data.refresh,
          };
          this.$emit("completedSignup", dataSignup);
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el registro");
        });
    },
  },
};
</script>
