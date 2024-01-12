<template>
  <section class="content">
    <div class="box" v-if="!loading">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(updateOTM)">
          <div class="box-body">
            <input
              type="text"
              rules="required"
              label="Kod"
              placeholder="OTM kod"
              v-model="otmcity.kod"
              disabled
            />
            <input
              type="text"
              vid="Nomi"
              rules="required"
              label="Nomi º"
              placeholder="Nomi"
              v-model="otmcity.name"
            />
            <div class="grid-block-2">
              <input
                type="text"
                vid="Kontakt"
                v-mask="'+998#########'"
                rules="required"
                label="Kontakt"
                placeholder="Kontakt"
                v-model="otmcity.phone"
              />
              <input
                type="text"
                vid="STIR"
                v-mask="'############'"
                rules="required"
                label="STIR"
                placeholder="STIR"
                v-model="otmcity.stir"
              />
            </div>
            <input
              type="text"
              vid="Hudud"
              rules="required"
              label="Hudud"
              placeholder="Hudud"
              v-model="otmcity.area_located"
            />
            <input
              type="text"
              vid="Shahar"
              rules="required"
              label="Shahar º"
              placeholder="Shahar"
              v-model="otmcity.city.name"
            />
            <input
              type="text"
              vid="OtmTuri"
              rules="required"
              label="OTM turi"
              placeholder="OTM turi"
              v-model="otmcity.ownership.name"
            />
            <input
              type="text"
              vid="OtmShakli"
              rules="required"
              label="OTM shakli"
              placeholder="OTM shakli"
              v-model="otmcity.universityForm.name"
              disabled
            />
            <base-text-area
              type="text"
              vid="Email"
              rules="required"
              rows="4"
              label="Pochta manzili º"
              v-model="otmcity.address"
            />
            <base-text-area
              type="text"
              vid="Bank"
              rules="required"
              rows="7"
              label="Bank ma'lumotlari"
              v-model="otmcity.bank_info"
            />
            <textarea
              type="text"
              vid="Akkreditasiya"
              rules="required"
              rows="3"
              label="Akkreditasiya ma'lumotlari º"
              v-model="otmcity.akkreditasiya_info"
            />
            <div class="box-footer">
              <button type="submit">
                <i class="fa fa-check"></i>
                O‘zgartirish
              </button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";

export default {
  name: "structure-university-update",
  components: {
    ValidationObserver,
  },
  data() {
    return {
      otmcity: null,
      loading: false,
      id: null,
    };
  },
  methods: {
    async getOTM() {
      this.loading = true;
      await this.$api
        .get(`otm`)
        .then((res) => {
          if (res.status_action) {
            this.otmcity = res;
            this.id = res.id;
            this.successNotification("Ma'lumotlar muvaffaqiyatli olingan!");
          } else {
            this.errorNotification("Noto'g'ri javob ma'lumotlari.");
            this.loading = false;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    async updateOTM() {
      await this.$api
        .patch(`otm/update/${this.id}`, {
          kod: this.otmcity.kod,
          name: this.otmcity.name,
          area_located: this.otmcity.area_located,
          phone: this.otmcity.phone,
          stir: this.otmcity.stir,
          rektor: "string",
          address: this.otmcity.address,
          bank_info: this.otmcity.bank_info,
          akkreditasiya_info: this.otmcity.akkreditasiya_info,
          city: this.otmcity.city.id,
          ownership: this.otmcity.ownership.id,
          universityForm: this.otmcity.universityForm.id,
        })
        .then((res) => {
          this.res = res;
          this.successNotification("O`zgartirildi");
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            switch (true) {
              case !!error.response.data.phone:
                this.errorNotification(error.response.data.phone.message);
                break;
              case !!error.response.data.stir:
                this.errorNotification(error.response.data.stir.message);
                break;
              default:
                break;
            }
          }
        });
    },
  },
  mounted() {
    this.getOTM();
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.box-body {
  padding: 20px;
}
</style>
