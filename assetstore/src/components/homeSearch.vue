<template>
    <div class="home-search-wrapper">
        <a-form :form="searchForm" @submit="searchSubmit" class="home-search-container">
            <div class="home-search-title">欢迎回来，当前已收录了<span style="color:#FF7A45">{{totalCount}}</span>条美术资源</div>
            <div class="search-inline-container">
                <a-form-item>
                    <a-select defaultValue="art" class="home-search-select" @change="handleChange">
                        <a-select-option value="all">所有</a-select-option>
                        <a-select-option value="art">美术</a-select-option>
                        <a-select-option value="dev">研发</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item>
                    <!-- <Dropdown placement="bottom-start" trigger="custom" :visible="searchVisible" @on-clickoutside="hideAdvise()"> -->
                    <a-dropdown :trigger="['click']">
                        <a-input id="searchcontent" class="home-search-input"
                            v-decorator="['content', { rules: [
                                    {validator:this.validateContent.bind(this)}
                                ] 
                            }]"
                            @click="changeAdvise()" 
                            @change="handleInput()"
                            @pressEnter="searchSubmit()"
                            href="#"
                        >
                            <font-awesome-icon :icon="['fas','search']" slot="prefix"/>
                            <span slot="suffix">Enter</span>
                        </a-input>
                        <a-menu class="home-search-card" v-if="historyShow" slot="overlay">
                            <!-- <ul>
                                <div class="home-clear-history" @mousedown="clearHistory()">
                                    <Icon size="30" type="ios-close"/><span class="home-clear-history-text">清空</span>
                                </div>
                            </ul>-->
                            <a-menu-item v-for="(item,index) in searchHistory" :key="index">
                                <font-awesome-icon :icon="['fas', 'history']"/>
                                <span class="tag-style" @click="searchTag(item)">{{item}}</span>
                                <span v-if="index==0" @mousedown="clearHistory()" class="home-clear-history">
                                    <font-awesome-icon :icon="['fas', 'times']"/>
                                    <span class="home-clear-history-text">清空</span>
                                </span>
                            </a-menu-item>
                        </a-menu>
                        <a-menu class="home-associate-card" v-if="guessShow" slot="overlay" id="associate">  
                            <a-menu-item v-for="(item, guess) in guessList" :key="guess">
                                <a @click="searchTag(item)">{{item}}</a>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                    <!-- </Dropdown> -->
                </a-form-item>
            </div>
        </a-form>
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
        return {
            tagList: [],                    //存放每次点击换一批放出来的5个对象
            arr: [],                        //存放从原来的data array抽选的index，确保不重复
            num: '',                        //随机index,以便从data list中抽取
            searchHistory: [],              //存放历史搜索
            guessList:[],                   //存放联想搜索
            content: '',
            searchVisible: false,
            totalCount: 21738,
            historyShow: false,
            guessShow: false,
            type: 'art',                    //默认搜索类别是美术
        }
    }, 
    beforeCreate() {
        this.searchForm = this.$form.createForm(this, { name: 'normal_search' });
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
            this.searchForm.validateFields((err, values) => {
                if(this.content != ''){
                    values.content = this.content;
                }
                if (!err) {
                    if(values.content != ""){
                        this.searchHistory = []
                        if((storage.has(1)&&storage.has(2))) {
                            storage.set(3, storage.get(2))
                            storage.set(2, storage.get(1))
                            storage.set(1, values.content)
                            this.searchHistory.push(storage.get(1))
                            this.searchHistory.push(storage.get(2))
                            this.searchHistory.push(storage.get(3));
                        }else{
                            if(!storage.has(1)) {
                                // empty history
                                storage.set(1, values.content)
                                this.searchHistory.push(storage.get(1))
                            } else {
                                storage.set(2, storage.get(1))
                                storage.set(1, this.searchForm.content)
                                this.searchHistory.push(storage.get(1))
                                this.searchHistory.push(storage.get(2))
                            }
                        }
                        this.$router.push(`/searchresult?val=${values.content}`)
                        // axios.post('/api/search',{searchcontent: this.searchForm.content},{emulateJSON:true}).then((response)=>{
                        //     //alert("提交成功^_^，刚刚提交内容是：" + response.body.search)
                        //     this.$store.commit('SEARCH_COUNT', this.searchForm.content)
                        //     this.$router.push(`/searchresult?val=${this.searchForm.content}`)
                        // }, (response)=>{
                        //     //alert("出错啦QAQ")
                        // })
                    }
                }
            })
        },
        // 选择不同的种类
        handleChange(e){

        },
        validateContent(rule, value, callback){
            if(contain(value, "^[!@#$%&*()-+=.~`]_{}?/<>,")) {
                callback(new Error("含有非法字符"))
            } else {
                callback();
            }
        },
        handleInput(e) {
            this.historyShow = false
            this.guessShow = true
            this.searchForm.validateFields((err, values) => {
                if (!err) {
                    console.log(values)
                    if(values.content.trim().length >= 2){
                        this.guessShow = true
                        axios.get('/api/search/sugrec',{params:{val:values.content.trim()}}).then(res=>{
                            if(res.data.code == 0){
                                this.guessList = res.data.data
                                if (this.guessList.length < 0) {
                                    this.guessShow = false;
                                }    
                            }
                        });
                    }
                }
            })
        },
        // 每次点击换一批，更换推荐内容
        changeAdvise() {
            this.historyShow = true
            this.searchForm.validateFields((err, values) => {
                if (!err) {
                    if(values.content.trim().length == 0){
                        console.log('history')
                        this.guessShow = false
                        this.historyShow = true
                    }else{
                        console.log('guess')
                        this.guessShow = true
                        this.historyShow = false
                    }
                }else{
                    alert(err)
                }
            })
            // 判断是否有历史搜索
            if(this.searchHistory.length == 0) {
                console.log("focus empty")
                this.historyShow = false
            }
        },
        // user click the recommend tag and directly go to searchresult page
        searchTag(val) {
            console.log('search tag')
            this.content = val;
            this.$options.methods.searchSubmit.bind(this)();
        },
        clearHistory() {
            this.searchHistory = []
            setTimeout(function(){
                this.historyShow = false
                for(var i=1; i<=3; i++){
                    if(storage.has(i)){
                        storage.remove(i)
                    }
                }
            },10);
        }
    }
}
</script>
<style>
.home-search-select > .ant-select-selection--single{
    height: 50px;
    border-radius: 25px 0% 0% 25px;
    background-color: #E8E8E8;
}
.home-search-select > .ant-select-selection--single > .ant-select-selection__rendered {
    line-height: 50px;
}
.home-search-select > .ant-select-selection--single > .ant-select-selection__rendered > .ant-select-selection-selected-value{
    font: Semibold 18px/24px Microsoft YaHei;
    letter-spacing: 0;
    color: #707070;
}
.home-search-input > .ant-input{
    background: #E8E8E8 0% 0% no-repeat padding-box;
    border-radius: 0% 25px 25px 0%;
    padding-right: 50px;
}
.home-search-input > .ant-input:not(:last-child){
    padding-right: 50px;
}
.home-search-input > .ant-input-suffix{
    font: Semibold 14px/19px Microsoft YaHei;
    letter-spacing: 0;
    color: #000000A6;
    opacity: 1;
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
    color: rgb(103, 60, 172);
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
/* .home-clear-history-text {
    position: relative;
    top: -4px;
} */

.home-clear-history:hover {
    color: orangered;
}

.home-search-card{
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    background: #E8E8E8;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 4px;
    position: relative;
    transition: all 0.2s ease-in-out;
    width: 360px; 
    padding: 10px 20px 10px 20px;
    z-index: 10;
}

.home-associate-card {
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    background: #E8E8E8;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 4px;
    position: relative;
    transition: all 0.2s ease-in-out;
    /*width: 80%;*/
    width: 360px; 
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
