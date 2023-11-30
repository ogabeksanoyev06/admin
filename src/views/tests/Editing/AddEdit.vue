<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Test savolini qo'shish - tahrirlah</h4>
        </div>
        <div class="card-content">
          <div class="card-body">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form
                @submit.prevent="handleSubmit(storeData)"
                class="form form-horizontal"
              >
                <div class="form-body">
                  <div class="row">
                    <div class="col-12 row">
                      <div class="form-group row align-items-center col-6">
                        <div class="col-4">
                          <label for="name"
                            >Fanni tanlang<span class="text-danger"
                              >*</span
                            ></label
                          >
                        </div>
                        <div class="col-8">
                          <ValidationProvider
                            name="Savol"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <div style="padding-left: 0">
                              <select
                                class="form-control"
                                v-model="testQuestionModel.subjectId"
                              >
                                <option
                                  v-for="(item, key) in subjectList"
                                  :key="key"
                                  :value="item.id"
                                >
                                  {{ item.name }}
                                </option>
                              </select>
                            </div>
                            <span
                              class="text-danger"
                              v-if="errors.length > 0"
                              >{{ errors[0] }}</span
                            >
                          </ValidationProvider>
                        </div>
                      </div>
                      <div class="form-group row align-items-center col-6">
                        <div class="col-4">
                          <label for="name"
                            >Tilni tanlang<span class="text-danger"
                              >*</span
                            ></label
                          >
                        </div>
                        <div class="col-8">
                          <ValidationProvider
                            name="Savol"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <div style="padding-left: 0">
                              <select
                                class="form-control"
                                v-model="testQuestionModel.lang"
                              >
                                <option
                                  v-for="(item, key) in languages"
                                  :key="key"
                                  :value="item.id"
                                >
                                  {{ item.name }}
                                </option>
                              </select>
                            </div>
                            <span
                              class="text-danger"
                              v-if="errors.length > 0"
                              >{{ errors[0] }}</span
                            >
                          </ValidationProvider>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 row">
                      <div class="form-group row align-items-center col-6">
                        <div class="col-4">
                          <label for="name"
                            >Sinfni tanlang<span class="text-danger"
                              >*</span
                            ></label
                          >
                        </div>
                        <div class="col-8">
                          <ValidationProvider
                            name="Savol"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <div style="padding-left: 0">
                              <select
                                class="form-control"
                                v-model="testQuestionModel.class"
                              >
                                <option
                                  v-for="(item, key) in classList"
                                  :key="key"
                                  :value="item.id"
                                >
                                  {{ item.name }}
                                </option>
                              </select>
                            </div>
                            <span
                              class="text-danger"
                              v-if="errors.length > 0"
                              >{{ errors[0] }}</span
                            >
                          </ValidationProvider>
                        </div>
                      </div>
                      <div class="form-group row align-items-center col-6">
                        <div class="col-4">
                          <label for="name"
                            >Darajani tanlang<span class="text-danger"
                              >*</span
                            ></label
                          >
                        </div>
                        <div class="col-8">
                          <ValidationProvider
                            name="Savol"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <div style="padding-left: 0">
                              <select
                                class="form-control"
                                v-model="testQuestionModel.level"
                              >
                                <option
                                  v-for="(item, key) in questionLevels"
                                  :key="key"
                                  :value="item.id"
                                >
                                  {{ item.name }}
                                </option>
                              </select>
                            </div>
                            <span
                              class="text-danger"
                              v-if="errors.length > 0"
                              >{{ errors[0] }}</span
                            >
                          </ValidationProvider>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 row">
                      <div class="form-group row align-items-center col-6">
                        <div class="col-4">
                          <label for="name"
                            >Punktni tanlang<span class="text-danger"
                              >*</span
                            ></label
                          >
                        </div>
                        <div class="col-8">
                          <ValidationProvider
                            name="Savol"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <div style="padding-left: 0">
                              <select
                                class="form-control"
                                v-model="testQuestionModel.punct"
                              >
                                <option value="">Punktlar kiritilmagan</option>
                              </select>
                            </div>
                            <span
                              class="text-danger"
                              v-if="errors.length > 0"
                              >{{ errors[0] }}</span
                            >
                          </ValidationProvider>
                        </div>
                      </div>
                      <div class="form-group row align-items-center col-6">
                        <div class="col-4">
                          <label for="name"
                            >Paragrafni tanlang<span class="text-danger"
                              >*</span
                            ></label
                          >
                        </div>
                        <div class="col-8">
                          <ValidationProvider
                            name="Savol"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <div style="padding-left: 0">
                              <select
                                class="form-control"
                                v-model="testQuestionModel.parag"
                              >
                                <option value="">Paragraf kiritilmagan</option>
                              </select>
                            </div>
                            <span
                              class="text-danger"
                              v-if="errors.length > 0"
                              >{{ errors[0] }}</span
                            >
                          </ValidationProvider>
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-12"
                      style="padding-right: 70px; margin-bottom: 10px"
                    >
                      <div class="d-flex float-right">
                        <button
                          class="btn btn-success mr-1"
                          @click.prevent="setMathPluginWithoutDynamic"
                        >
                          Math view
                        </button>
                        <button
                          class="btn btn-primary"
                          @click.prevent="dynamicUpdate = !dynamicUpdate"
                          v-if="!dynamicUpdate"
                        >
                          Dynamic math
                        </button>
                        <button
                          class="btn btn-success"
                          @click.prevent="dynamicUpdate = !dynamicUpdate"
                          v-else
                        >
                          Dynamic math
                        </button>
                      </div>
                    </div>
                    <div class="col-12 row mt-1">
                      <div class="row align-items-center col-12">
                        <div class="col-2">
                          <label for="name"
                            >Savol<span class="text-danger">*</span></label
                          >
                        </div>
                        <div class="col-10" style="padding-left: 10px">
                          <div>
                            <ValidationProvider
                              name="Savol"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <div class="position-relative has-icon-left">
                                <textarea
                                  @keyup="setMathPluginForAll('test_question')"
                                  class="form-control"
                                  id="name"
                                  name="fname-icon"
                                  type="text"
                                  rows="1"
                                  v-model="testQuestionModel.question"
                                >
                                </textarea>
                              </div>
                              <span
                                class="text-danger"
                                v-if="errors.length > 0"
                                >{{ errors[0] }}</span
                              >
                            </ValidationProvider>
                          </div>
                          <div class="mt-1" id="test_question">
                            <div class="position-relative has-icon-left">
                              <span
                                class="form-control"
                                type="text"
                                v-html="testQuestionModel.question"
                                style="height: auto"
                              >
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 row mt-1">
                      <div class="row align-items-center col-12">
                        <div class="col-2">
                          <label for="first_answer"
                            >Birinchi javob<span class="text-danger"
                              >*</span
                            ></label
                          >
                        </div>
                        <div class="col-9" style="padding-left: 10px">
                          <div>
                            <ValidationProvider
                              name="first_answer"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <div class="position-relative has-icon-left">
                                <textarea
                                  @keyup="setMathPluginForAll('answer_one')"
                                  class="form-control"
                                  id="first_answer"
                                  name="fname-icon"
                                  type="text"
                                  rows="1"
                                  v-model="testQuestionModel.ans1"
                                >
                                </textarea>
                              </div>
                              <span
                                class="text-danger"
                                v-if="errors.length > 0"
                                >{{ errors[0] }}</span
                              >
                            </ValidationProvider>
                          </div>
                          <div class="mt-1" id="answer_one">
                            <div class="position-relative has-icon-left">
                              <span
                                class="form-control"
                                type="text"
                                v-html="testQuestionModel.ans1"
                                style="height: auto"
                              >
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="col-1">
                          <fieldset>
                            <div class="vs-radio-con">
                              <input
                                :checked="
                                  testQuestionModel.testKey === 1
                                    ? 'checked'
                                    : ''
                                "
                                @change="makeCorrect(1)"
                                type="radio"
                              />
                              <span class="vs-radio">
                                <span class="vs-radio--border" />
                                <span class="vs-radio--circle" />
                              </span>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 row mt-1">
                      <div class="row align-items-center col-12">
                        <div class="col-2">
                          <label for="second_answer"
                            >Ikkinchi javob<span class="text-danger"
                              >*</span
                            ></label
                          >
                        </div>
                        <div class="col-9" style="padding-left: 10px">
                          <div>
                            <ValidationProvider
                              name="second_answer"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <div class="position-relative has-icon-left">
                                <textarea
                                  @keyup="setMathPluginForAll('answer_two')"
                                  class="form-control"
                                  id="second_answer"
                                  name="fname-icon"
                                  type="text"
                                  rows="1"
                                  v-model="testQuestionModel.ans2"
                                >
                                </textarea>
                              </div>
                              <span
                                class="text-danger"
                                v-if="errors.length > 0"
                                >{{ errors[0] }}</span
                              >
                            </ValidationProvider>
                          </div>
                          <div class="mt-1" id="answer_two">
                            <div class="position-relative has-icon-left">
                              <span
                                class="form-control"
                                type="text"
                                v-html="testQuestionModel.ans2"
                                style="height: auto"
                              >
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="col-1">
                          <fieldset>
                            <div class="vs-radio-con">
                              <input
                                :checked="
                                  testQuestionModel.testKey === 2
                                    ? 'checked'
                                    : ''
                                "
                                @change="makeCorrect(2)"
                                type="radio"
                              />
                              <span class="vs-radio">
                                <span class="vs-radio--border" />
                                <span class="vs-radio--circle" />
                              </span>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 row mt-1">
                      <div class="row align-items-center col-12">
                        <div class="col-2">
                          <label for="third_answer"
                            >Uchinchi javob<span class="text-danger"
                              >*</span
                            ></label
                          >
                        </div>
                        <div class="col-9" style="padding-left: 10px">
                          <div>
                            <ValidationProvider
                              name="second_answer"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <div class="position-relative has-icon-left">
                                <textarea
                                  @keyup="setMathPluginForAll('answer_three')"
                                  class="form-control"
                                  id="third_answer"
                                  name="fname-icon"
                                  type="text"
                                  rows="1"
                                  v-model="testQuestionModel.ans3"
                                >
                                </textarea>
                              </div>
                              <span
                                class="text-danger"
                                v-if="errors.length > 0"
                                >{{ errors[0] }}</span
                              >
                            </ValidationProvider>
                          </div>
                          <div class="mt-1" id="answer_three">
                            <div class="position-relative has-icon-left">
                              <span
                                class="form-control"
                                type="text"
                                v-html="testQuestionModel.ans3"
                                style="height: auto"
                              >
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="col-1">
                          <fieldset>
                            <div class="vs-radio-con">
                              <input
                                :checked="
                                  testQuestionModel.testKey === 3
                                    ? 'checked'
                                    : ''
                                "
                                @change="makeCorrect(3)"
                                type="radio"
                              />
                              <span class="vs-radio">
                                <span class="vs-radio--border" />
                                <span class="vs-radio--circle" />
                              </span>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 row mt-1">
                      <div class="row align-items-center col-12">
                        <div class="col-2">
                          <label for="fourth_answer"
                            >To'rtinchi javob<span class="text-danger"
                              >*</span
                            ></label
                          >
                        </div>
                        <div class="col-9" style="padding-left: 10px">
                          <div>
                            <ValidationProvider
                              name="second_answer"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <div class="position-relative has-icon-left">
                                <textarea
                                  @keyup="setMathPluginForAll('answer_fourth')"
                                  class="form-control"
                                  id="fourth_answer"
                                  name="fname-icon"
                                  type="text"
                                  rows="1"
                                  v-model="testQuestionModel.ans4"
                                >
                                </textarea>
                              </div>
                              <span
                                class="text-danger"
                                v-if="errors.length > 0"
                                >{{ errors[0] }}</span
                              >
                            </ValidationProvider>
                          </div>
                          <div class="mt-1" id="answer_fourth">
                            <div class="position-relative has-icon-left">
                              <span
                                class="form-control"
                                type="text"
                                v-html="testQuestionModel.ans4"
                                style="height: auto"
                              >
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="col-1">
                          <fieldset>
                            <div class="vs-radio-con">
                              <input
                                :checked="
                                  testQuestionModel.testKey === 4
                                    ? 'checked'
                                    : ''
                                "
                                @change="makeCorrect(4)"
                                type="radio"
                              />
                              <span class="vs-radio">
                                <span class="vs-radio--border" />
                                <span class="vs-radio--circle" />
                              </span>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-12 mt-1"
                      style="padding-right: 70px; margin-bottom: 10px"
                    >
                      <div class="float-right">
                        <button
                          class="btn btn-danger mr-1"
                          @click="gotoTestList"
                        >
                          <span
                            aria-hidden="true"
                            class="spinner-border spinner-border-sm"
                            role="status"
                            v-if="loading"
                          />
                          Testlar ro'yxatiga qaytish
                        </button>
                        <button
                          :disabled="loading"
                          class="btn btn-primary"
                          type="submit"
                          v-if="successMessage === ''"
                        >
                          <span
                            aria-hidden="true"
                            class="spinner-border spinner-border-sm"
                            role="status"
                            v-if="loading"
                          />
                          Saqlash
                        </button>
                        <button
                          class="btn btn-primary mr-1"
                          disabled="disabled"
                          type="button"
                          v-else
                        >
                          <i class="feather icon-check" />
                          {{ successMessage }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
    <a class="d-none" href="#" ref="anchor" />
  </div>
</template>

<script>
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { mapActions, mapGetters } from "vuex";

extend("required", {
  ...required,
  message: "Kiriting {_field_}",
});

export default {
  name: "Form",
  data() {
    return {
      loading: false,
      successMessage: "",
      testQuestionId: null,
      testQuestionModel: {
        id: 0,
        subjectId: 0,
        sectionId: 0,
        parag: 0,
        punct: 0,
        class: 0,
        lang: 0,
        level: 0,
        question: null,
        qustion: null,
        ans1: null,
        ans2: null,
        ans3: null,
        ans4: null,
        testKey: 0,
        isActive: true,
      },
      dynamicUpdate: false,
      correctAnswerKey: 1,
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(["subjectList", "classList", "languages", "questionLevels"]),
  },
  methods: {
    ...mapActions(["getQuestionLevels", "getSubjectList"]),
    gotoTestList() {
      this.$router.push({ name: "test-list" });
    },
    storeData() {
      this.loading = true;
      if (this.testQuestionModel.id) {
        this.updateData();
      } else {
        this.createData();
      }
    },
    createData() {
      this.$api
        .post("admin/AbitTest/CreateTest", this.formData())
        .then((res) => {
          if (!res.error) {
            this.succMessage("Сохранено");
          } else {
            this.notificationMessage(res.error, "error");
          }
        })
        .catch((err) => {
          this.notificationMessage("Ошибка", "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateData() {
      this.loading = true;
      this.$api
        .put("admin/AbitTest/EditTest", this.testQuestionModel)
        .then((res) => {
          if (res.error === null) {
            this.notificationMessage("Успешно сохранен", "success");
          } else {
            this.notificationMessage(res.error, "error");
          }
        })
        .catch((err) => {
          this.notificationMessage("Ошибка", "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getData() {
      this.$api.get(`admin/`).then((res) => {
        if (!res.error && res.statusCode === 200) {
          this.dataObject = res.result;
        }
      });
    },
    createCourseObject(course = null) {
      return {
        title: "",
        content: "",
        image: null,
      };
    },
    formData() {
      let form = new FormData();
      for (let prop in this.testQuestionModel)
        form.append(prop, this.testQuestionModel[prop]);
      return form;
    },
    successMessageMethod(successMessage) {
      this.successMessage = successMessage;
      this.notificationMessage(successMessage, "success");
      setTimeout(() => {
        this.successMessage = "";
      }, 1000);
    },
    checkIfTestUpdating() {
      if (this.$route.params.id) {
        this.testQuestionId = this.$route.params.id;
        this.getOneTest();
      }
    },
    getOneTest() {
      this.$api
        .get(`admin/AbitTest/GetTest?testId=${this.testQuestionId}`)
        .then((res) => {
          if (!res.error) {
            this.testQuestionModel = res.result[0];
            this.testQuestionModel.question = this.testQuestionModel.qustion;
            this.testQuestionModel.id = this.testQuestionModel.testId;
            this.katexView.question = this.mathStyled(
              this.testQuestionModel.question
            );
            this.katexView.ans1 = this.testQuestionModel.ans1;
            this.katexView.ans2 = this.testQuestionModel.ans2;
            this.katexView.ans3 = this.testQuestionModel.ans3;
            this.katexView.ans4 = this.testQuestionModel.ans4;
          }
        });
    },
    setMathPluginForAll(element) {
      if (!this.dynamicUpdate) return;
      this.setMathPluginById(element);
    },
    setMathPluginWithoutDynamic() {
      this.setMathPluginById("test_question");
      this.setMathPluginById("answer_one");
      /*      this.setMathPluginById('answer_two');
            this.setMathPluginById('answer_three');
            this.setMathPluginById('answer_fourth');*/
    },
    makeCorrect(answerKey) {
      this.testQuestionModel.testKey = answerKey;
    },
  },
  created() {
    this.getQuestionLevels();
    this.getSubjectList();
    this.checkIfTestUpdating();
  },
  mounted() {},
};
</script>

<style scoped></style>
