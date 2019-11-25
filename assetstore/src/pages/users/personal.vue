<template>
    <div style="background-color: #eff2f5">
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        <div class="middle-card-wrapper">
            <div class="self-card">
                <div class="self">
                    <div v-if="this.profilePic != null"><img class="avatar" :src="profilePic"></div>
                    <div v-else class="font-avatar">{{this.username.charAt(0)}}</div>
                    <Icon size="20" class="edit-self" type="md-create" @click="goPage('/editSetting')"/>
                    <ul style="font-size: 21px;font-weight: bold;">{{this.username}}</ul>
                    <ul style="font-size: 14px; color: #7f7f7f;">{{this.user.dept}}</ul>
                </div>
                <br>
                <ul style="font-size: 14px; color: #7f7f7f;text-align:center;">{{this.signature}}</ul>
                <Divider />
                <ul style="font-size: 16px; font-weight: bold">印象</ul><br>
                <div v-if="this.user.labels == null || this.user.labels.length == 0" class="empty-personal">
                    <p>暂无好友印象哦～</p>
                    <p>快邀请好友来为您添加第一条标签吧</p>
                </div>
                <span v-else v-for="(item,index) in this.user.labels" :key="index">
                    <a-tag class="tag-style">
                        &emsp;{{item.val}}&emsp;
                        <font-awesome-icon :icon="['fas', 'times']" class="tag-style-close" @click="handleCloseTag(item)"/>
                    </a-tag>
                </span>

                <Divider />
                <ul style="font-size: 16px; font-weight: bold">优秀作品集</ul><br>
                <div v-if="this.user.fineResources.length == 0" class="empty-personal">
                    <p>暂无优秀作品哦～</p>
                    <p>GDRC期待您的分享</p>
                </div>
                <div v-else v-for="(resource, i) in this.user.fineResources" :key="'a'+i">
                    <div class="personal-fine" @click="goPage(`/resourceDetail/${resource.id}`)">
                        <div v-if="resource.images==null" class="font-image">{{resource.name.charAt(0)}}</div>
                        <div v-else><img class="font-image" :src="concatImgUrl(resource.images[0].id)"></div>
                        <div class="font-name">{{resource.name}}</div>
                    </div>
                    <br><br>
                </div>
            </div>
            
            <div class="asset-card" >
                <Tabs :value="personalActive" :animated="false">
                    <TabPane :label="tab1" name="name1">
                        <div class="container">
                            <div>
                                <span class="upload-style" @click="goPage('/uploadFile')">
                                    <Icon id="folder" size="80" type="md-folder" :class="uploadFolderStyle"/>  
                                    <font-awesome-icon :icon="['fas','plus']" @mouseover="bright" @mouseout="unBright" class="upload-add-style"/>
                                </span>
                                <span v-for="(product, i) in this.productList" :key="'aa'+i">
                                    <source-box :source="product" @onDel="onDel"></source-box>
                                </span>
                            </div>
                            <div>
                                <Button v-show="ifMoreSource" id="more" class="more" @click="addMore('source')">加载更多</Button>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane :label="tab2" name="name2">
                        <div class="container">
                            <div>
                                <span v-for="(software, n) in softwareList" :key="n" style="display:inline-block;">
                                    <software-box :software='software' @swDel="swDel"></software-box>
                                </span>
                                <span>
                                    <software-up-box v-bind:softwareName='this.softwareList1[1]'></software-up-box>
                                    <software-pend-box v-bind:softwareName='this.softwareList1[2]'></software-pend-box>
                                </span>
                            </div>
                            <div>
                                <Button v-show="ifMoreSoftware" id="more" class="more" @click="addMore('software')">加载更多</Button>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane :label="tab3" name="name3">
                        <div v-if="this.favoriteList.length==0" class="like-btn-container">
                            <Button class="like-btn" @click="goPage('/')">去关注</Button>
                        </div>
                        <div v-else class="container">
                            <div>
                                <span v-for="(like, n) in favoriteList" :key="n" style="display:inline-block;">
                                    <like-box :source='like' @unFavorite="unFavorite"></like-box>
                                </span>
                            </div>
                            <div>
                                <Button v-show="ifMoreFavorite" id="more" class="more" @click="addMore('favorite')">加载更多</Button>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div> 
        <corner></corner>
        <Footer style="position:relative; bottom: 0px; margin-top:200px"></Footer>
    </div>
</template>

