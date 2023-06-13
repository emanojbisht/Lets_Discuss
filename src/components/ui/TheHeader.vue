<template>
  <header class="flex">
    <router-link to="/">Lets Discuss</router-link>
    <ul class="flex gap">
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/threadPlay">Thread Play</router-link>
      <router-link to="/contactus">Contact Us</router-link>
    </ul>
  </header>
</template>
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
@media (max-width: 38em) {
  header {
    display: block;
  }
  .gap {
    gap: 1rem;
    justify-content: space-between;
  }
}
</style>
