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
            <p style="flex: 1">
              Otm uchun yuklangan Yonalishlarni yuklab olish Bakalavr
            </p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getBspeciality">
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
            <p style="flex: 1">
              Otm uchun yuklangan Yonalishlarni yuklab olish Magistratur
            </p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getMspeciality">
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
            <p style="flex: 1">
              Otm uchun yuklangan Yonalishlarni yuklab olish Ordenatura
            </p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getOspeciality">
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
              Otm uchun yuklangan Oquv yillar to`plami yuklash
            </p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getEducationYear">
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
            <p style="flex: 1">
              Otm uchun yuklangan Oquv yil turlari to`plami yuklash
            </p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getEducationType">
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
              <h2 style="margin-bottom: 0; color: white">6</h2>
            </div>
            <p style="flex: 1">
              Otm uchun yuklangan Oquv yil format turlari to`plami yuklash
            </p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getEducationForm">
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
              <h2 style="margin-bottom: 0; color: white">7</h2>
            </div>
            <p style="flex: 1">Otm uchun yuklangan O'quv rejani yuklash</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getCurriculum">
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
              <h2 style="margin-bottom: 0; color: white">8</h2>
            </div>
            <p style="flex: 1">
              Otm uchun yuklangan Oquv reja fakultet va yonalishlarni
              birlashtrish
            </p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getConnectSpeciality">
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
              <h2 style="margin-bottom: 0; color: white">9</h2>
            </div>
            <p style="flex: 1">Otm uchun yuklangan Semestr kursini turlari</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getHcourse">
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
              <h2 style="margin-bottom: 0; color: white">10</h2>
            </div>
            <p style="flex: 1">Otm uchun yuklangan Semestr turlari yuklash</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getHsemester">
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
              <h2 style="margin-bottom: 0; color: white">11</h2>
            </div>
            <p style="flex: 1">
              Otm uchun yuklangan Semestrga birktrilgan haftalar harkatini
              yuklavolish
            </p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getHsemesterAction">
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
              <h2 style="margin-bottom: 0; color: white">12</h2>
            </div>
            <p style="flex: 1">Otm uchun yuklangan Oquv tili</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getGroup">
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
              <h2 style="margin-bottom: 0; color: white">13</h2>
            </div>
            <p style="flex: 1">Otm uchun yuklangan guruhlarni qoshish</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getEducationLang">
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
  name: "hemis-curriculum",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    getBspeciality() {
      this.loading = true;
      this.$api
        .get(`bspeciality/hemis/get`)
        .then((res) => {
          if (res) {
            this.notificationMessage(res.succes, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getMspeciality() {
      this.loading = true;
      this.$api
        .get(`mspeciality/hemis/get/`)
        .then((res) => {
          if (res) {
            this.notificationMessage(res.succes, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getOspeciality() {
      this.loading = true;
      this.$api
        .get(`ospeciality/hemis/get/`)
        .then((res) => {
          if (res) {
            this.notificationMessage(res.succes, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getEducationYear() {
      this.loading = true;
      this.$api
        .get(`educationyear/hemis/get`)
        .then((res) => {
          if (res) {
            this.notificationMessage(res.succes, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getEducationType() {
      this.loading = true;
      this.$api
        .get(`educationtype/hemis/get`)
        .then((res) => {
          if (res) {
            this.notificationMessage(res.succes, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getEducationForm() {
      this.loading = true;
      this.$api
        .get(`educationform/hemis/get`)
        .then((res) => {
          if (res) {
            this.notificationMessage(res.succes, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getCurriculum() {
      this.loading = true;
      this.$api
        .get(`curriculum/hemis/get`)
        .then((res) => {
          if (res) {
            this.notificationMessage(res.succes, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getConnectSpeciality() {
      this.loading = true;
      this.$api
        .get(`connectspeciality/hemis/get`)
        .then((res) => {
          if (res) {
            this.notificationMessage(res.succes, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getHcourse() {
      this.loading = true;
      this.$api
        .get(`hcourse/hemis/get/`)
        .then((res) => {
          if (res) {
            this.notificationMessage(res.succes, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getHsemester() {
      this.loading = true;
      this.$api
        .get(`hsemester/hemis/get/`)
        .then((res) => {
          if (res) {
            this.notificationMessage(res.succes, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getHsemesterAction() {
      this.loading = true;
      this.$api
        .get(`hsemesteraction/hemis/get/`)
        .then((res) => {
          if (res) {
            this.notificationMessage(res.succes, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getGroup() {
      this.loading = true;
      this.$api
        .get(`group/hemis/get/`)
        .then((res) => {
          if (res) {
            this.notificationMessage(res.succes, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getEducationLang() {
      this.loading = true;
      this.$api
        .get(`educationlang/hemis/get/`)
        .then((res) => {
          if (res) {
            this.notificationMessage(res.succes, "success");
          }
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
