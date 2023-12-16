<template>
  <div class="content-wrapper">
    <div class="content-header row"></div>
    <div class="content-body">
      <video-player :options="videoOptions" ref="myPlayer"></video-player>
    </div>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";

export default {
  name: "video",
  components: {
    videoPlayer,
  },
  data() {
    return {
      videoOptions: {
        source: {
          type: "application/x-mpegURL",
          src: "http://localhost:8080/video/index.m3u8",
          withCredentials: false,
        },
      },
    };
  },
  created() {
    console.log("im here");
  },
};
</script>

<style scoped></style>
