<template>
    <div class="p-1">
        <div class="alert alert-danger"
             v-if="errorMessage.trim() !== ''">
            {{ errorMessage.trim() }}
        </div>
        <h5>Shu faylni o'chirishni tasdiqlaysizmi ?</h5>
        <hr>
        <div class="d-flex justify-content-end align-items-center">
            <button class="btn btn-danger waves-light waves-effect mr-1"
                    @click="onDelete"
                    :disabled="loading"
                    v-if="successMessage === ''">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                      v-if="loading"/>
                O'chirish
            </button>
            <button type="button" class="btn btn-success mr-1" disabled="disabled"
                    v-if="successMessage !== ''">
                <i class="feather icon-check" />
                {{ successMessage }}
            </button>
            <button class="btn btn-warning waves-effect waves-light"
                    data-dismiss="modal"
                    v-if="successMessage === ''"
                    :disabled="loading">
                Bekor qilish
            </button>
        </div>
    </div>
</template>

<script>
    import Modal from "./Modal";

    export default {
        name: "DeletingModal",
        components: {Modal},
        props: {
            deleteApi: '',
        },
        data() {
            return {
                errorMessage: '',
                successMessage: '',
                loading: false
            }
        },
        methods: {
            onDelete() {
                this.loading = true;
                this.$api.delete(this.deleteApi)
                    .then(res => {
                        if (!res.error) {
                            this.succMessage('Удалено');
                        }
                        else {
                            this.errMessage(res.error);
                        }
                    })
                    .catch(err => {
                        this.errMessage('Ошибка');
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },
            errMessage(errorMessage) {
                this.errorMessage = errorMessage;
                setTimeout(() => {
                    this.errorMessage = '';
                }, 5000);
            },
            succMessage(successMessage) {
                this.successMessage = successMessage;
                setTimeout(() => {
                    this.closeModal();
                    this.$emit('deleted');
                }, 1500);
            },
            closeModal() {
                $('#modal-component').modal('hide');
            },
        },
        created() {
            this.successMessage = ''
        }
    }
</script>

<style scoped>

</style>