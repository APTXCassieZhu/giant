<template>
    <div class="home-search-wrapper">
        <Form ref="searchForm" :model="searchForm" :rules="searchRule">
            <FormItem prop="content">
                <div class="home-search-container">
                    <h1>GDRC研发资源中心</h1>
                    <h1>望能成为您日常工作的好助力</h1>
                    <Input id="search" size="large" type="text" clearable class="search-input" 
                    @focus.native.capture="changeAdvise()" @blur.native.capture="hideAdvise()"
                    placeholder="支持输入资源、用户、文章关键字" v-model="searchForm.content"/></Input>
                    <Button type="primary" class="search-button" @click="searchSubmit()">
                        <Icon type="ios-search" size="30"></Icon>
                    </Button>
                    <div class="search-card" id="content">
                        <ul class="hot-search-title">热门搜索</ul>
                        <span v-for="(item,index) in tagList" :key="index">
                            <Tag color="blue">{{item}}</Tag>
                            <span>&emsp;</span>
                        </span>
                        <div id="history-search">
                            <Divider/>
                            <ul>
                                <span class="history-search-title">历史搜索</span>
                                <div class="clear-history" @mousedown="clearHistory()">
                                    <Icon size="30" type="ios-close"></Icon>清空
                                </div>
                            </ul>
                            <ul><Icon size="20" type="ios-time-outline" color="orange"></Icon><Tag color="orange">历史搜索1</Tag></ul>
                            <ul><Icon size="20" type="ios-time-outline" color="orange"></Icon><Tag color="orange">历史搜索2</Tag></ul>
                            <ul><Icon size="20" type="ios-time-outline" color="orange"></Icon><Tag color="orange">历史搜索3</Tag></ul>
                        </div>
                    </div>
                    <div class="recommend-line">
                        <span>&emsp;为您推荐&emsp;</span>
                        <Tag color="purple">推荐搜索1</Tag>
                        <span>&emsp;</span>
                        <Tag color="purple">推荐搜索2</Tag>
                        <span>&emsp;</span>
                    </div>
                </div>
            </FormItem>
        </Form>
    </div>
</template>

<script>
function contain(str, charset) {
    var i;
    for(i=0; i<charset.length; i++) {
        if(str.indexOf(charset.charAt(i))>=0) {
            return true;
        }
    }
    return false;
}
export default {
    name:"HomeSearch",
    data() {
        const validateContent = (rule, value, callback) => {
            if(contain(value, "^[!@#$%&*()-+=.~`]_{}?/<>,")) {
                callback(new Error("含有非法字符"))
            } else {
                callback();
            }
        }
        return {
            data: ['three.js', 'jiaFu', 'juju', 'ruirui', 'candy', '仙侠', 
            'lala', 'detective', '凑数', '饿了', '好饿', '饿的不行了', '再编几个', 
            '想编几个编几个','conan', 'sos'], // total: 16
            tagList: [],     //存放每次点击换一批放出来的5个对象
            arr: [],         //存放从原来的data array抽选的index，确保不重复
            num: '',         //随机index
            searchForm: {content:""},
            searchRule: {
                content: [{required: true, trigger:'blur', validator: validateContent}
                ]
            }
        }
    },
    // 页面加载时就自动生成推荐内容
    mounted() {        
        for(var i = 0; i < 5; i++) {
            this.tagList.push(this.data[i])
        }
    },
    methods: {
        searchSubmit() {
            console.log(this.searchForm);
            
            axios.post('/search',{searchForm: this.search}).then((response)=>{
                //alert("提交成功^_^，刚刚提交内容是：" + response.body.search)
            }, (response)=>{
                //alert("出错啦QAQ")
            })
        },
        // 每次点击换一批，更换推荐内容
        changeAdvise() {
            // 延迟500ms显示推荐内容
            setTimeout(function(){
                document.getElementById("content").style.display="block"
                // 清空之前的数据
                this.num = ''
                this.arr = []
                this.tagList = []
                while(this.arr.length < 5) {
                    let num = parseInt(Math.random()*16)
                    if(this.arr.indexOf(num) == -1) {
                        this.arr.push(num)
                        this.num = num
                        this.tagList.push(this.data[this.num])
                    }
                }
            },500);
        },
        hideAdvise() {
            document.getElementById("content").style.display='none';
        },
        clearHistory() {
            document.getElementById("history-search").style.display='none';
        }
    }
}
</script>

<style scoped>
.home-search-wrapper{
    position: absolute;
    border-color:#6495ED;
    border-width:5px;
    height: 400px;
    top: 80px;
    float: none;
    width: 100%;
    z-index: -10;
    background-image: url("../assets/blue.jpg")
}

.home-search-wrapper img{
    height: 400px;
    float: center;
    width: 80%;
    z-index: 0;
}

.home-search-container {
    position: absolute;
    float: center;
    left: 20%;
    top: 100px;
    width: 60%;
    height: 400px;
    z-index: 0;
}

.search-input{
    text-align: left;
    float: left;
    width: 80%;
    height: 48px;
    z-index: 0;
}

.search-button{
    background-color: #6495ED;
    float: left;
    width: 20%;
    cursor: pointer;
    height: 36px;
    z-index: 0;
}

.search-button:hover{
    background-color: #BA55D3;
    border-color: #BA55D3;
    color: white;
    border-width: 3px;
    z-index: 0;
}

.hot-search-title {
    position: absolute;
    color: blue; 
    font-size: 19px; 
    height:28px; 
    top:10px;
}

.history-search-title {
    color: orange; 
    font-size: 19px; 
    height:28px;     
}

.clear-history {
    cursor:pointer; 
    color:grey;
    display: inline-block;
    float: right;
}

.clear-history:hover {
    color: orangered;
}

.recommend-line {
    font-size: 16px;
    position: absolute;
    float: left;
    top: 100px;
    z-index: -1;
}

.search-card {
    display: none;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    background: #fff;
    border-radius: 4px;
    position: relative;
    transition: all 0.2s ease-in-out;
    width: 80%; 
    top: 40px; 
    padding: 10px 20px 10px 20px;
    z-index: 10;
}

.Divider {
    margin: 105px 0px 105px 0px;
}
.close {
    cursor: pointer;
}

.close:hover {
    color: red;
}
</style>
