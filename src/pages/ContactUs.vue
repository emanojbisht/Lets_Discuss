<template>
  <section class="flex">
    <form action="mailto:emanojbisht7718@gmail.com">
      <div class="div-desc">
        <h4 class="heading-tertiary">Need support?</h4>
        <p class="text-size">Contact us if your want further assistancez</p>
      </div>
      <div class="flex flex-vertical form-div--one">
        <label class="text-size label" for="name">Full Name</label>
        <input type="text" id="name" placeholder="John Smith" />
      </div>
      <div class="flex flex-vertical form-div--one">
        <label class="text-size label" for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="letsDisucss@discuss.com"
        />
      </div>
      <div class="flex flex-vertical form-div--one">
        <label class="text-size label" for="query">
          Please enter details of your request
        </label>
        <textarea id="query" name="body" cols="30" rows="5"></textarea>
      </div>
      <button class="btn btn-style">Submit</button>
    </form>
  </section>
</template>
<style scoped>
section {
  background-image: url("../assets/contact-us.jpg");
  background-size: cover;
  background-position: center;
  justify-content: end;
  align-items: center;
  padding: 2.4rem;
}
form {
  width: 40%;
}
.div-desc {
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
textarea {
  font-size: 2rem;
  padding-left: 1.2rem;
}
.btn-style {
  font-size: 1.8rem;
  margin-top: 2.4rem;
  width: 100%;
  padding: 2rem 0;
  background-color: red;
  color: white;
  margin-bottom: 4.8rem;
}
.register {
  font-size: 1.6rem;
}
@media (max-width: 56em) {
  section {
    background-position: left;
    justify-content: end;
    align-items: center;
    padding: 2.4rem;
  }
  form {
    width: 60%;
  }
}
@media (max-width: 38em) {
  form {
    width: 100%;
  }
}
</style>
