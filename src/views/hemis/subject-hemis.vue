<template>
  <div class="row">
    <loading v-if="loading" />
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card mb-2">
        <div
          class="card-content d-flex align-items-center"
          style="min-height: 120px"
        >
          <div class="card-body">
            <div class="num">
              <h2 style="margin-bottom: 0; color: white">1</h2>
            </div>
            <p style="flex: 1">Fanlarni nomini yuklash</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getSubject">
            Yuklash
          </button>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card mb-2">
        <div
          class="card-content d-flex align-items-center"
          style="min-height: 120px"
        >
          <div class="card-body">
            <div class="num">
              <h2 style="margin-bottom: 0; color: white">2</h2>
            </div>
            <p style="flex: 1">Fanlar blokini yuklash</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getSubjectBlock">
            Yuklash
          </button>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card mb-2">
        <div
          class="card-content d-flex align-items-center"
          style="min-height: 120px"
        >
          <div class="card-body">
            <div class="num">
              <h2 style="margin-bottom: 0; color: white">3</h2>
            </div>
            <p style="flex: 1">Fanlar turini yuklash</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getSubjectType">
            Yuklash
          </button>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card mb-2">
        <div
          class="card-content d-flex align-items-center"
          style="min-height: 120px"
        >
          <div class="card-body">
            <div class="num">
              <h2 style="margin-bottom: 0; color: white">4</h2>
            </div>
            <p style="flex: 1">
              Fanga bog'langan imtihon shaklini yuklab olish
            </p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getSubjectExamFinsh">
            Yuklash
          </button>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card mb-2">
        <div
          class="card-content d-flex align-items-center"
          style="min-height: 120px"
        >
          <div class="card-body">
            <div class="num">
              <h2 style="margin-bottom: 0; color: white">5</h2>
            </div>
            <p style="flex: 1">Fan konteryerini yuklash</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getSubjectCurriculum">
            Yuklash
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../../components/Loading.vue";
export default {
  components: { Loading },
  name: "subject-hemis",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    getSubject() {
      this.loading = true;
      this.$api
        .get(`subject/hemis/get/`)
        .then((res) => {
          this.notificationMessage(res.succes, "success");
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getSubjectBlock() {
      this.loading = true;
      this.$api
        .get(`subjectblock/hemis/get/`)
        .then((res) => {
          this.notificationMessage(res.succes, "success");
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getSubjectType() {
      this.loading = true;
      this.$api
        .get(`subjecttype/hemis/get/`)
        .then((res) => {
          this.notificationMessage(res.succes, "success");
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getSubjectExamFinsh() {
      this.loading = true;
      this.$api
        .get(`subjectexamfinsh/hemis/get/`)
        .then((res) => {
          this.notificationMessage(res.succes, "success");
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getSubjectCurriculum() {
      this.loading = true;
      this.$api
        .get(`subject_curriculum/hemis/get/`)
        .then((res) => {
          this.notificationMessage(res.succes, "success");
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-body {
  display: flex;
  gap: 10px;
}

.num {
  background-color: #1f9d57;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
</style>
