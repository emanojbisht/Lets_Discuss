const threadDetail = {
  namespaced: true,
  state() {
    return {
      threadId: null,
      threadComments: [],
    };
  },
  mutations: {
    addAThreadDetail(state, payload) {
      //   console.log(payload);
      for (const item in payload) {
        state.threadComments.push(payload[item]);
      }
    },
  },
  actions: {
    async addAThreadDetail(context, payload) {
      try {
        const response = await fetch(
          `https://letz-discuss-default-rtdb.firebaseio.com/threadDetail/${payload.threadId}.json`,
          {
            method: "Post",
            body: JSON.stringify({
              userId: payload.userId,
              reply: payload.reply,
              userName: payload.userName,
              timeStamp: payload.timeStamp,
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
        context.commit("addAThreadDetail", {
          [responseData.name]: {
            replyid: responseData.name,
            userId: payload.userId,
            reply: payload.reply,
            userName: payload.userName,
            timeStamp: payload.timeStamp,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getAllThreadDetail(context, payload) {
      context.state.threadComments = [];
      try {
        const response = await fetch(
          `https://letz-discuss-default-rtdb.firebaseio.com/threadDetail/${payload.threadId}.json`
        );
        if (!response.ok) {
          const error = new Error(
            response.message || "Failed to start thread..."
          );
          throw error;
        }
        const responseData = await response.json();
        // console.log(responseData);
        const array = [];
        for (const item in responseData) {
          array.push(responseData[item]);
        }

        context.commit("addAThreadDetail", array);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getThreadData(state) {
      return state.threadComments;
    },
  },
};

export default threadDetail;
