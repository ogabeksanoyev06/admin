<template>
  <div class="card">
    <div class="left">
      <editor
        @input="handleEditorInput"
        api-key="pfifo5q8stuzd22n2u70e3dqefbkpbd4njw5l6acaj8j8scj"
        :init="editorInit"
        cloud-channel="6-dev"
        v-model="content"
      />
    </div>
    <div class="right">
      <div class="inner">
        <div>
          <div class="question">
            <p v-html="edited_test.name" />
          </div>
          <div
            v-for="(answer, index) in edited_test.answers"
            :key="index"
            :class="answer.isTrue ? 'answer true' : 'answer'"
          >
            {{ alphabet(index) }})<span v-html="answer.name" />
            <hr />
          </div>
        </div>
      </div>
      <div class="button-see">
        <div
          @click="deleteTest"
          class="btn btn-danger waves-effect waves-light"
        >
          O'chirish
        </div>
        <div @click="save" class="btn btn-success waves-effect waves-light">
          Saqlash
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import axios from "axios";

export default {
  components: {
    editor: Editor,
  },
  data() {
    return {
      content: "",
      test_id: "",
      next_id: "",
      one_test: {},
      edited_test: {},
      editorInit: {
        height: 500,
        width: "100%",
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
          "image",
        ],
        toolbar:
          "undo redo | bold italic underline | subscript superscript | charmap | image",
        images_upload_handler: this.imagesUploadHandler,
        automatic_uploads: false,
      },
    };
  },
  methods: {
    alphabet(index) {
      return String.fromCharCode(97 + index); // 97 is the ASCII code for 'a'
    },
    save() {
      this.$api
        .patch(`test/${this.test_id}/update`, {
          exam: this.next_id,
          name: this.edited_test.name,
          answers: this.edited_test.answers,
        })
        .then((res) => {
          this.getTest();
          this.notificationMessage(res.message, "success");
        })
        .catch((err) => {
          this.notificationMessage(err.data.message, "error");
        });
    },
    imagesUploadHandler(blobInfo, success, failure) {
      let formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());
    },

    convertStructuredTextToJson(text) {
      // Remove various HTML formatting and spacing
      const cleanedText = text
        .replace(/<\/p>\s*<p>/gi, " ") // Remove </p><p> patterns
        .replace(/&nbsp;/gi, " ") // Replace &nbsp; with space
        .replace(/<br\s*\/?>/gi, "") // Remove all variations of <br />
        .replace(/\n/g, "") // Remove new lines
        .replace(/\t/g, "") // Remove tabs
        .replace(/\s\s+/g, " ") // Replace multiple spaces with a single space
        .replace(/<p><\/p>/gi, ""); // Remove empty <p></p> tags

      // Split by '====' and then handle each line
      const lines = cleanedText
        .split("====")
        .map((line) => line.trim())
        .filter((line) => line);

      const question = lines.shift().trim(); // Process the question
      const answers = lines.map((line) => {
        const cleanedLine = line.trim(); // Trim each answer
        return {
          isTrue: cleanedLine.startsWith("#"),
          name: cleanedLine.replace(/^#/, "").trim(), // Remove the '#' and trim whitespace
        };
      });

      return {
        name: question,
        answers: answers,
      };
    },
    handleEditorInput(content) {
      this.edited_test = this.convertStructuredTextToJson(content);
      console.log(this.edited_test);
    },
    formattedText(temp) {
      let text = temp.name + "<br/>====<br/>";
      temp.answers.forEach((answer) => {
        text += (answer.isTrue ? "#" : "") + answer.name + "<br>====<br>";
      });
      return text.slice(0, -12);
    },
    getTest() {
      this.$api
        .get(`test/${this.test_id}/get`)
        .then((res) => {
          console.log('res',res);
          this.one_test = res.data;
          this.content = this.formattedText(res.data);
          this.edited_test = this.convertStructuredTextToJson(
            this.formattedText(res.data)
          );
        })
        .catch((err) => {
          // this.$router.push({
          //   name: "test-list",
          //   params: { exam_id: this.next_id },
          // });
        });
    },
    deleteTest() {
      this.$api
        .delete(`test/${this.test_id}/delete`)
        .then((res) => {
          console.log(res);
          this.$router.push({
            name: "test-list",
            params: { exam_id: this.next_id },
          });
          console.log(this.next_id);
        })
        .catch((err) => {
          this.notificationMessage(err.response.data.message, "error");
          console.log(err);
        });
    },
  },
  mounted() {
    this.getTest();
  },
  created() {
    this.test_id = this.$route.params.test_id;
    this.next_id = this.$route.params.next_id;
  },
};
</script>
<style scoped>
.card {
  padding: 5px;
  display: flex !important;
  flex-direction: row;
  width: 100% !important;
  gap: 20px;
}
.left {
  width: 50%;
}
.right {
  width: 50%;
  position: relative;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
}
.inner {
  width: 100%;
  max-height: 98vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  .question {
    margin-top: 10px;
    margin-bottom: 7px;
    font-weight: 700;
  }
}
.answer {
  padding-top: 10px;
  margin-bottom: 5px;
  box-sizing: border-box;
  &.true {
    background: greenyellow;
  }
}
.button-see {
  width: 100% !important;
  bottom: 5px;
  right: 5px;
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  gap: 5px;
}
</style>
