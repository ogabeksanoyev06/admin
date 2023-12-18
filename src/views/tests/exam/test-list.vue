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
      <div class="first">
      <div class="item-index">{{ index + 1 }}.</div>
      <div class="item-name">{{ item.name }}</div>
      </div>
        <div
            class="custom-control custom-switch custom-control-inline"
        >
          <input type="checkbox" v-model="items.is_active" class="custom-control-input" />
          <label class="custom-control-label"></label>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      exam_id:''
    };
  },
  methods:{
    getExams(){
      axios.get(`https://api.fastlms.uz/api/test/${this.exam_id}/list`).then((res)=>{
        console.log(res)
        this.items=res.data
      })
    }
  },
  mounted() {
    this.getExams()
  },
  created() {
       this.exam_id = this.$route.params.exam_id;
   },
};
</script>

<style scoped>
.main-area{
  padding: 5px;
  box-sizing: border-box;
}
.list-item-header{
  margin-right: 20px;
}
.container {
  font-family: Arial, sans-serif;
}
.heading{
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
  .first{
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


.button-see{
  width: fit-content;
  margin-top: 5px;
  margin-bottom: 5px;
}
/* Adjust the styles according to your needs */
</style>
