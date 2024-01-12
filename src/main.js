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
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";

Vue.use(Element, { locale });

Vue.use(VueKatex, {
  globalOptions: {
    displayMode: true,
  },
});

Vue.config.productionTip = false;

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
  },
});
