<template>
  <div class="card m-0">
    <div class="card-content">
      <div class="card-header">
        <h4>Parolni o'zgartirish</h4>
      </div>
      <div class="card-body pt-0">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            class="form form-horizontal"
            @input="changed = true"
            @submit.prevent="handleSubmit(changePassword)"
          >
            <div class="alert alert-danger" v-if="errMessage.length > 0">
              {{ errMessage }}
              <button
                type="button"
                class="close general-text"
                @click="errMessage = ''"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <ValidationProvider
              name="Eski parol"
              rules="required"
              v-slot="{ errors }"
            >
              <fieldset class="form-label-group mt-1">
                <input
                  id="oldPassword"
                  type="password"
                  class="form-control"
                  placeholder="Eski parol"
                  :disabled="loading"
                  v-model="model.oldPassword"
                />
                <label for="oldPassword">Eski parol</label>
                <span class="text-danger" v-if="errors.length > 0">{{
                  errors[0]
                }}</span>
              </fieldset>
            </ValidationProvider>
            <ValidationObserver>
              <ValidationProvider
                name="Yangi parol"
                rules="required"
                v-slot="{ errors }"
                vid="model.newPassword"
              >
                <fieldset class="form-label-group mt-1">
                  <input
                    id="newPassword"
                    type="password"
                    class="form-control"
                    placeholder="Yangi parol"
                    :disabled="loading"
                    v-model="model.newPassword"
                  />
                  <label for="newPassword">Yangi parol</label>
                  <span class="text-danger" v-if="errors.length > 0">{{
                    errors[0]
                  }}</span>
                </fieldset>
              </ValidationProvider>
              <ValidationProvider
                name="подтверждения пароля"
                rules="required|confirmed:model.newPassword"
                v-slot="{ errors }"
              >
                <fieldset class="form-label-group mt-1">
                  <input
                    id="confirmPassword"
                    type="password"
                    class="form-control"
                    placeholder="Yangi parolni tasdiqlang"
                    :disabled="loading"
                    v-model="confirmNewPassword"
                  />
                  <label for="confirmPassword">Yangi parolni tasdiqlang</label>
                  <span class="text-danger" v-if="errors.length > 0">{{
                    errors[0]
                  }}</span>
                </fieldset>
              </ValidationProvider>
            </ValidationObserver>
            <div class="form-group mb-0 d-flex justify-content-end">
              <button
                type="submit"
                class="btn btn-success waves-effect waves-light"
                :disabled="loading || !changed"
              >
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  v-if="loading"
                />
                Tahrirlash
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required, confirmed } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Kiriting {_field_}",
});
extend("confirmed", {
  ...confirmed,
  message: "Пароли не совпадают",
});
export default {
  name: "ChangePassword",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      model: {
        userId: null,
        oldPassword: "",
        newPassword: "",
      },
      confirmNewPassword: "",
      changed: false,
      loading: false,
      successMessage: "",
      errMessage: "",
    };
  },
  methods: {
    async changePassword() {
      this.loading = true;
      try {
        const res = await this.$api.post(
          "admin/Management/ChangePassword",
          this.model
        );
        if (!res.error && res.statusCode === 200) {
          this.notificationMessage("Sizning paroling o`zgardi", "success");
          this.createModelObject();
        } else {
          this.errMessage = res.error;
        }
      } catch (e) {
        this.errMessage = e.response.data.error.message;
        console.log(e);
      } finally {
        this.loading = false;
        this.changed = false;
      }
    },
    createModelObject() {
      this.model = {
        userId: this.$store.currentUser.id,
        oldPassword: "",
        newPassword: "",
      };
      this.confirmNewPassword = "";
    },
  },
  mounted() {
    this.model.userId = this.$store.state.currentUser.id;
  },
};
</script>

<style scoped></style>
