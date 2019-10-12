<template>
    <div>
        <TopNavigation style="z-index: 100"></TopNavigation>
        <div class="body-style">
            <div id='advise' class="advise-wrapper">
                <div class="advise-container">
                    <span>&emsp;推荐搜索&emsp;</span>
                    <!--TODO 推荐搜索按照用户输入的搜索而得出的相关搜索-->
                    <Tag color="purple">推荐搜索1</Tag>
                    <span>&emsp;</span>
                    <Tag color="purple">推荐搜索2</Tag>
                    <span>&emsp;</span> 
                    <Tag color="purple">推荐搜索3</Tag>
                    <span>&emsp;</span> 
                    <Tag color="purple">推荐搜索4</Tag>
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
                    <span style="color: blue;">{{resultCount}}</span>条搜索结果
                    <div style="float: right; margin-right: 60px;">
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
import TopNavigation from '../../components/TopNav.vue'
import SourceCard from '../../components/sourceCard.vue'
import Footer from '../../components/footer.vue'
import Choice from '../../components/choice.vue'
import Corner from '../../components/corner.vue'
export default {
    name:"ArtShow",
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
        }
    },
    mounted(){
        
    },
    methods:{
        closeAdvise(){
            document.getElementById("advise").style.display = 'none'
        }
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
</style>

