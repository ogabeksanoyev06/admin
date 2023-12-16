<template>
  <div class="card">
    <div class="card-header">
      <h3>Imtihon guruhlari</h3>
    </div>
    <div class="card-content">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Guruh</th>
                <th>Fakultet</th>
                <th>Til</th>
                <th>Boshlanish</th>
                <th>Tugash</th>
                <th>O'chirish</th>
              </tr>
            </thead>
            <transition name="fade" :duration="2000">
              <tbody>
                <tr v-for="(spec, index) in addedGroups" :key="index">
                  <td>
                    <span class="cursor-pointer" @click="studentGroupId">
                      {{ spec.name }}
                    </span>
                  </td>
                  <td>{{ spec.faculty }}</td>
                  <td>{{ spec.educationLang }}</td>
                  <td>06.12.2023 14:50</td>
                  <td>Tugash vaqti</td>
                  <td>
                    <button
                      @click="delteGroup(spec.id)"
                      class="btn waves-effect waves-light btn-icon rounded-circle btn-flat-danger"
                      title="O'chirish"
                    >
                      <i
                        class="feather icon-trash-2"
                        style="font-size: 1.5rem"
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </transition>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../../../components/Modal.vue";
export default {
  name: "group-modal-id",
  components: { Modal },
  props: {
    exam_id: {
      type: [String, Number],
      required: true,
      default: "",
    },
  },
  data() {
    return {
      groupList:[]
    };
  },
  methods: {
    getGroupsList() {
      this.$api
        .get("group/?limit=100")
        .then((res) => {
          this.groupList = res.results;
        })
        .catch((err) => {
          this.notificationMessage(err.response.data.message, "error");
        });
    },
    delteGroup(id) {
      this.$api
        .patch(`exam/${this.exam_id}/delete-groups`, {
          group_id: id,
        })
        .then((res) => {
          this.notificationMessage(res.message, "success");
          this.getExamDetail();
        });
    },
  },
  mounted() {
    this.getGroupsList();
  },
};
</script>

<style lang="scss" scoped></style>
