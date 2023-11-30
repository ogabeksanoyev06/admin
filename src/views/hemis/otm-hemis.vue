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
            <p>Otm uchun yuklangan shaharlarni yuklash</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getOtmCity">
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
            <p>Otm uchun yuklangan Otm turlari yuklash</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getOtmType">
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
            <p>Otm uchun yuklangan Otm shaklini yuklash</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getOtmShape">
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
            <p>Otm uchun yuklangan Otmni yuklash</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getOtm">Yuklash</button>
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
            <p>Otm uchun yuklangan Otm bo`limlarini yuklash</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getOtmSection">
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
            <p>Otm uchun yuklangan Otm Fakultet turlarini yuklash</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getFacultyType">
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
            <p>Otm uchun yuklangan Otm Fakultetlarni yuklash</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getOtmFaculty">
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
            <p>
              Otm uchun yuklangan Otm Fakultetga birktrilgan kafedralar yuklash
            </p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getOtmDepartment">
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
            <p>Otm uchun yuklangan O'quv tili</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getScienceBranch">
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
  name: "hemis-otm",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    getOtmCity() {
      this.loading = true;
      this.$api
        .get(`otmcity/hemis/get`)
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
    getOtmType() {
      this.loading = true;
      this.$api
        .get(`otmtype/hemis/get`)
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
    getOtmShape() {
      this.loading = true;
      this.$api
        .get(`otmshape/hemis/get`)
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
    getOtm() {
      this.loading = true;
      this.$api
        .get(`otm/hemis/get`)
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
    getOtmSection() {
      this.loading = true;
      this.$api
        .get(`otmsection/hemis/get`)
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
    getFacultyType() {
      this.loading = true;
      this.$api
        .get(`faculty_type/hemis/get`)
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
    getOtmFaculty() {
      this.loading = true;
      this.$api
        .get(`otmfaculty/hemis/get`)
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
    getOtmDepartment() {
      this.loading = true;
      this.$api
        .get(`otmdepartment/hemis/get/`)
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
    getScienceBranch() {
      this.loading = true;
      this.$api
        .get(`science_branch/hemis/get/`)
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

<style lang="scss" scoped></style>
