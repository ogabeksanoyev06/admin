<template>
  <div class="row">
    <div class="col-12">
      <div class="card col">
        <div class="card-content">
          <div class="card-body">
            <div class="row">

              <div class="col-md-3">
                <div class="form-group">
                  <select class="form-control" v-model="groupId">
                    <option :value="null">Guruhni tanlang</option>
                    <option
                      v-for="(item, key) in group"
                      :key="key"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Nom bo‘yicha qidirish"
                  />
                </div>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th scope="col">F.I.SH</th>
                    <th scope="col">Guruh</th>
                    <th scope="col">Kurs</th>
                    <th scope="col">Iqtisosligi</th>
                    <th scope="col">O'quv reja</th>
                    <th scope="col">Ta'lim shakli</th>
                  </tr>
                </thead>
                <transition name="fade" :duration="2000">
                  <tbody class="table-bordered">
                    <tr v-for="(tariff, index) in this.students" :key="index">
                      <td>{{tariff.full_name}}</td>
                      <td>{{tariff.group.name}}</td>
                      <td>{{tariff.level.name}}</td>
                      <td>{{tariff.specialty.name}}</td>
                      <td>{{tariff.semester.curriculum.name}}</td>
                      <td>{{tariff.educationType.name}}</td>
                    </tr>
                  </tbody>
                </transition>
              </table>
            </div>
          </div>
          <div class="d-flex justify-content-center">
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
  name: "student-list",
  components: { vPagination },
  data() {
    return {
      totalSize: 1,
      currentPage: 1,
      educationYearId: null,
      groupId: null,
      bootstrapPaginationClasses: {
        ul: "pagination",
        li: "page-item",
        liActive: "active",
        liDisable: "disabled",
        button: "page-link",
      },
      exams: [],
      students: []
    };
  },

  computed: {
    ...mapGetters(["educationYear", "group"]),
  },
  mounted() {
    this.getStudents();
    this.getEducationYear();
    this.getGroup();
  },
  watch: {
    currentPage() {
      this.getStudents(this.currentPage);
    },
  },
  methods: {
    ...mapActions(["getEducationYear", "getGroup"]),

    addExamTest() {
      this.$router.push({ name: "exam-create" });
    },
    getStudents() {
      this.$http.get(`/students/get/all?page_number=${this.currentPage}`).then((res) => {
        console.log("aaa", res);
        this.students= res.data.results;
        this.totalSize = res.data.page_count;
      });
    },
    onChangeSwitch(item) {
      this.$http.patch(`exam/${item.id}/update`,{exam_status:item.exam_status}).then((res) => {
        console.log(res)
        this.getExams()
      }).catch((err)=>{
        this.notificationMessage(err.response.data.message, "error");
      })
    },
    goToLink(id) {
      this.$router.push({
        name: "exam-detail",
        params: { exam_id: id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
