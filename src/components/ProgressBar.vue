<template>
  <div class="progress progress-lg m-0">
    <div
      class="progress-bar"
      role="progressbar"
      aria-valuenow="0"
      aria-valuemin="0"
      aria-valuemax="0"
      :style="`width: ${progressPercent}%`"
    >
      {{ progressPercent }}%
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    progressPercent: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    progressPercent() {
      console.log(this.progressPercent);
    },
  },
};
</script>

<style scoped></style>
