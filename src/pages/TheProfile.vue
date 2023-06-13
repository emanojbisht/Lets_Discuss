<template>
  <div>
    <h1>The profile</h1>
    <button @click="logout" id="logout">logout</button>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/") {
      const userInput = confirm("Do you want to logout?");
      next(userInput);
    }
  },
};
</script>
