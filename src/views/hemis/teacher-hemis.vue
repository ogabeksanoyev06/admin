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
            <p style="flex: 1">xodim-status</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getEmployeeStatus">
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
            <p style="flex: 1">O'qituvchilarni yuklash</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getTeachers">
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
  name: "hemis-teacher",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    getEmployeeStatus() {
      this.loading = true;
      this.$api
        .get(`employee-status/hemis/get/`)
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
    getTeachers() {
      this.loading = true;
      this.$api
        .get(`teachers/get/hemis`)
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
