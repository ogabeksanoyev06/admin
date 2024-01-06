
<template>
  <div class="row" id="table-hover-animation">
    <div class="col-12">
      <div class="card m-0">
        <div class="card-content">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive shadow">
                  <table class="table table-hover mb-0">
                    <thead>
                    <tr>
                      <th scope="col">Talaba</th>
                      <th scope="col">Guruh</th>
                      <th scope="col">IP manzil</th>
                      <th scope="col">Urinishlar</th>
                      <th scope="col">To'g'ri</th>
                      <th scope="col">Ball</th>
                      <th scope="col">Foiz</th>
                      <th scope="col">Boshlandi</th>
                      <th scope="col">Vaqt</th>
                      <th scope="col">Tugadi</th>
                    </tr>
                    </thead>
                    <transition name="fade" :duration="2000">
                      <tbody class="table-bordered">
                      <tr
                          v-for="(item, index) in results"
                          :key="index"
                      >

                        <th style="color: #0b0b0b">    <router-link :to="{ name: 'test-result-one', params: { student_id:item.student.id,exam_id:examId} }">
                          {{ item.student.full_name }}
                        </router-link>
                        </th>
                        <td>{{ item.group.name }}</td>
                        <td>
                        {{item.ip_address}}
                        </td>
                        <td>{{item.attempts }}</td>
                        <td>{{item.correct_answer }}</td>
                        <td>{{item.score }}</td>
                        <td>{{item.percentage }}</td>
                        <td>{{$moment(item.begin_time).format("YYYY-MM-DD HH:mm:ss") }}</td>
                        <td>{{ Math.floor(item.time_spent/60)}} min {{item.time_spent-((Math.floor(item.time_spent/60))*60)}} sec</td>
                        <td>{{$moment(item.end_time).format("YYYY-MM-DD HH:mm:ss") }}</td>
                      </tr>
                      </tbody>
                    </transition>
                  </table>
                </div>
              </div>

            </div>
          </div>
<!--          <div-->
<!--              class="d-flex justify-content-center"-->
<!--              v-if="educationYearP.length > 0"-->
<!--          >-->
<!--            <v-pagination-->
<!--                v-model="currentPage"-->
<!--                :classes="bootstrapPaginationClasses"-->
<!--                :page-count="totalSize"-->
<!--            />-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      results:[],
      examId:''
    }
  },
  methods:{
    getResults(){
      axios.get(`https://api.fastlms.uz/api/result-exam/${this.examId}/`).then((res)=>{
        this.results =res.data
      })
    }
  },
  mounted() {
    this.getResults()
  },
  created() {
    this.examId = this.$route.params.examId
  }
}
</script>
<style scoped>

</style>