<script>
import TopNavigation from '../../components/TopNav.vue'
import Footer from '../../components/footer.vue'
import Corner from '../../components/corner.vue'
import SourceBox from '../../components/sourceBox.vue'
import LikeBox from '../../components/likeBox.vue'
import SoftwareBox from '../../components/softwareBox.vue'
import SoftwareUpBox from '../../components/softwareUpBox.vue'
import SoftwarePendBox from '../../components/softwarePendBox.vue'
import Cartoon from '../../components/cartoon.vue'

export default {
    name:"Personal",
    components:{TopNavigation, Footer, Corner, SourceBox, SoftwareBox, 
    SoftwareUpBox, SoftwarePendBox, LikeBox, Cartoon},
    computed:{
    },
    mounted() {
        // 判断右边展示"资源", "软件","关注"
        if(this.$store.state.personalActive == "" || this.$store.state.personalActive == null){
            this.personalActive = "name1"
        }else{
            this.personalActive = this.$store.state.personalActive
        }
        // 拿到用户的基本资料
        let o = JSON.parse(this.$store.state.user)
        axios.get(`/api/user/${o.id}`).then((res)=>{
            if(res.data.code == 0){
                this.user = res.data.data
                this.profilePic = res.data.data.profilePic
                if(res.data.data.nickName == null){
                    this.username = res.data.data.name
                }else{
                    this.username = res.data.data.nickName
                }
                if(res.data.data.signature == null){
                    this.signature = '来都来了，留下点个性签名介绍下自己吧'
                }else{
                    this.signature = res.data.data.signature
                }
            }else{
                alert(res.data.code)
            }
        }, (res)=>{
            alert(res)
        })
        // 拿到用户上传的资源列表
        axios.get(`/api/user/${o.id}/resource`,{params:{page: this.sourcePage,
        pageSize: this.sourcePageSize,}}).then((res)=>{
            if(res.data.code == 0){
                this.productList = res.data.data.list
                console.log(this.productList)
                this.tab1 = `资源(${res.data.data.count})`
                this.totalResource = res.data.data.count
                if(res.data.data.count > this.productList.length){
                    this.ifMoreSource = true
                }
            }
        }, (res)=>{
            alert(res)
        })

        // 拿到用户关注的软件列表
        axios.get(`/api/user/${o.id}/software`,{params:{page: this.softwarePage,
        pageSize: this.softwarePageSize,}}).then((res)=>{
            if(res.data.code == 0){
                this.softwareList = res.data.data.list
                this.tab2 = `软件(${res.data.data.count})`
                this.totalSoftware = res.data.data.count
                if(res.data.data.count > this.softwareList.length){
                    this.ifMoreSoftware = true
                }
            }
        }, (res)=>{
            alert(res)
        })

        // 拿到用户关注的资源列表
        axios.get('/api/user/star').then((res1)=>{
            if(res1.data.code == 0){
                this.favoriteList = res1.data.data.list
                this.tab3 = `关注(${res1.data.data.count})`
                this.totalLike = res1.data.data.count
                if(res1.data.data.count > this.favoriteList.length){
                    this.ifMoreFavorite = true
                }
            }
        }, (res)=>{
            alert(res)
        })
    },
    watch:{
        // productList(){
        //     // debugger
        //     this.tab1 = `资源(${this.productList.length})`
        // },
        // deep:true
    },
    data () {
        return {
            profilePic: null,
            user: {
                fineResources:[]
            },
            username: '迪丽热巴的老婆--睿酱',
            department: '拯救地球部',
            signature: '就像阳光穿破黑夜~ 黎明悄悄划过天边~ O(∩_∩)O谢谢',
            uploadFolderStyle: "upload-folder-style",
            sourcePage: 1,
            sourcePageSize: 20,
            favoritePage: 1,
            favoritePageSize: 20,
            softwarePage: 1,
            softwarePageSize: 20,
            ifMoreSource: false,
            ifMoreFavorite: false,
            ifMoreSoftware: false,
            totalResource: 2,
            totalSoftware: 3,
            totalLike: 0,
            tab1: "资源(2)",
            tab2: "软件(3)",
            tab3: "关注(0)",
            personalActive: "name1",
            personalTagList: ['小天使','小棉袄','小甜饼','柯南骨灰粉','暴躁老妹'],// 从后端拿
            productList: [],  
            softwareList: [],  
            softwareList1: ['ADOBE CS SUITE', 'WINDOWS 10预装版','申请的软件名称'],
            favoriteList: [],
        }
    },
    methods:{
        goPage(url){
            if(this.$route.path===url){
                location.reload()
            }else{
                this.$router.push(url)
            }
        },
        onDel(pid){
            for (var i = 0; i < this.productList.length; i++) {
                if (this.productList[i].id == pid) {
                    this.productList.splice(i, 1);
                    break;
                }
            }
            this.tab1 = `资源(${this.totalResource - 1})`
        },
        swDel(sid){
            for (var i = 0; i < this.softwareList.length; i++) {
                if (this.softwareList[i].id == sid) {
                    this.softwareList.splice(i, 1);
                    break;
                }
            }
            this.tab2 = `软件(${this.totalSoftware - 1})`
        },
        unFavorite(lid){
            for (var i = 0; i < this.favoriteList.length; i++) {
                if (this.favoriteList[i].id == lid) {
                    this.favoriteList.splice(i, 1);
                    break;
                }
            }
            this.tab3 = `关注(${this.totalLike - 1})`
        },
        handleCloseTag(removedTag){
            const tags = this.user.labels.filter(tag => tag !== removedTag);
            console.log(tags);
            this.user.labels = tags;
            let headers = {"Content-Type": "application/json; charset=utf-8"}
            let data = {"id": removedTag.id}
            axios.delete(`/api/user/label/${removedTag.id}`, {headers, data}).then((res)=>{
                if(res.data.code == 0){
                }
            }, (res)=>{
                alert(res)
            })
        },
        bright(){
            this.uploadFolderStyle = "upload-folder-style-hover"
        },
        unBright(){
            this.uploadFolderStyle = "upload-folder-style";
        },
        addMore(more){
            switch(more){
                case 'source':
                    this.sourcePage += 1
                    axios.get(`/api/user/${this.user.id}/resource`,{params:{page: this.sourcePage,
                    pageSize: this.sourcePageSize,}}).then((res)=>{
                        if(res.data.code == 0){
                            this.productList = this.productList.concat(res.data.data.list)
                            this.tab1 = `资源(${res.data.data.count})`
                            this.totalResource = res.data.data.count
                            if(res.data.data.count > this.productList.length){
                                this.ifMoreSource = true
                            }else{
                                this.ifMoreSource = false
                            }
                        }
                    }, (res)=>{
                        alert(res)
                    })
                    break;
                case 'favorite':
                    this.favoritePage += 1
                    axios.get('/api/user/star',{params:{page: this.favoritePage,
                    pageSize: this.favoritePageSize,}}).then((res)=>{
                        if(res.data.code == 0){
                            this.favoriteList = this.favoriteList.concat(res.data.data.list)
                            this.tab3 = `关注(${res.data.data.count})`
                            this.totalLike = res.data.data.count
                            if(res.data.data.count > this.favoriteList.length){
                                this.ifMoreFavorite = true
                            }else{
                                this.ifMoreFavorite = false
                            }
                        }
                    }, (res)=>{
                        alert(res)
                    })
                    break;
                case 'software':
                    this.softwarePage += 1
                    axios.get(`/api/user/${this.user.id}/software`,{params:{page: this.softwarePage,
                    pageSize: this.softwarePageSize,}}).then((res)=>{
                        if(res.data.code == 0){
                            this.softwareList = this.softwareList.concat(res.data.data.list)
                            this.tab2 = `软件(${res.data.data.count})`
                            this.totalSoftware = res.data.data.count
                            if(res.data.data.count > this.softwareList.length){
                                this.ifMoreSoftware = true
                            }else{
                                this.ifMoreSoftware = false
                            }
                        }
                    }, (res)=>{
                        alert(res)
                    })
            }
        },
        concatImgUrl(url){
            return `//192.168.94.238:3000/file/download/${url}?token=${this.$store.state.token}`         
        },
    }
}
</script>
<style>
.asset-card > .ivu-tabs > .ivu-tabs-bar > .ivu-tabs-nav-container{
    font-size: 18px!important;
}
.asset-card > .ivu-tabs > .ivu-tabs-bar > .ivu-tabs-nav-container
 > .ivu-tabs-nav-wrap > .ivu-tabs-nav-scroll > .ivu-tabs-nav > .ivu-tabs-tab{
    /* 使得三个标签间距变大 */
    padding: 8px 50px;
    margin-left: 0px;
 }
