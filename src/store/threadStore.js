const threadStore = {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      thread: [],
    };
  },
  mutations: {
    registerAThread(state, payload) {
      const threadData = [];
      for (const [item, value] of Object.entries(payload)) {
        threadData.push({ [item]: value });
      }
      state.thread = threadData;
    },
    setAThread(state, payload) {
      state.thread.push(payload);
    },
    setFetchTimeStamp(state) {
      state.lastFetch = new Date().getTime();
    },
  },
  actions: {
    async getAllThreads(context, payload) {
      try {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
          return;
        }
        // console.log("fetching");
        const response = await fetch(
          `https://letz-discuss-default-rtdb.firebaseio.com/thread.json`
        );
        if (!response.ok) {
          const error = new Error(
            response.message || "Failed to fetch thread..."
          );
          throw error;
        }
        const responseData = await response.json();
        // console.log(responseData);
        context.commit("registerAThread", responseData);
        context.commit("setFetchTimeStamp");
      } catch (error) {
        // console.log(error);
      }
    },
    async registerAThread(context, payload) {
      try {
        const response = await fetch(
          `https://letz-discuss-default-rtdb.firebaseio.com/thread.json`,
          {
            method: "Post",
            body: JSON.stringify({
              userId: payload.userId,
              tagName: payload.tagName,
              question: payload.question,
              quesDesc: payload.quesDesc,
              timeStamp: payload.timeStamp,
              commentOn: true,
            }),
          }
        );
        if (!response.ok) {
          const error = new Error(
            response.message || "Failed to start thread..."
          );
          throw error;
        }
        const responseData = await response.json();
        // console.log(responseData);
        context.commit("setAThread", {
          [responseData.name]: {
            threadId: responseData.name,
            userId: payload.userId,
            tagName: payload.tagName,
            question: payload.question,
            quesDesc: payload.quesDesc,
            timeStamp: payload.timeStamp,
            commentOn: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getAllThreads(state) {
      // console.log(state.thread);
      return state.thread;
    },
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        // console.log("inside fetch true");
        return true;
      } else {
        // console.log("inside fetch time");
        const currentTimeStamp = new Date().getTime();
        return (currentTimeStamp - lastFetch) / 1000 > 60;
      }
    },
  },
};

export default threadStore;
