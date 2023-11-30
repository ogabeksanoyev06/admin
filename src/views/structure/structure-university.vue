<template>
  <div class="row" id="table-hover-animation">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">OTM ma'lumotlari</h4>
          <button
            type="button"
            class="btn btn-success waves-effect waves-light"
          >
            Qo'shish
          </button>
        </div>
        <div class="card-content">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <transition name="fade" :duration="2000">
                  <tbody class="table-bordered">
                    <tr>
                      <th>Kod</th>
                      <td>{{ univercity.kod }}</td>
                    </tr>
                    <tr>
                      <th>Nomi º</th>
                      <td>{{ univercity.name }}</td>
                    </tr>
                    <tr>
                      <th>Hudud</th>
                      <td>{{ univercity.city.name }}</td>
                    </tr>
                    <tr>
                      <th>Shahar º</th>
                      <td>{{ univercity.area_located }}</td>
                    </tr>
                    <tr>
                      <th>STIR</th>
                      <td>{{ univercity.stir }}</td>
                    </tr>
                    <tr>
                      <th>Kontakt</th>
                      <td>{{ univercity.phone }}</td>
                    </tr>
                    <tr>
                      <th>Rektor</th>
                      <td>{{ univercity.rektor }}</td>
                    </tr>
                    <tr>
                      <th>OTM turi</th>
                      <td>{{ univercity.ownership.name }}</td>
                    </tr>
                    <tr>
                      <th>OTM shakli</th>
                      <td>{{ univercity.universityForm.name }}</td>
                    </tr>
                    <tr>
                      <th>Pochta manzili º</th>
                      <td>{{ univercity.address }}</td>
                    </tr>
                    <tr>
                      <th>Bank ma'lumotlari</th>
                      <td>
                        {{ univercity.bank_info }}
                      </td>
                    </tr>
                    <tr>
                      <th>Akkreditasiya ma'lumotlari º</th>
                      <td>{{ univercity.akkreditasiya_info }}</td>
                    </tr>
                  </tbody>
                </transition>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "university",
  data() {
    return {
      loaded: false,
      univercity: {},
    };
  },
  methods: {
    getUsersList() {
      this.loaded = false;
      this.$api
        .get(`otm`)
        .then((res) => {
          if (!res.error) {
            this.univercity = res;
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.loaded = true;
        });
    },
  },
  created() {
    this.getUsersList();
  },
};
</script>

<style lang="scss" scoped></style>
