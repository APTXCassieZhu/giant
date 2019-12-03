<template>
    <div class="home-search-wrapper">
        <a-form :form="searchForm" @submit="searchSubmit" class="home-search-container">
            <div class="home-search-title">欢迎回来，当前已收录了<span style="color:#FF7A45">{{totalCount}}</span>条美术资源</div>
            <div class="search-inline-container">
                <a-form-item>
                    <a-select defaultValue="art" @change="handleChange" class="home-search-select">
                        <a-select-option value="all">所有</a-select-option>
                        <a-select-option value="art">美术</a-select-option>
                        <a-select-option value="dev">研发</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item>
                    <a-input id="searchcontent" class="home-search-input"
                        v-decorator="[{required: true, trigger:'blur', validator: validateContent}]"
                    >
                    </a-input>
                </a-form-item>
            </div>
        </a-form>
        <!-- <Form id="search" ref="searchForm" :model="searchForm" :rules="searchRule">
            <FormItem prop="content">
                <div class="home-search-container">
                    <div class="home-search-title">欢迎回来，当前已收录了<span style="color:#FF7A45">{{totalCount}}</span>条美术资源</div>
                    <Dropdown placement="bottom-start" trigger="custom" :visible="searchVisible" @on-clickoutside="hideAdvise()">
                        <Input id="searchcontent" size="large" type="text" clearable class="home-search-input" 
                        @click.native="changeAdvise()" @on-clear="hideAssociate()"
                        v-on:input="handleInput()" v-model.trim="searchForm.content"
                        placeholder="支持输入资源、用户、文章关键字" />
                        <Button type="primary" class="home-search-button" @click="searchSubmit()">
                            <Icon type="ios-search" size="50"></Icon>
                        </Button>
                        <Input size="large" type="text" clearable class="home-search-input" 
                        @click.native="changeAdvise()" @on-clear="hideAssociate()"
                        v-on:input="handleInput()" v-model.trim="searchForm.content">
                            <Icon type="ios-search" slot="prefix" />
                        </Input>
                        <div class="home-search-card" id="content">
                            <div id="history-search">
                                <ul>
                                    <div class="home-clear-history" @mousedown="clearHistory()">
                                        <Icon size="30" type="ios-close"/><span class="home-clear-history-text">清空</span>
                                    </div>
                                </ul>
                                <ul v-for="(item,index) in searchHistory" :key="index">
                                    <Icon size="20" type="ios-time-outline"></Icon>
                                    <span class="tag-style" @click="searchTag(item)">{{item}}</span>
                                </ul>
                            </div>
                        </div>
                        <div class="home-associate-card" id="associate" style="display:none">    
                        </div>
                    </Dropdown>
                </div>
            </FormItem>
        </Form> -->
    </div>
</template>

<script>
import storage from 'good-storage'
// 判断是否含有string是否含有某个字符
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
            tagList: [],                    //存放每次点击换一批放出来的5个对象
            arr: [],                        //存放从原来的data array抽选的index，确保不重复
            num: '',                        //随机index,以便从data list中抽取
            searchHistory: [],              //存放历史搜索
            // searchForm: {content:""},
            searchRule: {
                content: [{required: true, trigger:'blur', validator: validateContent}]
            },
            searchVisible: false,
            totalCount: 21738,
        }
    },    
    mounted() {      
        // 页面加载时自动取出历史记录
        for(var i=1; i <= 3; i++) {
            if(storage.has(i)) {
                this.searchHistory.push(storage.get(i));
            }
        }
    },
    methods: {
        searchSubmit() {
            // 清空
            if(this.searchForm.content != ""){
                this.searchHistory = []
                if((storage.has(1)&&storage.has(2))) {
                    storage.set(3, storage.get(2))
                    storage.set(2, storage.get(1))
                    storage.set(1, this.searchForm.content)
                    this.searchHistory.push(storage.get(1))
                    this.searchHistory.push(storage.get(2))
                    this.searchHistory.push(storage.get(3));
                }else{
                    if(!storage.has(1)) {
                        // empty history
                        storage.set(1, this.searchForm.content)
                        this.searchHistory.push(storage.get(1))
                    } else {
                        storage.set(2, storage.get(1))
                        storage.set(1, this.searchForm.content)
                        this.searchHistory.push(storage.get(1))
                        this.searchHistory.push(storage.get(2))
                    }
                }
                this.$router.push(`/searchresult?val=${this.searchForm.content}`)
                // axios.post('/api/search',{searchcontent: this.searchForm.content},{emulateJSON:true}).then((response)=>{
                //     //alert("提交成功^_^，刚刚提交内容是：" + response.body.search)
                //     this.$store.commit('SEARCH_COUNT', this.searchForm.content)
                //     this.$router.push(`/searchresult?val=${this.searchForm.content}`)
                // }, (response)=>{
                //     //alert("出错啦QAQ")
                // })
            }
        },
        handleInput(e) {
            document.getElementById("content").style.display="none"
            document.getElementById("associate").style.display="block"
            console.log(this.searchForm.content)
            this.$http.jsonp("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su", 
            {params:{wd:this.searchForm.content},jsonp:"cb"}).then(function(res){
                console.log("weisha "+res.data.s)
                var result = res.data.s
                var str = '';
                var count = 0;
                if (result.length > 0) {
                    result.forEach(function (ele, index) {
                        if(count == 0){
                            str += '<a style="position:absolute;top:10px;" href ="https://www.baidu.com/s?wd='+ ele +  '">' + ele+'</a>';
                        } else {
                            str += '<a style="display:block;" href ="https://www.baidu.com/s?wd=' + ele +  '">' + ele+'</a>';
                        }
                        count += 1;
                    })
                    document.getElementById("associate").innerHTML = str;
                }else { 
                    document.getElementById("associate").style.display = 'none';
                }    
            }, function(res){
                //alert(res.status)
            })
        },
        // 每次点击换一批，更换推荐内容
        changeAdvise() {
            this.searchVisible = true;
            if(this.searchForm.content == ""){
                document.getElementById("associate").style.display = "none";
            }
            // 判断是否有历史搜索
            if(this.searchHistory.length == 0) {
                console.log("focus empty")
                document.getElementById("history-search").style.display="none"
            }
        },
        // user click the recommend tag and directly go to searchresult page
        searchTag(val) {
            this.searchForm.content = val;
            this.$options.methods.searchSubmit.bind(this)();
        },
        hideAdvise() {
            this.searchVisible = false;
            document.getElementById("content").style.display='none';
            document.getElementById("associate").style.display='none';
        },
        hideAssociate() {
            document.getElementById("associate").style.display='none';
            document.getElementById("searchcontent").focus();
        },
        clearHistory() {
            document.getElementById("history-search").style.display='none';
            storage.clear();
        }
    }
}
</script>
<style>
.home-search-select > .ant-select-selection--single{
    height: 50px;
    border-radius: 25px 0% 0% 25px;
    background-color:#FAFAFA;
}
.home-search-select > .ant-select-selection--single > .ant-select-selection__rendered {
    line-height: 50px;
}

