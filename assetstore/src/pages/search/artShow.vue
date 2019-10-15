<template>
    <div>
        <TopNavigation style="z-index: 100"></TopNavigation>
        <div class="body-style">
            <div id='advise' class="advise-wrapper">
                <div class="advise-container">
                    <span>&emsp;推荐搜索&emsp;</span>
                    <!--TODO 推荐搜索按照用户输入的搜索而得出的相关搜索-->
                    <Tag color="green" class="tag-style" @click.native="searchAdviseTag('推荐搜索1')">推荐搜索1</Tag>
                    <span>&emsp;</span>
                    <Tag color="green" class="tag-style" @click.native="searchAdviseTag('推荐搜索2')">推荐搜索2</Tag>
                    <span>&emsp;</span> 
                    <Tag color="green" class="tag-style" @click.native="searchAdviseTag('推荐搜索3')">推荐搜索3</Tag>
                    <span>&emsp;</span> 
                    <Tag color="green" class="tag-style" @click.native="searchAdviseTag('推荐搜索4')">推荐搜索4</Tag>
                    <span>&emsp;&emsp;&emsp;&emsp;</span>
                    <Icon size="24" class="advise-close" type="md-close-circle" v-on:click="closeAdvise()" />  
                </div>
            </div>
            <div class="bread-container">
                <Breadcrumb>
                    <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                    <BreadcrumbItem to="/home/resource">美术类资源</BreadcrumbItem>
                    <BreadcrumbItem>当前内容</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="title-wrapper">
                <strong>美术类资源</strong>
            </div>
            <div class="button-wrapper">
                <choice></choice>
            </div>
            <div class="card-wrapper">
                <ul>
                    <span style="color: #1ebf73;">{{resultCount}}</span>条搜索结果
                    <div style="float: right; margin-right: 60px;">
                        <Dropdown style="margin-left: 20px">
                            <span href="javascript:void(0)" style="cursor:pointer;">默认排序
                                <Icon type="md-arrow-dropdown" size="20"/>
                            </span>
                            <DropdownMenu slot="list">
                                <DropdownItem class="box-link-a">推荐</DropdownItem>
                                <DropdownItem class="box-link-a">热度</DropdownItem>
                                <DropdownItem class="box-link-a">时间</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </ul>
                <br>
                <source-card v-for="n in 18" :key="n" class="card-style"></source-card>
                <Page style="position: relative; margin-left: 35%;" :total="100" show-elevator />
                <corner></corner>
                <br><br><br><br><br>            
            </div>
            <Footer style="position:relative;"></Footer>
        </div>
    </div>
</template>

<script>
import storage from 'good-storage'

import TopNavigation from '../../components/TopNav.vue'
import SourceCard from '../../components/sourceCard.vue'
import Footer from '../../components/footer.vue'
import Choice from '../../components/choice.vue'
import Corner from '../../components/corner.vue'
import searchResult from '../search/searchResult.vue'

export default {
    name:"ArtShow",
    inject: ['reload'],
    components:{
        TopNavigation,
        SourceCard,
        Footer,
        Corner,
        Choice,
    },
    data() {
        return {
            minHeight: 0,
            resultCount: 7021,
            searchHistory: [],              //存放历史搜索
            searchForm: {content:""},
        }
    },
    mounted(){
        
    },
    methods:{
        closeAdvise(){
            document.getElementById("advise").style.display = 'none'
        },
        searchAdviseTag(val){
            console.log('爷爷call 孙子的method')
            this.searchForm.content = val
            /* TODO 下面这种可以直接call其他组件的method，但是不知道为什么一直说content not defined
               所有直接把要call的method 复制过来了，待解决。。。
               Search.methods.searchSubmit()*/

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
    }
}
</script>

<style scoped>
.body-style{
    position: absolute;
    width: 100%;
    z-index: 0;
    top: 140px;
}

.advise-wrapper{
    position: relative;
    width: 100%;
    height: 50px;
    background-color:rgba(0, 0, 0, 0.05);
    box-shadow: inset 0px 8px 8px 5px rgba(0,0,0,0.2); 
}
.advise-container {
    position: relative;
    left:2.5%;
    top:15px;
    height: 20px;
}
.advise-close{
    position: relative;
    top: 3px;
}
.advise-close:hover{
    color:silver;
    cursor: pointer;
}

.bread-container {
    position: relative;
    top: 15px;
    left: 3%;
}

.title-wrapper{
    position: relative;
    left: 3%;
    top: 20px;
    font-size: 30px;
}

.button-wrapper{
    position: relative;
    left: 3%;
    top: 30px;
}

.card-wrapper {
    position: relative;
    left: 3%;
    top: 60px;
    width: 92%;
    margin-right: 18px;
}
.card-style{
    display: inline-block; 
    margin-right: 50px; 
    margin-bottom: 40px;
}
.elevator-wrapper{
    position: relative;
    margin-left: 30%;
    top: 80px;
}
.tag-style{
    cursor:pointer;
}
.box-link-a{
    color:black;
}
.box-link-a:hover{
    color:#1ebf73;
    cursor: pointer;
}
</style>

