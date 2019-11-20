<template>
    <div style="background-color: #eff2f5">
       
        <h2>visit.......</h2>
         <a-form id="components-form-demo-validate-other" :form="form" >
            <a-form-item>
                <a-input
                    ref="input"
                    type="text"
                    size="small"
                    :style="{ width: '128px' }"    
                    placeholder="请输入2-8个字符"

                    v-decorator="[
                    'entertag',
                        {rules: [
                        {type:'string', min: 2,max:8,  message:'请输入2-8个字符', trigger:'keydown'}
                        ]
                        },
                    ]"
                />
            </a-form-item>

         </a-form>
       
                
    </div>
</template>

<script>

export default {
    name:"Visit",
    components:{},
    computed:{
    },
    beforeCreate() {
        var that = this
        this.form = this.$form.createForm(this, {
        name: 'validate_other' ,
        onFieldsChange(props, fields){
            var keys = Object.keys(fields)

            //console.log(keys,fields)

            if(keys.length === 1 && keys[0] === 'radio-group'){
                let o = fields[keys[0]]
                that.showCheckBoxGroup = o.value
                that.checkedList = []
                that.checkedList_unreal = []
            }
            
            //  if(keys.length ===1 && keys[0] === 'checkbox-group-unreal' || keys[0] === 'checkbox-group-unity'){
            
            //  }    
        }
        })
    },
    mounted() {
        axios.get(`/api/user/${this.$route.userId}`).then((res)=>{
            if(res.data.code == 0){
                this.user = res.data.data
                this.profilePic = res.data.data.profilePic
                if(res.data.data.nickName == null){
                    this.resName = res.data.data.name
                }else{
                    this.resName = res.data.data.nickName
                }
                if(res.data.data.signature == null){
                    this.signature = '来都来了，留下点个性签名介绍下自己吧'
                }else{
                    this.signature = res.data.data.signature
                }
            }
        }, (res)=>{
            // 登录失败
            alert(res)
        })
        this.tab = "资源("+this.sourceList.length+")"
    },
    data () {
        return {
            resName: "受访者张佳",
            tab: "资源(3)",
            personalTagList: ['改需求狂人','纠结','evil','偶尔良心发现','冷酷无情','无理取闹','债主'],// 从后端拿
            // TODO 这两个list还得修改。每一个都还有其他产品信息
            productList: ['批判大会','忆往昔峥嵘岁月'],    
            sourceList: ['受访者上传资源1', '受访者上传资源2','受访者上传资源3'],
        }
    },
    methods:{
        goPage(url){
            this.$router.push(url)
        },
    },
}
</script>
<style>
.asset-card > .ivu-tabs > .ivu-tabs-bar > .ivu-tabs-nav-container{
    font-size: 18px!important;
}
.asset-card > .ivu-tabs > .ivu-tabs-bar > .ivu-tabs-nav-container
 > .ivu-tabs-nav-wrap > .ivu-tabs-nav-scroll > .ivu-tabs-nav > .ivu-tabs-tab{
    /* 使得三个标签间距变大 */
    padding: 8px 50px;
 }
.asset-card > .ivu-tabs{
    overflow: visible;
    min-height: 500px;
}
.asset-card > .ivu-tabs > .ivu-tabs-bar > .ivu-tabs-nav-container > .ivu-tabs-nav-wrap
> .ivu-tabs-nav-scroll{
    position: sticky;
}
</style>
<style scoped>
.middle-card-wrapper{
    width:100%;
    display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;flex-wrap:wrap;
    justify-content:center;
    /* align-items:center; */
}
.self-card{
    position: relative;
    display:inline-block;
    font-family: MicrosoftYaHei;
    width: 360px;
    min-height: 730px;
    left: 50px;
    top: 50px;
    padding: 30px 20px 40px 25px;
    border-radius: 3px;
    background-color: #ffffff;
}
.self{
    position: relative;
    font-family: MicrosoftYaHei;
    text-align: center;
}
.avatar{
    border-radius: 50%; 
    width: 104px; 
    height:104px;
    text-align: center;
}
.edit-self{
    position: absolute;
    top: 0px;
    right: 15px;
    border-radius: 3px;
    /*color: rgb(0, 140, 255);*/
    color: #1ebf73;
    cursor: pointer;
}
.ask-btn{
    width: 316px;
    height: 41px;
    border-radius: 3px;
    border: solid 1px #1ebf73;
    background-color: #e8f8f0;
    font-size: 16px;
    font-weight: 600;
    color: #1ebf73;
    cursor: pointer;
    margin-top: 20px;
}
.asset-card{
    position: relative;
    display:inline-block;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    width: 1200px;
    height: 660px;
    left: 100px;
    top: 53px;
    padding: 20px 28px 30px 28px;
    border-radius: 3px;
    background-color: #ffffff;
    overflow: auto;
}
.tag-style{
    margin-right:15px;
    margin-bottom: 10px;
}
.empty-personal{
    font-size: 14px;
    color: #777777;
    letter-spacing: 1px;
}
.personal-fine{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.font-image{
    font-size:16px;
    display: inline-block;
    color: #1ebf73;
    background-color: #e8f8f0;
    height: 44px;
    width: 44px;
    text-align: center;
    line-height: 44px;
}
.font-name{
    font-size: 14px;
    letter-spacing: 1px;
    color: #7f7f7f;
    margin-left: 20px;
}
.tabpane{
    cursor: pointer;
    font-size: 16px;
}
.tabpane:hover{
    color: #1ebf73;
}
.like-btn-container{
    width: 1120px;
    height: 560px;
}
.like-btn{
    position: relative;
    width: 250px;
    height: 50px;
    top: 230px;
    left: 460px;
    font-size: 16px;
    float: center;
}
</style>