.asset-card > .ivu-tabs{
    overflow: visible;
    min-height: 500px;
}
.asset-card > .ivu-tabs > .ivu-tabs-bar > .ivu-tabs-nav-container > .ivu-tabs-nav-wrap
> .ivu-tabs-nav-scroll{
    position: sticky;
}
/* .self-card > span > .tag-style > .ivu-tag-text{
    height: 22px;
    line-height: 22px;
    text-align: center;
} */
</style>
<style scoped>
.middle-card-wrapper{
    width:100%;
    display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;flex-wrap:wrap;
    justify-content:center;
    /* align-items:center; */
}
.self-card{
    font-family: MicrosoftYaHei;
    width: 360px;
    min-height: 660px;
    margin-top: 53px;
    /* top: 10px; */
    padding: 30px 20px 30px 25px;
    border-radius: 3px;
    background-color: #ffffff;
}
.self{
    position: relative;
    font-family: MicrosoftYaHei;
    text-align: center;
}
.font-avatar{
    border-radius: 50%; 
    width: 104px; 
    height:104px;
    text-align: center;
    line-height: 104px;
    background-color: #e8f8f0;
    color: #1ebf73;
    font-size: 50px;
    margin: auto;
    margin-bottom: 15px;
}
.avatar{
    border-radius: 50%; 
    width: 104px; 
    height:104px;
    text-align: center;
    margin: auto;
    margin-bottom: 15px;
}
.edit-self{
    position: absolute;
    top: 0px;
    right: 15px;
    border-radius: 3px;
    /*color: rgb(0, 140, 255);*/
    color: #1ebf73;
    cursor: pointer;
}
.tag-style{
    margin-right:15px;
    margin-bottom: 10px;
}
.tag-style-close{
    width: 10px;
    height: 10px;
    color: #7f7f7f;
    line-height: 21px;
    text-align: center;
    top: -2px;
    position: relative;
}
.tag-style-close:hover{
    color: red;
}
.empty-personal{
    font-size: 14px;
    color: #777777;
    letter-spacing: 1px;
}
.asset-card{
    font-family: MicrosoftYaHei;
    font-size: 16px;
    width: 1200px;
    height: 660px;
    margin-left: 50px;
    margin-top: 53px;
    padding: 20px 28px 30px 28px;
    border-radius: 3px;
    background-color: #ffffff;
    overflow: auto;
}
.personal-fine{
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
}
.font-image{
    font-size:16px;
    display: inline-block;
    color: #1ebf73;
    background-color: #e8f8f0;
    height: 44px;
    width: 44px;
    text-align: center;
    line-height: 44px;
}
.font-name{
    font-size: 14px;
    letter-spacing: 1px;
    color: #7f7f7f;
    margin-left: 20px;
}
.tabpane{
    cursor: pointer;
    font-size: 16px;
}
.tabpane:hover{
    color: #1ebf73;
}
.upload-style{
    float: left;
    height: 196px; 
    width: 274px;
    margin-top: 30px;
    margin-right: 30px;
    border: solid 2px #eaeaea;
}
.upload-style:hover{
    background-color: #e8f8f0;
    border: solid 2px #1ebf73;
}
.upload-add-style{
    position: absolute;
    cursor: pointer;
    color: #ffffff;
    top: 178px;
    left: 128px;
    width: 24px;
    font-size: 24px;
    text-align:center;
    z-index: 10;
}

.upload-folder-style{
    position: absolute;
    cursor: pointer;
    line-height: 196px;
    width: 274px;
    text-align:center;
    color:#e5e5e5;
}
.upload-folder-style-hover{
    position: absolute;
    cursor: pointer;
    line-height: 196px;
    width: 274px;
    text-align:center;
    color:#1ebf73;
}
.upload-folder-style:hover{
    color:#1ebf73;
}
.like-btn-container{
    width: 1120px;
    height: 560px;
}
.like-btn{
    position: relative;
    width: 250px;
    height: 50px;
    top: 230px;
    left: 460px;
    font-size: 16px;
    float: center;
}
.container{
    display:flex;
    /* align-items:center; */
    flex-direction: column;
}
.more{
    text-align: center;
    width: 193px;
    height: 44px;
    /* background-color: #e8f8f0; */
    color: #1ebf73;
    /* border: solid 1px #1ebf73; */
    font-size: 18px;
    font-weight: 600;
    margin-top: 30px;
}

@media only screen and (max-width: 1366px) {
    .asset-card {
        width: 950px;
        height: 500px;
        min-height: 500px;
    }
}
</style>

