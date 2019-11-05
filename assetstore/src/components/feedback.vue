<template>
    <Modal v-model="showFeedback" :footer-hide="true" @on-cancel="cancel">
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
        
    },
    mounted(){
    },
    data() {
        return {
        }
    },
    methods:{
        cancel(){
            this.$emit('update:showFeedback', false)
        }
    }
}
</script>

<style scoped>

</style>