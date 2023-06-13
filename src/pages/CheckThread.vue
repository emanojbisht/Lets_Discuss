<template>
  <div>
    <p class="loading" v-if="!threadValue">Loading...</p>
    <div class="outer-div" v-else>
      <section class="thread">
        <div class="flex gap">
          <div>
            <img src="../assets/faces/face.png" alt="User" />
            <!-- <hr class="queshr" /> -->
          </div>
          <div>
            <div class="flex quesion-header gap">
              <p class="heading-tertiary">{{ myUserName }} asks:</p>
              <span class="tag">{{ threadValue.tagName }}</span>
            </div>
            <h4 class="heading-secondary">
              Question: {{ threadValue.question }}
            </h4>
            <p class="heading-tertiary">
              {{ threadValue.quesDesc }}
            </p>
            <p class="small-heading">🖊 Posted {{ threadValue.timeStamp }}</p>
          </div>
        </div>
      </section>
      <section class="thread comment-section" v-if="threadComments.length > 0">
        <div
          class="flex gap"
          v-for="comment in displayComments"
          :key="comment.replyid"
        >
          <div>
            <img src="../assets/faces/face.png" alt="User" />
            <!-- <hr class="comment-hr" /> -->
          </div>
          <div>
            <p class="heading-tertiary">{{ comment.userName }}</p>
            <p class="heading-tertiary">
              {{ comment.reply }}
            </p>
            <p class="thread-time">🖊 {{ comment.timeStamp }}</p>
          </div>
        </div>
      </section>
      <section class="thread reply-section">
        <div class="flex gap">
          <div>
            <img src="../assets/faces/face.png" alt="User" />
            <!-- <hr class="reply-hr" /> -->
          </div>
          <div>
            <form @submit.prevent="addReply">
              <p class="heading-tertiary">{{ userName }} says :</p>
              <textarea
                cols="90"
                rows="10"
                placeholder="Type your reply here...."
                v-model.trim="userReply"
                @click="userTextArea"
              ></textarea>
              <p class="error" v-if="displayError">{{ errorMessage }}</p>
              <button>Submit reply</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { toRaw } from "vue";
import moment from "moment";
// import threadStore from "@/store/threadStore";
export default {
  data() {
    return {
      threadId: null,
      threadValue: null,
      userId: null,
      userName: null,
      myUserName: null,
      userReply: "",
      displayError: false,
      threadComments: [],
      errorMessage: "*Field cannot be empty",
    };
  },
  computed: {
    displayComments() {
      return this.$store.getters["threadDetail/getThreadData"];
    },
  },

  created() {
    this.userId = this.$store.getters["userId"];
    this.threadId = this.$route.params.threadId;
    this.loadThreads();
  },
  methods: {
    userTextArea(e) {
      if (!this.$store.getters["userIsAuthenticated"]) {
        e.target.disabled = true;
      }
    },
    generateIMg() {
      const number = Math.floor(Math.random() * 8 + 1);
      return `../assets/faces/${number}.jpg`;
    },
    async addReply() {
      if (!this.$store.getters["userIsAuthenticated"]) {
        this.$router.push("/login");
      }
      if (this.userReply === "") {
        this.displayError = true;
        return;
      }

      this.displayError = false;
      await this.$store.dispatch("threadDetail/addAThreadDetail", {
        threadId: this.threadId,
        userName: this.userName,
        userId: this.userId,
        reply: this.userReply,
        timeStamp: moment().format("ll"),
      });
      this.userReply = "";
    },
    async loadThreads(refresh = false) {
      await this.$store.dispatch("threadStore/getAllThreads", {
        forceRefresh: refresh,
      });
      const user = await fetch(
        `https://letz-discuss-default-rtdb.firebaseio.com/users/${this.userId}.json`
      );
      const userData = await user.json();
      await this.$store.dispatch("threadDetail/getAllThreadDetail", {
        threadId: this.threadId,
      });

      this.threadComments = this.$store.getters["threadDetail/getThreadData"];
      for (const key in userData) {
        this.userName = userData[key].fullName;
      }
      const data = await this.$store.getters["threadStore/getAllThreads"];
      const array = [];
      for (const [key] of Object.keys(data)) {
        array.push(toRaw(data[key]));
      }
      array.filter((value) => {
        if (Object.keys(value)[0] === this.threadId) {
          // console.log(Object.values(value)[0]);
          this.threadValue = Object.values(value)[0];
        }
      });
      await this.$store.dispatch("getUserName", {
        userId: toRaw(this.threadValue).userId,
      });
      this.myUserName = this.$store.getters["userName"];
    },
  },
};
</script>
<style scoped>
.outer-div {
  border: 1px dashed gray;
}
section {
  padding: 2.4rem;
}
.comment-section,
.reply-section {
  border-top: 1px dashed gray;
}
img {
  border-radius: 100px;
  height: 8rem;
}
.quesion-header {
  justify-content: space-between;
  align-items: center;
}
.tag {
  text-transform: uppercase;
  letter-spacing: 1rem;
  background-color: blue;
  color: white;
  padding: 0.5rem;
  display: inline-block;
  margin-bottom: 2.4rem;
}
h4,
p {
  margin-bottom: 2.4rem;
}
.thread-time {
  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
}
.thread {
  position: relative;
}
.comment-hr {
  position: absolute;
  border: 1px solid gray;
  height: 100%;
  top: 0;
  left: 5%;
  z-index: -1;
}
.queshr {
  position: absolute;
  border: 1px solid gray;
  height: 100%;
  top: 34%;
  left: 5%;
  z-index: -1;
}
.reply-hr {
  position: absolute;
  border: 1px solid gray;
  height: 28%;
  top: 0%;
  left: 5%;
  z-index: -1;
}
textarea {
  font-size: 2rem;
  padding-left: 1.2rem;
  padding-top: 1.2rem;
  width: 100%;
}
.error {
  color: red;
  font-size: 1.6rem;
}
.loading {
  font-size: 1.8rem;
  margin-left: 10%;
  margin-top: 10%;
}
button {
  font-size: 1.8rem;
  padding: 1rem 3rem;
  background-color: cadetblue;
  color: white;
  border: none;
  cursor: pointer;
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
  .flex {
    flex-direction: column;
  }
  .quesion-header {
    justify-content: start;
    align-items: start;
  }
  .heading-secondary {
    font-size: 2.4rem;
  }
}
</style>
