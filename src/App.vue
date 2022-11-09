<template>
  <div id="app" class="app">
    <div class="header">
      <nav>
        <button class="nav-button" v-if="isAuth" v-on:click="loadHome">
          Inicio
        </button>
        <button
          class="nav-button"
          v-if="isAuth && isAdmin"
          v-on:click="loadAdminPanel"
        >
          Administrar
        </button>
        <button class="nav-button" v-if="isAuth" v-on:click="logOut">
          Cerrar Sesión
        </button>
        <button class="nav-button" v-if="!isAuth" v-on:click="loadLogin">
          Iniciar Sesión
        </button>
        <button class="nav-button" v-if="!isAuth" v-on:click="loadSignup">
          Registrarse
        </button>
      </nav>
    </div>

    <div class="main-component">
      <router-view
        v-on:completedLogin="completedLogin"
        v-on:completedSignup="completedSignup"
        v-on:logOut="logOut"
      ></router-view>
    </div>
    <div class="contact-section">
      <h3>Contáctanos</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",

  data: function () {
    return {
      isAuth: false,
      isAdmin: localStorage.getItem("isAdmin"),
      adminPanelActive: false,
    };
  },

  components: {},

  methods: {
    verifyAuth: function () {
      this.isAuth = localStorage.getItem("isAuth");
      if (!this.isAuth) {
        this.$router.push({ name: "login" });
      } else {
        this.$router.push({ name: "home" });
      }
    },

    loadLogin: function () {
      this.$router.push({ name: "login" });
    },

    loadSignup: function () {
      this.$router.push({ name: "signup" });
    },

    loadHome: function () {
      this.$router.push({ name: "home" });
    },

    loadAdminPanel: function () {
      this.adminPanelActive === true
        ? (this.adminPanelActive = false)
        : (this.adminPanelActive = true);
      localStorage.setItem("isAdminPanelActive", this.adminPanelActive);
    },

    completedLogin: function () {
      localStorage.setItem("isAuth", true);
      alert("Autenticación exitosa");
      this.verifyAuth();
    },

    completedSignup: function (data) {
      alert("Registro exitoso");
      this.completedLogin(data);
    },

    logOut: function () {
      localStorage.clear();
      this.verifyAuth();
    },
  },

  created: function () {
    localStorage.setItem("isAdminPanelActive", this.adminPanelActive);
    this.verifyAuth();
  },
};
</script>

<style>
:root {
  --light-pink-color: #e4b7e5;
  --purple-color: #592e83;
  --dark-purple-color: #230c33;
  --light-orange-color: #b27c66;
  --light-green-color: #0b7a75;
  --mint-green-color: #47e5bc;
  --white-color: #f1fffa;
}

html {
  margin: 0;
  max-width: 1279px;
  min-height: 914px;
}

.app {
  margin: 0;
  background-color: lightgray;
}

.main-component {
  width: 100vw;
  height: 100vh;
}

.contact-logo {
  width: 5%;
  height: 5%;
}

.contact-section {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  font-weight: bold;
  width: 100%;
  color: var(--mint-green-color);
  position: fixed;
}

.contact-section img {
  cursor: pointer;
  margin-inline: 2%;
  margin-bottom: 2%;
}

.nav-button {
  padding: 1%;
  border-radius: 2px;
  border: none;
  background-color: var(--mint-green-color);
  color: var(--light-green-color);
  margin: 0;
  cursor: pointer;
}

.nav-button:hover {
  background-color: var(--light-green-color);
  color: var(--mint-green-color);
}

.header nav {
  display: flex;
  justify-content: flex-end;
  width: 100vw;
}

.header {
  background-color: var(--mint-green-color);
}
/* 
#app {
  background-color: var(--light-pink-color);
}

.main-component {
  background-color: var(--light-pink-color);
} */
</style>
