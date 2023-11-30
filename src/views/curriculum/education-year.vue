<template>
  <div class="row" id="table-hover-animation">
    <div class="col-12">
      <div class="card m-0">
        <div class="card-content">
          <div class="card-body">
            <div class="row">
              <div class="col-md-8">
                <div class="table-responsive shadow">
                  <table class="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Nomi º</th>
                        <th scope="col">Kod</th>
                        <th scope="col">Joriy holat</th>
                        <th scope="col">O'zgartirilgan</th>
                        <th scope="col">Faol</th>
                      </tr>
                    </thead>
                    <transition name="fade" :duration="2000">
                      <tbody class="table-bordered">
                        <tr
                          v-for="(item, index) in educationYearP"
                          :key="index"
                        >
                          <th>{{ item.name }}</th>
                          <td>{{ item.code }}</td>
                          <td
                            :class="item.current ? 'bg-gradient-success' : ''"
                          >
                            {{ item.current ? "Ha" : "Yo`q" }}
                          </td>
                          <td>
                            {{
                              $moment(item.update).format("YYYY-MM-DD HH:ss")
                            }}
                          </td>
                          <td>
                            <div
                              class="custom-control custom-switch custom-control-inline"
                            >
                              <input
                                class="custom-control-input"
                                type="checkbox"
                                v-model="item.status_action"
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
              <div class="col-md-4">
                <div class="position-top">
                  <ValidationObserver v-slot="{ handleSubmit }">
                    <form
                      class="form form-horizontal shadow p-1"
                      @submit.prevent="handleSubmit(submitForm)"
                    >
                      <div class="form-body">
                        <div class="form-group">
                          <label for="login">
                            O'quv yili
                            <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="O'quv yili"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <select class="form-control col">
                              <option value="0">O'quv yilini tanlang</option>
                              <option
                                v-for="(item, i) in educationYear"
                                :key="i"
                              >
                                {{ item.name }}
                              </option>
                            </select>
                            <span
                              class="text-danger"
                              v-if="errors.length > 0"
                              >{{ errors[0] }}</span
                            >
                          </ValidationProvider>
                        </div>
                        <div class="form-group">
                          <label for="login">
                            Semestr turi
                            <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Semestr turi"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <select class="form-control col">
                              <option value="0">Semestr turini tanlang</option>
                              <option
                                v-for="(facultyItem, i) in facultyList"
                                :key="i"
                              >
                                {{ facultyItem.name }}
                              </option>
                            </select>
                            <span
                              class="text-danger"
                              v-if="errors.length > 0"
                              >{{ errors[0] }}</span
                            >
                          </ValidationProvider>
                        </div>
                        <div class="form-group">
                          <div class="d-flex align-items-center">
                            <div class="position-relative has-icon-left">
                              <div class="vs-checkbox-con vs-checkbox-primary">
                                <input
                                  :disabled="loading"
                                  id="isActive"
                                  type="checkbox"
                                />
                                <span class="vs-checkbox">
                                  <span class="vs-checkbox--check">
                                    <i class="vs-icon feather icon-check" />
                                  </span>
                                </span>
                              </div>
                            </div>
                            <label for="isActive">Joriy holat</label>
                          </div>
                        </div>
                        <div class="form-group mb-0">
                          <div class="col-12 d-flex justify-content-end">
                            <button
                              type="button"
                              class="btn btn-danger waves-effect waves-light mr-1"
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
                            >
                              Saqlash
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </ValidationObserver>
                </div>
              </div>
            </div>
          </div>
          <div
            class="d-flex justify-content-center"
            v-if="educationYearP.length > 0"
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
  name: "curriculum",
  data() {
    return {
      educationYearP: [],
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
    ...mapGetters(["educationYear"]),
  },
  watch: {
    currentPage() {
      this.getEducationYearP(this.currentPage);
    },
  },
  methods: {
    ...mapActions(["getEducationYear"]),
    getEducationYearP() {
      this.loaded = false;
      this.$api
        .get(`educationyear/?limit=10&page_number=${this.currentPage}`)
        .then((res) => {
          if (res) {
            this.educationYearP = res.results;
            this.totalSize = res.page_count;
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loaded = true;
        });
    },
  },
  created() {
    this.getEducationYearP();
    this.getEducationYear();
  },
};
</script>

<style lang="scss" scoped></style>
