<template>
    <div class="home-search-wrapper">
        <Form id="search" ref="searchForm" :model="searchForm" :rules="searchRule">
            <FormItem prop="content">
                <div class="home-search-container">
                    <div class=search-title>GDRC研发资源中心</div>
                    <div class="search-title">望能成为您日常工作的好助力</div>
                    <!--<Input id="searchcontent" size="large" type="text" clearable class="search-input" 
                    @focus.native.capture="changeAdvise()" @blur.native.capture="hideAdvise()"
                    @on-clear="hideAssociate()"
                    v-on:input="handleInput()" v-model.trim="searchForm.content"
                    placeholder="支持输入资源、用户、文章关键字" /></Input>-->
                    <Dropdown placement="bottom-start" trigger="custom" :visible="searchVisible" @on-clickoutside="hideAdvise()">
                        <Input id="searchcontent" size="large" type="text" clearable class="search-input" 
                        @click.native="changeAdvise()" @on-clear="hideAssociate()"
                        v-on:input="handleInput()" v-model.trim="searchForm.content"
                        placeholder="支持输入资源、用户、文章关键字" /></Input>
                        <Button type="primary" class="search-button" @click="searchSubmit()">
                            <Icon type="ios-search" size="30"></Icon>
                        </Button>
                        <div class="search-card" id="content">
                            <!--TODO 热门搜索的内容暂不知-->
                            <ul class="hot-search-title">热门搜索</ul>
                            <span v-for="(item,index) in tagList" :key="index">
                                <Tag class="tag-style" @click.native="searchTag(item)">{{item}}</Tag>
                            </span>
                            <div id="history-search">
                                <Divider/>
                                <ul>
                                    <div class="clear-history" @mousedown="clearHistory()">
                                        <Icon size="30" type="ios-close"></Icon>清空
                                    </div>
                                </ul>
                                <ul v-for="(item,index) in searchHistory" :key="index">
                                    <Icon size="20" type="ios-time-outline"></Icon>
                                    <span class="tag-style" @click.native="searchTag(item)">{{item}}</span>
                                </ul>
                            </div>
                        </div>
                        <!--TODO 目前借用了百度的库实现联想搜索，未来要用自己的库-->
                        <div class="associate-card" id="associate" style="display:none">     
                            <!--<a style="position:absolute;top:10px;" href ="https://www.baidu.com/s?wd='???'">??????????</a>         
                            <a style="display:block;" href ="https://www.baidu.com/s?wd='???'">??????????</a> -->        
                        </div>
                    </Dropdown>

                    <div class="recommend-line">
                        <!-- TODO 推荐内容暂不知-->
                        <span style="color:#1ebf73; font-weight:600;">大伙儿都在搜&emsp;</span>
                        <Tag class="tag-style" @click.native="searchTag('推荐搜索1')">推荐搜索1</Tag>
                        <span>&emsp;</span>
                        <Tag class="tag-style" @click.native="searchTag('推荐搜索2')">推荐搜索2</Tag>
                        <span>&emsp;</span>
                    </div>
                </div>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import storage from 'good-storage'
import VueResource from 'vue-resource' 

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
            data: ['three.js', 'jiaFu', 'juju', 'ruirui', 'candy', '仙侠', 
            'lala', 'detective', '凑数', '饿了', '好饿', '饿的不行了', '再编几个', 
            '想编几个编几个','conan', 'sos'], // 热门搜索 total: 16
            tagList: [],                    //存放每次点击换一批放出来的5个对象
            arr: [],                        //存放从原来的data array抽选的index，确保不重复
            num: '',                        //随机index,以便从data list中抽取
            searchHistory: [],              //存放历史搜索
            searchForm: {content:""},
            searchRule: {
                content: [{required: true, trigger:'blur', validator: validateContent}]
            },
            searchVisible: false,
        }
    },    
    mounted() {      
        // 页面加载时就自动生成推荐内容  
        for(var i = 0; i < 5; i++) {
            this.tagList.push(this.data[i])
        }
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
            this.$http.post('/users/search',{searchcontent: this.searchForm.content},{emulateJSON:true}).then((response)=>{
                //alert("提交成功^_^，刚刚提交内容是：" + response.body.search)
                this.$store.commit('SEARCH_COUNT', this.searchForm.content)
                this.$router.push('/searchresult')
            }, (response)=>{
                //alert("出错啦QAQ")
            })
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
            // 清空之前的数据,生成新的推荐列表
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
            // 延迟500ms显示推荐内容
            setTimeout(function(){
                document.getElementById("content").style.display="block"
                
            },500);
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

<style scoped>
.home-search-wrapper{
    position: absolute;
    background-color: #eef2f5;
    border-width:5px;
    height: 400px;
    top: 80px;
    float: none;
    width: 100%;
    z-index: 10;
    font-family: MicrosoftYaHei;
    background-image: url("../assets/搜索.png");
    background-position: center;
    background-size: 80% 100%;
    background-repeat: no-repeat;
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
    left: 15%;
    top: 100px;
    width: 60%;
    height: 400px;
    z-index: 0;
}
.search-title{
    font-family: MicrosoftYaHei;
    font-size: 24px;
    font-weight: 900;
}
.search-input{
    position: relative;
    text-align: left;
    float: left;
    /*width: 80%;*/
    width: 460px;
    height: 48px;
    top: 23px;
    z-index: 0;
}

.search-button{
    /*background-color: #6495ED;*/
    position: relative;
    background-image: linear-gradient(to bottom, #40e1ab, #1ebf73);
    border-width: 0px;
    float: left;
    /*width: 20%;*/
    width: 54px;
    cursor: pointer;
    height: 39px;
    top:23px;
    z-index: 0;
}

.search-button:hover{
    /*background-color: #BA55D3;
    border-color: #BA55D3;*/
    background-image: linear-gradient(to bottom, aquamarine, #40e1ab,#1ebf73);
    border-color:aquamarine;
    color: white;
    border-width: 3px;
    z-index: 0;
}

.hot-search-title {
    position: absolute;
    color: #1ebf73; 
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
.tag-style{
    height: 24px;
    color:grey;
    cursor: pointer;
}
.clear-history:hover {
    color: orangered;
}

.recommend-line {
    font-size: 16px;
    position: absolute;
    float: left;
    top: 145px;
    z-index: -1;
}

.search-card{
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
    top: 66px; 
    padding: 10px 20px 10px 20px;
    z-index: 10;
}

.associate-card {
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
    top: 66px; 
    padding: 0px 20px 0px 20px;
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
