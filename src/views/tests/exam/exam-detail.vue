<template>
  <div>
    <loading v-if="loading" />
    <div class="card">
      <div
        class="card-header d-flex justify-content-start flex-wrap"
        style="gap: 10px"
      >
        <router-link
          v-show="!real_exam.exam_status"
          :to="{ name: 'test-list', params: { examId: this.exam_id } }"
        >
          <button class="btn btn-success">
            Savollar ({{ this.question_count }})
          </button>
        </router-link>
        <button
          v-show="!real_exam.exam_status"
          class="btn btn-outline-info"
          @click="addGroup"
        >
          <i class="fa fa-plus"></i>
          Guruh qo'shish
        </button>
        <router-link
          :to="{ name: 'test-result', params: { examId: this.exam_id } }"
        >
          <button class="btn btn-outline-info">
            Natija ({{ this.real_exam.result_count }})
          </button>
        </router-link>
      </div>
      <div class="card-content">
        <div class="card-body">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              class="form form-horizontal"
              @submit.prevent="handleSubmit(updateExamDeatil)"
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
                      <label> Nomi <span class="text-danger">*</span> </label>
                      <ValidationProvider
                        name="Nomi"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Nomi"
                          v-model="eexam_detail.name"
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
                          v-model="eexam_detail.comment"
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
                          v-model="eexam_detail.curriculum"
                          @change="currId(eexam_detail.curriculum)"
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
                              v-model="eexam_detail.exam_type"
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
                            <select
                              class="form-control"
                              v-model="eexam_detail.active"
                            >
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
                            @change="changeTime"
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
                              v-model="eexam_detail.duration"
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
                              v-model="eexam_detail.max_ball"
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
                              v-model="eexam_detail.attempts"
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
                              v-model="eexam_detail.question_count"
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
                              v-model="eexam_detail.random"
                            />
                            <span class="text-danger" v-if="errors.length > 0">
                              {{ errors[0] }}
                            </span>
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
                          v-model="eexam_detail.subject"
                          :disabled="eexam_detail.curriculum === ''"
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
                <button
                  type="button"
                  @click="deleteExam"
                  class="btn btn-danger w-sm-auto"
                >
                  O'chirish
                </button>
                <button
                  type="button"
                  @click="cutSeans"
                  class="btn btn-warning w-sm-auto"
                >
                  Seansni o'chirish
                </button>
                <button
                  type="button"
                  @click="cutSeansTex"
                  class="btn btn-primary w-sm-auto"
                >
                  Texnik Seansni o'chirish
                </button>
                <button type="submit" class="btn btn-success w-sm-auto">
                  O'zgartirish
                </button>
              </div>
            </form>
          </ValidationObserver>
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
                      <tr v-for="(spec, index) in addedGroups" :key="index">
                        <td>
                          <span
                            class="cursor-pointer"
                            @click="studentGroupId(spec.id)"
                          >
                            {{ spec.name }}
                          </span>
                        </td>
                        <td>{{ spec.faculty }}</td>
                        <td>{{ spec.educationLang }}</td>
                        <td>06.12.2023 14:50</td>
                        <td>Tugash vaqti</td>
                        <td>
                          <button
                            @click="delteGroup(spec.id)"
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
      <Modal :modal="modalGroupSelect" @modal-closed="closeGroupModal">
        <div class="card">
          <div class="card-header flex-column align-items-start">
            <h3 class="mb-1">Guruh tanlash</h3>
            <div class="w-100">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <select class="form-control" v-model="educationLangId">
                      <option :value="''" disabled>
                        Ta'lim tilini tanlang
                      </option>
                      <option
                        v-for="(item, key) in educationLang"
                        :key="key"
                        :value="item.id"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nom bo‘yicha qidirish"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-content" style="height: 450px; overflow-y: auto">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>
                        <div class="position-relative has-icon-left">
                          <div class="vs-checkbox-con vs-checkbox-primary">
                            <input
                              type="checkbox"
                              v-model="allSelected"
                              @change="toggleAll"
                            />
                            <span class="vs-checkbox">
                              <span class="vs-checkbox--check">
                                <i class="vs-icon feather icon-check" />
                              </span>
                            </span>
                          </div>
                        </div>
                      </th>
                      <th>Nomi º</th>
                      <th>Fakultet</th>
                      <th>Ta’lim turi</th>
                      <th>Ta'lim tili</th>
                    </tr>
                  </thead>
                  <transition name="fade" :duration="2000">
                    <tbody>
                      <tr v-for="(item, index) in groupList" :key="index">
                        <td>
                          <div class="position-relative has-icon-left">
                            <div class="vs-checkbox-con vs-checkbox-primary">
                              <input
                                type="checkbox"
                                :value="item.id"
                                v-model="group_ids"
                              />
                              <span class="vs-checkbox">
                                <span class="vs-checkbox--check">
                                  <i class="vs-icon feather icon-check" />
                                </span>
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.faculty ? item.faculty.name : "" }}</td>
                        <td>
                          {{
                            item.group_curriculum
                              ? item.group_curriculum.educationtype.name
                              : ""
                          }}
                        </td>
                        <td>
                          {{
                            item.educationLang.name
                              ? item.educationLang.name
                              : ""
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </transition>
                </table>
              </div>
            </div>
          </div>
          <div class="card-footer d-flex justify-content-end">
            <button class="btn btn-success" @click="updateGroups">
              Qo'shish
            </button>
          </div>
        </div>
      </Modal>
      <Modal :modal="studentModal" @modal-closed="closeStudentModal">
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
                      <th></th>
                      <th>Talabalar</th>
                      <th>Urunishlar</th>
                      <th>To'g'ri</th>
                      <th>Boshlandi</th>
                      <th>Tugadi</th>
                      <th>Foiz</th>
                    </tr>
                  </thead>
                  <transition name="fade" :duration="2000">
                    <tbody>
                      <tr
                        v-for="(item, index) in studentsGroupList"
                        :key="index"
                      >
                        <td>
                          <el-switch
                            :key="item.id"
                            v-model="item.is_active"
                            active-color="#13ce66"
                            @change="onChangeSwitch(item, $event)"
                            inactive-color="#ff4949"
                          >
                          </el-switch>
                        </td>
                        <td>{{ item.student.full_name }}</td>
                        <td>{{ item.result.attempts }}</td>
                        <td>{{ item.result.correct_answer }}</td>
                        <td>
                          {{
                            item.result.begin_time
                              ? $moment(item.result.begin_time).format(
                                  "YYYY-MM-DD HH:mm:ss"
                                )
                              : ""
                          }}
                        </td>
                        <td>
                          {{
                            item.result.end_time
                              ? $moment(item.result.end_time).format(
                                  "YYYY-MM-DD HH:mm:ss"
                                )
                              : ""
                          }}
                        </td>
                        <td>{{ item.result.percentage }}</td>
                      </tr>
                    </tbody>
                  </transition>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import Loading from "../../../components/Loading.vue";
import Modal from "../../../components/Modal.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Da from "vue2-datepicker/locale/es/da";
extend("required", {
  ...required,
  message: "{_field_} bo'sh bo'lishi mumkin emas",
});
export default {
  name: "exam-detail",
  components: {
    Loading,
    ValidationProvider,
    extend,
    ValidationObserver,
    Modal,
  },
  data() {
    return {
      errorMessage: "",
      loading: false,
      modalGroupSelect: false,
      studentModal: false,
      modalGroup: false,
      exam_id: null,
      timeExam: [null, null],
      pickerOptions: {
        disabledDate(time) {
          const todayStart = new Date();
          todayStart.setHours(0, 0, 0, 0);
          return time.getTime() < todayStart.getTime();
        },
      },
      curriculum: [],
      subjects: [],
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
      educationYearName: "",
      semesterName: "",
      eexam_detail: {
        name: "",
        comment: "",
        curriculum: "",
        education_year: "",
        semester: "",
        exam_type: "",
        active: false,
        start_at: "",
        finish_at: "",
        duration: null,
        max_ball: null,
        attempts: null,
        question_count: null,
        random: "Ha",
        subject: "",
      },
      educationLang: [],
      educationLangId: "",
      groupList: [],
      group_ids: [],
      addedGroups: [],
      allSelected: false,
      studentsGroupList: [],
      question_count: 0,
      real_exam: {},
    };
  },
  methods: {
    ...mapActions(["getGroup"]),

    onChangeSwitch(item) {
      console.log(item);
      this.$api
        .patch(`exam/${this.exam_id}/student-status/${item.student.id}/`, {
          is_active: item.is_active,
        })
        .then((res) => {
          console.log(res);
        });
    },
    changeTime() {
      this.eexam_detail.start_at = this.formatDateString(this.timeExam[0]);
      this.eexam_detail.finish_at = this.formatDateString(this.timeExam[1]);
      console.log(this.timeExam);
    },
    deleteExam() {
      this.$api
        .delete(`exam/${this.exam_id}/delete`)
        .then(() => {
          this.$router.push({ name: "exam-index" });
        })
        .catch((err) => {
          this.notificationMessage(err.response.data.message, "error");
        });
    },
    cutSeans() {
      this.$api
        .post("exam-seans/", { exam_id: this.exam_id })
        .then((res) => {
          console.log(res);
          this.notificationMessage(res.message, "success");
        })
        .catch((err) => {
          this.notificationMessage(err.response.data.message, "error");
        });
    },
    cutSeansTex() {
      this.$api
        .post("cut-seans/", { exam_id: this.exam_id })
        .then((res) => {
          console.log(res);
          this.notificationMessage(res.message, "success");
        })
        .catch((err) => {
          this.notificationMessage(err.response.data.message, "error");
        });
    },
    getEducationLang() {
      this.$api
        .get("educationlang/?limit=20")
        .then((res) => {
          if (res) {
            this.educationLang = res.results;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getGroupsList() {
      this.$api
        .get("group/?limit=100")
        .then((res) => {
          this.groupList = res.results;
        })
        .catch((err) => {
          this.notificationMessage(err.response.data.message, "error");
        });
    },
    getStudentsGroup(id) {
      this.loading = true;
      this.$api
        .get(`result/${this.exam_id}/group/${id}`)
        .then((res) => {
          this.studentsGroupList = res;
        })
        .catch((err) => {
          this.notificationMessage(err.response.data.message, "error");
          this.studentsGroupList = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },
    delteGroup(id) {
      this.$api
        .patch(`exam/${this.exam_id}/delete-groups`, {
          group_id: id,
        })
        .then((res) => {
          this.notificationMessage(res.message, "success");
          this.getExamDetail();
        })
        .catch((err) => {
          this.notificationMessage(err.response.data.message, "error");
        });
    },
    getGroupListFilter() {
      this.$api
        .get(
          `groups-list/${this.educationLangId}/get/${this.eexam_detail.curriculum}/`
        )
        .then((res) => {
          console.log("group", res);
          this.groupList = res;
        })
        .catch((err) => {
          this.notificationMessage(err.response.data.message, "error");
          this.groupList = [];
        });
    },
    updateGroups() {
      const payload = {
        group_ids: this.group_ids,
      };
      this.$api
        .patch(`exam/${this.exam_id}/update-groups`, payload)
        .then((res) => {
          this.notificationMessage(res.message, "success");
        })
        .catch((err) => {
          this.notificationMessage(err.response.data.message, "error");
        });
    },
    toggleAll() {
      if (this.allSelected) {
        this.group_ids = this.groupList.map((item) => item.id);
      } else {
        this.group_ids = [];
      }
    },
    async getExamDetail() {
      if (!this.exam_id) {
        this.notificationMessage("exam_id olishda xatolik bo'ldi", "error");
        return;
      }
      this.loading = true;
      await this.$api
        .get(`exam-detail/${this.exam_id}`)
        .then((res) => {
          console.log(res);
          if (res) {
            this.real_exam = res;
            this.addedGroups = res.group_list;
            this.eexam_detail.name = res.name;
            this.eexam_detail.active = res.exam_status;
            this.eexam_detail.comment = res.comment;
            this.eexam_detail.curriculum = res.curriculum.id;
            this.eexam_detail.education_year = res.education_year.id;
            this.eexam_detail.semester = res.semester.id;
            this.eexam_detail.exam_type = res.exam_type.id;
            this.eexam_detail.start_at = res.begin_time;
            this.eexam_detail.finish_at = res.end_time;
            this.eexam_detail.duration = res.exam_time;
            this.eexam_detail.max_ball = res.max_score;
            this.eexam_detail.attempts = res.attempts;
            this.eexam_detail.question_count = res.total_count;
            this.eexam_detail.subject = res.subject.id;
            this.question_count = res.question_count;
            this.eexam_detail.random = res.is_random ? "Ha" : "Yo'q";
            this.educationYearName =
              res.education_year.code + "(" + res.education_year.name + ")";
            this.semesterName = res.semester.name;
            this.getSubjects(res.curriculum.id, res.semester.id);
          }
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
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
            this.eexam_detail.education_year = res.education_year.id;
            this.eexam_detail.semester = res.semester.id;
            this.educationYearName =
              res.education_year.code + "(" + res.education_year.name + ")";
            this.semesterName = res.semester.name;
            this.getSubjects(id, res.semester.id);
          }
        })
        .catch((err) => {})
        .finally(() => {});
    },
    formatDateString(dateString) {
      let date = new Date(dateString);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      let time = date.toTimeString().split(" ")[0];
      return `${year}-${month}-${day} ${time}`;
    },
    updateExamDeatil() {
      this.loaded = false;
      const examData = {
        name: this.eexam_detail.name,
        comment: this.eexam_detail.comment,
        curriculum: this.eexam_detail.curriculum,
        education_year: this.eexam_detail.education_year,
        semester: this.eexam_detail.semester,
        exam_type: this.eexam_detail.exam_type,
        exam_status: this.eexam_detail.active,
        begin_time: this.formatDateString(this.eexam_detail.start_at),
        end_time: this.formatDateString(this.eexam_detail.finish_at),
        exam_time: parseInt(this.eexam_detail.duration),
        max_score: parseInt(this.eexam_detail.max_ball),
        attempts: parseInt(this.eexam_detail.attempts),
        total_count: parseInt(this.eexam_detail.question_count),
        is_random: true,
        subject: this.eexam_detail.subject,
      };
      this.$api
        .patch(`exam/${this.exam_id}/update`, examData)
        .then((res) => {
          if (res.status) {
            this.notificationMessage(res.message, "success");
            this.getExamDetail();
          }
        })
        .catch((err) => {
          this.notificationMessage(err.response.data.message, "error");
        })
        .finally(() => {
          this.loaded = true;
        });
    },
    addGroup() {
      this.modalGroupSelect = true;
    },
    closeGroupModal() {
      this.modalGroupSelect = false;
      this.getExamDetail();
    },
    studentGroupId(id) {
      this.closeGroupModal();
      this.studentModal = true;
      this.getStudentsGroup(id);
    },
    closeStudentModal() {
      this.studentModal = false;
    },
  },
  computed: {
    ...mapGetters(["group"]),
    ...mapMutations(["setGroup"]),
  },
  watch: {
    educationLangId() {
      this.getGroupListFilter();
    },
    group_ids(newVal, oldVal) {
      this.allSelected = newVal.length === this.groupList.length;
    },
  },
  async mounted() {
    await this.getExamDetail();
    this.getCurriculum();
    this.getExamType();
    this.getEducationLang();
    this.getGroupsList();
    this.timeExam = [
      new Date(this.eexam_detail.start_at),
      new Date(this.eexam_detail.finish_at),
    ];
  },
  created() {
    this.exam_id = this.$route.params.exam_id;
  },
};
</script>

<style lang="scss" scoped></style>
