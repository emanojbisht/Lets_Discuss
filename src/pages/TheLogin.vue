<template>
  <section class="grid grid-2--cols">
    <div class="block-one flex">
      <h1 class="heading-primary">Welcome Back!</h1>
    </div>
    <div class="block-two">
      <h4 class="heading-tertiary block-two-heading">Login</h4>
      <p class="text-size block-two-intro">
        Welcome back! Please login to your account.
      </p>
      <p class="error" v-if="loginFailed">
        *Failed to authenticate. Please try again...
      </p>
      <div>
        <form @submit.prevent="login">
          <div class="flex flex-vertical form-div--one">
            <label class="text-size label" for="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="letsDisucss@discuss.com"
              v-model.trim="email.value"
              @blur="validateField('email', email)"
            />
            <p class="error">{{ email.errorMessage }}</p>
          </div>
          <div class="flex flex-vertical">
            <label class="text-size label" for="Password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
              v-model.trim="password.value"
              @blur="validateField('password', password)"
            />
            <p class="error">{{ password.errorMessage }}</p>
          </div>
          <button class="btn btn-style">Login</button>

          <p class="register">
            New User? <router-link to="/register">Register</router-link>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      loginFailed: false,
      formValid: true,
      email: {
        value: "",
        errorMessage: "",
      },
      password: {
        value: "",
        errorMessage: "",
      },
    };
  },
  methods: {
    validateField(element, field) {
      if (field.value === "") {
        field.errorMessage = "*Required";
        this.formValid = false;
        return;
      }
      field.errorMessage = "";
    },
    async login() {
      this.formValid = true;
      this.validateField("email", this.email);
      this.validateField("password", this.password);
      if (this.formValid) {
        this.loginFailed = false;
        try {
          await this.$store.dispatch("login", {
            email: this.email.value,
            password: this.password.value,
          });
          this.$router.replace("/home");
        } catch (error) {
          this.loginFailed = true;
          // console.log(error.message || "Failed to login user");
        }
      }
    },
  },
};
</script>
<style scoped>
.block-one {
  background-image: url("../assets/login-img.jpg");
  background-size: cover;
  background-position: center;
  align-items: center;
  justify-content: center;
  color: white;
}

.block-two {
  padding: 8.6rem 3.2rem;
}
.block-two-heading {
  margin-bottom: 1.2rem;
}
.block-two-intro {
  margin-bottom: 2.4rem;
}
.form-div--one {
  margin-bottom: 1.6rem;
}
.label {
  margin-bottom: 0.8rem;
}
input {
  height: 4.8rem;
  font-size: 2rem;
  padding-left: 1.2rem;
}
.btn-style {
  font-size: 1.8rem;
  margin-top: 2.4rem;
  width: 100%;
  padding: 2rem 0;
  background-color: purple;
  color: white;
  margin-bottom: 4.8rem;
}
.register {
  font-size: 1.6rem;
}
.error {
  color: red;
  font-size: 1.6rem;
}
@media (max-width: 56em) {
  .block-one {
    padding: 4.8rem;
  }
}
</style>
