<template>
    <div>
        <TopNavigation></TopNavigation>
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
            <strong>"{{getSearchContent}}"的搜索结果</strong>
        </div>
        <div class="button-wrapper">
            <Dropdown placement="bottom-start" trigger="custom" :visible="artVisible" @on-clickoutside="handleArtClose()">
                <Button id="art" style="width: 200px; font-size: 15px;" href="javascript:void(0)" @click="handleArtOpen()"><strong>美术资源<Icon type="md-arrow-dropdown" size="20"/></strong></Button>
                <DropdownMenu slot="list" style="width:200px;" >
                    <CheckboxGroup v-model="artGroup" @on-change="checkAllArtGroupChange()">
                        <!--TO DO 此处数字应与后端互动拿到-->
                        <DropdownItem><Checkbox label="动画" style="font-size:15px">动画 (987)</Checkbox></DropdownItem>
                        <DropdownItem><Checkbox label="角色" style="font-size:15px">角色 (876)</Checkbox></DropdownItem>
                        <DropdownItem><Checkbox label="环境" style="font-size:15px">环境 (765)</Checkbox></DropdownItem>
                        <DropdownItem><Checkbox label="道具" style="font-size:15px">道具 (665)</Checkbox></DropdownItem>
                        <DropdownItem><Checkbox label="植物" style="font-size:15px">植物 (890)</Checkbox></DropdownItem>
                        <DropdownItem><Checkbox label="交通工具" style="font-size:15px">交通工具 (1000)</Checkbox></DropdownItem>
                    </CheckboxGroup>
                    <Divider style="margin:0"/>
                    <DropdownItem><Checkbox
                        :indeterminate="artNotFull"
                        :value="checkArtAll"
                        @click.prevent.native="handleCheckArtAll()">全选</Checkbox>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <span>&emsp;&emsp;&emsp;</span>
            <Button style="width: 200px; font-size: 15px;"><strong>研发工具<Icon type="md-arrow-dropdown" size="20"/></strong></Button>
            <span>&emsp;&emsp;&emsp;</span>
            <Button style="width: 200px; font-size: 15px;"><strong>引擎<Icon type="md-arrow-dropdown" size="20"/></strong></Button>
        </div>
    </div>
</template>

<script>
import TopNavigation from '../../components/TopNav.vue'
export default {
    name:"SearchResult",
    components:{
        TopNavigation,
    },
    data() {
        return {
            artVisible: false,
            artNotFull: true,
            checkArtAll: false,
            artGroup:[],        // 存放用户选取的美术资源筛选
        }
    },
    methods:{
        // handleXXXOpen 和 handleXXXClose 是为了下拉栏能够在更合适的时间关闭
        handleArtOpen () {
            this.artVisible = true;
            },
        handleArtClose () {
            this.artVisible = false;
        },
        // handleCheckArtAll 和 checkAllArtGroupChange是为了用户能够更快速全选或取消全选
        handleCheckArtAll () {
            if (this.artNotFull) {
                this.checkArtAll = false;
            } else {
                this.checkArtAll = !this.checkArtAll;
            }
            this.artNotFull = false;

            if (this.checkArtAll) {
                this.artGroup = ['动画', '角色', '环境', '道具', '植物', '交通工具'];
            } else {
                this.artGroup = [];
            }
        },
        checkAllArtGroupChange (data) {
            if (data.length === 6) {
                this.artNotFull = false;
                this.checkArtAll = true;
            } else if (data.length > 0) {
                this.artNotFull = true;
                this.checkArtAll = false;
                document.getElementById("art").style.active = true;
            } else {
                this.artNotFull = false;
                this.checkArtAll = false;
                document.getElementById("art").style.active = false;
            }
        }
    },
    computed:{
        getSearchContent(){
            return this.$store.state.searchContent;
        }
    },
}
</script>

<style scoped>
.title-wrapper{
    position: relative;
    left:3%;
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
</style>

