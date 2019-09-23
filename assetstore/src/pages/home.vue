<template>
<div>
    <TopNavigation></TopNavigation>
    <div class="home-search-wrapper">
        <Form ref="searchForm" :model="searchForm" :rules="searchRule">
            <FormItem prop="content">
                <div class="home-search-container">
                    <Input id="search" size="large" type="text" class="search-input" 
                    @blur.native.capture="hideAdvise()" @focus.native.capture="showAdvise()"
                    placeholder="支持输入资源、用户、文章关键字" v-model="searchForm.content"/></Input>
                    <Button type="primary" class="search-button">
                        <Icon type="ios-search" size="30"></Icon>
                    </Button>
                    <div id="content" style="display:none;">
                        <Search style="width:80%; top:40px;"></Search>
                    </div>
                </div>
            </FormItem>
        </Form>
    </div>
</div>
</template>

<script>
import TopNavigation from '../components/TopNav.vue'
import Search from '../components/Search.vue'

/*var searchContent = document.getElementById("search")
addEventListener(searchContent, "focus", function() {

})*/
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
    name:"Home",
    components: {TopNavigation, Search},
    data() {
        const validateContent = (rule, value, callback) => {
            if(contain(value, "^[!@#$%&*()-+=.~`]_{}?/<>,")) {
                callback(new Error("含有非法字符"))
            } else {
                callback();
            }
        }
        return {
            searchForm: {content:""},
            searchRule: {
                content: [{required: true, trigger:'blur', validator: validateContent}
                ]
            }
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
        showAdvise() {
            document.getElementById("content").style.display='block';
        },
        hideAdvise() {
            document.getElementById("content").style.display='none';
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
    background-image: url("../assets/blue.jpg")
}

.home-search-wrapper img{
    height: 400px;
    float: center;
    width: 80%;
}

.home-search-container {
    position: absolute;
    float: right;
    left: 20%;
    top: 180px;
    width: 60%;
    height: 400px;
}

.search-input{
    text-align: left;
    float: left;
    width: 80%;
    height: 48px;
}

.search-button{
    background-color: #6495ED;
    float: left;
    width: 20%;
    cursor: pointer;
    height: 36px;
}

.search-button:hover{
    background-color: #BA55D3;
    border-color: #BA55D3;
    color: white;
    border-width: 3px;
}
</style>
