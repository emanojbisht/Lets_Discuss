<template>
  <section class="grid grid-2--cols gap">
    <div class="block-one">
      <span class="small-heading block-one-tag">More Offers</span>
      <h1 class="heading-primary">There is something else for you</h1>
      <button class="btn btn-style" @click="login">Login to check out</button>
    </div>
    <div class="block-two">
      <div class="sub-block-one flex flex-vertical" @click="goTothreadPlay">
        <div class="flex flex-space gap">
          <p class="small-heading">World of hearing technology</p>
          <span><ion-icon name="arrow-forward-outline"></ion-icon></span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 ion-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </span>
        </div>
        <h2 class="heading-secondary">View our blog</h2>
      </div>
      <div class="sub-block-two">
        <div class="block-history" @click="moveToAboutUs">
          <div class="flex flex-space gap">
            <p class="small-heading">Discover our History</p>
            <span><ion-icon name="arrow-forward-outline"></ion-icon></span>
          </div>
          <h3 class="heading-secondary">About us</h3>
        </div>
        <div class="block-contact" @click="moveToContactUs">
          <div class="flex flex-space gap">
            <p class="small-heading">Have some Questions</p>
            <span><ion-icon name="paper-plane-outline"></ion-icon></span>
          </div>
          <h3 class="heading-secondary">Contact us</h3>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  methods: {
    moveToAboutUs() {
      this.$router.push("/aboutus");
    },
    moveToContactUs() {
      this.$router.push("/contactus");
    },
    login() {
      this.$router.push("/login");
    },
    goTothreadPlay() {
      this.$router.push("/threadPlay");
    },
  },
};
</script>
<style scoped>
.block-one {
  background-image: url("../assets/main-page-1.jpg");
  background-size: cover;
  background-position: center;
  padding: 4.8rem;
}
.block-one-tag {
  color: white;
}

.heading-primary {
  font-size: 5.2rem;
  color: white;
  padding-right: 25%;
  margin-bottom: 9.6rem;
}
.btn-style {
  font-size: 2rem;
  padding: 1.8rem 4rem;
  background-color: orangered;
  color: white;
}
.block-two {
  display: grid;
  gap: 2rem;
}
.sub-block-one {
  /* background-image: url("../assets/main-page-2.jpg"); */
  background-size: cover;
  background-position: center;
  padding: 3.2rem;
  background-image: linear-gradient(
      to right,
      rgba(12, 12, 12, 0.395),
      rgba(133, 225, 241, 0.138)
    ),
    url("../assets/main-page-2.jpg");
  color: white;
  cursor: pointer;
  justify-content: space-between;
}
.sub-block-two {
  display: flex;
  gap: 2rem;
}
.block-history {
  background-color: purple;
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
.block-contact {
  background-color: lime;
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
ion-icon {
  font-size: 2rem;
}
@media (max-width: 56em) {
  .sub-block-one,
  .block-history {
    gap: 9.6rem;
  }
  .flex-space {
    justify-content: space-between;
  }
}
@media (max-width: 38em) {
  .block-one {
    padding: 2.4rem;
  }
  .sub-block-two {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .block-contact {
    gap: 9.6rem;
  }
}
</style>
