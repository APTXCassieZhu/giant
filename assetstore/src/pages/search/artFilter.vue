<template>
    <div>
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        <div class="body-style" :style="{minHeight:minHeight + 'px'}">
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
                <Dropdown placement="bottom-start" trigger="custom" :visible="threeDVisible" @on-clickoutside="handle3DClose()">
                    <Button id="3D" style="width: 200px; font-size: 15px" href="javascript:void(0)" @click="handle3DOpen()"><strong>3D<Icon type="md-arrow-dropdown" size="20"/></strong></Button>
                    <DropdownMenu slot="list" style="width:200px;" >
                        <CheckboxGroup v-model="threeDGroup" @on-change="checkAll3DGroupChange">
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
                            :indeterminate="threeDNotFull"
                            :value="check3DAll"
                            @click.prevent.native="handleCheck3DAll()">全选</Checkbox>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <span>&emsp;&emsp;&emsp;</span>
                <Dropdown placement="bottom-start" trigger="custom" :visible="twoDVisible" @on-clickoutside="handle2DClose()">
                    <Button id="2D" style="width: 200px; font-size: 15px" href="javascript:void(0)" @click="handle2DOpen()"><strong>2D<Icon type="md-arrow-dropdown" size="20"/></strong></Button>
                    <DropdownMenu slot="list" style="width:200px;" >
                        <CheckboxGroup v-model="twoDGroup" @on-change="checkAll2DGroupChange">
                            <!--TO DO 此处数字应与后端互动拿到-->
                            <DropdownItem><Checkbox label="???" style="font-size:15px">????</Checkbox></DropdownItem>
                        </CheckboxGroup>
                        <Divider style="margin:0"/>
                        <DropdownItem><Checkbox
                            :indeterminate="twoDNotFull"
                            :value="check2DAll"
                            @click.prevent.native="handleCheck2DAll()">全选</Checkbox>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <span>&emsp;&emsp;&emsp;</span>
            </div>
            <div class="card-wrapper">
                <ul>
                    <span style="color: blue;">{{resultCount}}</span>条搜索结果
                    <span style="float: right; margin-right: 60px;">默认排序</span>
                </ul>
                <source-card style="display: inline-block; margin-right: 30px; margin-bottom: 30px;"></source-card>
                <source-card v-for="n in 23" :key="n" style="display: inline-block; margin-right: 30px; margin-bottom: 30px;"></source-card>
            </div>
            <div class="elevator-wrapper">
                <Page :total="100" show-elevator />
            </div>
        </div>
        <Footer style="position:relative; height: 200px; bottom: 0px;"></Footer>
    </div>
</template>

<script>
import TopNavigation from '../../components/TopNav.vue'
import SourceCard from '../../components/sourceCard.vue'
import Footer from '../../components/footer.vue'
export default {
    name:"ArtFilter",
    components:{
        TopNavigation,
        SourceCard,
        Footer,
    },
    data() {
        return {
            resultCount: 7021,
            threeDVisible: false,
            threeDNotFull: true,
            check3DAll: false,
            threeDGroup:[],
            twoDVisible: false,
            twoDNotFull: true,
            check2DAll: false,
            twoDGroup:[],        
        }
    },
    mounted(){
        // top(140px) + bottom(200px) = 340
        this.minHeight = document.documentElement.clientHeight - 340
        var that = this
        window.onresize = function(){
            this.minHeight = document.documentElement.clientHeight - 340
        }
    },
    methods:{
        handle3DOpen () {
            this.threeDVisible = true;
            },
        handle3DClose () {
            this.threeDVisible = false;
        },
        handle2DOpen () {
            this.twoDVisible = true;
            },
        handle2DClose () {
            this.twoDVisible = false;
        },
        handleCheck3DAll () {
            if (this.threeDNotFull) {
                this.check3DAll = false;
            } else {
                this.check3DAll = !this.check3DAll;
            }
            this.threeDNotFull = false;

            if (this.check3DAll) {
                this.threeDGroup = ['动画', '角色', '环境', '道具', '植物', '交通工具'];
            } else {
                this.threeDGroup = [];
            }
        },
        checkAll3DGroupChange (data) {
            console.log(data);
            if (data.length === 6) {
                this.threeDNotFull = false;
                this.check3DAll = true;
            } else if (data.length > 0) {
                this.threeDNotFull = true;
                this.check3DAll = false;
                // 子件里面有一个选中则当前父button高亮
                console.log("高亮")
                document.getElementById("3D").style.active;
            } else {
                this.threeDNotFull = false;
                this.check3DAll = false;
                // 子件里面没有一个选中则当前父button不高亮 
                 console.log("取消高亮")
                document.getElementById("3D").style.active = false;
            }
        },
        handleCheck2DAll () {
            if (this.twoDNotFull) {
                this.check2DAll = false;
            } else {
                this.check2DAll = !this.check2DAll;
            }
            this.twoDNotFull = false;

            if (this.check2DAll) {
                this.twoDGroup = ['????'];
            } else {
                this.twoDGroup = [];
            }
        },
        checkAll2DGroupChange (data) {
            console.log(data);
            // TO DO data.length
            if (data.length === 1) {
                this.twoDNotFull = false;
                this.check2DAll = true;
            } else if (data.length > 0) {
                this.twoDNotFull = true;
                this.check2DAll = false;
                // 子件里面有一个选中则当前父button高亮
                console.log("高亮")
                document.getElementById("2D").style.active;
            } else {
                this.twoDNotFull = false;
                this.check2DAll = false;
                // 子件里面没有一个选中则当前父button不高亮 
                 console.log("取消高亮")
                document.getElementById("2D").style.active = false;
            }
        },
    }
}
</script>

<style scoped>
.body-style{
    position: relative;
    width: 100%;
    z-index: 0;
    /*top: 140px;*/
}
.title-wrapper{
    position: relative;
    left:3%;
    top: 30px;
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

.bread-container {
    position: relative;
    left:2.5%;
    top:20px;
    padding: 10px;
}

.button-wrapper{
    position: relative;
    left: 2.5%;
    top: 45px;
}

.card-wrapper {
    position: relative;
    left: 2.5%;
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

