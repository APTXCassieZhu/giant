<template>
<div>
    <TopNavigation></TopNavigation>
    <div class="home-search-wrapper">
        <div class="home-search-container">
            <Form ref="searchForm" :model="searchForm">
                <FormItem prop="content">
                    <Input id="search" size="large" type="text" class="search-input" 
                    placeholder="支持输入资源、用户、文章关键字" v-model="searchForm.content"/></Input>
                    <Button type="primary" to="/search" class="search-button"><Icon type="ios-search" size="30"></Icon></Button>
                </FormItem>
            </Form>
        </div>
    </div>
</div>
</template>

<script>
import TopNavigation from '../components/TopNav.vue'
export default {
    name:"Home",
    components:{TopNavigation},
    data() {
        return {
            searchForm: {content:""}
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
    width: 60%;
    height: 48px;
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
