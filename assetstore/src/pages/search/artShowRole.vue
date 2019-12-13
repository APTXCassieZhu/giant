<template>
    <div>
        <TopNavigation style="position:relative; height: 84px; z-index: 100"></TopNavigation>
        <div class="body-style">
            <div class="middle-card-wrapper">
                <div class="choice-wrapper">
                    <div class="route-text" style=" margin-left: 15px;">
                        美术类资源 / <span style="color: #003A8C">{{route}}</span>
                    </div>
                    <div class="choice-part">
                        <a-tooltip placement="top">
                            <template slot="title">
                                <span>
                                    <font-awesome-icon :icon="['fas','question-circle']"/>
                                    这是什么？参考类资源仅供在研发工作中参考 学习使用，<span style="color: red">绝对禁止</span>使用在正式商用项目中。
                                </span>
                            </template>
                            <font-awesome-icon :icon="['fas','question-circle']" style="width: 14px; height: 14px; color: #000000D9"/>
                        </a-tooltip>
                        显示参考类资源 
                        <Checkbox v-model="refer" @on-change="wantRefer" style="margin-left:20px;"></Checkbox>
                        <Divider type="vertical" style="margin-right: 30px;"/>
                        <Dropdown trigger="click" placement="bottom-end">
                            <span href="javascript:void(0)" name="筛选方法" class="order-style">
                                筛选方法 <Icon type='md-arrow-dropdown' size='20' />
                            </span>
                            <DropdownMenu slot="list" class="dropdown-panel">
                                <div class="divide-three-part">
                                    <div class="divider-title">项目</div>
                                    <div class="divider-checkbox1">
                                        <div>不限</div>
                                        <Checkbox
                                            :indeterminate="pim"
                                            :value="checkProject"
                                            @click.prevent.native="checkAllProject">
                                        </Checkbox>
                                    </div>
                                    <CheckboxGroup v-model="selectedProject" @on-change="projectChange">
                                        <div class="divider-checkbox" v-for="(item, p) in this.projectList" :key="'p'+p">
                                            <Checkbox :label="item.name"></Checkbox>
                                        </div>
                                    </CheckboxGroup>
                                </div>
                                <Divider type='vertical' style="height: 165px; margin-top: 50px;"/>
                                <div class="divide-three-part">
                                    <div class="divider-title">风格</div>
                                    <div class="divider-checkbox1">
                                        <div>不限</div>
                                        <Checkbox
                                            :indeterminate="sim"
                                            :value="checkStyle"
                                            @click.prevent.native="checkAllStyle">
                                        </Checkbox>
                                    </div>
                                    <CheckboxGroup v-model="selectedStyle" @on-change="styleChange">
                                        <div class="divider-checkbox" v-for="(item, p) in this.styleList" :key="'s'+p">
                                            <Checkbox :label="item.name"></Checkbox>
                                        </div>
                                    </CheckboxGroup>
                                </div>
                                <Divider type='vertical' style="height: 165px; margin-top: 50px;"/>
                                <div class="divide-three-part">
                                    <div class="divider-title">引擎</div>
                                    <div class="divider-checkbox1">
                                        <div>不限</div>
                                        <Checkbox
                                            :indeterminate="eim"
                                            :value="checkEngine"
                                            @click.prevent.native="checkAllEngine">
                                        </Checkbox>
                                    </div>
                                    <CheckboxGroup v-model="selectedEngine" @on-change="engineChange">
                                        <div class="divider-checkbox" v-for="(item, p) in this.engineList" :key="'e'+p">
                                            <Checkbox :label="item.name"></Checkbox>
                                        </div>
                                    </CheckboxGroup>
                                </div>
                            </DropdownMenu>
                        </Dropdown>
                        <Divider type="vertical" style="margin-right: 10px;"/>
                        <span style="margin-right: 10px;">排序方式</span>
                        <font-awesome-icon :icon="['fas','eye']" :class="orderClass1" @click="changeOrder('view')"/>
                        <font-awesome-icon :icon="['far','clock']" :class="orderClass2" @click="changeOrder('time')"/>
                        <font-awesome-icon :icon="['fas','heart']" :class="orderClass3" @click="changeOrder('star')"/>
                    </div>
                </div>
                <div class="middle-card">
                    <div class="card-wrapper">
                        <!-- <source-card v-for="n in 15" :key="n" 
                        :sourceID="n*1000"  
                        :breadlist="[
                        {fullPath:`/artShow/role#tags=['111','222','333']`,name:'美术类资源'},
                        {fullPath:`/artShow/role#tags=['111','222','333']`,name:'角色'}
                        ]"  
                    class="card-style"></source-card>   -->
                        <div v-for="(item, index) in this.searchList" :key="index" class="fine-resource-card">
                            <source-card :resource="item" :isLike="item.isStar" :showTag="false"
                            :breadlist="[{fullPath:'/artShow',name:'美术类资源'}]" 
                            ></source-card>
                        </div>
                    </div>
                    <a-pagination v-model="curPage" :pageSize='pageSize' :total="resultCount" style="text-align: center;"/>
                </div>
            </div>
            <corner></corner>
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
    name:"DevShow1",
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
            resultCount: 1314,
            searchHistory: [],              //存放历史搜索
            searchForm: {content:""},
            curOrder: "time",               //筛选结果按这个currentOrder排序
            route: "",
            curPage: 1,
            pageSize: 20,
            searchList: [],
            refer: false,
            orderClass1: 'order-style',
            orderClass2: 'order-style-active',
            orderClass3: 'order-style',   
            tags: '',   
            totalTags: '',
            pim: true,  
            checkProject: false,
            projectList: [],
            selectedProject: [],
            sim: true,
            checkStyle: false,
            styleList: [],
            selectedStyle: [],
            eim: true,
            checkEngine: false,
            engineList: [],    
            selectedEngine: [],
        }
    },
    mounted(){
        this.route = `${this.$route.params.pathMatch}`
        this.tags = this.$route.query.tags
        axios.get('/api/resource',{
            params:{
                page: this.curPage,
                pageSize: this.pageSize,
                refer: this.refer,
                tags: this.tags,
        }}).then((res)=>{
            if(res.data.code == 0){
                this.searchList = res.data.data.list
                this.resultCount = res.data.data.count
            }
        })
        axios.get('/api/tag/lastitems', {params: {type: 'project'}}).then(res =>{
            if(res.data.code === 0){
                this.projectList = res.data.data
            }else if(res.data.code === 400){
                alert('参数格式不正确')
            }
        })
        axios.get('/api/tag/lastitems', {params: {type: 'engine_ver'}}).then(res =>{
            if(res.data.code === 0){
                this.engineList = res.data.data
            }else if(res.data.code === 400){
                alert('参数格式不正确')
            }
        })
        axios.get('/api/tag/lastitems', {params: {type: 'art_style'}}).then(res =>{
            if(res.data.code === 0){
                this.styleList = res.data.data
            }else if(res.data.code === 400){
                alert('参数格式不正确')
            }
        })
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
        changeOrder(order){
            this.curOrder = order
            if(order === 'view'){
                this.orderClass1 = 'order-style-active'
                this.orderClass2 = 'order-style'
                this.orderClass3 = 'order-style'
            }else if(order === 'time'){
                this.orderClass1 = 'order-style'
                this.orderClass2 = 'order-style-active'
                this.orderClass3 = 'order-style'
            }else{
                this.orderClass1 = 'order-style'
                this.orderClass2 = 'order-style'
                this.orderClass3 = 'order-style-active'
            }
            this.$options.methods.changeConAndSearch.bind(this)();
        },
        wantRefer(){
            this.$options.methods.changeConAndSearch.bind(this)();
        },
        changeConAndSearch(){
            if(this.totalTags === ''){
                this.totalTags = `${this.tags}`
            }
            axios.get('/api/resource',{
                params:{
                    page: this.curPage,
                    pageSize: this.pageSize,
                    refer: this.refer,
                    tags: this.totalTags,
                    order: this.curOrder
                }
            }).then((res)=>{
                if(res.data.code == 0){
                    this.searchList = res.data.data.list
                    this.resultCount = res.data.data.count
                }
            })
        },
        checkAllProject(){
            if (this.pim) {
                this.checkProject = false;
            } else {
                this.checkProject = !this.checkProject;
            }
            this.pim = false;

            if (this.checkProject) {
                this.selectedProject = [];
                for(var i=0; i<this.projectList.length; i++){
                    this.selectedProject.push(this.projectList[i].name)
                }
            } else {
                this.selectedProject = [];
            }
        },
        projectChange(data){
            if (data.length === this.projectList.length) {
                this.pim = false;
                this.checkProject = true;
            } else if (data.length > 0) {
                this.pim = true;
                this.checkProject = false;
            } else {
                this.pim = false;
                this.checkProject = false;
            }
            var searchTags = `${this.tags},`
            for(var i=0; i<this.selectedProject.length; i++){
                searchTags += this.projectList.find(item => item.name === this.selectedProject[i]).id + ','
            }
            for(var i=0; i<this.selectedStyle.length; i++){
                searchTags += this.styleList.find(item => item.name === this.selectedStyle[i]).id + ','
            }
            for(var i=0; i<this.selectedEngine.length; i++){
                searchTags += this.engineList.find(item => item.name === this.selectedEngine[i]).id + ','
            }
            this.totalTags = searchTags
            this.$options.methods.changeConAndSearch.bind(this)();
        },
        checkAllStyle(){
            if (this.sim) {
                this.checkStyle = false;
            } else {
                this.checkStyle = !this.checkStyle;
            }
            this.sim = false;

            if (this.checkStyle) {
                this.selectedStyle = [];
                for(var i=0; i<this.styleList.length; i++){
                    this.selectedStyle.push(this.styleList[i].name)
                }
            } else {
                this.selectedStyle = [];
            }
        },
        styleChange(data){
            if (data.length === this.styleList.length) {
                this.sim = false;
                this.checkStyle = true;
            } else if (data.length > 0) {
                this.sim = true;
                this.checkStyle = false;
            } else {
                this.sim = false;
                this.checkStyle = false;
            }
            var searchTags = `${this.tags},`
            for(var i=0; i<this.selectedProject.length; i++){
                searchTags += this.projectList.find(item => item.name === this.selectedProject[i]).id + ','
            }
            for(var i=0; i<this.selectedStyle.length; i++){
                searchTags += this.styleList.find(item => item.name === this.selectedStyle[i]).id + ','
            }
            for(var i=0; i<this.selectedEngine.length; i++){
                searchTags += this.engineList.find(item => item.name === this.selectedEngine[i]).id + ','
            }
            this.totalTags = searchTags
            this.$options.methods.changeConAndSearch.bind(this)();
        },
        checkAllEngine(){
            if (this.eim) {
                this.checkEngine = false;
            } else {
                this.checkEngine = !this.checkEngine;
            }
            this.eim = false;

            if (this.checkEngine) {
                this.selectedEngine = [];
                for(var i=0; i<this.engineList.length; i++){
                    this.selectedEngine.push(this.engineList[i].name)
                }
            } else {
                this.selectedEngine = [];
            }
        },
        engineChange(data){
            if (data.length === this.engineList.length) {
                this.eim = false;
                this.checkEngine = true;
            } else if (data.length > 0) {
                this.eim = true;
                this.checkEngine = false;
            } else {
                this.eim = false;
                this.checkEngine = false;
            }
            var searchTags = `${this.tags},`
            for(var i=0; i<this.selectedProject.length; i++){
                searchTags += this.projectList.find(item => item.name === this.selectedProject[i]).id + ','
            }
            for(var i=0; i<this.selectedStyle.length; i++){
                searchTags += this.styleList.find(item => item.name === this.selectedStyle[i]).id + ','
            }
            for(var i=0; i<this.selectedEngine.length; i++){
                searchTags += this.engineList.find(item => item.name === this.selectedEngine[i]).id + ','
            }
            this.totalTags = searchTags
            this.$options.methods.changeConAndSearch.bind(this)();
        },
    }
}
</script>
<style>
.card-wrapper > ul > div > .ivu-dropdown > .ivu-select-dropdown{
    margin: 0px;
    padding: 0px;
}
.choice-part > .ivu-checkbox-wrapper > .ivu-checkbox-checked > .ivu-checkbox-inner{
    border-color: #FA541C;
    background-color: #FA541C;
}
.choice-part > .ivu-dropdown > .ivu-select-dropdown{
    margin: 0px;
    padding: 0px;
}
.divider-checkbox> .ivu-checkbox-wrapper > .ivu-checkbox-indeterminate > .ivu-checkbox-inner{
    border-color: #707070;
    background-color: #707070;
}
.divider-checkbox> .ivu-checkbox-wrapper > .ivu-checkbox-checked > .ivu-checkbox-inner{
    border-color: #707070;
    background-color: #707070;
}
.divider-checkbox1> .ivu-checkbox-wrapper > .ivu-checkbox-indeterminate > .ivu-checkbox-inner{
    border-color: #707070;
    background-color: #707070;
}
.divider-checkbox1> .ivu-checkbox-wrapper > .ivu-checkbox-checked > .ivu-checkbox-inner{
    border-color: #707070;
    background-color: #707070;
}
.divider-checkbox > .ivu-checkbox-wrapper{
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
}
</style>
<style scoped>
.body-style{
    width: 100%;
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.middle-card-wrapper{
    width: 100%;
    max-width: 1380px;
}
.choice-wrapper{
    margin-top: 48px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.route-text{
    font-size: 20px;
    color: #00000073;
}
.choice-part{
    font-size: 16px;
    font-weight: 600;
    color: #00000073;
}
.order-style{
    margin-left: 10px;
    margin-right: 10px;
    width: 16px;
    height: 16px;
    cursor: pointer;
    transition: .5s;
}
.order-style:hover{
    color: #FF8900;
}
.order-style-active{
    margin-left: 10px;
    margin-right: 10px;
    width: 16px;
    height: 16px;
    color: #FF8900;
    cursor: pointer;
}
.dropdown-panel{
    width: 589px;
    height: 237px;
    color: #707070;
    font-size: 14px;
    box-shadow: 0px 3px 6px #00000029;
    display:flex;
    flex-direction: row;
}
.divide-three-part{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 11px 15px;
    width: 196.33px;
}
.divider-title{
    color: #000000D9;
    font-weight: 600;
    margin-bottom: 18px;
}
.divider-checkbox, .divider-checkbox1{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
}
.middle-card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 26px;
}
.card-wrapper {
    width: 100%;
    max-width: 1380px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
.fine-resource-card{
    position: relative;
    margin-right: 15px; 
    margin-left: 15px; 
    margin-bottom: 30px;
    width: 360px;
    height: 300px;
}
@media screen and (max-width: 2000px) {
    .fine-resource-card::after{
        content:'';
        display:block;
        width:100%;
        padding-bottom: 83.33%;
    }
    .fine-resource-card{
        width: 20%;
        min-width: 140px;
        height: auto;
        margin: 1.5%;
    }
}
</style>

