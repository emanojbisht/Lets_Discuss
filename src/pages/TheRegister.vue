<template>
  <section class="grid grid-2--cols">
    <div class="block-one flex flex-vertical gap">
      <h1 class="heading-primary">Register</h1>
      <p class="text-size">to use all features...</p>
    </div>
    <div class="block-two">
      <div>
        <p class="error" v-if="registerFailed">
          *Failed to register. Please try again...
        </p>
        <form v-on:submit.prevent="submitForm">
          <div class="flex flex-vertical form-div--one">
            <label class="text-size label" for="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="John Smith"
              v-model.trim="fullName.value"
              @blur="validateField(`fullName`, fullName)"
            />
            <p class="error">{{ fullName.errorMessage }}</p>
          </div>
          <div class="flex flex-vertical form-div--one">
            <label class="text-size label" for="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="letsDisucss@discuss.com"
              v-model.trim="email.value"
              @blur="validateField(`email`, email)"
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
              @blur="validateField(`password`, password)"
            />
            <p class="error">{{ password.errorMessage }}</p>
          </div>
          <button class="btn btn-style">Register</button>

          <p class="register">
            Already have an account?
            <router-link to="/login">Log in</router-link>
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
      registerFailed: false,
      formValid: true,
      fullName: {
        value: "",
        isValid: true,
        errorMessage: "",
      },
      email: {
        value: "",
        isValid: true,
        errorMessage: "",
      },
      password: {
        value: "",
        isValid: true,
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
      } else if (element === "fullName") {
        const reg = /^[a-zA-Z ]+$/;
        if (!reg.test(this.fullName.value)) {
          field.errorMessage = "*Please enter a valid full name.";
          this.formValid = false;
          return;
        }
        field.errorMessage = "";
      } else if (element === "email") {
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!reg.test(this.email.value)) {
          field.errorMessage = "*Please enter a valid email.";
          this.formValid = false;
          return;
        }
        field.errorMessage = "";
      } else if (element === "password") {
        const reg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,}$/;
        if (!reg.test(this.password.value)) {
          field.errorMessage =
            "*Password should contain atleast 1 uppercase, 1 lowercase, 1 digit, and 1 special symbol and must be atleast 6 digit long.";
          this.formValid = false;
          return;
        }
        field.errorMessage = "";
      }
    },
    async submitForm() {
      this.formValid = true;
      this.validateField("fullName", this.fullName);
      this.validateField("email", this.email);
      this.validateField("password", this.password);
      if (this.formValid) {
        try {
          this.registerFailed = false;
          await this.$store.dispatch("signUp", {
            fullName: this.fullName.value,
            email: this.email.value,
            password: this.password.value,
          });
          this.$router.replace("/home");
        } catch (error) {
          this.registerFailed = true;
          // console.log(error.message || "Failed to register");
        }
      }
    },
  },
};
</script>
<style scoped>
.block-one {
  background-image: url("../assets/register-img.jpg");
  background-size: cover;
  background-position: center;
  align-items: center;
  justify-content: center;
  color: white;
}

.block-two {
  padding: 8.6rem 3.2rem;
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
  background-color: lime;
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
