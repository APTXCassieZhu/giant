<template>
    <Form id="search" ref="searchForm" :model="searchForm" :rules="searchRule">
        <FormItem prop="content">
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
                        <Tag color="blue" class="tag-style" @click.native="searchTag(item)">{{item}}</Tag>
                        <span>&emsp;</span>
                    </span>
                    <div id="history-search">
                        <Divider style="margin: 8px;"/>
                        <ul>
                            <span class="history-search-title">历史搜索</span>
                            <div class="clear-history" @mousedown="clearHistory()">
                                <Icon size="30" type="ios-close"></Icon>清空
                            </div>
                        </ul>
                        <ul v-for="(item,index) in searchHistory" :key="index">
                            <Icon size="20" type="ios-time-outline" color="orange"></Icon>
                            <Tag color="orange" class="tag-style" @click.native="searchTag(item)">{{item}}</Tag>
                        </ul>
                    </div>
                </div>
                <!--TODO 推荐内容的库后端还没建立-->
                <div class="associate-card" id="associate" style="display:none">
                    <div class="position: relative; top: 28px;">
                    </div>     
                </div>
            </Dropdown>    
        </FormItem>
    </Form>

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
    name:"Search",
    inject: ['reload'],
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
        // 页面加载时自动填充前一个页面search input
        this.searchForm.content = this.$store.state.searchContent;
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
                this.reload()
                this.$router.push('/searchResult')
            }, (response)=>{
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
                            str += '<a style="position:relative;top:0px;" href ="https://www.baidu.com/s?wd='+ ele +  '">' + ele+'</a>';
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
            this.searchVisible = true
            if(this.searchForm.content == ""){
                document.getElementById("associate").style.display = "none";
            }
            // 判断是否有历史搜索
            if(this.searchHistory.length == 0) {
                console.log("focus empty")
                document.getElementById("history-search").style.display="none"
            }
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
.search-input{
    text-align: left;
    float: left;
    font-family: MicrosoftYaHei;
    /*width: 80%;*/
    width: 610px;
    height: 48px;
    z-index: 0;
}

.search-button{
    background-color: #6495ED;
    font-family: MicrosoftYaHei;
    float: left;
    /*width: 20%;*/
    width: 150px;
    cursor: pointer;
    height: 40px;
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
    position: relative;
    color: blue; 
    font-size: 19px; 
    font-family: MicrosoftYaHei;
    height:30px; 
    top:0px;
}

.history-search-title {
    color: orange; 
    font-size: 19px; 
    font-family: MicrosoftYaHei;
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

.tag-style{
    cursor:pointer;
    font-family: MicrosoftYaHei;
}

.search-card{
    display: none;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    background: #fff;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 4px;
    position: fixed;
    font-family: MicrosoftYaHei;
    transition: all 0.2s ease-in-out;
    width: 32%; 
    top: 65px; 
    padding: 10px 20px 10px 20px;
}

.associate-card {
    display: none;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    background: #fff;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 4px;
    position: fixed;
    font-family: MicrosoftYaHei;
    transition: all 0.2s ease-in-out;
    width: 32%; 
    top: 65px; 
    padding: 0px 20px 0px 20px;
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
