<template>
  <div
    class="thread"
    v-for="thread in threads"
    :key="Object.keys(thread)"
    @click="checkThreadOut(Object.keys(thread))"
  >
    <div class="thread-header flex gap">
      <span class="tag">{{ thread[Object.keys(thread)].tagName }}</span>
      <span class="checkThread">➡</span>
    </div>
    <p class="text-size">
      {{ thread[Object.keys(thread)].question }}
    </p>
    <p class="text-size">
      {{ thread[Object.keys(thread)].timeStamp }}
    </p>
    <div class="thread-footer">
      <span class="favourite">🖤</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["threads"],
  emits: ["check-thread"],
  methods: {
    checkThreadOut(threadId) {
      this.$emit("check-thread", threadId);
    },
  },
};
</script>
<style scoped>
.thread {
  padding: 3.2rem;
  box-shadow: 0 20px 30px 0px rgba(0, 0, 0, 0.07);
  cursor: pointer;
}
.thread-header {
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  margin-bottom: 2.4rem;
}
.tag {
  text-transform: uppercase;
  letter-spacing: 1rem;
  background-color: blue;
  color: white;
  padding: 0.5rem;
}
.thread-footer {
  margin-top: 2.4rem;
  font-size: 1.8rem;
}
</style>
