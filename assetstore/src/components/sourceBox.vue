<template>
<div class="source-box-wrapper">
    <div class="source-box">
        <div class="upper" @click="goPage(`/resourceDetail/${source.id}`)">
            <div class="upper-head">
                <div v-if="source.images != null" ><img class="font-image" :src="concatImgUrl"></div>
                <div v-else class="font-image">{{source.name.charAt(0)}}</div>
                <div class="font-wrapper">
                    <a-tooltip placement="top">
                        <template slot="title">
                            <span>{{source.name}}</span>
                        </template>
                        <div class="font-title">{{getResource}}</div>
                    </a-tooltip>

                    <div class="font-switch">
                        <i-switch v-model="publicOrNot" size="large" @on-change="changeState()">
                            <span slot="open">公开</span>
                            <span slot="close">隐藏</span>
                        </i-switch>
                    </div>
                </div>
            </div>
            <div class="font-content">下载次数&emsp;&emsp;&emsp;关注人数</div>
            <div class="font-num">
                <div style="min-width: 30px; display: inline-block;">{{source.downloadCount||0}}</div>
                <div style="margin-left: 63px; display: inline-block;">{{source.starCount||0}}</div>
            </div>
        </div>
        <Row class="font-footer">
            <Col span="8" class="footer-col" @click.native="goPage(`/updateFile/${source.id}`)">
                <font-awesome-icon :icon="['fas','sync-alt']" class="foot-icon" />
            </Col>
            <Col span="8" class="footer-col" @click.native="goPage(`/editFile/${source.id}`)">
                <Divider type="vertical" class="foot-divider"/>
                <font-awesome-icon :icon="['fas','pencil-alt']" class="foot-icon"/>
            </Col>
            <Col span="8" class="footer-col" @click.native="deleteSource">
                <Divider type="vertical" class="foot-divider"/>
                <span class="foot-icon foot-icon-del">删除</span>
                <!-- <Dropdown trigger="click" :visible="moreVisible" @on-clickoutside="closeDrop()">
                    <Button href="javascropt:void(0)" class="foot-btn" @click.native="openDrop()">
                        <Icon size="25" type="md-more" class="foot-icon"/>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem @click.native="changeState" class="dropdown-text">{{state}}资源</DropdownItem>
                        <DropdownItem @click.native="deleteSource" class="dropdown-text-delete">删除</DropdownItem>
                    </DropdownMenu>
                </Dropdown> -->
            </Col>
        </Row>
    </div>
