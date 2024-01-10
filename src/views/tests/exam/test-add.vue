<template>
  <div class="card main-area">
    <div class="left">
      <textarea
        v-model="inputText"
        placeholder="Question 1
====
Variant 1
====
Variant 2
====
#Variant 3 correct
====
Variant 4
++++
Question 2"
      ></textarea>
      <button
        v-show="inputText.length > 0"
        class="button-see btn btn-success waves-effect waves-light"
        @click="convertToJSON"
      >
        Ko'rish
      </button>
    </div>
    <div v-show="jsonOutput.length > 0" class="right">
      <div class="title">Test savollari</div>
      <div class="inner">
        <div v-for="(temp, index) in jsonOutput" :key="temp.id">
          <div class="question">
            {{ index + 1 }}.
            {{ temp.name }}
          </div>
          <div
            v-for="(answer, index) in temp.answers"
            :key="index"
            :class="answer.isTrue ? 'answer true' : 'answer'"
          >
            {{ alphabet(index) }}){{ answer.name }}
            <hr />
          </div>
        </div>
      </div>
      <button
        class="button-see btn btn-success waves-effect waves-light"
        @click="createTest"
      >
        saqlash
      </button>
      <button
        class="button-see bottom-button btn btn-success waves-effect waves-light"
        @click="createTest"
      >
        Saqlash
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: "",
      jsonOutput: [],
      exam_id: "",
    };
  },
  methods: {
    alphabet(index) {
      return String.fromCharCode(97 + index); // 97 is the ASCII code for 'a'
    },
    convertToJSON() {
      let trimmedInput = this.inputText.trim();
      if (trimmedInput.startsWith("++++")) {
        trimmedInput = trimmedInput.substring(4);
      }
      if (trimmedInput.endsWith("++++")) {
        trimmedInput = trimmedInput.substring(0, trimmedInput.length - 4);
      }
      const blocks = trimmedInput.split("++++");

      const questions = blocks.map((block) => {
        const parts = block.split("====");
        const name = parts[0].trim();
        const exam = this.exam_id;
        const answers = parts
          .slice(1)
          .map((answer) => {
            const trimmedAnswer = answer.trim();
            if (trimmedAnswer !== "") {
              // Check if the answer name is not blank
              const isTrue = trimmedAnswer.startsWith("#");
              const name = trimmedAnswer.replace(/^#/, "");
              return { name, isTrue };
            }
          })
          .filter(Boolean); // Remove undefined (blank) answers from the list

        console.log("Question and Answers:", name, answers); // Debugging
        return { name, exam, answers };
      });

      this.jsonOutput = questions;
    },

    createTest() {
      axios
        .post("https://api.fastlms.uz/api/test/create", this.jsonOutput)
        .then((res) => {
          console.log(res);
        });
    },

    createTest() {
      axios
        .post("https://api.fastlms.uz/api/test/create", this.jsonOutput)
        .then((res) => {
          console.log(res);
          this.notificationMessage(res.data.message, "success");
        })
        .catch((err) => {
          console.log(err);
          this.notificationMessage(err.message, "error");
        });
    },
  },
  created() {
    this.exam_id = this.$route.params.exam_id;
  },
};
</script>

<style scoped lang="scss">
.main-area {
  display: flex !important;
  align-items: start;
  flex-direction: row;
  gap: 15px;
  width: 100% !important;
  .title {
    font-size: 20px;
  }
  .right {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
  position: relative !important;
  height: 106vh;
}
.left {
  display: flex;
  width: 50% !important;
  flex-direction: column-reverse;
  align-items: flex-end;

  textarea {
    width: 100%;
    height: 100vh;
    resize: none;
    padding: 5px;
    box-sizing: border-box;
  }
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
  width: fit-content;
  margin-top: 5px;
  margin-bottom: 5px;
}
.bottom-button {
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>
