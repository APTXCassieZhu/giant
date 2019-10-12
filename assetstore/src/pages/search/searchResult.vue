<template>
    <div>
        <TopNavigation style="z-index: 100"></TopNavigation>
        <div class="body-style">
            <div class="advise-wrapper" id="advise">
                <div class="advise-container">
                    <span>&emsp;推荐搜索&emsp;</span>
                    <!--TODO 推荐搜索按照用户输入的搜索而得出的相关搜索-->
                    <Tag color="purple" class="tag-style" @click.native="searchTag(item)">推荐搜索1</Tag>
                    <span>&emsp;</span>
                    <Tag color="purple" class="tag-style" @click.native="searchTag(item)">推荐搜索2</Tag>
                    <span>&emsp;</span>  
                    <Tag color="purple" class="tag-style" @click.native="searchTag(item)">推荐搜索3</Tag>
                    <span>&emsp;</span> 
                    <Tag color="purple" class="tag-style" @click.native="searchTag(item)">推荐搜索4</Tag>
                    <span>&emsp;&emsp;&emsp;&emsp;</span>
                    <Icon size="24" class="advise-close" type="md-close-circle" v-on:click="closeAdvise()" /> 
                </div>
            </div>
            <div class="title-wrapper">
                <strong>"{{getSearchContent}}"在
                    <Dropdown @on-click="changeFilter" trigger="click">
                        <a herf="javascript:void(0)" name="所有" v-html='this.currentFilter'></a>
                            <DropdownMenu slot="list">
                            <!--TODO () 内所有数字都是从后端得到的-->
                            <DropdownItem name="所有">所有(19871)</DropdownItem>
                            <DropdownItem name="美术类资源">美术类资源(10071)</DropdownItem>
                            <DropdownItem name="研发类工具">研发类工具(9800)</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Icon type="ios-arrow-down" />下的搜索结果</strong>
            </div>
            <div class="button-wrapper">
                <choice></choice>
            </div>
            <div class="card-wrapper">
                <ul>
                    <span style="color: blue;">{{resultCount}}</span>条搜索结果
                    <div style="float: right; margin-right: 125px;">
                        <Dropdown style="margin-left: 20px">
                            <span href="javascript:void(0)" style="cursor:pointer;">默认排序
                                <Icon type="md-arrow-dropdown" size="20"/>
                            </span>
                            <DropdownMenu slot="list">
                                <DropdownItem>推荐</DropdownItem>
                                <DropdownItem>热度</DropdownItem>
                                <DropdownItem>时间</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </ul>
                <br>
                <source-card v-for="n in 15" :key="n" class="card-style"></source-card>
                <Page style="position: relative; margin-left: 35%;" :total="100" show-elevator />
            </div>
            <corner></corner>
            <br><br><br><br><br>
            <Footer style="position:relative;"></Footer>
        </div>     
    </div>
</template>

<script>
import TopNavigation from '../../components/TopNav.vue'
import SourceCard from '../../components/sourceCard.vue'
import Corner from '../../components/corner.vue'
import Choice from '../../components/choice.vue'
import Footer from '../../components/footer.vue'
export default {
    name:"SearchResult",
    components:{
        TopNavigation, Corner,
        Choice, SourceCard,
        Footer,
    },
    data() {
        return {
            // TODO resultcount 需后端互动得到
            resultCount: 7021,
            currentFilter: "所有",              // 由用户选择需要什么类别的搜索结果
        }
    },
    methods:{
        closeAdvise(){
            document.getElementById("advise").style.display = 'none'
        },
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
    },
    computed:{
        getSearchContent(){
            return this.$store.state.searchContent;
        }
    },
    mouted(){
        // top(140px) + bottom(300px) = 440
        /*this.minHeight = document.documentElement.clientHeight - 440
        console.log(this.minHeight)
        var that = this
        window.onresize = function(){
            this.minHeight = document.documentElement.clientHeight - 440
        }*/
    },
}
</script>

<style scoped>
.body-style{
    position: absolute;
    width: 100%;
    z-index: 0;
    top: 140px;
}
.title-wrapper{
    position: relative;
    left: 3%;
    top: 15px;
    font-size: 30px;
}
.advise-wrapper{
    position: relative;
    width: 100%;
    height: 50px;
    background-color:rgb(210, 234, 255);
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
.button-wrapper{
    position: relative;
    left: 2.5%;
    top: 30px;
}
.card-wrapper {
    position: relative;
    left: 3%;
    top: 80px;
    width: 80%;
    margin-right: 18px;
}
.card-style{
    display: inline-block; 
    margin-right: 50px; 
    margin-bottom: 40px;
    text-align: center;
}
.elevator-wrapper{
    position: relative;
    margin-left: 30%;
    top: 80px;
}
.tag-style{
    cursor:pointer;
}
</style>

