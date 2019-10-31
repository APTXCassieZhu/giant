<template>
    <div style="background-color: #eff2f5">
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        <div class="middle-card-wrapper">
            <Menu active-name="1" class="leftside-menu" style="width:auto;">
                <!--TODO 未完成，仅有样式-->
                <MenuItem name="1" @click.native="showInfo">
                    <div class="menu_left_part">
                        <Icon size="18" type="md-notifications" style="margin-right:20px;"/>
                        提醒
                    </div>
                    <div class="not-read">{{infoNotRead}}</div>
                </MenuItem>
                <MenuItem name="2" @click.native="showNotice">
                    <div class="menu_left_part">
                        <font-awesome-icon :icon="['fas','bullhorn']" style="margin-right:20px;"/> 
                        通知
                    </div>
                    <div class="not-read">{{noticeNotRead}}</div>
                </MenuItem>
            </Menu>
            <div v-if="!this.showNotices" class="notice-card">
                
            </div>
            <div v-if="this.showNotices" class="notice-card">
            </div>
        </div>
        <corner></corner>
        <Footer style="position:relative; bottom: 0px; margin-top:200px"></Footer>
    </div>
</template>

<script>
import TopNavigation from '../components/TopNav.vue'
import Footer from '../components/footer.vue'
import Corner from '../components/corner.vue'

export default {
    name:"Notice",
    components:{TopNavigation, Footer, Corner, },
    props:{
        noticeNotRead:{
            type: Number,
            default: 4,
        },
        infoNotRead:{
            type: Number,
            default: 8,
        }
    },
    computed:{
        getUser(){
            return this.$store.state.token;
        },
    },
    mounted() {
        // this.personalActive = this.$store.state.personalActive       
    },
    data () {
        return {
            showNotices: false,
            cur_noticeNotRead: this.noticeNotRead,
            cur_infoNotRead: this.infoNotRead,
        }
    },
    methods:{
        goPage(url){
            this.$router.push(url)
        },
        showNotice(){
            this.showNotices = true
        },
        showInfo(){
            this.showNotices = false
        },
    },
}
</script>
<style>
</style>
<style scoped>
.middle-card-wrapper{
    width:100%;
    display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;flex-wrap:wrap;
    justify-content:center;
    /* align-items:center; */
}
.leftside-menu{
    position: sticky;
    font-family: MicrosoftYaHei;
    /* width: 700px; */
    height: 160px;
    left: 50px;
    top: 170px;
    margin-right: 30px;
    /* margin-top: 30px; */
    padding: 30px 30px 30px 30px;
    border-radius: 3px;
    background-color: #ffffff;
    color: black;
}
.menu_left_part{
    display: inline-block;
    font-size: 16px;
    margin-right: 50px;
}
.not-read{
    display: inline-block;
    width: 47px;
    height: 18px;
    border-radius: 9px;
    font-size: 11px;
    background-color: #d8d8d8;
    color: white;
    text-align: center;
}
.notice-card{
    position: relative;
    font-size: 16px;
    width: 1160px;
    height: 900px;
    margin-top: 30px; 
    /* left: 350px; */
    padding: 30px 28px 30px 28px;
    border-radius: 3px;
    background-color: #ffffff;
    overflow: auto;
}


</style>