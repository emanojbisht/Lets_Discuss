<template>
  <div>
    <h1>Home</h1>
    <!-- <button @click="loadThreads(true)">Refresh</button> -->
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
    };
  },
  created() {
    this.loadThreads();
  },
  methods: {
    async loadThreads(refresh = false) {
      await this.$store.dispatch("threadStore/getAllThreads", {
        forceRefresh: refresh,
      });
      const data = await this.$store.getters["threadStore/getAllThreads"];
      const array = [];
      for (const [key] of Object.keys(data)) {
        array.unshift(toRaw(data[key]));
      }
      this.thread = array;
    },

    checkThread(threadId) {
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
