<template>
  <div>
    <textarea ref="content"></textarea>
  </div>
</template>

<script>
import ckeditor from './ckeditor'

export default {
  props: {
    value: Object,
    update: Boolean
  },
  data() {
    return {
      editor: null,
      editorUpdated: false,
    }
  },
  methods: {},
  async mounted() {
    const {content} = this.$refs
    try {
      const editor = await ckeditor.create(content, {
        toolbar: {
          items: [
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'indent',
            'outdent',
            '|',
            'imageUpload',
            'mediaEmbed',
            'blockQuote',
            'insertTable',
            'undo',
            'redo',
            'specialCharacters',
            'superscript',
            'subscript',
            'strikethrough',
            'underline',
            'todoList',
            'fontSize',
            'horizontalLine',
            'highlight',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            'codeBlock',
            'code',
            'alignment',
          ]
        },
        language: 'en',
        image: {
          toolbar: [
            'imageTextAlternative',
            'imageStyle:full',
            'imageStyle:side'
          ]
        },
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableCellProperties',
            'tableProperties'
          ]
        },
        mediaEmbed: {
          toolbar: [
            'mediaEmbed'
          ]
        },
        licenseKey: '',
      })
      editor.model.document.on('change:data', () => {
        this.$emit('input', editor.getData())
      })
      editor.setData(this.value)
      this.editor = editor;
    } catch (e) {
      console.error(e)
    }
  },
  watch: {
    update: function () {
      if (this.update)
        this.editor.setData(this.value)
    }
  }

}
</script>