</div>
</template>
<script>
export default {
    name: "SourceBox",
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    computed:{
        getResource(){
            return this.source.name.length > 7 ? (this.source.name.slice(0,6)+'...'): this.source.name;
        },
        // 给人数x,xxx （每三位数分个逗号）
        getStars(){
            return this.source.starCount > 1000 ? (this.source.starCount).toString().slice(0,1)+','+ (this.source.starCount).toString().slice(1): this.source.starCount;
        },
        getDownloadCount(){
            return this.source.downloadCount > 1000 ? (this.source.downloadCount).toString().slice(0,1)+','+ (this.source.downloadCount).toString().slice(1): this.source.downloadCount;
        },
        publicOrNot(){
            if(this.source.state == 'public'){
                return false;
            }else{
                return true;
            }
        },
        concatImgUrl(){
            return `//192.168.94.238:3000/file/download/${this.source.images[0].id}?token=${this.$store.state.token}`
        },
    },
    data() {
        return {
            // default
            moreVisible: false,
            jumpOrNot: true,
        }
    },
    methods:{
        goPage(url){
            if(this.jumpOrNot){
                if(this.$route.path===url){
                    location.reload()
                }else{
                    this.$router.push(url)
                }
            }
            this.jumpOrNot = true
        },
        changeState(){
            this.jumpOrNot = false
            if(this.publicOrNot){
                this.$Modal.confirm({
                    title: '确认公开此条资源？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        axios.put(`/api/resource/${this.source.id}`,{'state':'public'},{emulateJSON:true}).then((res)=>{
                            setTimeout(() => {
                                this.$Modal.success({
                                    title: '资源已公开',
                                })
                                this.state = '公开'
                            }, 1000);
                        })
                    },
                    onCancel: () => {
                        this.publicOrNot = !this.publicOrNot
                    }
                });
                
            }
            else{
                this.$Modal.confirm({
                    title: '确认隐藏此条资源？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        axios.put(`/api/resource/${this.source.id}`,{'state':'private'},{emulateJSON:true}).then((res)=>{
                            setTimeout(() => {
                                this.$Modal.success({
                                    title: '资源已隐藏',
                                })
                                this.state = '隐藏'
                            }, 1000);
                        })
                    },
                    onCancel: () => {
                        this.publicOrNot = !this.publicOrNot
                    }
                });
            }
        },
        deleteSource(){
            this.$Modal.confirm({
                title: '确认删除此条资源？',
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                    let headers = {"Content-Type": "application/json; charset=utf-8"}
                    let data = {"id": this.source.id}
                    axios.delete(`/api/resource/${this.source.id}`,{headers, data}).then((res)=>{
                        if(res.data.code == 0){
                            setTimeout(() => {
                                this.$Modal.success({
                                    title: '资源已删除',
                                })
                                this.$emit('onDel',this.source.id)
                            }, 1000);
                        }
                    })
                },
            });
        },
        closeDrop(){
            console.log('close')
            this.moreVisible=false
        },
        openDrop(){
            console.log('open')
            this.moreVisible=true
        }
    }
}
</script>
<style scoped>
.source-box-wrapper{
    float: left;
    height:226px;
    width: 274px;
    margin-right: 30px;
    cursor: pointer;
}
.source-box{
    height: 196px; 
    width: 274px;
    margin-top: 30px;
    margin-right: 30px;
    border: solid 2px #eaeaea;
}
.upper{
    padding: 20px 18px 0px 18px;
    margin-bottom: 16.5px;
}
.upper-head{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.font-wrapper{
    display: flex;
    flex: 1;
    justify-content: inherit;
    margin-left: 8px;
}
.font-image{
    display: inline-block;
    color: #1ebf73;
    background-color: #e8f8f0;
    height: 44px;
    width: 44px;
    line-height: 44px;
    text-align: center;
}
.font-title{
    display: inline-block;
    position: relative;
    left: 10px;
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: bold; 
}
.font-switch{
    display: inline-block;
    position: relative;
    margin-left: 10px;
}
.font-content{
    position: relative;
    font-size: 14px;
    margin-left: 60px;
}
.font-num{
    position: relative;
    font-size: 18px;
    font-weight: bold;
    margin-left: 60px;
}

.font-footer{
    background-color: #eaeaea;  
    color: #7d7d7d;
    width: 270px;
    height: 56px;
    line-height: 56px;
    text-align: center;
}
.footer-col {
    /*border-right:2px solid #7d7d7d;*/
    cursor: pointer;
    color:#7d7d7d;
}
.footer-col1 {
    cursor: pointer;
}

.foot-icon:hover, .foot-icon1:hover, .footer-col:hover, .footer-col1:hover, .foot-icon-del:hover{
    color: #1ebf73;
}
.foot-icon-hover{
    color: #1ebf73;
}
.foot-icon-del{
    font-size: 15px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 1px;
}
.foot-divider{
    position:relative;
    float:left;
    top: 13px;
    width: 2px;
    height: 25px;
    color: #7d7d7d;
    margin: 0px;
}
.foot-btn{
    border-width: 0px;
    border-radius: 0px;
    width: 88px;
    height: 45px;
    text-align:center;
    line-height:45px;
    background-color: #eaeaea;
}

.dropdown-text, .dropdown-text-delete{
    font-size: 14px;
    font-weight: 600;
    color:#7f7f7f;
    text-align:center;
    line-height: 40px;
    cursor: pointer;
}
.dropdown-text:hover{
    color: #1ebf73;
}
.dropdown-text-delete:hover{
    color: #e81735;
}
</style>