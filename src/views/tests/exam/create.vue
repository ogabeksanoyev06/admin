<template>
  <div>
    <div class="card">
      <div class="card-content">
        <div class="card-body">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              class="form form-horizontal"
              @submit.prevent="handleSubmit(createExam)"
            >
              <div class="form-body">
                <div class="row">
                  <div class="col-12" v-if="errorMessage.trim() !== ''">
                    <div class="form-group row">
                      <div class="col-12">
                        <div class="alert alert-danger">
                          {{ errorMessage.trim() }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="name">
                        Nomi <span class="text-danger">*</span>
                      </label>
                      <ValidationProvider
                        name="Nomi"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Nomi"
                          v-model="eexam.name"
                        />
                        <span class="text-danger" v-if="errors.length > 0">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="form-group">
                      <label for="comment">
                        Izoh <span class="text-danger">*</span>
                      </label>
                      <ValidationProvider
                        name="Izoh"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <textarea
                          class="form-control"
                          placeholder="Izoh"
                          style="height: 123px"
                          v-model="eexam.comment"
                        />
                        <span class="text-danger" v-if="errors.length > 0">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="form-group">
                      <label>
                        O'quv reja <span class="text-danger">*</span>
                      </label>
                      <ValidationProvider
                        name="O'quv reja"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <select
                          class="form-control"
                          v-model="eexam.curriculum"
                          @change="currId(eexam.curriculum)"
                        >
                          <option
                            v-for="(item, key) in curriculum"
                            :key="key"
                            :value="item.id"
                          >
                            {{ item.name }}
                          </option>
                        </select>
                        <span class="text-danger" v-if="errors.length > 0">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>
                            O'quv yili <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="education_year"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <input
                              type="text"
                              class="form-control"
                              disabled
                              v-model="educationYearName"
                            />
                            <span class="text-danger" v-if="errors.length > 0">
                              {{ errors[0] }}
                            </span>
                          </ValidationProvider>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>
                            Semester<span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="semester"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <input
                              type="text"
                              class="form-control"
                              disabled
                              v-model="semesterName"
                            />
                            <span
                              class="text-danger"
                              v-if="errors.length > 0"
                              >{{ errors[0] }}</span
                            >
                          </ValidationProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>
                            Nazorat turi <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Nazorat turi"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <select
                              class="form-control"
                              v-model="eexam.exam_type"
                            >
                              <option
                                v-for="(item, key) in examTypeList"
                                :key="key"
                                :value="item.id"
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
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>
                            Faol <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Faol"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <select class="form-control" v-model="eexam.active">
                              <option
                                v-for="(item, key) in examActiveList"
                                :key="key"
                                :value="item.isActive"
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
                      </div>
                    </div>


                     <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>
                            Imtixon vaqtlari<span class="text-danger">*</span>
                          </label>
                          <el-date-picker
                              style="width: 100%"
                              v-model="timeExam"
                              type="datetimerange"
                              start-placeholder="Start Date"
                              end-placeholder="End Date"
                              :default-time="['12:00:00', '12:00:00']"
                              :picker-options="pickerOptions"
                          >
                          </el-date-picker>
                        </div>
                      </div>
                    </div>










                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>
                            Vaqti (daqiqa) <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Vaqti (daqiqa)"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <input
                              type="number"
                              class="form-control"
                              v-model="eexam.duration"
                            />
                            <span
                              class="text-danger"
                              v-if="errors.length > 0"
                              >{{ errors[0] }}</span
                            >
                          </ValidationProvider>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>
                            Maks. ball <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Maks. ball"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <input
                              type="number"
                              class="form-control"
                              v-model="eexam.max_ball"
                            />
                            <span
                              class="text-danger"
                              v-if="errors.length > 0"
                              >{{ errors[0] }}</span
                            >
                          </ValidationProvider>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>
                            Urinishlar soni <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Urinishlar soni"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <input
                              type="number"
                              class="form-control"
                              v-model="eexam.attempts"
                            />
                            <span
                              class="text-danger"
                              v-if="errors.length > 0"
                              >{{ errors[0] }}</span
                            >
                          </ValidationProvider>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>
                            Savollar soni <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Savollar soni"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <input
                              type="number"
                              class="form-control"
                              v-model="eexam.question_count"
                            />
                            <span
                              class="text-danger"
                              v-if="errors.length > 0"
                              >{{ errors[0] }}</span
                            >
                          </ValidationProvider>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>
                            Tasodifiy<span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Izoh"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <input
                              type="text"
                              placeholder=""
                              disabled
                              class="form-control"
                              v-model="eexam.random"
                            />
                            <span
                              class="text-danger"
                              v-if="errors.length > 0"
                              >{{ errors[0] }}</span
                            >
                          </ValidationProvider>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label> Fanlar <span class="text-danger">*</span> </label>
                      <ValidationProvider
                        name="Fanlar"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <select
                          class="form-control"
                          v-model="eexam.subject"
                          :disabled="eexam.curriculum === ''"
                        >
                          <option :value="null">Fanni tanlang</option>
                          <option
                            v-for="(item, key) in subjects"
                            :key="key"
                            :value="item.subject.id"
                          >
                            {{ item.subject.name }}
                          </option>
                        </select>
                        <span class="text-danger" v-if="errors.length > 0">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="card-footer d-flex justify-content-start justify-content-sm-end flex-wrap"
                style="gap: 10px"
              >
                <button type="submit" class="btn btn-success w-sm-auto">
                  Saqlash
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
// import Datepicker from "vuejs-datepicker";

extend("required", {
  ...required,
  message: "{_field_} bo'sh bo'lishi mumkin emas",
});
export default {
  name: "exam-edit",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      errorMessage: "",
      successMessage: "",
      loading: false,
      timeExam:'',
      examTypeList: [],
      pickerOptions: {
        disabledDate(time) {
          const todayStart = new Date();
          todayStart.setHours(0, 0, 0, 0);
          return time.getTime() < todayStart.getTime();
        },
      },
      examActiveList: [
        {
          id: 0,
          name: "Ha",
          isActive: true,
        },
        {
          id: 1,
          name: "Yo'q",
          isActive: false,
        },
      ],
      curriculum: [],
      educationYearName: "",
      semesterName: "",
      subjects: [],
      eexam: {
        name: "",
        comment: "",
        curriculum: "",
        education_year: "",
        semester: "",
        exam_type: "",
        active: false,
        start_at: "2023-12-1T09:17:55.833Z",
        finish_at: "2023-12-1T09:17:55.833Z",
        duration: null,
        max_ball: null,
        attempts: null,
        question_count: null,
        random: "Ha",
        subject: "",
      },
    };
  },
  methods: {
    createExam() {
      this.loaded = false;
      const examData = {
        name: this.eexam.name,
        comment: this.eexam.comment,
        curriculum: this.eexam.curriculum,
        education_year: this.eexam.education_year,
        semester: this.eexam.semester,
        exam_type: this.eexam.exam_type,
        exam_status: this.eexam.active,
        begin_time:this.formatDateString(this.timeExam[0]) ,
        end_time: this.formatDateString(this.timeExam[1]),
        exam_time: parseInt(this.eexam.duration),
        max_score: parseInt(this.eexam.max_ball),
        attempts: parseInt(this.eexam.attempts),
        total_count: parseInt(this.eexam.question_count),
        is_random: true,
        subject: this.eexam.subject,
      };
      this.$api
        .post(`exam/create`, examData)
        .then((res) => {
          if (res.status) {
            this.notificationMessage(res.message, "success");
            this.$router.push({
              name: "exam-detail",
              params: { exam_id: res.id },
            });
          }
        })
        .catch((err) => {
          this.notificationMessage(err.response.data.message, "error");
        })
        .finally(() => {
          this.loaded = true;
        });
    },
    formatDateString(dateString) {
      let date = new Date(dateString);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      let time = date.toTimeString().split(' ')[0];
      return `${year}-${month}-${day} ${time}`;
    },
    getExamType() {
      this.$api
        .get(`exam-types/get`)
        .then((res) => {
          if (!res.error) {
            this.examTypeList = res.results;
          }
        })
        .catch((err) => {})
        .finally(() => {});
    },
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
    getSubjects(curriculumId, semesterId) {
      this.$api
        .get(`subjects/curriculum/${curriculumId}/smester/${semesterId}`)
        .then((res) => {
          if (res) {
            this.subjects = res;
          }
        })
        .catch((err) => {})
        .finally(() => {});
    },
    currId(id) {
      this.getSemestrWithCurriculum(id);
    },
    getSemestrWithCurriculum(id) {
      this.$api
        .get(`smester/with-curr/get/${id}`)
        .then((res) => {
          if (res) {
            this.eexam.education_year = res.education_year.id;
            this.eexam.semester = res.semester.id;
            this.educationYearName =
              res.education_year.code + "(" + res.education_year.name + ")";
            this.semesterName = res.semester.name;
            this.getSubjects(id, res.semester.id);
          }
        })
        .catch((err) => {})
        .finally(() => {});
    },
  },
  mounted() {},
  created() {
    this.getExamType();
    this.getCurriculum();
  },
};
</script>

<style lang="scss" scoped>
.table thead th {
  vertical-align: middle;
}
label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 700;
}
</style>
