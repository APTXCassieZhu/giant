<template>
    <div>
        <!--美术资源art-->
        <Dropdown placement="bottom-start" trigger="custom" :visible="artVisible" @on-clickoutside="handleArtClose()">
            <Button id="art" class="button-style" href="javascript:void(0)" @click="handleArtOpen()">
                <strong>美术资源<Icon type="md-arrow-dropdown" size="20"/></strong>
            </Button>
            <DropdownMenu slot="list" style="width:200px;" >
                <CheckboxGroup v-model="artGroup" @on-change="checkAllArtGroupChange">
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
                    :indeterminate="artNotFull"
                    :value="checkArtAll"
                    @click.prevent.native="handleCheckArtAll()">全选</Checkbox>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <span>&emsp;&emsp;&emsp;</span>
        <!--研发工具-->
        <Dropdown placement="bottom-start" trigger="custom" :visible="toolVisible" @on-clickoutside="handleToolClose()">
            <Button id="tool" class="button-style" href="javascript:void(0)" @click="handleToolOpen()">
                <strong>研发工具<Icon type="md-arrow-dropdown" size="20"/></strong>
            </Button>
            <DropdownMenu slot="list" style="width:200px;" >
                <CheckboxGroup v-model="toolGroup" @on-change="checkAllToolGroupChange">
                    <!--TODO 此处数字应与后端互动拿到-->
                    <DropdownItem><Checkbox label="???" style="font-size:15px">???</Checkbox></DropdownItem>
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
        <!--引擎engine-->
        <Dropdown placement="bottom-start" trigger="custom" :visible="engineVisible" @on-clickoutside="handleEngineClose()">
            <Button id="engine" class="button-style" href="javascript:void(0)" @click="handleEngineOpen()">
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
    </div>
</template>

<script>
export default {
    name:"Choice",
    data() {
        return {
            artVisible: false,
            artNotFull: true,
            checkArtAll: false,
            artGroup:[],        // 存放用户选取的美术资源筛选
            toolVisible: false,
            toolNotFull: true,
            checkToolAll: false,
            toolGroup:[],        // 存放用户选取的研发工具筛选
            engineVisible: false,
            engineNotFull: true,
            checkEngineAll: false,
            engineGroup:[],        // 存放用户选取的引擎筛选   
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
        handleToolOpen () {
            this.toolVisible = true;
            },
        handleToolClose () {
            this.toolVisible = false;
        },
        handleEngineOpen () {
            this.engineVisible = true;
            },
        handleEngineClose () {
            this.engineVisible = false;
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
            console.log(data);
            if (data.length === 6) {
                this.artNotFull = false;
                this.checkArtAll = true;
            } else if (data.length > 0) {
                this.artNotFull = true;
                this.checkArtAll = false;
                // 子件里面有一个选中则当前父button高亮
                console.log("高亮")
                document.getElementById("art").style.active;
            } else {
                this.artNotFull = false;
                this.checkArtAll = false;
                // 子件里面没有一个选中则当前父button不高亮 
                 console.log("取消高亮")
                document.getElementById("art").style.active = false;
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
                // TODO []填上所有研发工具
                this.toolGroup = [];
            } else {
                this.toolGroup = [];
            }
        },
        checkAllToolGroupChange (data) {
            // data is undefined ???????????????
            console.log(data);
            // TODO 6 改成 研发工具的种类总数
            if (data.length === 6) {
                this.toolNotFull = false;
                this.checkToolAll = true;
            } else if (data.length > 0) {
                this.toolNotFull = true;
                this.checkToolAll = false;
                // 子件里面有一个选中则当前父button高亮
                document.getElementById("tool").style.active = true;
            } else {
                this.toolNotFull = false;
                this.checkToolAll = false;
                // 子件里面没有一个选中则当前父button不高亮 
                document.getElementById("tool").style.active = false;
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
                this.engineGroup = ['Unity', 'Unreal', 'Cocos'];
            } else {
                this.engineGroup = [];
            }
        },
        checkAllEngineGroupChange (data) {
            // data is undefined ???????????????
            console.log(data);
            if (data.length === 3) {
                this.engineNotFull = false;
                this.checkEngineAll = true;
            } else if (data.length > 0) {
                this.engineNotFull = true;
                this.checkEngineAll = false;
                // 子件里面有一个选中则当前父button高亮
                document.getElementById("engine").style.active = true;
            } else {
                this.engineNotFull = false;
                this.checkEngineAll = false;
                // 子件里面没有一个选中则当前父button不高亮 
                document.getElementById("engine").style.active = false;
            }
        },
    },
}
</script>
<style scoped>
.button-style{
    width: 200px; 
    font-size: 15px;
}
</style>