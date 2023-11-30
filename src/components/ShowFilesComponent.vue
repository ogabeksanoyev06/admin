<template>
  <div class="col-12">
    <h5 class="mb-5">{{ name }}</h5>
    <div class="row col-12">
      <div class="card kurs-carousel-block mr-1" :class="classVariable"
           v-for="(fileItem, fileKey) in files">
        <div class="card-block-img" style="cursor:pointer;">
          <div class="card-block-img2"></div>
          <img :src="identifyLogo(fileItem.place)"
               class="card-img-top"
               :style="'max-width:' + fileMaxWidth + ';max-height:'+ fileMaxHeight">
          <span class="delete_span" @click="deleteFile(fileItem.id)">
              <i class="feather icon-trash-2"></i>
          </span>
        </div>
        <h4 class="card-title-course text-color general-text mt-2">{{ fileItem.name }}</h4>
        <div v-if="isPaidAttribute">
          <span v-if="fileItem.isPaid" class="badge-danger border-1">Pullik</span>
          <span v-else class="badge-success">Tekin</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowFilesComponent",
  props: {
    fileMaxWidth: {
      type: String,
      default: '160px'
    },
    fileMaxHeight: {
      type: String,
      default: '140px'
    },
    classVariable: {
      type: String,
      default: 'col-5'
    },
    nameShow: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: 'Fayllar',
    },
    isPaidAttribute: {
      type: Boolean,
      default: false,
    },
    files: {
      type: Array,
      default: () => [
        {
          name: 'test name',
          place: '/img/documents_logo_resized.png',
          id: null,
          info: null,
          isPaid: false,
        }
      ]
    }
  },
  data() {
    return {}
  },
  methods: {
    deleteFile(fileId) {
      this.$emit('deleteFile', fileId);
    },
    openFile(filePath) {
      window.open(this.baseURL + '' + filePath, '_blank');
    },
    identifyLogo(fileName) {
      console.log('im file name', fileName)
      let wordExtensions = ['doc', 'docx'];
      let excelExtensions = ['xlsx', 'xls'];
      let pptExtensions = ['ppt', 'pptx'];
      let iconType = '/img/documents_logo_resized.png';
      try {
        let splittedFileName = fileName.split('.');
        console.log(splittedFileName, ' splittedname');
        let fileExtension = splittedFileName[splittedFileName.length - 1];
        switch (true) {
          case wordExtensions.includes(fileExtension):
            iconType = '/img/word_resized.png';
            break;
          case excelExtensions.includes(fileExtension):
            iconType = '/img/excel_logo_resized.png';
            break;
          case pptExtensions.includes(fileExtension):
            iconType = '/img/ppt_logo_resized.png';
            break;
          case fileExtension === 'pdf':
            console.log('im here ababy')
            iconType = '/img/pdf_logo_resized.png';
            break;
          case fileExtension === 'png':
            iconType = this.baseURL + '' + fileName;
            break;
          default:
            console.log(' im defult')
            iconType = '/img/documents_logo_resized.png';
            break;
        }
        console.log(iconType);
        return iconType;
      } catch (e) {
        return iconType;
      }
    }
  }
}
</script>

<style scoped>
.delete_span {
  cursor: pointer;
  position: absolute;
  color: gray;
  font-size: 25px;
}

.delete_span:hover {
  cursor: pointer;
  position: absolute;
  color: red;
  font-size: 25px;
}
</style>