<template>
  <section>
    <p class="text-size">Start a thread to get started..</p>
    <form class="flex flex-vertical gap" @submit.prevent="postQuestion">
      <div>
        <select ref="selctEl">
          <option
            v-for="(cat, index) in category"
            :key="index"
            :value="cat.category"
          >
            {{ cat.category }}
          </option>
        </select>
      </div>
      <div class="flex flex-vertical questionDiv">
        <label class="text-size" for="question"> Question </label>
        <textarea
          id="question"
          cols="30"
          rows="3"
          placeholder="Why the color of sky is blue?"
          v-model.trim="question"
        ></textarea>
        <p class="questionCharacters" v-if="quesCount">
          {{ quesCount }} Characters left
        </p>
      </div>
      <div class="flex flex-vertical questionDiv">
        <label class="text-size" for="question"> Description </label>
        <textarea
          id="question"
          cols="30"
          rows="5"
          placeholder="Like your thoughts"
          v-model.trim="quesDesc"
        ></textarea>
        <p class="questionCharacters" v-if="quesDescCount">
          {{ quesDescCount }} characters left
        </p>
      </div>

      <p v-if="fieldEmpty" class="error">
        Fields can't be empty. Please make a selection
      </p>
      <button class="btn thread-btn">Start a thread</button>
    </form>
  </section>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      fieldEmpty: false,
      quesCount: null,
      quesDescCount: null,
      category: [
        { category: "Category", color: "null" },
        { category: "Exchange", color: "cyan" },
        { category: "Politics", color: "blue" },
        { category: "Pets", color: "null" },
        { category: "Nature", color: "null" },
        { category: "Social", color: "null" },
        { category: "Music", color: "null" },
        { category: "Movies", color: "null" },
        { category: "Entertainment", color: "null" },
        { category: "Computer", color: "null" },
        { category: "Web Development", color: "null" },
        { category: "Youtube", color: "null" },
        { category: "Video", color: "null" },
        { category: "Others", color: "null" },
      ],
      question: "",
      quesDesc: "",
    };
  },
  watch: {
    question() {
      if (this.question.length > 130) {
        this.quesCount = 150 - this.question.length;
        return;
      }
      this.quesCount = null;
    },
    quesDesc() {
      if (this.quesDesc.length > 1000) {
        this.quesDescCount = 1050 - this.quesDesc.length;
        return;
      }
      this.quesDescCount = null;
    },
  },
  mounted() {
    const firstOptionSelect = this.$refs.selctEl[0];
    firstOptionSelect.setAttribute("disabled", "disabled");
    firstOptionSelect.setAttribute("selected", true);
  },
  methods: {
    postQuestion() {
      const category = this.$refs.selctEl.value;
      const question = this.question.slice(0, 151);
      const questionDesc = this.quesDesc.slice(0, 1051);
      const timeStamp = moment().format("ll");
      const userId = this.$store.getters["userId"];
      if (
        category === "Category" ||
        this.question === "" ||
        this.quesDesc === ""
      ) {
        this.fieldEmpty = true;
        return;
      }
      this.fieldEmpty = false;
      this.$store.dispatch("threadStore/registerAThread", {
        userId: userId,
        tagName: category,
        question: question,
        quesDesc: questionDesc,
        timeStamp: timeStamp,
      });
      this.$router.push("/mythreads");
    },
  },
};
</script>
<style scoped>
select {
  width: 30%;
  height: 4.8rem;
  font-size: 2rem;
  margin-top: 3.2rem;
}
input,
textarea {
  font-size: 1.8rem;
  padding: 2.4rem;
}
.thread-btn {
  padding: 1rem 2rem;
  color: white;
  background-color: orangered;
  font-size: 1.6rem;
  width: 50%;
}
.error {
  font-size: 1.6rem;
  color: red;
}
.questionDiv {
  position: relative;
}
.questionCharacters {
  position: absolute;
  right: 0;
  font-size: 1.6rem;
  color: orangered;
  top: 5%;
}
@media (max-width: 56em) {
  select {
    width: 100%;
  }
}
@media (max-width: 38em) {
  select {
    width: 90%;
  }
}
</style>
