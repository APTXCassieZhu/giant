<template>
    <div>
        <!--资源分类part-->
        <Dropdown placement="bottom-start" trigger="custom" :visible="typeVisible" @on-clickoutside="handleTypeClose()">
            <Button id="type" class="button-style" :class="{active: typeActiveButton}" href="javascript:void(0)" @click="handleTypeOpen()">
                <strong>资源分类<Icon type="md-arrow-dropdown" size="20"/></strong>
            </Button>
            <DropdownMenu slot="list" style="width:177px;" >
                <CheckboxGroup v-model="typeGroup" @on-change="checkAllTypeGroupChange">
                    <!--TODO 此处数字应与后端互动拿到-->
                    <DropdownItem><Checkbox label="动画" style="font-size:15px">动画 (987)</Checkbox></DropdownItem>
                    <DropdownItem><Checkbox label="角色" style="font-size:15px">角色 (876)</Checkbox></DropdownItem>
                    <DropdownItem><Checkbox label="环境" style="font-size:15px">环境 (765)</Checkbox></DropdownItem>
                    <DropdownItem><Checkbox label="道具" style="font-size:15px">道具 (665)</Checkbox></DropdownItem>
                    <DropdownItem><Checkbox label="植物" style="font-size:15px">植物 (890)</Checkbox></DropdownItem>
                    <DropdownItem><Checkbox label="交通工具" style="font-size:15px">交通工具 (1000)</Checkbox></DropdownItem>
                </CheckboxGroup>
                <Divider style="margin:0"/>
                <DropdownItem><Checkbox
                    :indeterminate="typeNotFull"
                    :value="checkTypeAll"
                    @click.prevent.native="handleCheckTypeAll()">全选</Checkbox>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <span>&emsp;&emsp;&emsp;</span>
        <!--资源类别-->
        <Dropdown placement="bottom-start" trigger="custom" :visible="toolVisible" @on-clickoutside="handleToolClose()">
            <Button id="tool" class="button-style" :class="{active: toolActiveButton}" href="javascript:void(0)" @click="handleToolOpen()">
                <strong>资源类别<Icon type="md-arrow-dropdown" size="20"/></strong>
            </Button>
            <DropdownMenu slot="list" style="width:177px;" >
                <CheckboxGroup v-model="toolGroup" @on-change="checkAllToolGroupChange">
                    <!--TODO 此处数字应与后端互动拿到-->
                    <DropdownItem><Checkbox label="S级别" style="font-size:15px">S级别</Checkbox></DropdownItem>
                    <DropdownItem><Checkbox label="A级别" style="font-size:15px">A级别</Checkbox></DropdownItem>
                    <DropdownItem><Checkbox label="B级别" style="font-size:15px">B级别</Checkbox></DropdownItem>
                </CheckboxGroup>
                <Divider style="margin:0"/>
                <DropdownItem><Checkbox
                    :indeterminate="toolNotFull"
                    :value="checkToolAll"
                    @click.prevent.native="handleCheckToolAll()">全选</Checkbox>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <span>&emsp;&emsp;&emsp;</span> 
        <!--资源风格 part-->
        <Dropdown placement="bottom-start" trigger="custom" :visible="styleVisible" @on-clickoutside="handleStyleClose()">
            <Button id="style" class="button-style" :class="{active: styleActiveButton}" href="javascript:void(0)" @click="handleStyleOpen()">
                <strong>资源风格<Icon type="md-arrow-dropdown" size="20"/></strong>
            </Button>
            <DropdownMenu slot="list" style="width:177px;" >
                <CheckboxGroup v-model="styleGroup" @on-change="checkAllStyleGroupChange">
                    <!--TODO 此处数字应与后端互动拿到-->
                    <DropdownItem><Checkbox label="小清新" style="font-size:15px">小清新</Checkbox></DropdownItem>
                    <DropdownItem><Checkbox label="慵懒" style="font-size:15px">慵懒</Checkbox></DropdownItem>
                    <DropdownItem><Checkbox label="狂野" style="font-size:15px">狂野</Checkbox></DropdownItem>
                </CheckboxGroup>
                <Divider style="margin:0"/>
                <DropdownItem><Checkbox
                    :indeterminate="styleNotFull"
                    :value="checkStyleAll"
                    @click.prevent.native="handleCheckStyleAll()">全选</Checkbox>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <span>&emsp;&emsp;&emsp;</span> 
        <!--项目 part-->
        <Dropdown placement="bottom-start" trigger="custom" :visible="programVisible" @on-clickoutside="handleProgramClose()">
            <Button id="program" class="button-style" :class="{active: programActiveButton}" href="javascript:void(0)" @click="handleProgramOpen()">
                <strong>项目<Icon type="md-arrow-dropdown" size="20"/></strong>
            </Button>
            <DropdownMenu slot="list" style="width:177px;" >
                <CheckboxGroup v-model="programGroup" @on-change="checkAllProgramGroupChange">
                    <!--TODO 此处数字应与后端互动拿到-->
                    <DropdownItem><Checkbox label="征途" style="font-size:15px">征途</Checkbox></DropdownItem>
                    <DropdownItem><Checkbox label="球球大作战" style="font-size:15px">球球大作战</Checkbox></DropdownItem>
                    <DropdownItem><Checkbox label="月圆之夜" style="font-size:15px">月圆之夜</Checkbox></DropdownItem>
                    <DropdownItem><Checkbox label="犬夜叉" style="font-size:15px">犬夜叉</Checkbox></DropdownItem>
                </CheckboxGroup>
                <Divider style="margin:0"/>
                <DropdownItem><Checkbox
                    :indeterminate="programNotFull"
                    :value="checkProgramAll"
                    @click.prevent.native="handleCheckProgramAll()">全选</Checkbox>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <span>&emsp;&emsp;&emsp;</span> 
        <!--引擎engine part-->
        <Dropdown placement="bottom-start" trigger="custom" :visible="engineVisible" @on-clickoutside="handleEngineClose()">
            <Button id="engine" class="button-style" style="width:96px;" :class="{active: engineActiveButton}" href="javascript:void(0)" @click="handleEngineOpen()">
                <strong>引擎<Icon type="md-arrow-dropdown" size="20"/></strong>
            </Button>
            <DropdownMenu slot="list" style="width:200px;" >
                <CheckboxGroup v-model="engineGroup" @on-change="checkAllEngineGroupChange">
                    <!--TODO 此处数字应与后端互动拿到-->
                    <DropdownItem><Checkbox label="Unity" style="font-size:15px">Unity</Checkbox></DropdownItem>
                    <DropdownItem><Checkbox label="Unreal" style="font-size:15px">Unreal</Checkbox></DropdownItem>
                    <DropdownItem><Checkbox label="Cocos" style="font-size:15px">Cocos</Checkbox></DropdownItem>
                </CheckboxGroup>
                <Divider style="margin:0"/>
                <DropdownItem><Checkbox
                    :indeterminate="engineNotFull"
                    :value="checkEngineAll"
                    @click.prevent.native="handleCheckEngineAll()">全选</Checkbox>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <span>&emsp;&emsp;&emsp;</span>
        <InputTag :data="taglist" :width="num" :color="yourColor" tabindex="1" @keyup.native.enter="calculateSelfTag()"></InputTag> 
        <br>
        <div style="display: inline; height: 22px;">
            <Tag v-for="(item, index) in tagTotal" closable 
                color="#1ebf73" 
                :style="{'max-width':'250px', 'min-width':'1px'}"
                :key="index"
                @on-close="close(index)">{{item}}</Tag>
        </div>   
    </div>
