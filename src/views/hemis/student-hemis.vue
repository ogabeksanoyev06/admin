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
            <p style="flex: 1">Jinsni yuklash</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getGender">
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
            <p style="flex: 1">Talaba holati</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getStudentStatus">
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
            <p style="flex: 1">To'lov shakli</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getPaymentForm">
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
            <p style="flex: 1">Hudud</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getState">
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
            <p style="flex: 1">Fuqaroligi</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getCitizenship">
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
            <p style="flex: 1">Ijtimoiy kategoriya</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getSocialCategory">
            Yuklash
          </button>
        </div>
      </div>
    </div>
    <!--    <div class="col-12 col-sm-6 col-md-4 col-lg-3">-->
    <!--      <div class="card mb-2">-->
    <!--        <div-->
    <!--          class="card-content d-flex align-items-center"-->
    <!--          style="min-height: 120px"-->
    <!--        >-->
    <!--          <div class="card-body">-->
    <!--            <p>Ijtimoiy xolat</p>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="card-footer p-1">-->
    <!--          <button class="btn btn-success w-100" @click="getSocialCategory">-->
    <!--            Yuklash-->
    <!--          </button>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
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
            <p style="flex: 1">Turar joy</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getAccommodation">
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
            <p style="flex: 1">Talabalar</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getStudents">
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
  name: "hemis-strudent",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    getGender() {
      this.loading = true;
      this.$api
        .get(`state/hemis/get/`)
        .then((res) => {
          if (res.status === 200) {
            this.notificationMessage(res.message, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getStudentStatus() {
      this.loading = true;
      this.$api
        .get(`student-status/hemis/get/`)
        .then((res) => {
          if (res.status === 200) {
            this.notificationMessage(res.message, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getPaymentForm() {
      this.loading = true;
      this.$api
        .get(`payment-form/hemis/get/`)
        .then((res) => {
          if (res.status === 200) {
            this.notificationMessage(res.message, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getState() {
      this.loading = true;
      this.$api
        .get(`state/hemis/get/`)
        .then((res) => {
          if (res.status === 200) {
            this.notificationMessage(res.message, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getCitizenship() {
      this.loading = true;
      this.$api
        .get(`citizenship/hemis/get/`)
        .then((res) => {
          if (res.status === 200) {
            this.notificationMessage(res.message, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getSocialCategory() {
      this.loading = true;
      this.$api
        .get(`social-category/hemis/get/`)
        .then((res) => {
          if (res.status === 200) {
            this.notificationMessage(res.message, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getAccommodation() {
      this.loading = true;
      this.$api
        .get(`accommodation/hemis/get/`)
        .then((res) => {
          if (res.status === 200) {
            this.notificationMessage(res.message, "success");
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getStudents() {
      this.loading = true;
      this.$api
        .get(`students/get/hemis`)
        .then((res) => {
          if (res.status === 200) {
            this.notificationMessage(res.message, "success");
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
