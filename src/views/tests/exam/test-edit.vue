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
      <div  class="inner">
        <div>
          <div class="question">
            <p v-html="edited_test.name"/>
          </div>
          <div  v-for="(answer,index) in edited_test.answers" :key="index" :class="answer.isTrue?'answer true':'answer'">
            {{alphabet(index)}})<span v-html="answer.name"/>
            <hr/>
          </div>
        </div>

      </div>
      <div @click="save" class="button-see btn btn-success waves-effect waves-light">
        Saqlash
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import axios from 'axios';

export default {
  components: {
    'editor': Editor
  },
  data() {
    return {
      content: '',
      test_id:'',
      next_id:"",
      one_test:{},
      edited_test:{},
      editorInit: {
        height: 500,
        width:'100%',
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
          'image'
        ],
        toolbar: 'undo redo | bold italic underline | subscript superscript | charmap | image',
        images_upload_handler: this.imagesUploadHandler,
        automatic_uploads: false,
      }
    };
  },
  methods: {
    alphabet(index) {
      return String.fromCharCode(97 + index); // 97 is the ASCII code for 'a'
    },
    save(){
      axios.patch(`https://api.fastlms.uz/api/test/${this.test_id}/update`,{
        "exam":this.next_id,
        "name":this.edited_test.name,
        "answers":this.edited_test.answers
      }).then((res)=>{
        this.getTest()
        console.log(res)
      })
    },
    imagesUploadHandler(blobInfo, success, failure) {
      let formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());

      axios.post('/your-server-side-image-upload-url', formData)
          .then(function (response) {
            success(response.data.imageUrl); // The JSON response must contain the 'imageUrl' key with the image URL
          })
          .catch(function (error) {
            failure('HTTP Error: ' + error.message);
          });
    },
    // convertStructuredTextToJson(text) {
    //   const lines = text.trim().split('====');
    //   const question = lines.shift();
    //   const answers = lines.map(line => ({
    //     isTrue: line.startsWith('#'),
    //     name: line.replace('#', '')
    //   }));
    //
    //   return {
    //
    //       name: question,
    //       answers: answers,
    //
    //   };
    // },
    // convertStructuredTextToJson(text) {
    //   // Split by '====' and filter out empty strings
    //   const lines = text.trim().split('====').map(line => line.trim()).filter(line => line);
    //
    //   const question = lines.shift().replace(/<br\/>/g, '').trim(); // Remove <br/> tags from the question
    //   const answers = lines.map(line => {
    //     const cleanedLine = line.replace(/<br\/>/g, '').trim(); // Remove <br/> tags from each answer
    //     return {
    //       isTrue: cleanedLine.startsWith('#'),
    //       name: cleanedLine.replace(/^#/, '').trim() // Remove the '#' and trim whitespace
    //     };
    //   });
    //
    //   return {
    //     name: question,
    //     answers: answers
    //   };
    // // },
    // convertStructuredTextToJson(text) {
    //   // Remove all <br/>, <br>, and new line characters
    //   const cleanedText = text.replace(/<br\/?>/gi, '').replace(/\n/g, '');
    //
    //   // Split by '====' and then handle each line
    //   const lines = cleanedText.split('====').map(line => line.trim()).filter(line => line);
    //
    //   const question = lines.shift().trim(); // Process the question
    //   const answers = lines.map(line => {
    //     const cleanedLine = line.trim(); // Trim each answer
    //     return {
    //       isTrue: cleanedLine.startsWith('#'),
    //       name: cleanedLine.replace(/^#/, '').trim() // Remove the '#' and trim whitespace
    //     };
    //   });
    //
    //   return {
    //     name: question,
    //     answers: answers
    //   };
    // },
    convertStructuredTextToJson(text) {
      // Remove various HTML formatting and spacing
      const cleanedText = text
          .replace(/<\/p>\s*<p>/gi, ' ') // Remove </p><p> patterns
          .replace(/&nbsp;/gi, ' ')      // Replace &nbsp; with space
          .replace(/<br\s*\/?>/gi, '')   // Remove all variations of <br />
          .replace(/\n/g, '')            // Remove new lines
          .replace(/\t/g, '')            // Remove tabs
          .replace(/\s\s+/g, ' ')        // Replace multiple spaces with a single space
          .replace(/<p><\/p>/gi, '');    // Remove empty <p></p> tags

      // Split by '====' and then handle each line
      const lines = cleanedText.split('====').map(line => line.trim()).filter(line => line);

      const question = lines.shift().trim(); // Process the question
      const answers = lines.map(line => {
        const cleanedLine = line.trim(); // Trim each answer
        return {
          isTrue: cleanedLine.startsWith('#'),
          name: cleanedLine.replace(/^#/, '').trim() // Remove the '#' and trim whitespace
        };
      });

      return {
        name: question,
        answers: answers
      };
    },
    handleEditorInput(content) {
        this.edited_test = this.convertStructuredTextToJson(content)
      console.log(this.edited_test )
    },
    formattedText(temp) {
      let text =temp.name + '<br/>====<br/>';
      temp.answers.forEach(answer => {
        text += (answer.isTrue ? '#' : '') + answer.name + '<br>====<br>';
      });
      return text.slice(0, -12);
    },
    getTest(){
      axios.get(`https://api.fastlms.uz/api/test/${this.test_id}/get`).then((res)=>{
        console.log(res)
        this.one_test=res.data.data;
       this.content=this.formattedText(res.data.data)
        this.edited_test = this.convertStructuredTextToJson(this.formattedText(res.data.data))
      })
    }
  },
  mounted() {
    this.getTest()
  },
  created() {
    this.test_id = this.$route.params.test_id;
    this.next_id = this.$route.params.next_id;
  },
};
</script>
<style scoped>
.card{
  padding: 5px;
  display: flex !important;
  flex-direction: row;
  width: 100% !important;
  gap: 20px;
}
.left{
  width: 50%;
}
.right{
  width: 50%;
}
.inner{
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  .question{
    margin-top: 10px;
    margin-bottom: 7px;
    font-weight: 700;

  }
}
.answer{
  padding-top: 10px;
  margin-bottom: 5px;
  box-sizing: border-box;
  &.true{
    background: greenyellow;
  }
}
</style>
