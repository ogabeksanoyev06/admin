<template>
  <div>
    <div class="card">
      <div class="card-header">
        <div class="row w-100">
          <div class="col-12 col-md-6 col-xl-4">
            <div class="form-group">
              <select class="form-control col" v-model="select_value">
                <option value="0">O'quv rejani tanlang</option>
                <option
                  v-for="(item, i) in curriculum"
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
                  placeholder="Nomi bo'yicha qidirish"
                  v-model="input_value"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>Fan</th>
                  <th>O'quv reja</th>
                  <th>Ta'lim turi</th>
                  <th>Ta'lim shakli</th>
                </tr>
              </thead>
              <transition name="fade" :duration="2000">
                <tbody>
                  <tr
                    v-for="(item, index) in contentAll"
                    :key="index"
                    class="cursor-pointer"
                    @click="assign(item.id)"
                  >
                    <td>{{ item.subject_id.name }}</td>
                    <td>{{ item.curriculum_id.name }}</td>
                    <td>{{ item.subject_id.sub_educationtype.name }}</td>
                    <td>{{ item.curriculum_id.educationform.name }}</td>
                  </tr>
                </tbody>
              </transition>
            </table>
          </div>
        </div>
      </div>
      <!-- <div class="card-footer"></div> -->
    </div>
    <Modal :modal="modal" @modal-closed="modal = false">
      <div class="card">
        <div class="card-header flex-column align-items-start">
          <h3 class="mb-1">O'qituvchini belgilash</h3>
          <div class="w-100">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Nom bo‘yicha qidirish"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <select class="form-control" v-model="roletype_id_teacher">
                    <option :value="null">O'qituvchi rolini tanlang</option>
                    <option
                      v-for="(item, key) in teacherRole"
                      :key="key"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-content">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>O'qituvchi</th>
                    <th>Yaratilgan</th>
                    <th>O'zgartirilgan</th>
                  </tr>
                </thead>
                <transition name="fade" :duration="2000">
                  <tbody>
                    <tr
                      v-for="(item, index) in teacherAll"
                      :key="index"
                      class="cursor-pointer"
                      @click="teacher_id = item.id"
                      :class="{ active: item.id === teacher_id }"
                    >
                      <td>
                        <span>{{ item.full_name }}</span>
                      </td>
                      <td>
                        {{
                          $moment(item.created_at).format("YYYY-MM-DD HH:ss")
                        }}
                      </td>
                      <td>
                        {{ $moment(item.update_at).format("YYYY-MM-DD HH:ss") }}
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
        <div class="card-footer d-flex justify-content-end">
          <button class="btn btn-success" @click="contentTeacher">
            Qo'shish
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "../../components/Modal.vue";
import vPagination from "vue-plain-pagination";
export default {
  name: "subject-register",
  components: { Modal, vPagination },
  data() {
    return {
      loading: false,
      modal: false,
      curriculum: [],
      contentAll: [],
      teacherAll: [],
      teacherRole: [],
      teacher_id: null,
      content_id: null,
      select_value: "",
      input_value: "",
      roletype_id_teacher: null,
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
  methods: {
    getCurriculum() {
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
    getContentAll() {
      this.loading = false;
      this.$api
        .get(
          `getcontent/all/?name=${this.input_value}&curriculum_id=${this.select_value}`
        )
        .then((res) => {
          if (!res.error) {
            this.contentAll = res;
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = true;
        });
    },
    getTeacherAll() {
      this.loading = false;
      this.$api
        .get(`teacherlike/?page_number=${this.currentPage}`)
        .then((res) => {
          if (!res.error) {
            this.teacherAll = res.results;
            this.totalSize = res.page_count;
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = true;
        });
    },
    getRoleType() {
      this.loading = false;
      this.$api
        .get(`roletype/`)
        .then((res) => {
          if (!res.error) {
            this.teacherRole = res.results;
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = true;
        });
    },
    contentTeacher() {
      this.loading = false;
      this.$api
        .post(`content_teacher/`, {
          teacher_id: this.teacher_id,
          content_id: this.content_id,
          roletype_id_teacher: this.roletype_id_teacher,
        })
        .then((res) => {
          if (!res.error) {
            this.notificationMessage("Qoshildi", "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = true;
        });
    },
    assign(id) {
      this.modal = true;
      this.content_id = id;
    },
  },
  watch: {
    currentPage() {
      this.getTeacherAll();
    },
    select_value() {
      this.getContentAll();
    },
    input_value() {
      this.getContentAll();
    },
  },
  mounted() {
    this.getCurriculum();
    this.getContentAll();
    this.getTeacherAll();
    this.getRoleType();
  },
};
</script>

<style lang="scss" scoped>
tbody tr.active {
  background-color: #28c76f;
  color: #fff;
}
</style>
