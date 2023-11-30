import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import VueAxios from "vue-axios";
import Api, { baseURL } from "./services/ApiPlugin";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import VueLazyload from "vue-lazyload";
// import TokenService from "./services/TokenService";
import axios from "axios/index";
import Moment from "vue-moment";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

import VueKatex from "vue-katex";
import "katex/dist/katex.min.css";

Vue.use(VueKatex, {
  globalOptions: {
    displayMode: true,
  },
});

Vue.config.productionTip = false;

// axios.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       TokenService.removeToken();
//       TokenService.removeRefreshToken();
//       router.push({ name: "login" });
//     }
//     return Promise.reject(error);
//   }
// );

window.axios = axios;

Vue.use(VueAxios, axios);
Vue.use(Api);
Vue.use(VueLazyload);
Vue.use(Moment);
Vue.use(VueToast);

Vue.component("upload-image", VueUploadMultipleImage);

window.education = new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

Vue.mixin({
  data() {
    return {
      baseURL,
    };
  },
  methods: {
    isEmptyObject(object) {
      return Object.keys(object).length !== 0;
    },
    closeModal() {
      $("#modal-component").modal("hide");
    },
    notificationMessage(message, type) {
      this.$toast.open({
        message: message,
        type: type,
        position: "top-right",
      });
    },
    setTestQuestionProperties(topic, subject, level) {
      this.$store.commit("updateCommitCurrentTopicId", topic);
      this.$store.commit("updateCommitCurrentSectionId", subject);
      this.$store.commit("updateCommitQuestionLevel", level);
    },
    setMathPlugin() {
      window.renderMathInElement(
        document.getElementById("test_editing_component"),
        {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true },
          ],
          Macros: {
            "\\par": "\\newline",
          },
        }
      );
    },
    setMathPluginById(elementId) {
      window.renderMathInElement(document.getElementById(elementId), {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true },
        ],
        Macros: {
          "\\par": "\\newline",
        },
      });
    },
    mathStyled(question) {
      return window.katex.renderToString(question, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true },
        ],
        throwOnError: false,
        macros: {
          "\\par": "\\newline",
          "\\ul": "",
          " ": "\\space",
          $: "",
        },
      });
    },
  },
});
