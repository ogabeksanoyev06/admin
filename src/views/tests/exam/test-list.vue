<template>
  <div class="card main-area">
    <router-link :to="{ name: 'test-add', params: { examId: this.exam_id } }">
      <button class="button-see btn btn-success waves-effect waves-light">
        Test qo'shish
      </button>
    </router-link>
    <div class="list-header">
      <div class="heading">
        <div>#</div>
        <div>Nomi</div>
      </div>

      <div class="list-item-header">Faol</div>
    </div>
    <div class="list-item" v-for="(item, index) in items" :key="item.id">
      <router-link
        :to="{
          name: 'test-edit',
          params: { test_id: item.id, next_id: exam_id },
        }"
      >
        <div class="first">
          <div class="item-index">{{ index + 1 }}.</div>
          <div v-html="item.name" class="item-name"></div>
        </div>
      </router-link>
      <el-switch
        :key="item.id"
        v-model="item.is_active"
        active-color="#13ce66"
        @change="onChangeSwitch(item, $event)"
        inactive-color="#ff4949"
      >
      </el-switch>
    </div>
  </div>
</template>

<script>
export default {
  name: "test-list",
  props: ["exam_id"],
  data() {
    return {
      items: [],
      exam_id: "",
    };
  },
  methods: {
    getExams() {
      this.$api.get(`test/${this.exam_id}/list`).then((res) => {
        console.log(res);
        this.items = res.data;
      });
      console.log(this.exam_id);
      this.$api.get(`test/${this.exam_id}/list`).then((res) => {
        console.log(res);
        this.items = res.data;
      });
    },
    onChangeSwitch(newValue) {
      this.$api
        .patch(`test/${newValue.id}/update`, {
          is_active: newValue.is_active,
        })
        .then((res) => {
          console.log(res);
        });
    },
  },
  mounted() {
    this.getExams();
  },
  created() {
    this.exam_id = this.$route.params.exam_id;
  },
};
</script>

<style lang="scss" scoped>
.main-area {
  padding: 5px;
  box-sizing: border-box;
}
.list-item-header {
  margin-right: 20px;
}
.container {
  font-family: Arial, sans-serif;
}
.heading {
  display: flex;
  gap: 15px;
}
.list-header {
  display: flex;
  background-color: #e9ecef;
  padding: 10px;
  font-weight: bold;
  justify-content: space-between;
}

.list-item {
  .first {
    color: black;
    display: flex;
  }
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e9ecef;
  justify-content: space-between;
}

.item-index,
.item-name,
.item-status {
  margin-right: 10px;
}

.button-see {
  width: fit-content;
  margin-top: 5px;
  margin-bottom: 5px;
}
/* Adjust the styles according to your needs */
</style>
