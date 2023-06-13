<template>
  <div>
    <h1>Thread Play</h1>
    <p class="loading" v-if="threadValue">Loading...</p>
    <div class="grid grid-3--cols gap">
      <ThreadTopic :threads="thread" @check-thread="checkThread"></ThreadTopic>
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
      threadValue: false,
    };
  },
  created() {
    this.loadThreads();
  },
  methods: {
    async loadThreads(refresh = false) {
      this.threadValue = true;
      await this.$store.dispatch("threadStore/getAllThreads", {
        forceRefresh: refresh,
      });
      const data = await this.$store.getters["threadStore/getAllThreads"];
      const array = [];
      for (const [key] of Object.keys(data)) {
        array.push(toRaw(data[key]));
      }
      this.thread = array;
      this.threadValue = false;
    },
    checkThread(threadId) {
      this.$router.push(`/home/${threadId}`);
    },
  },
};
</script>
<style scoped>
.loading {
  font-size: 1.8rem;
  margin-left: 10%;
  margin-top: 10%;
}
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
