<template>
  <div>
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
              @submit.prevent="handleSubmit(submitForm)"
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
                        name="name"
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
                        name="comment"
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
                      <label for="curriculum">
                        O'quv reja <span class="text-danger">*</span>
                      </label>
                      <ValidationProvider
                        name="curriculum"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <select class="form-control" v-model="eexam.curriculum">
                          <option :value="null">O'quv rejani tanlang</option>
                          <option
                            v-for="(item, key) in 10"
                            :key="key"
                            :value="item.id"
                          >
                            O'quv reja
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
                          <label for="education_year">
                            O'quv yili <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="education_year"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <select
                              class="form-control"
                              v-model="eexam.education_year"
                              disabled
                            >
                              <option :value="null">
                                O'quv yilini tanlang
                              </option>
                              <option
                                v-for="(item, key) in 10"
                                :key="key"
                                :value="item.id"
                              >
                                O'quv reja
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
                          <label for="semester">
                            Semester<span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="semester"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <select
                              class="form-control"
                              v-model="eexam.semester"
                              disabled
                            >
                              <option :value="null">Semesterni tanlang</option>
                              <option
                                v-for="(item, key) in 10"
                                :key="key"
                                :value="item.id"
                              >
                                O'quv reja
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
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="exam_type">
                            O'quv reja <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="exam_type"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <select
                              class="form-control"
                              v-model="eexam.exam_type"
                            >
                              <option :value="null">
                                Nazorat turini tanlang
                              </option>
                              <option
                                v-for="(item, key) in 10"
                                :key="key"
                                :value="item.id"
                              >
                                Nazorat turini
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
                          <label for="Izoh">
                            O'quv reja <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Izoh"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <select class="form-control">
                              <option :value="null">
                                O'quv yilini tanlang
                              </option>
                              <option
                                v-for="(item, key) in 10"
                                :key="key"
                                :value="item.id"
                              >
                                O'quv reja
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
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="Izoh">
                            O'quv reja <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Izoh"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <select class="form-control">
                              <option :value="null">
                                O'quv yilini tanlang
                              </option>
                              <option
                                v-for="(item, key) in 10"
                                :key="key"
                                :value="item.id"
                              >
                                O'quv reja
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
                          <label for="Izoh">
                            O'quv reja <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Izoh"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <select class="form-control">
                              <option :value="null">
                                O'quv yilini tanlang
                              </option>
                              <option
                                v-for="(item, key) in 10"
                                :key="key"
                                :value="item.id"
                              >
                                O'quv reja
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
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="Izoh">
                            O'quv reja <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Izoh"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <select class="form-control">
                              <option :value="null">
                                O'quv yilini tanlang
                              </option>
                              <option
                                v-for="(item, key) in 10"
                                :key="key"
                                :value="item.id"
                              >
                                O'quv reja
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
                          <label for="Izoh">
                            O'quv reja <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Izoh"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <select class="form-control">
                              <option :value="null">
                                O'quv yilini tanlang
                              </option>
                              <option
                                v-for="(item, key) in 10"
                                :key="key"
                                :value="item.id"
                              >
                                O'quv reja
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
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="Izoh">
                            O'quv reja <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Izoh"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <select class="form-control">
                              <option :value="null">
                                O'quv yilini tanlang
                              </option>
                              <option
                                v-for="(item, key) in 10"
                                :key="key"
                                :value="item.id"
                              >
                                O'quv reja
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
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="Izoh">
                            O'quv reja <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Izoh"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <select class="form-control">
                              <option :value="null">
                                O'quv yilini tanlang
                              </option>
                              <option
                                v-for="(item, key) in 10"
                                :key="key"
                                :value="item.id"
                              >
                                O'quv reja
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
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="Izoh">
                            O'quv reja <span class="text-danger">*</span>
                          </label>
                          <ValidationProvider
                            name="Izoh"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <select class="form-control">
                              <option :value="null">
                                O'quv yilini tanlang
                              </option>
                              <option
                                v-for="(item, key) in 10"
                                :key="key"
                                :value="item.id"
                              >
                                O'quv reja
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
                    <div class="form-group">
                      <label for="Izoh">
                        O'quv reja <span class="text-danger">*</span>
                      </label>
                      <ValidationProvider
                        name="Izoh"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <select class="form-control">
                          <option :value="null">O'quv yilini tanlang</option>
                          <option
                            v-for="(item, key) in 10"
                            :key="key"
                            :value="item.id"
                          >
                            O'quv reja
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
            </form>
          </ValidationObserver>
        </div>
      </div>
      <div
        class="card-footer d-flex justify-content-start justify-content-sm-end flex-wrap"
        style="gap: 10px"
      >
        <button class="btn btn-danger w-sm-auto">O'chirish</button>
        <button class="btn btn-light w-sm-auto">Seansni o'chirish</button>
        <button class="btn btn-success w-sm-auto">O‘zgartirish</button>
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
    <Modal :modal="modal" @modal-closed="modal = false">
      <div class="card">
        <div class="card-header flex-column align-items-start">
          <h3 class="mb-1">Guruh tanlash</h3>
          <div class="w-100">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <select class="form-control">
                    <option :value="null">O'quv yilini tanlang</option>
                    <option
                      v-for="(item, key) in 10"
                      :key="key"
                      :value="item.id"
                    >
                      O'quv yili
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
                      <fieldset>
                        <div class="vs-checkbox-con vs-checkbox-primary">
                          <input type="checkbox" id="isTeacher" />
                          <span class="vs-checkbox">
                            <span class="vs-checkbox--check">
                              <i class="vs-icon feather icon-check" />
                            </span>
                          </span>
                        </div>
                      </fieldset>
                    </th>
                    <th>Nomi º</th>
                    <th>Fakultet</th>
                    <th>Ta’lim turi</th>
                    <th>Ta'lim tili</th>
                  </tr>
                </thead>
                <transition name="fade" :duration="2000">
                  <tbody>
                    <tr v-for="(spec, index) in 20" :key="index">
                      <td>
                        <fieldset>
                          <div class="vs-checkbox-con vs-checkbox-primary">
                            <input type="checkbox" id="isTeacher" />
                            <span class="vs-checkbox">
                              <span class="vs-checkbox--check">
                                <i class="vs-icon feather icon-check" />
                              </span>
                            </span>
                          </div>
                        </fieldset>
                      </td>
                      <td>SMMT-96/21</td>
                      <td>Sirtqi fakulteti</td>
                      <td>Bakalavr</td>
                      <td>O‘zbek</td>
                    </tr>
                  </tbody>
                </transition>
              </table>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-end">
          <button class="btn btn-success">Qo'shish</button>
        </div>
      </div>
    </Modal>
    <Modal :modal="modal" @modal-closed="modal = false">
      <div class="card">
        <div class="card-header flex-column align-items-start">
          <h3>SBHA-50</h3>
        </div>
        <div class="card-content">
          <div class="card-body"></div>
        </div>
        <div class="card-footer d-flex justify-content-end">
          <button class="btn btn-success">Qo'shish</button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import Modal from "../../../components/Modal.vue";

extend("required", {
  ...required,
  message: "{_field_} bo'sh bo'lishi mumkin emas",
});
export default {
  name: "exam-edit",
  components: {
    ValidationObserver,
    ValidationProvider,
    Modal,
  },
  data() {
    return {
      errorMessage: "",
      successMessage: "",
      loading: false,
      modal: false,
      modalGroup: false,
      eexam: {
        name: "",
        comment: "",
        curriculum: "",
        education_year: "",
        semester: "",
        exam_type: "",
        active: "",
        start_at: "",
        finish_at: "",
        duration: "",
        max_ball: "",
        attempts: "",
        question_count: "",
        random: "",
        subject: "",
      },
    };
  },
  methods: {
    submitForm() {
      //
    },
    addGroup() {
      this.modal = true;
    },
  },
  mounted() {},
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
