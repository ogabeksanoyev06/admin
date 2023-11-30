<template>
  <div class="row" id="test_editing_component">
    <div class="col-12">
      <div class="card col">
        <div class="card-header mb-1">
          <h4 class="card-title">Testlar</h4>
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="card-title mr-2">
              Umumiy soni <strong>{{ testResultTotals }} </strong>ta
            </h4>
            <button class="btn btn-primary" @click="createEditQuestion">
              Yangi savol qo'shish
            </button>
          </div>
        </div>
        <div class="card-content">
          <div class="d-flex mb-1">
            <div class="col-2">
              <select
                class="form-control"
                v-model="requestModel.langId"
                @change="changeRequestModel"
              >
                <option :value="null">Barchasi</option>
                <option
                  v-for="(item, key) in languages"
                  :key="key"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="col-4">
              <select
                class="form-control"
                v-model="requestModel.subjectId"
                @change="changeRequestModel"
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
            <div class="col-2">
              <select
                class="form-control"
                v-model="requestModel.class"
                @change="changeRequestModel"
              >
                <option :value="null">Sinfni tanlang</option>
                <option
                  v-for="(item, key) in classList"
                  :key="key"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="col-2">
              <select class="form-control" v-model="requestModel.punct">
                <option>Punctni tanlang</option>
              </select>
            </div>
            <div class="col-2">
              <select class="form-control" v-model="requestModel.parag">
                <option>Paragrafni tanlang</option>
              </select>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-hover table-bordered">
              <thead>
                <tr class="text-center">
                  <th>Savol</th>
                  <th>Rasm</th>
                  <th>Funksiyalar</th>
                </tr>
              </thead>
              <transition name="fade" :duration="2000">
                <tbody v-if="loaded">
                  <tr v-for="(spec, index) in specList" :key="index">
                    <td v-html="mathStyled(spec.qustion)"></td>
                    <td>
                      <div class="test__photo" v-if="spec.image">
                        <img
                          :src="baseURL + 'testimages/' + spec.image"
                          alt=""
                          width="100"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="d-flex justify-content-center">
                        <div
                          class="fonticon-container m-0 p-0 cursor-pointer"
                          @click="editQuestion(spec.testId)"
                        >
                          <div class="fonticon-wrap m-0 p-0">
                            <i class="feather icon-edit"></i>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </transition>
            </table>
          </div>
          <div
            class="d-flex justify-content-center mt-1"
            v-if="specList && totalSize > 10"
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
  name: "Subjects",
  components: {
    vPagination,
  },
  data() {
    return {
      testResultTotals: null,
      specList: [],
      loaded: false,
      showModal: false,
      showExamModal: false,
      totalSize: 1,
      currentPage: 1,
      bootstrapPaginationClasses: {
        ul: "pagination",
        li: "page-item",
        liActive: "active",
        liDisable: "disabled",
        button: "page-link",
      },
      abitExamList: [],
      requestModel: {
        subjectId: 1,
        langId: 1,
        question: null,
        parag: null,
        punct: null,
        class: null,
        take: 10,
      },
    };
  },
  computed: {
    ...mapGetters(["subjectList", "classList", "languages"]),
  },
  methods: {
    ...mapActions(["getSubjectList"]),
    getSpecs(skip = 0) {
      this.loaded = false;
      this.$api
        .get(
          `admin/AbitTest/GetTestList?SubjectId=${this.requestModel.subjectId}&LangId=${this.requestModel.langId}&Parag=${this.requestModel.parag}&Punct=${this.requestModel.punct}&Class=${this.requestModel.class}&skip=${skip}&take=${this.requestModel.take}`
        )
        .then((res) => {
          if (!res.error) {
            this.specList = res.result.data;
            this.totalSize = Math.ceil(res.result.total / 10);
            this.testResultTotals = res.result.total;
            this.specList.forEach((questionObject) => {
              try {
                questionObject.image = null;
                let question = questionObject.qustion;
                if (question.includes("\\includegraphics")) {
                  let questionParts = question.split("\\includegraphics");
                  questionObject.qustion = questionParts[0];
                  let imagePartsLeft = questionParts[1].split("{");
                  let imagePartsRight = imagePartsLeft[1].split("}");
                  questionObject.image = imagePartsRight[0].toLowerCase();
                  questionObject.qustion =
                    questionParts[0] + " " + imagePartsRight[1];
                }
              } catch (e) {
                //
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loaded = true;
        });
    },
    subjectName(subjectId) {
      let subjectName = null;
      let subject = this.subjectList.find((s) => s.id === subjectId);
      if (subject) {
        subjectName = subject.name;
      }
      return subjectName;
    },
    changeRequestModel() {
      this.getSpecs(this.currentPage - 1);
    },
    parseImage(question) {
      try {
        if (question.includes("\\includegraphics")) {
          let questionParts = question.split("\\includegraphics");
          this.selectedQuestion.question = questionParts[0];
          let imagePartsLeft = questionParts[1].split("{");
          let imagePartsRight = imagePartsLeft[1].split("}");
          this.selectedQuestion.questionImage =
            imagePartsRight[0].toLowerCase();
          this.selectedQuestion.question =
            questionParts[0] + " " + imagePartsRight[1];
        }
      } catch (e) {
        //
      }
    },
    createEditQuestion() {
      this.$router.push({ name: "test-editing" });
    },
    editQuestion(id) {
      this.$router.push({ name: "test-editing", params: { id: id } });
    },
  },
  watch: {
    currentPage() {
      this.getSpecs(this.currentPage - 1);
    },
  },
  created() {
    this.getSubjectList();
    this.getSpecs();
  },
  mounted() {
    this.setMathPlugin();
  },
};
</script>

<style scoped>
.selected_one {
  color: white;
  background-color: #7367f0;
}

.table-hover tbody tr:hover {
  color: white;
  background-color: #7367f0;
}

.fonticon-container:hover i {
  color: #fff;
  font-size: 2.9rem;
  -webkit-transform: scale(1.3);
  -moz-transform: scale(1.3);
  -ms-transform: scale(1.3);
  -o-transform: scale(1.3);
  transform: scale(1.3);
}
</style>
