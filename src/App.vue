<template>
  <div class="container">
    <DisplayHeader v-if="showheaderHome"
      ><HomeHeader></HomeHeader
    ></DisplayHeader>
    <DisplayHeader v-else><TheHeader></TheHeader></DisplayHeader>
    <!-- <button @click="isAuthenticated">is authenticated</button> -->
    <router-view v-slot="slotProps">
      <Transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </Transition>
    </router-view>
  </div>
</template>

<script>
import DisplayHeader from "./components/layout/DisplayHeader.vue";
import TheHeader from "@/components/ui/TheHeader.vue";
import HomeHeader from "./components/ui/HomeHeader.vue";
export default {
  computed: {
    showheaderHome() {
      return this.$store.getters["userIsAuthenticated"];
    },
  },
  components: {
    TheHeader,
    DisplayHeader,
    HomeHeader,
  },
  created() {
    this.$store.dispatch("tryLogin");
  },
  // methods: {
  //   isAuthenticated() {
  //     console.log(this.$store.getters["userIsAuthenticated"]);
  //   },
  // },
};
</script>

<style>
html {
  font-size: 62.5%;
}
body {
  font-family: sans-serif;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  max-width: 120rem;
  margin: 0 auto;
}
.small-heading {
  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 0.5rem;
}
.heading-primary {
  font-size: 5.2rem;
}
.heading-secondary {
  font-size: 3.6rem;
}
.heading-tertiary {
  font-size: 2.4rem;
}
.text-size {
  font-size: 1.8rem;
  line-height: 1.5;
}
.grid {
  display: grid;
}
.grid-2--cols {
  grid-template-columns: repeat(2, 1fr);
}
.grid-3--cols {
  grid-template-columns: repeat(3, 1fr);
}
.gap {
  gap: 2rem;
}
.flex {
  display: flex;
}
.flex-vertical {
  flex-direction: column;
}
.btn {
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
a:link,
a:visited {
  text-decoration: none;
  cursor: pointer;
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
@media (max-width: 75em) {
  .container {
    padding: 2.4rem;
  }
}
@media (max-width: 56em) {
  .grid-2--cols {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 38em) {
}
</style>
