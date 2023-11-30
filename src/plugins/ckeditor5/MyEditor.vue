<template>
    <div>
        <div v-if="mathView" v-katex="katex"></div>
        <div class="custom-control custom-switch custom-control-inline mt-1">
            <input :id="switchName" class="custom-control-input" type="checkbox" v-model="mathView">
            <label :for="switchName" class="custom-control-label"></label>
            <span class="switch-label">Matematik ko'rish</span>
        </div>
        <textarea ref="content"></textarea>
        <code v-if="mathViewDescription">Jadvallar va bazi bir html teglari ichida matematik ko'rish ishlamasligi
            mumkin. Formula togri ekanini
            tekshirish uchun editorga yozib ko'ring</code>
    </div>
</template>

<script>
    import ckeditor from './ckeditor'

    export default {
        props: ['value', 'switchName', 'mathViewDescription', 'update'],
        data() {
            return {
                mathView: false,
                katex: null,
                editor: null,
                editorUpdated: false,
            }
        },
        methods: {
            prepareMathView(string) {
                if (string) {
                    let clearedFromFigures = string.replace(/<figure .*?>.*?<\/figure>/g, '');
                    let clearedFromDelimiters = clearedFromFigures.replace(/\$/g, '');
                    let preparedSpaces = clearedFromDelimiters.replace(/\s/g, ' \\space ');
                    let nbspRemoved = preparedSpaces.replace(/&nbsp;/gi, '');
                    let pStartRemoved = nbspRemoved.replace(/<p>/gi, '');
                    let pEndRemoved = pStartRemoved.replace(/<\/p>/gi, '');
                    return pEndRemoved.replace(/<[^>]*>/g, '');
                }
                return '';
            },
        },
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
                    if (this.mathView) {
                        this.katex = this.prepareMathView(editor.getData());
                    }
                    this.$emit('input', editor.getData())
                })
                editor.setData(this.value)
                this.editor = editor;
            } catch (e) {
                console.error(e)
            }
        },
        watch: {
            mathView: function () {
                if (this.mathView) {
                    this.katex = this.prepareMathView(this.editor.getData());
                }
            },
            update: function () {
                if (this.update)
                    this.editor.setData(this.value)
            }
        }

    }
</script>