<template>
    <div class="container" :style="{width: containerWidth + 'px'}" @click="click">
      <div id="tagContainer">
        <Tag v-for="(item, index) in tagList" closable 
            class="tag"
            :color="color?color:'success'" 
            :style="{'max-width':'250px', 'min-width':'1px'}"
            :key="index"
            @on-close="close(index)">{{item}}</Tag>
        <Input type="text" class="input" ref="inputid"
            placeholder="自定义筛选"
            v-model="value"
            icon="md-return-left"
            @on-change="createTag"
            @on-enter="searchTag"
            :style="{'width':inputWidth+'px','max-width':'280px','min-width': '250px'}"
        />
      </div>
    </div>
</template>
<script>
/**
 * props data 默认数据
 *       color 标签颜色
 *       width input宽度
 */
export default {
    name: 'InputTag',
    props: {
        data: {
            type: Array,
            require: true
        },
        color: {
            type: String,
        },
        width: {
            type: Number,
        }
    },
    data () {
        return {
            tagList: [],
            value:'',
            length: 0,
            inputWidth: 1,
            containerWidth: this.width ? this.width: 500
        }
    },
    watch: {
        value(curVal) {
            if (!curVal){
                this.inputWidth = 1
            } else {
                this.inputWidth = this.len(curVal) *7.8;
            }
        }
    },
    methods: {
        close(index){
            this.tagList.splice(index, 1)
        },
        createTag(){
            if(!this.value){
                return
            }
            console.log("create.....")
            // 标签超过5，过多！！！
            if(this.tagList.length > 5){
                // TODO 让input框变成红色，提示语出现在input下方
                alert("一次性输入标签过多")
            }else{
                if(this.value.indexOf(" ") != -1 && this.value.charAt(0) !== " "){
                    this.tagList.push(this.value)
                    this.value = ""
                } 
            }  
        },
        searchTag(){
            console.log("enter...")
            for(var i=0; i<this.tagList.length; i++){
                /* 出现重复内容 */
                if(this.data.indexOf(this.tagList[i]) == -1){
                    this.data.push(this.tagList[i])
                }
            }
            this.tagList = []
        },
        click(e){
            this.$refs.inputid.focus();
        },
        len(value) {
            var len = 0; 
            var arr = value.split(""); 
            for (var i=0;i<arr.length;i++) { 
                if (arr[i].charCodeAt(0)<299) { 
                    len++;
                } else { 
                    len+=2; 
                } 
            } 
            return len; 
        }
    }
}
</script>
<style>
.container .ivu-tag-text{
    word-break:normal; 
    white-space:pre-wrap;
    word-wrap : break-word;
    overflow: hidden ;
}
</style>

<style scoped>
.container{
    background: #fff;
    display: inline-block;
    min-height: 36px;
    padding: 4px 7px;
    font-size: 12px;
    border-bottom: 2px solid #dcdee2;
    border-radius: 4px;
    background-color: #fff;
    cursor: text;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
    text-align: left;
    align-items: center;
}
.ivu-input-wrapper{
    width: auto;
}
.input{
   border:0!important;
   outline: 0px;
   height: 28px;
   font-size: 14px;
}
.ivu-tag{
   min-height: 22px;
   height: auto;
}
#tagContainer{
    display: inline-block;
    min-height: 28px;
}
</style>