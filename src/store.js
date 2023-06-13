import { createStore } from "vuex";
import threadStore from "./store/threadStore";
import threadDetail from "./store/threadDetail";
const store = createStore({
  modules: {
    threadStore: threadStore,
    threadDetail: threadDetail,
  },
  state() {
    return {
      threadUserName: null,
      userId: null,
      token: null,
      expirationDate: null,
    };
  },
  mutations: {
    registerUser(state, payload) {
      state.userId = payload.userId;
      state.token = payload.token;
      state.expirationDate = payload.expirationDate;
    },
  },
  actions: {
    async signUp(context, payload) {
      return context.dispatch("registerUser", { ...payload, type: "signup" });
    },
    async login(context, payload) {
      return context.dispatch("registerUser", { ...payload, type: "login" });
    },
    logout(context) {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      context.commit("registerUser", {
        userId: null,
        token: null,
        expirationDate: null,
      });
    },
    tryLogin(context) {
      context.commit("registerUser", {
        userId: localStorage.getItem("userId"),
        token: localStorage.getItem("token"),
        expirationDate: localStorage.getItem("expirationDate"),
      });
    },
    async addUserToDataBase(context, payload) {
      try {
        const response = await fetch(
          `https://letz-discuss-default-rtdb.firebaseio.com/users/${payload.userId}.json`,
          {
            method: "Post",
            header: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              fullName: payload.fullName,
            }),
          }
        );

        if (!response.ok) {
          const error = new Error(
            response.message || "Failed to Register user to db..."
          );
          throw error;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getUserName(context, payload) {
      const response = await fetch(
        `https://letz-discuss-default-rtdb.firebaseio.com/users/${payload.userId}.json`
      );
      const responseData = await response.json();

      context.state.threadUserName = Object.values(responseData)[0].fullName;
    },
    async registerUser(context, payload) {
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDd9wPKJ1Y9nL5ZxPYSXc-bGy_n_06IGX0`;
      if (payload.type === "login") {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
          AIzaSyDd9wPKJ1Y9nL5ZxPYSXc-bGy_n_06IGX0`;
      }

      const response = await fetch(url, {
        method: "Post",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to Register..."
        );
        throw error;
      }
      if (payload.type === "signup") {
        context.dispatch("addUserToDataBase", {
          userId: responseData.localId,
          fullName: payload.fullName,
        });
      }
      // console.log(responseData);
      localStorage.setItem("userId", responseData.localId);
      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("expirationDate", responseData.expiresIn);
      context.commit("registerUser", {
        userId: responseData.localId,
        token: responseData.idToken,
        expirationDate: responseData.expiresIn,
      });
    },
  },
  getters: {
    userIsAuthenticated(state) {
      return !!state.token;
    },
    userId(state) {
      return state.userId;
    },
    userName(state) {
      return state.threadUserName;
    },
  },
});
export default store;
