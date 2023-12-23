<template>
  <div class="row">
    <div class="col-12">
      <div class="card col">
        <div class="card-content">
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <button
                    class="btn btn-primary waves-effect waves-light"
                    @click="addExamTest"
                  >
                    Imtihon yaratish
                  </button>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <select class="form-control" v-model="educationYearId">
                    <option :value="null">O'quv yilini tanlang</option>
                    <option
                      v-for="(item, key) in educationYear"
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
                    <th scope="col">Nomi</th>
                    <th scope="col">O'quv yili</th>
                    <th scope="col">Guruhlar</th>
                    <th scope="col">Savollar</th>
                    <th scope="col">Boshlanish</th>
                    <th scope="col">Tugash</th>
                    <th scope="col">Vaqti</th>
                    <th scope="col">Faol</th>
                  </tr>
                </thead>
                <transition name="fade" :duration="2000">
                  <tbody class="table-bordered">
                    <tr v-for="(tariff, index) in exams" :key="index">
                      <td @click="goToLink(tariff.id)">
                        <p>{{ tariff.name }}</p>
                        <span class="text-muted">
                          {{ tariff.subject.name }} /
                          {{ tariff.exam_type.name }}
                        </span>
                      </td>
                      <td>
                        {{ tariff.education_year.name }} <br />
                        <span class="text-muted"
                          >{{ tariff.semester.name }}
                        </span>
                      </td>
                      <td>
                        <p v-for="item in tariff.group_list">
                          {{ item.name }}
                        </p>
                      </td>
                      <td>{{ tariff.question_count }}/{{ tariff.total_count }}</td>
                      <td>{{ $moment(tariff.begin_time).format("YYYY-MM-DD HH:mm:ss") }}</td>
                      <td>{{ $moment(tariff.end_time).format("YYYY-MM-DD HH:mm:ss") }}</td>
                      <td>{{ tariff.exam_time }} daqiqa</td>
                      <td>
                        <el-switch
            :key="tariff.id"
            v-model="tariff.exam_status"
            active-color="#13ce66"
            @change="onChangeSwitch(tariff, $event)"
            inactive-color="#ff4949">
        </el-switch>
                      </td>
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
  name: "exam-index",
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
    };
  },

  computed: {
    ...mapGetters(["educationYear", "group"]),
  },
  mounted() {
    this.getExams();
    this.getEducationYear();
    this.getGroup();
  },
  methods: {
    ...mapActions(["getEducationYear", "getGroup"]),

    addExamTest() {
      this.$router.push({ name: "exam-create" });
    },
    getExams() {
      this.$http.get("/exams").then((res) => {
        console.log("aaa", res);
        this.exams = res.data.results;
      });
    },
    onChangeSwitch(item) {
      this.$http.patch(`exam/${item.id}/update`,{exam_status:item.exam_status}).then((res) => {
        console.log(res)
        this.getExams()
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

<style lang="scss" scoped></style>
