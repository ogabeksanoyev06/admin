<template>
  <div class="bg-full-screen-image blank-page menu-collapsed">
    <div class="app-content content"></div>
  </div>
</template>

<script>
import TokenService from "../../services/TokenService";
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Kiriting {_field_}",
});

export default {
  props: {
    source: String,
  },
  data() {
    return {
      request: {
        login: "",
        password: "",
        client_id: 1,
      },
      errorMes: "",
      authError: "",
      errorStatus: false,
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    loginToSystem() {
      this.$api
        .post("auth/Login/token", this.request)
        .then((data) => {
          if (data.error) {
            this.errorMes = data.error;
            this.request.login = "";
            this.request.password = "";
          } else {
            TokenService.saveToken(data.result.access_token);
            TokenService.saveRefreshToken(data.result.refresh_token);
            TokenService.tokenExpireDate(data.result.expires_in);
            localStorage.setItem("staffId", data.staffId);
            this.$router.push({ name: "dashboard" });
            location.reload();
          }
        })
        .catch((error) => {
          this.errorMes = error.response.data.error.message;
          setTimeout(() => {
            this.errorMes = "";
          }, 4000);
          this.errorStatus = true;
          this.request.login = "";
          this.request.password = "";
        });
    },
  },
};
</script>

<style scoped>
.blank-page .content.app-content {
  overflow: overlay;
  overflow-x: hidden;
}
.blank-page .content-wrapper {
  padding: 0 !important;
  margin-top: 0;
}
.blank-page .content-wrapper .flexbox-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100vh;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
</style>
