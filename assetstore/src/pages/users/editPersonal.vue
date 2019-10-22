<template>
    <div>
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        <Menu active-name="1" class="leftside-menu">
            <!--TODO 未完成，仅有样式-->
            <MenuItem name="1">
                <Icon size="18" type="ios-apps" />个性化设置
            </MenuItem>
            <MenuItem name="2">
                <Icon size="18" type="md-notifications" />消息通知设置
            </MenuItem>
        </Menu>
        <div class="setting-card"></div>
        <corner></corner>
        <Footer style="position:relative; bottom: 0px; margin-top:200px"></Footer>
    </div>
</template>

<script>
import TopNavigation from '../../components/TopNav.vue'
import Footer from '../../components/footer.vue'
import Corner from '../../components/corner.vue'

export default {
    name:"EditPersonal",
    components:{TopNavigation, Footer, Corner, },
    computed:{
        getUser(){
            return this.$store.state.token;
        },
    },
    mounted() {
        this.personalActive = this.$store.state.personalActive       
    },
    data () {
        return {
        }
    },
    methods:{
        goPage(url){
            this.$router.push(url)
        },
    },
}
</script>

<style scoped>
.leftside-menu{
    position: relative;
    display:inline-block;
    font-family: MicrosoftYaHei;
    width: 360px;
    height: 160px;
    left: 50px;
    top: -519px;
    padding: 30px 20px 30px 25px;
    border: 1px solid lightgrey;
    /*box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.2);*/
    background-color: #ffffff;
}
.setting-card{
    position: relative;
    display:inline-block;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    width: 1360px;
    height: 660px;
    left: 100px;
    top: 30px;
    padding: 20px 28px 30px 28px;
    border: 1px solid lightgrey;
    box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.2);
    background-color: #ffffff;
    overflow: auto;
}
</style>

