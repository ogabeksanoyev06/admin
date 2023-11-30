<template>
  <div class="row" id="table-hover-animation">
    <div class="col-12">
      <div class="card m-0">
        <div class="card-content">
          <div class="card-header">
            <div class="row w-100">
              <div class="col-12 col-md-6 col-xl-2">
                <div class="form-group">
                  <button
                    disabled
                    class="btn btn-success"
                    style="white-space: nowrap"
                  >
                    O'quv reja yaratish
                  </button>
                </div>
              </div>
              <div class="col-12 col-md-6 col-xl-2">
                <div class="form-group">
                  <select class="form-control col">
                    <option value="0">O'quv yilini tanlang</option>
                    <option v-for="(item, i) in educationYear" :key="i">
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-12 col-md-6 col-xl-4">
                <div class="form-group">
                  <select class="form-control col">
                    <option value="0">Fakultetni tanlang</option>
                    <option v-for="(item, i) in facultyList" :key="i">
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
                        <th scope="col">Actions</th>
                        <th scope="col">Tasdiq</th>
                        <th scope="col">Tasdiq</th>
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
                            <span class="label bg-success">
                              <i class="fa fa-calendar"></i>
                              Semestr
                            </span>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "curriculum",
  data() {
    return {
      curriculum: [],
    };
  },
  computed: {
    ...mapGetters(["facultyList", "educationYear"]),
  },
  methods: {
    ...mapActions(["getFacultyList", "getEducationYear"]),
    getCurriculum() {
      this.loaded = false;
      this.$api
        .get(`curriculum`)
        .then((res) => {
          if (res) {
            this.curriculum = res.results;
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
