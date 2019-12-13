<template>
    <a-form :form="searchForm" @submit="searchSubmit" style="height: 50px;" @clickoutside="hideCard()">
        <a-form-item>
            <a-dropdown :trigger="['click']">
                <a-input id="searchcontent" class="search-input"
                    v-decorator="['content', {initialValue: this.searchContent},
                        { rules: [
                            {validator:this.validateContent.bind(this)}
                        ] 
                    }]"
                    @click="changeAdvise()" 
                    @change="handleInput()"
                    @pressEnter="searchSubmit()"
                    href="#"
                    allowClear
                >
                    <font-awesome-icon :icon="['fas','search']" slot="prefix"/>
                    <span slot="suffix">Enter</span>
                </a-input>
                <a-menu class="home-search-card" v-if="historyShow" slot="overlay">
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
        </a-form-item>
    </a-form>
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
    name: "Search",
    props: {
        searchContent: {
            type: String,
            default: '',
        },
    },
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
                                storage.set(1, values.content)
                                this.searchHistory.push(storage.get(1))
                                this.searchHistory.push(storage.get(2))
                            }
                        }
                        this.$router.push(`/searchresult?type=${this.type}&val=${values.content}`)
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
        handleChange(value){
            this.type = value
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
            this.searchHistory = []
            if((storage.has(1)&&storage.has(2))) {
                storage.set(3, storage.get(2))
                storage.set(2, storage.get(1))
                storage.set(1, this.content)
                this.searchHistory.push(storage.get(1))
                this.searchHistory.push(storage.get(2))
                this.searchHistory.push(storage.get(3));
            }else{
                if(!storage.has(1)) {
                    // empty history
                    storage.set(1, this.content)
                    this.searchHistory.push(storage.get(1))
                } else {
                    storage.set(2, storage.get(1))
                    storage.set(1, this.content)
                    this.searchHistory.push(storage.get(1))
                    this.searchHistory.push(storage.get(2))
                }
            }
            this.$router.push(`/searchresult?type=${this.type}&val=${this.content}`)       
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
        },
        hideCard(){
            this.historyShow = false
            this.guessShow = false
        }
    }
}
</script>
<style>
.search-input > .ant-input{
    border-radius: 25px;
    padding-right: 50px;
}
.search-input > .ant-input:not(:last-child){
    padding-right: 60px;
}
.search-input > .ant-input-suffix{
    font: Semibold 14px/19px Microsoft YaHei;
    letter-spacing: 0;
    color: #000000A6;
    opacity: 1;
}
.search-input > .ivu-input{
    border-radius: 0;
    height: 54px;
}
.search-input > .ivu-icon{
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

.home-search{
    display: flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
}

.search-input{
    position: relative;
    text-align: left;
    width: 100%;
    height: 50px;
    background: #FFFFFFE5 0% 0% no-repeat padding-box;
    /* border: 1px solid #70707077; */
    border-radius: 25px;
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
    /* z-index: 0; */
}

.tag-style{
    cursor: pointer;
}

.home-clear-history {
    cursor:pointer; 
    color:grey;
    float: right;
}

.home-clear-history:hover {
    color: orangered;
}

.home-search-card{
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    background: #FFFFFFE5;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 4px;
    position: relative;
    transition: all 0.2s ease-in-out;
    width: 100%; 
    padding: 10px 20px 10px 20px;
}

.home-associate-card {
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    background: #FFFFFFE5;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 4px;
    position: relative;
    transition: all 0.2s ease-in-out;
    width: 100%; 
    padding: 0px 20px 0px 20px;
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
