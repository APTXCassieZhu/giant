<template>
    <div>
        <TopNavigation style="z-index: 100"></TopNavigation>
        <div class="body-style">
            <div class="advise-wrapper">
                <div class="advise-container">
                    <span>&emsp;推荐搜索&emsp;</span>
                    <!--TO DO 推荐搜索按照用户输入的搜索而得出的相关搜索-->
                    <Tag color="purple">推荐搜索1</Tag>
                    <span>&emsp;</span>
                    <Tag color="purple">推荐搜索2</Tag>
                    <span>&emsp;</span>  
                    <Tag color="purple">推荐搜索3</Tag>
                    <span>&emsp;</span> 
                    <Tag color="purple">推荐搜索4</Tag>
                    <span>&emsp;</span> 
                </div>
            </div>
            <div class="title-wrapper">
                <strong>"{{getSearchContent}}"在
                    <Dropdown>
                        // TO DO
                        <a>美术类资源</a>

                    </Dropdown>
                    下的搜索结果</strong>
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
                <source-card v-for="n in 18" :key="n" style="display: inline-block; margin-right: 50px; margin-bottom: 40px;"></source-card>
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
            resultCount: 7021,
        }
    },
    methods:{
    },
    computed:{
        getSearchContent(){
            return this.$store.state.searchContent;
        }
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
}
.advise-container {
    position: relative;
    left:2.5%;
    top:15px;
    height: 20px;
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
    width: 92%;
    margin-right: 18px;
}

.elevator-wrapper{
    position: relative;
    margin-left: 30%;
    top: 80px;
}
</style>