.home-search-input > .ivu-input{
    border-radius: 0;
    height: 54px;
}
.home-search-input > .ivu-icon{
    line-height: 54px;
}
.home-search-container > .ivu-dropdown > .ivu-dropdown-rel > .ivu-btn{
    border-radius: 0;
}
.home-search-container > .ivu-dropdown > .ivu-dropdown-rel > .ivu-btn > span{
    position: relative;
    left: -12px;
}

.home-search-card > span > .tag-style:hover > .ivu-tag-text{
    color: #1ebf73;
}
</style>

<style scoped>
.home-search-wrapper{
    border-width:5px;
    height: 400px;
    top: 80px;
    width: 100%;
    z-index: 10;
    font-family: MicrosoftYaHei;
    background-color: #eef2f5;
    background-image: url("../assets/搜索.svg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
.home-search{
    display: flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
}

.home-search-container {
    position: absolute;
    z-index: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 400px;
}
.search-inline-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
}
.home-search-title{
    font: Bold 26px/35px Microsoft YaHei;
    letter-spacing: 0;
    font-size: 24px;
    font-weight: 300;
    text-align: center;
    color: #FAFAFA;
    margin-bottom: 30px;
}
.home-search-title2{
    font-family: MicrosoftYaHeiHeavy;
    font-size: 24px;
    font-weight: 900;
    color: #042c55;
}
.home-search-select{
    position: relative;
    border-radius: 25px 0% 0% 25px;
    height: 50px;
    background-color: #FAFAFA;
}
.home-search-input{
    position: relative;
    text-align: left;
    /* width: 460px;*/
    /* top: 30px;  */
    width: 410px;
    height: 50px;
    z-index: 0;
    background: #E8E8E8 0% 0% no-repeat padding-box;
    border-radius: 0% 25px 25px 0%;
    opacity: 1;
}

.home-search-button{
    position: relative;
    /*background-image: linear-gradient(to bottom, #40e1ab, #1ebf73);*/
    border-width: 0px;
    float: left;
    width: 54px;
    cursor: pointer;
    height: 54px;
    top:26px;
    z-index: 0;
}

.tag-style{
    cursor: pointer;
}

.home-clear-history {
    cursor:pointer; 
    color:grey;
    float: right;
}
.home-clear-history-text {
    position: relative;
    top: -4px;
}

.home-clear-history:hover {
    color: orangered;
}

.home-search-card{
    display: none;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    background: #fff;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 4px;
    position: relative;
    transition: all 0.2s ease-in-out;
    /*width: 80%;*/
    width: 460px; 
    top: 82px; 
    padding: 10px 20px 10px 20px;
    z-index: 10;
}

.home-associate-card {
    display: none;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    background: #fff;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 4px;
    position: relative;
    transition: all 0.2s ease-in-out;
    /*width: 80%;*/
    width: 460px; 
    top: 82px; 
    padding: 0px 20px 0px 20px;
    z-index: 10;
}

.home-Divider {
    margin: 105px 0px 105px 0px;
}
.home-close {
    cursor: pointer;
}

.home-close:hover {
    color: red;
}
</style>
