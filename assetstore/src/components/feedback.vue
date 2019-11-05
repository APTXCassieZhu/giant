<template>
    <Modal v-model="curShow" :footer-hide="true" @on-cancel="cancel" class="feedback-modal">
        <div class="modal-title">问题反馈</div>
        <RadioGroup v-model="radioGroup" class="feedback-radio" @on-change="changeType()">
            <Radio label="遇到问题"></Radio>
            <Radio label="新功能建议"></Radio>
            <Radio label="软件需求"></Radio>
        </RadioGroup>
        <Input class="feedback-title" maxlength="30" v-model="title" show-word-limit :placeholder="questionTitle" />
        <Input class="feedback-des" type="textarea" v-model="content" maxlength="300" show-word-limit :placeholder="questionDes"/>
        <Button class="feedback-btn" type="success" @click="feedback()">提交</Button>
        <!-- <div v-if="fileList.length < 5">
            <Icon type="ios-add" />            
            <div class="upload-text">Upload</div>
        </div> -->
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
        feedbackType:{
            type: String,
            default: '遇到问题'
        }
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
        if(this.feedbackType === '遇到问题'){
            this.questionTitle = '标题，如 延迟问题'
            this.questionDes = '请详细描述您遇到的问题'
        }else if(this.feedbackType === '新功能建议'){
            this.questionTitle = '标题，如 建议新增 xx功能'
            this.questionDes = '请详细描述您建议增加的功能'
        }else{
            this.questionTitle = '标题，请输入您期望增加的软件名称'
            this.questionDes = '这里您可以描述期望增加软件的版本号、以及 需求原因'
        }
    },
    data() {
        return {
            radioGroup: this.feedbackType,
            questionTitle: '标题，如 延迟问题',
            questionDes: '请详细描述您遇到的问题',
            title: '',
            content: '',
        }
    },
    methods:{
        cancel(){
            this.$emit("hideDialog")
        },
        changeType(){
            if(this.radioGroup === '遇到问题'){
                this.questionTitle = '标题，如 延迟问题'
                this.questionDes = '请详细描述您遇到的问题'
            }else if(this.radioGroup === '新功能建议'){
                this.questionTitle = '标题，如 建议新增 xx功能'
                this.questionDes = '请详细描述您建议增加的功能'
            }else{
                this.questionTitle = '标题，请输入您期望增加的软件名称'
                this.questionDes = '这里您可以描述期望增加软件的版本号、以及 需求原因'
            }
        },
        feedback(){
            /* TODO 向后端post feedback */
            this.$Modal.success({
                title: '感谢您的反馈',
                content: '<p>您的反馈已提交，我们会尽快处理。</p><p>我们将通过<b> 消息—站内信 </b>的形式通知您反馈结果</p>'
            });
            // close modal
            this.$emit("hideDialog")
        }
    }
}
</script>
<style>
.feedback-modal > .ivu-modal-wrap > .ivu-modal{
    width: 815px;
}
.feedback-modal > .ivu-modal-wrap > .ivu-modal > .ivu-modal-content {
    padding: 70px 165px 70px 165px;
    width: 815px;
    height: 745px;
}
.feedback-des > textarea{
    resize: none;
    height: 350px;
}
.feedback-radio > .ivu-radio-wrapper-checked{
    font-size: 21px;
    font-weight: 600;
    color: #1ebf73;
}
</style>
<style scoped>
.modal-title{
    font-size: 18px;
    line-height: 1;
    color: black;
    text-align: left;
    margin-bottom: 30px;
}
.feedback-radio{
    text-align: left;
    font-size: 16px;
    font-weight: 600;
    color: #cccccc;
}
.feedback-title{
    width: 463px;
    margin-top: 30px;
}
.feedback-des{
    width: 463px;
    margin-top: 30px;
}
.feedback-btn{
    width: 463px;
    height: 45px;
    border-radius: 3px;
    border: solid 1px #1ebf73;
    margin-top: 30px;
}
.upload-text{
    margin-top: 8px;
    color: #666;
}
</style>