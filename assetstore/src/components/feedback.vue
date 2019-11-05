<template>
    <Modal v-model="curShow" :footer-hide="true" @on-cancel="cancel">
    </Modal>  
</template>

<script>
export default {
    name: "Feedback",
    props: {
        showFeedback: {
            type: Boolean,
            default: false
        },
    },
    computed:{
        curShow:{
            get(){
                return this.showFeedback 
            },
            set(){
            }
        }
    },
    mounted(){
    },
    data() {
        return {
        }
    },
    methods:{
        cancel(){
            this.$emit("hideDialog")
        }
    }
}
</script>

<style scoped>

</style>