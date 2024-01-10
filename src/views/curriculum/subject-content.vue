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
            <p>Aktiv fanlarni yuklab olish</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getSubjectActive">
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
            <p>Aktiv bo'lmagan fanlarni yuklash</p>
          </div>
        </div>
        <div class="card-footer p-1">
          <button class="btn btn-success w-100" @click="getSubjectInActive">
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
  name: "subject-content",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    getSubjectActive() {
      this.loading = true;
      this.$api
        .get(`getcontent/subjects/active/get/`)
        .then((res) => {
          this.notificationMessage(res.succes, "success");
        })
        .catch((err) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    getSubjectInActive() {
      this.loading = true;
      this.$api
        .get(`getcontent/subjects/inactive/get/`)
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

<style lang="scss" scoped></style>
