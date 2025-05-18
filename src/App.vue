<template>
  <Header v-if="!isAdminPage"></Header>
  <router-view></router-view>
  <Footer v-if="!isAdminPage"></Footer>
</template>

<script>
import Footer from "./components/nav/Footer.vue";
import Header from "./components/nav/Header.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  computed: {
    isAdminPage() {
      return this.$route.path.startsWith("/admin");
    },
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  watch: {
    $route() {
      // Tính toán lại khi route thay đổi
      this.isAdminPage = this.$route.path.startsWith("/admin");
    },
    didAutoLogout(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        this.$router.replace("/products");
      }
    },
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}
</style>
