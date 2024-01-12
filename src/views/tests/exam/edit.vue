<template>
  <div>
    {{ exam_id }}
    <div class="card">
      <div
        class="card-header d-flex justify-content-start flex-wrap"
        style="gap: 10px"
      >
        <button class="btn btn-success">Savollar (0)</button>
        <button class="btn btn-outline-info" @click="addGroup">
          <i class="fa fa-plus"></i>
          Guruh qo'shish
        </button>
        <button class="btn btn-outline-info">Natija (0)</button>
      </div>
      <div class="card-content">
        <div class="card-body">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              class="form form-horizontal"
              @submit.prevent="handleSubmit(createEexam)"
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
                      <!-- <div class="col-md-6">
                        <div class="form-group">
                          <label>
                            Boshlanish vaqti<span class="text-danger">*</span>
                          </label>
                          <div class="position-relative has-icon-right">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="YYYY-MM-DD H:M"
                            />
                            <span
                              class="form-control-position cursor-pointer"
                              @click="openCalendar"
                            >
                              <i class="fa fa-calendar kv-dp-icon"></i>
                            </span>
                          </div>
                        </div>
                      </div> -->
                      <div class="col-md-6"></div>
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
                <button class="btn btn-danger w-sm-auto">O'chirish</button>
                <button type="submit" class="btn btn-success w-sm-auto">
                  Saqlash
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <h3>Imtihon guruhlari</h3>
      </div>
      <div class="card-content">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>Guruh</th>
                  <th>Fakultet</th>
                  <th>Til</th>
                  <th>Boshlanish</th>
                  <th>Tugash</th>
                  <th>O'chirish</th>
                </tr>
              </thead>
              <transition name="fade" :duration="2000">
                <tbody>
                  <tr v-for="(spec, index) in 2" :key="index">
                    <td>
                      <span class="cursor-pointer">SMMT-90/21</span>
                    </td>
                    <td>Sirtqi fakulteti</td>
                    <td>O‘zbek</td>
                    <td>06.12.2023 14:50</td>
                    <td>Tugash vaqti</td>
                    <td>
                      <button
                        @click="deleteCourse(courseItem.id)"
                        class="btn waves-effect waves-light btn-icon rounded-circle btn-flat-danger"
                        title="O'chirish"
                      >
                        <i
                          class="feather icon-trash-2"
                          style="font-size: 1.5rem"
                        />
                      </button>
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
</template>

<script>
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import "vue2-datepicker/index.css";

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
      exam_id: null,
      errorMessage: "",
      successMessage: "",
      loading: false,
      examTypeList: [],
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
      config: {
        type: "datetime", // bu sana va vaqtni tanlash uchun
        format: "YYYY-MM-DD HH:mm", // chiqarish formati
        valueType: "format", // v-model qiymati shu formatda bo'ladi
      },
    };
  },
  methods: {
    getGroup() {
      this.$api.get("/group/").then((res) => {
        this.groups = res.data.results;
      });
    },
    getExam() {
      this.$api.get(`/exam-detail/${this.examId}`).then((res) => {
        console.log(res);
        this.getSubjects(res.data.curriculum.id, res.data.semester.id);
        this.eexam.name = res.data.name;
        this.eexam.comment = res.data.comment;
        this.eexam.curriculum = res.data.curriculum.id;
        this.eexam.education_year = res.data.education_year.name;
        this.eexam.semester = res.data.semester.id;
        this.eexam.exam_type = res.data.exam_type.id;
        this.eexam.duration = res.data.exam_time;
        this.eexam.max_ball = res.data.max_score;
        this.eexam.attempts = res.data.attempts;
        this.eexam.question_count = res.data.total_count;
        this.eexam.subject = res.data.subject.id;
        console.log(res);
      });
    },
    createEexam() {
      this.loading = true;
      const examData = {
        name: this.eexam.name,
        comment: this.eexam.comment,
        curriculum: this.eexam.curriculum,
        education_year: this.eexam.education_year,
        semester: this.eexam.semester,
        exam_type: this.eexam.exam_type,
        exam_status: true,
        begin_time: "2023-12-19 15:00",
        end_time: "2023-12-20 15:30",
        exam_time: parseInt(this.eexam.duration),
        max_score: parseInt(this.eexam.max_ball),
        attempts: parseInt(this.eexam.attempts),
        total_count: parseInt(this.eexam.question_count),
        is_random: true,
        subject: this.eexam.subject,
      };
      console.log(examData);
      this.$api
        .post("exam/create", examData)
        .then((res) => {
          if (res) {
            this.notificationMessage("Imtihon yaratildi", "success");
          }
        })
        .catch((err) => {
          this.notificationMessage(err, "error");
          console.log(err.response.data);
        })
        .finally(() => {
          this.loading = true;
        });
    },
    addGroup() {
      this.modal = true;
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
      console.log("aaaa");
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
  created() {
    this.getExamType();
    this.getCurriculum();
    this.exam_id = this.$router.params.exam_id;
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
