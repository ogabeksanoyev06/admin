<template>
  <div class="row" id="table-hover-animation">
    <div class="col-12">
      <div class="card m-0">
        <div class="card-content">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="table-responsive shadow">
                  <table class="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Kod</th>
                        <th scope="col">Nomi º</th>
                        <th scope="col">Turi</th>

                        <th scope="col">Faol</th>
                      </tr>
                    </thead>
                    <transition name="fade" :duration="2000">
                      <tbody class="table-bordered">
                        <tr
                          v-for="(facultyItem, index) in facultyList"
                          :key="index"
                        >
                          <th>{{ facultyItem.kod }}</th>
                          <td>{{ facultyItem.name }}</td>
                          <td>
                            {{ facultyItem.faculty_type.name }}
                          </td>
                          <td>
                            <div
                              class="custom-control custom-switch custom-control-inline"
                            >
                              <input
                                class="custom-control-input"
                                type="checkbox"
                                v-model="facultyItem.status"
                              />
                              <label class="custom-control-label"></label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </transition>
                  </table>
                </div>
              </div>
              <!-- <div class="col-md-4">
                <div class="position-top">
                  <ValidationObserver v-slot="{ handleSubmit }">
                    <form
                      class="form form-horizontal shadow p-1"
                      @submit.prevent="handleSubmit(submitForm)"
                    >
                      <div class="form-body">
                        <div class="form-group">
                          <label for="login">
                            Nomi º
                            <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Nom"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <div class="position-relative">
                              <input
                                id="login"
                                type="text"
                                class="form-control"
                                placeholder="Nomi º"
                                disabled
                              />
                            </div>
                            <span
                              class="text-danger"
                              v-if="errors.length > 0"
                              >{{ errors[0] }}</span
                            >
                          </ValidationProvider>
                        </div>
                        <div class="form-group">
                          <label for="tartibi">
                            Kod
                            <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Kod"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <div class="position-relative">
                              <input
                                id="tartibi"
                                type="text"
                                class="form-control"
                                placeholder="Kod"
                                disabled
                              />
                            </div>
                            <span
                              class="text-danger"
                              v-if="errors.length > 0"
                              >{{ errors[0] }}</span
                            >
                          </ValidationProvider>
                        </div>
                        <div class="form-group">
                          <label for="login">
                            Turi
                            <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Tur"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <select class="form-control col" disabled>
                              <option value="0">Turini tanlang</option>
                              <option
                                v-for="(facultyType, i) in facultyType"
                                :key="i"
                              >
                                {{ facultyType.name }}
                              </option>
                            </select>
                            <span
                              class="text-danger"
                              v-if="errors.length > 0"
                              >{{ errors[0] }}</span
                            >
                          </ValidationProvider>
                        </div>
                        <div class="form-group mb-0">
                          <div class="col-12 d-flex justify-content-end">
                            <button
                              type="button"
                              class="btn btn-danger waves-effect waves-light mr-1"
                              disabled
                            >
                              <span
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                                v-if="loading"
                              />
                              O'chirish
                            </button>

                            <button
                              type="submit"
                              class="btn btn-success waves-effect waves-light"
                              disabled
                            >
                              Saqlash
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </ValidationObserver>
                </div>
              </div> -->
            </div>
          </div>
          <div
            class="d-flex justify-content-center"
            v-if="facultyList.length > 0"
          >
            <v-pagination
              v-model="currentPage"
              :classes="bootstrapPaginationClasses"
              :page-count="totalSize"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vPagination from "vue-plain-pagination";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { mapActions, mapGetters } from "vuex";
extend("required", {
  ...required,
  message: "{_field_} maydon to`ldirilsin",
});
export default {
  components: {
    vPagination,
    ValidationObserver,
    ValidationProvider,
  },
  name: "faculty",
  data() {
    return {
      facultyList: [],
      totalSize: 1,
      currentPage: 1,
      bootstrapPaginationClasses: {
        ul: "pagination",
        li: "page-item",
        liActive: "active",
        liDisable: "disabled",
        button: "page-link",
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["facultyType"]),
  },
  methods: {
    ...mapActions(["getFacultyType"]),
    getFacultyList() {
      this.loaded = false;
      this.$api
        .get(`faculty/?page_number=${this.currentPage}&limit=12`)
        .then((res) => {
          if (!res.error) {
            this.facultyList = res.results;
            this.totalSize = res.page_count;
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loaded = true;
        });
    },
    submitForm() {
      //
    },
  },
  watch: {
    currentPage() {
      this.getFacultyList(this.currentPage);
    },
  },
  created() {
    this.getFacultyList();
    this.getFacultyType();
  },
};
</script>

<style lang="scss" scoped></style>
