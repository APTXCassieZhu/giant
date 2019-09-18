<template>
<div>
    <TopNavigation></TopNavigation>
    <div class="home-search-wrapper">
        <Form ref="searchForm" :model="searchForm" inline>
            <FormItem prop="content">
                <Input id="search" size="large" type="text" class="search-input" placeholder="输入关键词" v-model="searchForm.content"/></Input>
                <Button type="primary" to="/search" class="search-button"><Icon type="ios-search" size="30"></Icon></Button>
            </FormItem>
        </Form>
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
.home-search-wrappe{
    height: 100px;
    float: center;
    width: 80%;
    background-image: url("../assets/blue.jpg")
}

.search-input{
    float: left;
    text-align: left;
    width: 80%;
    height: 36px;
    margin: 0;
}

.search-button {
    background-color: #6495ED;
    float: right;
    width: 20%;
    height: 36px;
    cursor: pointer;
}

.search-bt:hover{
    background-color: #BA55D3;
    border-color: #BA55D3;
    color: white;
    border-width: 3px;
}
</style>
