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
                    Imtihon yaratrish
                  </button>
                </div>
              </div>
              <div class="col-md-3">
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
              <div class="col-md-3">
                <div class="form-group">
                  <select class="form-control">
                    <option :value="null">Guruhni tanlang</option>
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
                    <tr v-for="(tariff, index) in 10" :key="index">
                      <td>
                        <p>27.11.2023 Yakuniy nazorat. Audit. E-bino (RUS)</p>
                        <span class="text-muted">
                          AUDIT / Yakuniy nazorat / MAXMUDOV A. A.
                        </span>
                      </td>
                      <td>
                        2023-2024 <br />
                        <span class="text-muted">9-semestr </span>
                      </td>
                      <td>SBHA-01, SBHA-02</td>
                      <td>322 / 25</td>
                      <td>27.11.2023 14:30</td>
                      <td>27.11.2023 15:50</td>
                      <td>50 daqiqa</td>
                      <td>
                        <div
                          class="custom-control custom-switch custom-control-inline"
                        >
                          <input class="custom-control-input" type="checkbox" />
                          <label class="custom-control-label"></label>
                        </div>
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
export default {
  name: "exam-index",
  components: { vPagination },
  data() {
    return {
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
    addExamTest() {
      this.$router.push({ name: "exam-edit" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
