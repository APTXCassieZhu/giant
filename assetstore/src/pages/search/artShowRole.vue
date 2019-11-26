<template>
    <div>
        <TopNavigation style="z-index: 100"></TopNavigation>
        <div class="body-style">
            <!-- <div style="margin:30px 0;font-size:14px;">
                <bread-crumb></bread-crumb>
            </div> -->
            <div id='advise' class="advise-wrapper">
                <div class="advise-container">
                  <span>&emsp;推荐搜索&emsp;</span>
                  <!--TODO 推荐搜索按照用户输入的搜索而得出的相关搜索-->
                  <Tag size="medium" class="tag-style" @click.native="searchAdviseTag('推荐搜索1')">推荐搜索1</Tag>
                  <Tag size="medium" class="tag-style" @click.native="searchAdviseTag('推荐搜索2')">推荐搜索2</Tag>
                  <Tag size="medium" class="tag-style" @click.native="searchAdviseTag('推荐搜索3')">推荐搜索3</Tag>
                  <Tag size="medium" class="tag-style" @click.native="searchAdviseTag('推荐搜索4')">推荐搜索4</Tag>
                  <Icon size="24" class="advise-close" type="md-close-circle" v-on:click="closeAdvise()" />  
                </div>
            </div>
            <div class="title-wrapper">
                <strong>{{route}}</strong>
            </div>
            <div class="button-wrapper">
              <choice></choice>
            </div>
            <div class="card-wrapper">
                <ul>
                    <span style="color: #1ebf73;">{{resultCount}}</span>条搜索结果
                    <div style="float: right; margin-right: 125px;">
                        <Dropdown @on-click="changeOrder" trigger="click" style="margin-left: 20px">
                            <span href="javascript:void(0)" name="按推荐排序"  class="order-style">
                                {{currentOrder}}<Icon type='md-arrow-dropdown' size='20' />
                            </span>
                            <DropdownMenu slot="list">
                              <DropdownItem class="box-link-a" name="按推荐排序">推荐</DropdownItem>
                                <DropdownItem class="box-link-a" name="按热度排序">热度</DropdownItem>
                                <DropdownItem class="box-link-a" name="按时间排序">时间</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </ul>
                <br>
                <!-- <source-card v-for="n in 15" :key="n" 
                    :sourceID="n*1000"  
                    :breadlist="[
                      {fullPath:`/artShow/role#tags=['111','222','333']`,name:'美术类资源'},
                      {fullPath:`/artShow/role#tags=['111','222','333']`,name:'角色'}
                    ]"  
                class="card-style"></source-card>   -->
                <Page class="page-style" :total="100" show-elevator />
                <corner></corner>
            </div>
            <Footer style="position:relative;margin-top:200px;"></Footer>
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

import breadCrumb from "@/widget/breadcrumb.vue";

export default {
    name:"ArtShow",
    inject: ['reload'],
    components:{
        TopNavigation,
        SourceCard,
        Footer,
        Corner,
        Choice,
        breadCrumb
    },
    watch: {
        // 对路由变化作出响应...
        '$route' (to, from) {
            console.log('to '+to)
            console.log('from '+from)
        }
    },
    data() {
        return {
            minHeight: 0,
            resultCount: 7021,
            searchHistory: [],              //存放历史搜索
            searchForm: {content:""},
            currentOrder: "按推荐排序",        //筛选结果按这个currentOrder排序
            route: "",
        }
    },
    mounted(){

        debugger
        if(this.$route.params.pathMatch == "role"){
            this.route = "美术类资源 / 角色"
        }else if(this.$route.params.pathMatch == "environment"){
            this.route = "美术类资源 / 环境"
        }else if(this.$route.params.pathMatch == "tool"){
            this.route = "美术类资源 / 道具"
        }else if(this.$route.params.pathMatch == "vehicle"){
            this.route = "美术类资源 / 载具"
        }else if(this.$route.params.pathMatch == "effect"){
            this.route = "美术类资源 / 特效"
        }else if(this.$route.params.pathMatch == "animation"){
            this.route = "美术类资源 / 动画"
        }else if(this.$route.params.pathMatch == "3d"){
            this.route = "美术类资源 / 3d"
        }else if(this.$route.params.pathMatch == "2d"){
            this.route = "美术类资源 / 2d"
        }else if(this.$route.params.pathMatch == "paint"){
            this.route = "美术类资源 / 原画"
        }else if(this.$route.params.pathMatch == "UI"){
            this.route = "美术类资源 / UI"
        }else if(this.$route.params.pathMatch == "cute"){
            this.route = "美术类资源 / Q版"
        }else if(this.$route.params.pathMatch == "second"){
            this.route = "美术类资源 / 二次元"
        }else if(this.$route.params.pathMatch == "korea"){
            this.route = "美术类资源 / 日韩"
        }else if(this.$route.params.pathMatch == "occident"){
            this.route = "美术类资源 / 欧美"
        }else if(this.$route.params.pathMatch == "china"){
            this.route = "美术类资源 / 国风"
        }else if(this.$route.params.pathMatch == "texture"){
            this.route = "美术类资源 / 贴图与材质"
        }else if(this.$route.params.pathMatch == "template"){
            this.route = "美术类资源 / 模板"
        }
    },
    methods:{

        xgoPage(url){
          
            //debugger
            this.$store.commit('SAVE_BREADLIST', {
                // breadlist:[
                //     {fullPath:'/home',name: this.styname}  
                // ],
                breadlist:[
                    {fullPath:this.route.fullPath,name:'xxxxx'}
                ],
                resourceId:this.sourceID
                
            })

            
            this.$router.push(`/resourceDetail/${132}`)
     
        
        },
        changeOrder(name){
            // TODO 根据用户选择的筛选，重新加载searchresult page显示资源
            if(name === "按推荐排序"){
                this.currentOrder = "按推荐排序"
            }else if(name === "按热度排序"){
                this.currentOrder = "按热度排序"
            }else{
                this.currentOrder = "按时间排序"
            }
        },
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
            axios.post('/api/user/search',{searchcontent: this.searchForm.content},{emulateJSON:true}).then((response)=>{
                //alert("提交成功^_^，刚刚提交内容是：" + response.body.search)
                this.$store.commit('SEARCH_COUNT', this.searchForm.content)
                this.reload()
                this.$router.push('/searchEmpty')
            }, (response)=>{
            })

        },
    }
}
</script>
<style>
.advise-container > .tag-style:hover > .ivu-tag-text{
    color: #1ebf73;
}
</style>
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
}
.advise-container {
    position: relative;
    left:3.3%;
    top:10px;
    height: 20px;
}
.advise-close{
    position: relative;
    left: 1250px;
    top: 5px;
    color: rgba(0, 0, 0, 0.25);
}
.advise-close:hover{
    color:silver;
    cursor: pointer;
    color: #1ebf73;
}

.title-wrapper{
    position: relative;
    left: 4%;
    top: 20px;
    font-size: 24px;
    color:#262626;
    margin-bottom: 30px;
}

.button-wrapper{
    position: relative;
    left: 4%;
}

.card-wrapper {
    position: relative;
    left: 4%;
    top: 50px;
    width: 80%;
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
    margin-left: 20px;
}
.box-link-a{
    color:black;
}
.box-link-a:hover{
    color:#1ebf73;
    cursor: pointer;
}
.page-style{
    position: relative; 
    margin-left: 35%; 
    margin-top: 90px;
}
.order-style{
    cursor:pointer;
    color: #7f7f7f;
}
.order-style:hover{
    color: #1ebf73;
}
</style>

