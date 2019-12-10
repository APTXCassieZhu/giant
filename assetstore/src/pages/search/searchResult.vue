<template>
    <div class="window-style">
        <div class="upper-wrapper">
            <div class="upper-container">
                <TopNavigation style="position:relative; z-index: 100"></TopNavigation>
                <div class="tab-choose">
                    <span style="margin-left: 15px;">美术类资源</span>
                    <span style="margin-left: 50px;">研发类资源</span>
                    <span style="margin-left: 50px;">用 户</span>
                </div>
            </div>
        </div>
        <div class="upper-bottom-wrapper">
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
                            class="box-link-a" :name="item.label">{{item.label}}</DropdownItem>
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
                    <Divider type="vertical" />
                    <span style="margin-left: 20px; margin-right: 20px;" >参考类资源</span>
                    <a-checkbox @change="onChange"></a-checkbox>
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
        }else if(this.$route.query.type == 'dev'){
            axios.get('/api/tag/tree', {params: {type: 'dev_classify'}}).then(res =>{
                if(res.data.code === 0){
                    this.catalogList = res.data.data
                }else if(res.data.code === 400){
                    alert('参数格式不正确')
                }
            })
        }
        axios.get('/api/tag/lastitems', {params: {type: 'project'}}).then(res =>{
            if(res.data.code === 0){
                this.project = res.data.data
            }else if(res.data.code === 400){
                alert('参数格式不正确')
            }
        })
        axios.get('/api/tag/tree', {params: {type: 'engine_ver'}}).then(res =>{
            if(res.data.code === 0){
                this.engineList = res.data.data
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
        }
    },
    methods:{
        changeFilter(name){
            // TODO 根据用户选择的筛选，重新加载searchresult page显示资源
            if(name === "所有"){
                this.currentFilter = "所有"
            }else if(name === "美术类资源"){
                this.currentFilter = "美术类资源"
            }else{
                this.currentFilter = "研发类工具"
            }
        },
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
        },
        searchAdviseTag(val){
            console.log('爷爷call 孙子的method')
            this.searchForm.content = val;
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
            axios.post('/api/search',{searchcontent: this.searchForm.content},{emulateJSON:true}).then((response)=>{
                //alert("提交成功^_^，刚刚提交内容是：" + response.body.search)
                this.$store.commit('SEARCH_COUNT', this.searchForm.content)
                this.reload()
                //this.$router.push('/searchResult')
            }, (response)=>{
            })

        },
        jumpPage(){
            axios.get('/api/search', {params: {
                val: this.$route.query.val,
                type: this.$route.query.type,
                page: this.curPage,
                pageSize: this.pageSize
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
    computed:{
        getSearchContent(){
            return this.$store.state.searchContent;
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

.card-wrapper {
    width: 100%;
    max-width: 1380px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
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