</template>

<script>
import InputTag from "../components/inputTag.vue"
export default {
    name:"Choice",
    components: {InputTag},
    props: {
        result: {
            type: Array,
            require: true
        },
    },
    data() {
        return {
            yourColor: "#1ebf73",
            taglist: [],       // 用于接收子组件的prop值     
            tagTotal: [],                // 由用户输入用来自定义标签已筛选搜索结果
            num: 500,                   // input width
           
            typeVisible: false,
            typeNotFull: true,
            checkTypeAll: false,
            typeGroup:[],        
            toolVisible: false,
            toolNotFull: true,
            checkToolAll: false,
            toolGroup:[],
            styleVisible: false,
            styleNotFull: true,
            checkStyleAll: false,
            styleGroup:[], 
            programVisible: false,
            programNotFull: true,
            checkProgramAll: false,
            programGroup:[],         
            engineVisible: false,
            engineNotFull: true,
            checkEngineAll: false,
            engineGroup:[],        
            typeActiveButton: false, 
            toolActiveButton: false, 
            styleActiveButton: false,
            programActiveButton: false,
            engineActiveButton: false,
        }
    },
    methods:{
        /* 把用户自定义的tag也加入 tagtotal */
        calculateSelfTag(){
            console.log("self enter "+this.taglist)
            for(var i=0; i<this.taglist.length; i++){
                if(this.tagTotal.indexOf(this.taglist[i]) == -1){
                    this.tagTotal.push(this.taglist[i])
                }
            }
        },
        /* 关闭button下方的tag，重新筛选搜索结果 */
        close(index){
            /* for loop 是为了取消checkbox的勾选 */
            for(var i=0; i<this.typeGroup.length; i++){
                if(this.typeGroup[i] == this.tagTotal[index]){
                    this.typeGroup.splice(i, 1)
                    console.log("stop")
                    this.$options.methods.checkAllTypeGroupChange.bind(this)(this.typeGroup);
                    break 
                }
                console.log("repeat")
            }
            for(var i=0; i<this.toolGroup.length; i++){
                if(this.toolGroup[i] == this.tagTotal[index]){
                    this.toolGroup.splice(i, 1)
                    this.$options.methods.checkAllToolGroupChange.bind(this)(this.toolGroup);
                    break
                }
            }
            for(var i=0; i<this.styleGroup.length; i++){
                if(this.styleGroup[i] == this.tagTotal[index]){
                    this.styleGroup.splice(i, 1)
                    this.$options.methods.checkAllStyleGroupChange.bind(this)(this.styleGroup);
                    break 
                }
            }
            for(var i=0; i<this.programGroup.length; i++){
                if(this.programGroup[i] == this.tagTotal[index]){
                    this.programGroup.splice(i, 1)
                    this.$options.methods.checkAllProgramGroupChange.bind(this)(this.programGroup);
                    break 
                }
            }
            for(var i=0; i<this.engineGroup.length; i++){
                if(this.engineGroup[i] == this.tagTotal[index]){
                    this.engineGroup.splice(i, 1)
                    this.$options.methods.checkAllEngineGroupChange.bind(this)(this.engineGroup);
                    break 
                }
            }
            /* for loop 为了删去自定义标签 */
            for(var i=0; i<this.taglist.length; i++){
                if(this.taglist[i] == this.tagTotal[index]){
                    this.taglist.splice(i, 1)
                    break 
                }
            }
            this.tagTotal.splice(index, 1)
            // TODO 重新筛选
        },
        /* handleXXXOpen 和 handleXXXClose 是为了下拉栏能够在更合适的时间关闭 */
        handleTypeOpen () {
            this.typeVisible = true;
        },
        handleTypeClose () {
            this.typeVisible = false;
            this.tagTotal = this.typeGroup.concat(this.toolGroup, this.styleGroup, 
            this.programGroup, this.engineGroup, this.taglist)
        },
        handleToolOpen () {
            this.toolVisible = true;
            },
        handleToolClose () {
            this.toolVisible = false;
            this.tagTotal = this.typeGroup.concat(this.toolGroup, this.styleGroup, 
            this.programGroup, this.engineGroup, this.taglist)
        },
        handleStyleOpen () {
            this.styleVisible = true;
            },
        handleStyleClose () {
            this.styleVisible = false;
            this.tagTotal = this.typeGroup.concat(this.toolGroup, this.styleGroup, 
            this.programGroup, this.engineGroup, this.taglist)        },
        handleProgramOpen () {
            this.programVisible = true;
        },
        handleProgramClose () {
            this.programVisible = false;
            this.tagTotal = this.typeGroup.concat(this.toolGroup, this.styleGroup, 
            this.programGroup, this.engineGroup, this.taglist)
        },
        handleEngineOpen () {
            this.engineVisible = true;
        },
        handleEngineClose () {
            this.engineVisible = false;
            for(var i=0; i<this.engineGroup.length; i++){
                if(this.tagTotal.indexOf(this.engineGroup[i]) == -1){
                    this.tagTotal.push(this.engineGroup[i])
                }
            }
        },
        /* handleCheckXXXXAll 和 checkAllXXXXGroupChange是为了用户能够更快速全选或取消全选 */
        handleCheckTypeAll () {
            if (this.typeNotFull) {
                this.checkTypeAll = false;
            } else {
                this.checkTypeAll = !this.checkTypeAll;
            }
            this.typeNotFull = false;

            if (this.checkTypeAll) {
                this.typeActiveButton = true;
                this.typeGroup = ['动画', '角色', '环境', '道具', '植物', '交通工具'];
            } else {
                this.typeActiveButton = false;
                this.typeGroup = [];
            }
        },
        checkAllTypeGroupChange (data) {
            console.log(data);
            if (data.length === 6) {
                this.typeNotFull = false;
                this.checkTypeAll = true;
            } else if (data.length > 0) {
                this.typeNotFull = true;
                this.checkTypeAll = false;
                /* 子件里面有一个选中则当前父button高亮 */
                this.typeActiveButton = true;
            } else {
                this.typeNotFull = false;
                this.checkTypeAll = false;
                /* 子件里面没有一个选中则当前父button不高亮 */
                console.log("取消高亮")
                this.typeActiveButton = false;
            }
        },
        handleCheckToolAll () {
            if (this.toolNotFull) {
                this.checkToolAll = false;
            } else {
                this.checkToolAll = !this.checkToolAll;
            }
            this.toolNotFull = false;

            if (this.checkToolAll) {
                this.toolActiveButton = true;
                // TODO []填上所有研发工具
                this.toolGroup = ['S级别', 'A级别', 'B级别'];
            } else {
                this.toolActiveButton = false;
                this.toolGroup = [];
            }
        },
        checkAllToolGroupChange (data) {
            console.log(data);
            // TODO 6 改成 研发工具的种类总数
            if (data.length === 6) {
                this.toolNotFull = false;
                this.checkToolAll = true;
            } else if (data.length > 0) {
                this.toolNotFull = true;
                this.checkToolAll = false;
                /* 子件里面有一个选中则当前父button高亮 */
                this.toolActiveButton = true;
            } else {
                this.toolNotFull = false;
                this.checkToolAll = false;
                /* 子件里面没有一个选中则当前父button不高亮 */
                this.toolActiveButton = false;
            }
        },
        handleCheckStyleAll () {
            if (this.styleNotFull) {
                this.checkStyleAll = false;
            } else {
                this.checkStyleAll = !this.checkStyleAll;
            }
            this.styleNotFull = false;

            if (this.checkStyleAll) {
                this.styleActiveButton = true;
                // TODO []填上所有研发工具
                this.styleGroup = ['小清新', '狂野', '慵懒'];
            } else {
                this.styleActiveButton = false;
                this.styleGroup = [];
            }
        },
        checkAllStyleGroupChange (data) {
            console.log(data);
            // TODO 6 改成 style的种类总数
            if (data.length === 6) {
                this.styleNotFull = false;
                this.checkStyleAll = true;
            } else if (data.length > 0) {
                this.styleNotFull = true;
                this.checkStyleAll = false;
                /* 子件里面有一个选中则当前父button高亮 */
                this.styleActiveButton = true;
            } else {
                this.styleNotFull = false;
                this.checkStyleAll = false;
                /* 子件里面没有一个选中则当前父button不高亮 */
                this.styleActiveButton = false;
            }
        },
        handleCheckProgramAll () {
            if (this.programNotFull) {
                this.checkProgramAll = false;
            } else {
                this.checkProgramAll = !this.checkProgramAll;
            }
            this.programNotFull = false;

            if (this.checkProgramAll) {
                this.programActiveButton = true;
                // TODO []填上所有研发工具
                this.programGroup = ['征途', '球球大作战', '月圆之夜', '犬夜叉'];
            } else {
                this.programActiveButton = false;
                this.programGroup = [];
            }
        },
        checkAllProgramGroupChange (data) {
            console.log(data);
            // TODO 6 改成 style的种类总数
            if (data.length === 6) {
                this.programNotFull = false;
                this.checkProgramAll = true;
            } else if (data.length > 0) {
                this.programNotFull = true;
                this.checkProgramAll = false;
                /* 子件里面有一个选中则当前父button高亮 */
                this.programActiveButton = true;
            } else {
                this.programNotFull = false;
                this.checkProgramAll = false;
                /* 子件里面没有一个选中则当前父button不高亮 */
                this.programActiveButton = false;
            }
        },
        handleCheckEngineAll () {
            if (this.engineNotFull) {
                this.checkEngineAll = false;
            } else {
                this.checkEngineAll = !this.checkEngineAll;
            }
            this.engineNotFull = false;

            if (this.checkEngineAll) {
                this.engineActiveButton = true;
                this.engineGroup = ['Unity', 'Unreal', 'Cocos'];
            } else {
                this.engineActiveButton = false;
                this.engineGroup = [];
            }
        },
        checkAllEngineGroupChange (data) {
            console.log(data);
            if (data.length === 3) {
                this.engineNotFull = false;
                this.checkEngineAll = true;
            } else if (data.length > 0) {
                this.engineNotFull = true;
                this.checkEngineAll = false;
                /* 子件里面有一个选中则当前父button高亮 */
                this.engineActiveButton = true;
            } else {
                this.engineNotFull = false;
                this.checkEngineAll = false;
                /* 子件里面没有一个选中则当前父button不高亮 */
                this.engineActiveButton = false;
            }
        },
    },
}
</script>
<style scoped>
.button-style{
    width: 177px; 
    height: 45px;
    font-size: 15px;
    font-family: MicrosoftYaHei;
}
.container{
    margin: 10px;
    width: 336px;
}
.tag-container{
    border-bottom: 2px solid #ccc;
    padding: 0px 0px 0px 0px;
    display: flex;
    align-items: center;
}
.tag{
    padding: 10px;
    display: flex;
}
.tag-container:hover{
    border-bottom: 2px solid #1ebf73;
}
.tag-input{
    flex:1;
    padding:5px;
    outline: none;
    border: 0;
}
.tag-container input{
    flex:1;
    padding: 5px;
    outline: none;
    border: 0;
    font-size: 14px;
    font-weight: 600;
}
</style>