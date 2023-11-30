<template>
  <div class="card m-0">
    <div class="card-content">
      <div class="card-header">
        <h4>Mening profilim</h4>
      </div>
      <div class="card-body">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            class="form form-horizontal"
            @input="changed = true"
            @submit.prevent="handleSubmit(updateProfile)"
          >
            <div class="row">
              <div class="col-md-4">
                <div id="foto">
                  <upload-image
                    :data-images="images"
                    :multiple="false"
                    :primaryText="'Mening rasmim'"
                    :dragText="'Rasmni yuklash'"
                    :browseText="''"
                    @upload-success="uploadImageSuccess"
                    @before-remove="beforeRemoveImage"
                    @edit-image="editImage"
                    idUpload="productUpdateId"
                    editUpload="productUpdateEditId"
                    :disabled="loading"
                  />
                </div>
              </div>
              <div class="col-md-8">
                <ValidationProvider
                  name="Ism"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <fieldset class="form-label-group mt-1">
                    <input
                      id="firstName"
                      type="text"
                      class="form-control"
                      placeholder="Ism"
                      :disabled="loading"
                      v-model="user.firstName"
                    />
                    <label for="firstName">Ism</label>
                    <span class="text-danger" v-if="errors.length > 0">{{
                      errors[0]
                    }}</span>
                  </fieldset>
                </ValidationProvider>
                <ValidationProvider
                  name="Familiya"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <fieldset class="form-label-group mt-1">
                    <input
                      id="lastName"
                      type="text"
                      class="form-control"
                      placeholder="Familiya"
                      :disabled="loading"
                      v-model="user.lastName"
                    />
                    <label for="lastName">Familiya</label>
                  </fieldset>
                  <span class="text-danger" v-if="errors.length > 0">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
                <fieldset class="form-label-group mt-1">
                  <input
                    id="middleName"
                    type="text"
                    class="form-control"
                    placeholder="Sharifi"
                    :disabled="loading"
                    v-model.trim="user.middleName"
                  />
                  <label for="lastName">Sharifi</label>
                </fieldset>
              </div>
              <div class="col-md-6">
                <fieldset class="form-label-group mt-1">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    placeholder="Elektron pochta"
                    :disabled="loading"
                    v-model.trim="user.email"
                  />
                  <label for="lastName">Elektron pochta</label>
                </fieldset>
              </div>
              <div class="col-md-6">
                <fieldset class="form-label-group mt-1">
                  <input
                    id="telefon"
                    type="text"
                    class="form-control"
                    placeholder="Telefon"
                    :disabled="loading"
                    v-model="user.telefon"
                  />
                  <label for="lastName">Telefon</label>
                </fieldset>
              </div>
              <div class="col-md-12 form-group d-flex justify-content-end">
                <button
                  type="submit"
                  class="btn btn-success waves-effect waves-light"
                  :disabled="loading || !changed"
                  v-if="successMessage === ''"
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    v-if="loading"
                  />
                  Yangilash
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  disabled="disabled"
                  v-if="successMessage !== ''"
                >
                  <i class="feather icon-check" />
                  {{ successMessage }}
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "Kiriting {_field_}",
});

export default {
  name: "ProfileForm",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      user: {},
      images: [],
      errorMessage: "",
      loading: false,
      successMessage: "",
      changed: false,
    };
  },
  methods: {
    getUser() {
      this.user = {
        firstName: this.$store.state.currentUser.firstName,
        lastName: this.$store.state.currentUser.lastName,
        middleName: this.$store.state.currentUser.middleName,
        email: this.$store.state.currentUser.email,
        telefon: this.$store.state.currentUser.telefon,
        photoFile: null,
      };
      this.images.push({
        path: `${this.baseURL}${this.$store.state.currentUser.photo}`,
        default: 1,
        highlight: 1,
        caption: "caption to display. receive", // Optional
      });
    },
    updateProfile() {
      this.$api
        .put("admin/Management/profile", this.userFormData())
        .then((res) => {
          if (!res.error && res.statusCode === 200) {
            this.$store.commit("commitCurrentUser", res.result);
            this.succMessage("Обновлено");
          } else {
            this.notificationMessage(res.error, "error");
          }
        })
        .catch((err) => {
          this.notificationMessage("Ошибка", "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    userFormData() {
      let form = new FormData();
      for (let prop in this.user) form.append(prop, this.user[prop]);

      return form;
    },
    uploadImageSuccess(formData, index, fileList) {
      this.user.photoFile = formData.get("file");
    },
    beforeRemoveImage(index, done, fileList) {
      if (this.user.photoFile) {
        this.deleteStoredImage(this.user.photo);
        this.user.imageFormData = null;
        this.user.photoFile = null;
      }
      done();
    },
    editImage(formData, index, fileList) {
      this.images = [];
      this.user.imageFormData = formData;
      this.user.photoFile = null;
    },
    async deleteStoredImage(imageName) {
      let params = {};
      params.photo = imageName;
      return this.$api
        .post("file-uploads/delete-image", params)
        .then((res) => {
          if (res) {
            return res;
          } else {
            return false;
          }
        })
        .catch((error) => {
          return false;
        })
        .finally((item) => {
          ///
        });
    },
    succMessage(successMessage) {
      this.successMessage = successMessage;
      this.notificationMessage(successMessage, "success");
      setTimeout(() => {
        this.successMessage = "";
      }, 1000);
    },
  },
  computed: {},
  mounted() {
    this.getUser();
  },
};
</script>

<style scoped></style>
