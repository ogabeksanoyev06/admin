<template>
  <div>
    <my-editor @input="input"></my-editor>
  </div>
</template>

<script>
import MyEditor from "./ckeditor5/MyEditor";
export default {
  name: "test",
  components: { MyEditor },
  methods: {
    input() {
      console.log(" im on parent");
    },
  },
};
</script>

<style scoped></style>
