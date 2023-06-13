<template>
  <div>
    <h1>My threads</h1>
    <div class="grid grid-3--cols gap">
      <ThreadTopic
        :threads="getMyThread()"
        @check-thread="checkThread"
      ></ThreadTopic>
    </div>
  </div>
</template>
<script>
import ThreadTopic from "@/components/layout/ThreadTopic.vue";
import { toRaw } from "vue";
export default {
  components: {
    ThreadTopic,
  },
  data() {
    return {
      thread: [],
      myThreads: [],
    };
  },
  created() {
    this.loadThreads(true);
  },
  methods: {
    async loadThreads(refresh = false) {
      await this.$store.dispatch("threadStore/getAllThreads", {
        forceRefresh: refresh,
      });
      const data = await this.$store.getters["threadStore/getAllThreads"];
      const array = [];
      for (const [key] of Object.keys(data)) {
        array.push(toRaw(data[key]));
      }
      this.thread = array;
    },
    getMyThread() {
      const userId = this.$store.getters["userId"];
      this.thread.forEach((el) => {
        const value = Object.values(el);
        if (userId === value[0].userId) {
          this.myThreads.push(toRaw(el));
        }
      });
      return this.myThreads;
    },
    checkThread(threadId) {
      // console.log(threadId);
      this.$router.push(`/home/${threadId}`);
    },
  },
};
</script>
<style scoped>
@media (max-width: 56em) {
  .grid-3--cols {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 46em) {
  .grid-3--cols {
    grid-template-columns: 1fr;
  }
}
</style>
