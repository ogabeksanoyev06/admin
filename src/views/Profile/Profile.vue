<template>
  <div class="row">
    <div class="col-md-8">
      <profile-form />
    </div>
    <div class="col-md-4">
      <change-password />
    </div>
  </div>
</template>

<script>
import ProfileForm from "./ProfileForm";
import ChangePassword from "./ChangePassword";

export default {
  name: "Profile",
  components: {
    ChangePassword,
    ProfileForm,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {},
};
</script>

<style scoped></style>
