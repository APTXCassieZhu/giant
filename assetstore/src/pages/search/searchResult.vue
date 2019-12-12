<template>
    <div class="window-style">
        <div class="upper-wrapper">
            <div class="upper-container">
                <TopNavigation style="position:relative; z-index: 100"></TopNavigation>
                <div class="tab-choose">
                    <div :class="tab1" style="margin-left: 15px;" @click="changeTab('tab1')">
                        美术类资源
                        <div class="orange-underline" v-if="activeTab == 'tab1'"></div>
                    </div>
                    <div :class="tab2" style="margin-left: 50px;" @click="changeTab('tab2')">
                        研发类资源
                        <div class="orange-underline" v-if="activeTab == 'tab2'"></div>
                    </div>
                    <div :class="tab3" style="margin-left: 50px;" @click="changeTab('tab3')">
                        用 户
                        <div class="orange-underline1" v-if="activeTab == 'tab3'"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="upper-bottom-wrapper" v-if="activeTab != 'tab3'">
            <div class="bottom-container">
                <div class="filter-con">
                    <span style="margin-left: 15px;">筛选方式：</span>
                    <Dropdown @on-click="changeCatalog" trigger="click" style="margin-right: 30px;">
                        <span href="javascript:void(0)" name="最后更新" class="order-style">
                            {{curCatalog}}<Icon type='md-arrow-dropdown' size='20' />
                        </span>
                        <DropdownMenu slot="list">
                            <DropdownItem class="box-link-a" name="所有目录">所有目录</DropdownItem>
                            <DropdownItem v-for="(item, c) in this.catalogList" :key="'cc'+c" 
                            class="box-link-a" :name="item.label">{{item.label}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown @on-click="changeProject" trigger="click" style="margin-right: 30px;">
                        <span href="javascript:void(0)" name="最后更新" class="order-style">
                            {{curProject}}<Icon type='md-arrow-dropdown' size='20' />
                        </span>
                        <DropdownMenu slot="list">
                            <DropdownItem v-for="(item, p) in this.projectList" :key="'pp'+p" 
                            class="box-link-a" :name="item.name">{{item.name}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown @on-click="changeEngine" trigger="click" style="margin-right: 20px;">
                        <span href="javascript:void(0)" name="最后更新" class="order-style">
                            {{curEngine}}<Icon type='md-arrow-dropdown' size='20' />
                        </span>
                        <DropdownMenu slot="list">
                            <DropdownItem v-for="(item, e) in this.engineList" :key="'ee'+e" 
                            class="box-link-a" :name="item.label">{{item.label}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Divider type="vertical" style="margin-right: 20px;" v-if="activeTab == 'tab1'"/>
                    <span style="margin-left: 20px; margin-right: 20px;" v-if="activeTab == 'tab1'">参考类资源</span>
                    <Checkbox v-model="refer" @on-change="wantRefer" v-if="activeTab == 'tab1'"></Checkbox>
                </div>
                <div class="order-con">
                    <span>排序按照：</span>
                    <Dropdown @on-click="changeOrder" trigger="click">
                        <span href="javascript:void(0)" name="最后更新" class="order-style">
                            {{currentOrder}}<Icon type='md-arrow-dropdown' size='20' />
                        </span>
                        <DropdownMenu slot="list">
                            <DropdownItem class="box-link-a" name="最后更新">最后更新</DropdownItem>
                            <DropdownItem class="box-link-a" name="按关注度">按关注度</DropdownItem>
                            <DropdownItem class="box-link-a" name="按浏览量">按浏览量</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
        <div class="middle-card-wrapper">
            <div class="text-wrapper">
                <div class="result-text" style="margin-left: 15px; text-align: left">{{resultCount}} 条结果</div>
            </div>
        </div>
        <div class="middle-card-wrapper" style="margin-top: 16px;">
            <div class="middle-card">
                <div class="card-wrapper">
                    <div v-for="(item, index) in this.searchList" :key="index" class="fine-resource-card">
                        <source-card :resource="item" :isLike="item.isStar" :showTag="false"
                        :breadlist="[{fullPath:'/artShow',name:'美术类资源'}]" 
                        ></source-card>
                    </div>
                    <!-- <source-card v-for="n in 15" :key="n" 
                        :breadlist="[{fullPath:`/searchresult#tags=['aaa','bbbb','ccc']`,name:'资源搜索'}]" 
                    class="card-style"></source-card> -->
                </div>
                <a-pagination @change="jumpPage()"
                v-model="curPage" :pageSize='pageSize' :total="resultCount" style="text-align: center;"/>
            </div>     
        </div>
        <corner></corner>
        <Footer style="position:relative;margin-top:200px;"></Footer>
    </div>
</template>

<script>
import storage from 'good-storage'
import TopNavigation from '../../components/TopNav.vue'
import Search from '../../components/Search.vue'
import SourceCard from '../../components/sourceCard.vue'
import Corner from '../../components/corner.vue'
import Choice from '../../components/choice.vue'
import Footer from '../../components/footer.vue'
export default {
    name:"SearchResult",
    inject: ['reload'],
    components:{
        TopNavigation, Corner,
        Choice, SourceCard,
        Footer,
    },
    mounted(){
        axios.get('/api/search', {params: {
            val: this.$route.query.val,
            type: this.$route.query.type,
            page: this.curPage,
            pageSize: this.pageSize
        }}).then((res)=>{
            if(res.data.code == 0){
                this.resultCount = res.data.data.count
                this.searchList = res.data.data.list
                /* 如果搜索到的匹配的内容为空 */
                if(this.resultCount == 0){
                    this.$router.push('/searchEmpty')
                }
            }
        }, (res)=>{
            alert(res)
        })
        if(this.$route.query.type == 'art'){
            axios.get('/api/tag/tree', {params: {type: `art_classify`}}).then(res =>{
                if(res.data.code === 0){
                    this.catalogList = this.catalogList.concat(res.data.data[0].children)
                    this.catalogList = this.catalogList.concat(res.data.data[1].children)
                    this.catalogList = this.catalogList.concat(res.data.data[2].children)
                }else if(res.data.code === 400){
                    alert('参数格式不正确')
                }
            })
            this.activeTab = 'tab1'
            this.tab1 = 'tab-active'
            this.tab2 = 'tab'
            this.tab3 = 'tab'
        }else if(this.$route.query.type == 'dev'){
            axios.get('/api/tag/tree', {params: {type: 'dev_classify'}}).then(res =>{
                if(res.data.code === 0){
                    this.catalogList = res.data.data
                }else if(res.data.code === 400){
                    alert('参数格式不正确')
                }
            })
            this.activeTab = 'tab2'
            this.tab1 = 'tab'
            this.tab2 = 'tab-active'
            this.tab3 = 'tab'
        }else{
            this.activeTab = 'tab3'
            this.tab1 = 'tab'
            this.tab2 = 'tab'
            this.tab3 = 'tab-active'
        }
        axios.get('/api/tag/lastitems', {params: {type: 'project'}}).then(res =>{
            if(res.data.code === 0){
                this.projectList = res.data.data
                this.curProject = this.projectList[0].name
            }else if(res.data.code === 400){
                alert('参数格式不正确')
            }
        })
        axios.get('/api/tag/tree', {params: {type: 'engine_ver'}}).then(res =>{
            if(res.data.code === 0){
                this.engineList = res.data.data
                this.curEngine = this.engineList[0].label
            }else if(res.data.code === 400){
                alert('参数格式不正确')
            }
        })
    },
    data() {
        return {
            searchList: [],
            curPage: 1,                       // 当前搜索页数
            pageSize: 20,                     // 一页多少资源
            resultCount: 7021,
            currentFilter: "所有",            // 由用户选择需要什么类别的搜索结果
            searchHistory: [],                // 存放历史搜索
            searchForm: {content:""},
            currentOrder: "最后更新",          // 筛选结果按这个排序
            curCatalog: '所有目录',            // 筛选目录按这个排序
            curProject: '征途3 手游',          // 筛选项目按这个排序
            curEngine: 'Unity',               // 筛选引擎按这个排序
            catalogList: [],
            projectList: [],
            engineList: [],
            curPage: 1,                       // 分页
            tab1: 'tab-active',
            tab2: 'tab',
            tab3: 'tab',
            activeTab: 'tab1',
            refer: false,
        }
    },
    methods:{
        changeCatalog(name){
            this.curCatalog = name
        },
        changeProject(name){
            this.curProject = name
        },
        changeEngine(name){
            this.curEngine = name
        },
        changeOrder(name){
            this.currentOrder = name
            axios.get('/api/search', {params: {
                val: this.$route.query.val,
                type: this.$route.query.type,
                page: this.curPage,
                pageSize: this.pageSize,
                refer: this.refer,
                order: this.currentOrder
            }}).then((res)=>{
                if(res.data.code == 0){
                    this.resultCount = res.data.data.count
                    this.searchList = res.data.data.list
                    /* 如果搜索到的匹配的内容为空 */
                    if(this.resultCount == 0){
                        this.$router.push('/searchEmpty')
                    }
                }
            }, (res)=>{
                alert(res)
            })
        },
        wantRefer(){
            axios.get('/api/search', {params: {
                val: this.$route.query.val,
                type: this.$route.query.type,
                page: this.curPage,
                pageSize: this.pageSize,
                refer: this.refer,
                order: this.currentOrder
            }}).then((res)=>{
                if(res.data.code == 0){
                    this.resultCount = res.data.data.count
                    this.searchList = res.data.data.list
                    /* 如果搜索到的匹配的内容为空 */
                    if(this.resultCount == 0){
                        this.$router.push('/searchEmpty')
                    }
                }
            }, (res)=>{
                alert(res)
            })
        },
        changeTab(tab){
            if(this.activeTab != tab){
                this.activeTab = tab
                if(tab == 'tab1'){
                    this.$router.push(`/searchresult?type=art&val=${this.content}`)   
                    this.tab1 = 'tab-active'
                    this.tab2 = 'tab'
                    this.tab3 = 'tab'
                    axios.get('/api/tag/tree', {params: {type: `art_classify`}}).then(res =>{
                        if(res.data.code === 0){
                            this.catalogList = []
                            this.catalogList = this.catalogList.concat(res.data.data[0].children)
                            this.catalogList = this.catalogList.concat(res.data.data[1].children)
                            this.catalogList = this.catalogList.concat(res.data.data[2].children)
                        }else if(res.data.code === 400){
                            alert('参数格式不正确')
                        }
                    })
                }else if(tab == 'tab2'){
                    this.$router.push(`/searchresult?type=dev&val=${this.content}`)
                    this.tab1 = 'tab'
                    this.tab2 = 'tab-active'
                    this.tab3 = 'tab'   
                    axios.get('/api/tag/tree', {params: {type: 'dev_classify'}}).then(res =>{
                        if(res.data.code === 0){
                            this.catalogList = res.data.data
                        }else if(res.data.code === 400){
                            alert('参数格式不正确')
                        }
                    })
                }else{
                    this.$router.push(`/searchresult?type=user&val=${this.content}`)  
                    this.tab1 = 'tab'
                    this.tab2 = 'tab'
                    this.tab3 = 'tab-active'  
                }
                axios.get('/api/search', {params: {
                    val: this.$route.query.val,
                    type: this.$route.query.type,
                    page: this.curPage,
                    pageSize: this.pageSize,
                    refer: this.refer,
                    order: this.currentOrder
                }}).then((res)=>{
                    if(res.data.code == 0){
                        this.resultCount = res.data.data.count
                        this.searchList = res.data.data.list
                        /* 如果搜索到的匹配的内容为空 */
                        if(this.resultCount == 0){
                            this.$router.push('/searchEmpty')
                        }
                    }
                }, (res)=>{
                    alert(res)
                }) 
            }
        },
        jumpPage(){
            axios.get('/api/search', {params: {
                val: this.$route.query.val,
                type: this.$route.query.type,
                page: this.curPage,
                pageSize: this.pageSize,
                refer: this.refer,
                order: this.currentOrder
            }}).then((res)=>{
                if(res.data.code == 0){
                    this.resultCount = res.data.data.count
                    this.searchList = res.data.data.list
                }
            }, (res)=>{
                alert(res)
            })
        }
    },
}
</script>
<style>
.order-con > .ivu-dropdown > .ivu-select-dropdown{
    margin: 0px;
    padding: 0px;
    font-size: 16px;
}
.filter-con > .ivu-dropdown > .ivu-select-dropdown{
    margin: 0px;
    padding: 0px;
    font-size: 16px;
}
</style>
<style scoped>
.window-style{
    background-color: #F5F5F5;
}
.upper-wrapper{
    background-color: #FFFFFF;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #E8E8E8;
}
.upper-bottom-wrapper{
    background-color: #FFFFFF;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.upper-container{
    background-color: #FFFFFF;
    position: relative;
    height: 145px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    max-width: 1380px;
}
.bottom-container{
    background-color: #FFFFFF;
    position: relative;
    height: 55px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    max-width: 1380px;
    color: #707070;
    font-size: 16px;
    line-height: 55px;
}
.tab-choose{
    font-size: 18px;
    font-weight: 600;
    color: #707070;
    margin-top: 25px;
    display: flex;
    flex-direction: row;
}
.tab-active{
    color: #FA541C;
    cursor: pointer;
}
.tab{
    color: #707070;
    cursor: pointer;
    transition: .3s;
}
.tab:hover{
    color: #FA541C;
}
@keyframes longer { 
    from { 
        transform: scaleX(0); 
    } 
    to { 
        transform: scaleX(1); 
    } 
}
.orange-underline{
    position: absolute;
    animation-name: longer; 
    animation-duration: 0.3s;
    margin-top: 7px;
    width: 90px;
    height: 3px;
    border-radius: 5px;
    background-color: #FA541C;
}
.orange-underline1{
    position: absolute;
    animation-name: longer; 
    animation-duration: 0.3s;
    margin-top: 7px;
    width: 42px;
    height: 3px;
    border-radius: 5px;
    background-color: #FA541C;
}
.box-link-a:hover{
    font-weight: 600;
}
.order-style{
    cursor: pointer;
}
.middle-card-wrapper{
    margin-top: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.middle-card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.text-wrapper{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    max-width: 1380px;
}
.card-wrapper {
    width: 100%;
    max-width: 1380px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
.result-text{
    font-size: 16px;
    font-weight: 500px;
    color: #00000079;

}
.fine-resource-card{
    margin-right: 15px; 
    margin-left: 15px; 
    margin-bottom: 30px;
    width: 360px;
    height: 300px;
}
@media screen and (max-width: 1889px) {
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

