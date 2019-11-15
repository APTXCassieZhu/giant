<template>
<div class="source-box-wrapper" v-if="!deleteOrNot">
    <div class="source-box">
        <div class="upper">
            <div class="font-image">{{source.charAt(0)}}</div>
            <a-tooltip placement="top">
                <template slot="title">
                    <span>{{source}}</span>
                </template>
                <div class="font-title">{{getResource}}</div>
            </a-tooltip>
            
            <div class="font-switch">
                <i-switch v-model="publicOrNot" size="large" @on-change="changeState()">
                    <span slot="open">公开</span>
                    <span slot="close">隐藏</span>
                </i-switch>
            </div>
            <div class="font-content">下载次数&emsp;&emsp;&emsp;关注人数</div>
            <div class="font-num">{{downloadCount}}<span style="margin-left: 63px;">2,019</span></div>
        </div>
        <Row class="font-footer">
            <Col span="8" class="footer-col">
                <font-awesome-icon :icon="['fas','sync-alt']" class="foot-icon" />
            </Col>
            <Col span="8" class="footer-col">
                <Divider type="vertical" class="foot-divider"/>
                <font-awesome-icon :icon="['fas','pencil-alt']" class="foot-icon" />
            </Col>
            <Col span="8" class="footer-col1">
                <Divider type="vertical" class="foot-divider"/>
                <span class="foot-icon foot-icon-del" @click="deleteSource">删除</span>
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
        sourceName: {
            type: String,
        },
    },
    computed:{
        getResource(){
            return this.source.length > 7 ? (this.source.slice(0,6)+'...'): this.source;
        }
    },
    data() {
        return {
            // TODO data里面的数据均需从后端拿到
            source: this.sourceName,        //'啦啦啦啦',
            rate: 3.5,
            downloadCount: 233,
            likeCount: 2019,
            favoriteIcon: false,            // defalut favourite is false
            sourceID: 0,                    // TODO从后端得到
            publicOrNot: false,             // 默认隐藏
            // default
            moreVisible: false,
            deleteOrNot: false,
        }
    },
    methods:{
        cancelFavorite(){
            //TODO add user favourite to favorite list so that they can check in personal
            console.log('favorite')
            this.favoriteIcon = !this.favoriteIcon
            /* 提示用户已关注 */
            if(this.favoriteIcon){
                this.$Message.success('已关注')
                this.$store.commit('ADD_FAVORITE', this.sourceID);
            }else{
                this.$Message.success('已取消关注')
                this.$store.commit('REMOVE_FAVORITE', this.sourceID);
            }  
        },
        changeState(){
            if(this.publicOrNot){
                this.$Modal.confirm({
                    title: '确认公开此条资源？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        setTimeout(() => {
                            this.$Modal.success({
                                title: '资源已公开',
                            })
                            this.state = '公开'
                            // TODO 告诉后端这个资源已公开
                        }, 1000);
                    },
                });
                
            }
            else{
                this.$Modal.confirm({
                    title: '确认隐藏此条资源？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        setTimeout(() => {
                            this.$Modal.success({
                                title: '资源已隐藏',
                            })
                            this.state = '隐藏'
                            // TODO 告诉后端这个资源已隐藏
                        }, 1000);
                    },
                });
            }
        },
        deleteSource(){
            this.$Modal.confirm({
                title: '确认删除此条资源？',
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                    // axios.delete(`/api/resource/${sourceID}`)
                    setTimeout(() => {
                        this.$Modal.success({
                            title: '资源已删除',
                        })
                        // TODO 告诉后端这个资源已删除
                        this.deleteOrNot = true
                    }, 1000);
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
    height:250px;
    width: 274px;
    margin-right: 50px;
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
    padding: 18px 18px 0px 18px;
    margin-bottom: 10px;
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
    line-height: 21px;
}
.font-switch{
    display: inline-block;
    position: relative;
    left: 15px;
    top: -3px;
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

.foot-icon:hover, .foot-icon1:hover, .footer-col:hover, .footer-col1:hover{
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
    color: #7f7f7f;
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