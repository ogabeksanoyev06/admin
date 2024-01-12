<template>
  <div class="row" id="table-hover-animation">
    <div class="col-12">
      <div class="card m-0">
        <div class="card-content">
          <div class="card-header">
            <div class="row w-100">
              <div class="col-12 col-md-6 col-xl-4">
                <div class="form-group">
                  <select class="form-control col" v-model="select_value">
                    <option value="">O'quv yilini tanlang</option>
                    <option
                      v-for="(item, i) in educationYear"
                      :key="i"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col-12 col-md-6 col-xl-4">
                <div class="form-group">
                  <div class="position-relative">
                    <input
                      id="search"
                      type="text"
                      class="form-control"
                      placeholder="O'quv reja Nomi bo'yicha qidirish"
                      v-model="input_value"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="table-responsive shadow">
                  <table class="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Nomi º</th>
                        <th scope="col">Fakultet</th>
                        <th scope="col">Tasdiq</th>
                        <th scope="col">Faol</th>
                      </tr>
                    </thead>
                    <transition name="fade" :duration="2000">
                      <tbody class="table-bordered">
                        <tr v-for="(item, index) in curriculum" :key="index">
                          <td>
                            {{ item.name }}
                            <p class="text-muted mb-0">
                              {{ item.educationform.name }}
                            </p>
                          </td>
                          <td>
                            {{ item.name }}
                            <p class="text-muted mb-0">
                              {{ item.educationtype.name }} /
                              {{ item.markingsystem.name }}
                            </p>
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
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    vPagination,
  },
  name: "curriculum",
  data() {
    return {
      curriculum: [],
      input_value: "",
      select_value: "",
      totalSize: 1,
      currentPage: 1,
      bootstrapPaginationClasses: {
        ul: "pagination",
        li: "page-item",
        liActive: "active",
        liDisable: "disabled",
        button: "page-link",
      },
    };
  },
  computed: {
    ...mapGetters(["facultyList", "educationYear"]),
  },
  watch: {
    currentPage() {
      this.getDepartment();
    },
    select_value() {
      this.getCurriculum();
    },
    input_value() {
      this.getCurriculum();
    },
  },
  methods: {
    ...mapActions(["getFacultyList", "getEducationYear"]),

    getCurriculum() {
      this.loaded = false;
      this.$api
        .get(
          `curriculum/?name=${this.input_value}&educationyear=${this.select_value}&page_number=${this.currentPage}&limit=10`
        )
        .then((res) => {
          if (res) {
            this.curriculum = res.results;
            this.totalSize = res.page_count;
          }
        })
        .catch((err) => {})
        .finally(() => {});
    },
  },
  created() {
    this.getFacultyList();
    this.getEducationYear();
    this.getCurriculum();
  },
};
</script>

<style lang="scss" scoped>
.label {
  display: inline;
  padding: 0.2em 0.6em 0.3em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25em;
}
</style>
