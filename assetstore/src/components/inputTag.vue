<template>
    <div class="container" :style="{width: containerWidth + 'px'}" @click="click">
      <div id="tagContainer">
        <Tag v-for="(item, index) in data" closable 
            class="tag"
            :color="color?color:'success'" 
            :style="{'max-width':containerWidth - 14 +'px'}"
            :key="index"
            @on-close="close(index)">{{item}}</Tag>
        <Input type="text" class="input"
            v-model="value"
            @keyup.enter="createTag"
            @blur="createTag"
            :style="{'width':inputWidth + 'px', 'max-width':containerWidth - 14 +'px'}"
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
            this.data.splice(index, 1)
        },
        createTag(){
            if(!this.value){
                return
            }
            this.data.push(this.value)
            this.value = ""
        },
        click(e){
            let input = e.target.getElementsByClassName('input')[0]
            input.focus()
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
    border: 2px solid #dcdee2;
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