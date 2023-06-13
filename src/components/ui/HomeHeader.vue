<template>
  <header class="flex">
    <router-link to="/home">Lets Discuss</router-link>
    <button class="remove" @click="logout">Logout</button>
    <ul class="flex gap hidden">
      <router-link to="/contactus">Contact us</router-link>
      <router-link to="/aboutus">About us</router-link>
      <router-link to="/threadPlay">Thread Play</router-link>
      <router-link to="/thread">Start a thread</router-link>
      <router-link to="/mythreads">My threads</router-link>
      <button @click="logout">Logout</button>
    </ul>
  </header>
  <ul class="flex gap remove">
    <router-link to="/contactus">Contact us</router-link>
    <router-link to="/aboutus">About us</router-link>
    <router-link to="/threadPlay">Thread Play</router-link>
    <router-link to="/thread">Start a thread</router-link>
    <router-link to="/mythreads">My threads</router-link>
  </ul>
</template>
<script>
export default {
  methods: {
    logout() {
      const userInput = confirm("Do you want to logout?");
      if (userInput) {
        this.$store.dispatch("logout");
        this.$router.replace("/");
      }
    },
  },
};
</script>
<style scoped>
header {
  justify-content: space-between;
  /* margin-bottom: 8rem; */
}
.router-link-active {
  color: orangered;
}
a:link,
a:visited {
  font-size: 1.8rem;
  padding: 2rem 0;
}
a:hover,
a:active {
  color: black;
}
button {
  background-color: white;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
}
@media (min-width: 38em) {
  .remove {
    display: none;
  }
}
@media (max-width: 38em) {
  .gap {
    gap: 1rem;
    justify-content: space-between;
  }
  .gap.hidden {
    display: none;
  }
}
</style>
