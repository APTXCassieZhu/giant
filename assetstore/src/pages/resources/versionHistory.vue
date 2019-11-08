<template>
    <div style="background-color:#eff2f5">
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        <!--TODO 此处为戴戴写的面包屑组件-->
        <div class="middle-card-wrapper">
            <div class="version-history">
                <div v-for="(item, n) in versionList" :key="n">
                    <font-awesome-icon v-if="n != (versionList.length-1)" :icon="['fas', 'book']" class="version-icon"/>
                    <font-awesome-icon v-else :icon="['fas', 'birthday-cake']" class="version-icon"/>
                    <span class="version-num">Ver. {{item.verNum}}<span v-if="n==0">（当前版本）</span></span>
                    <span class="version-update-time"> 更新于  2019-07.29</span>
                    <Divider />
                </div>
            </div>
        </div>
        <corner></corner>
        <Footer style="position:relative;margin-top: 200px;"></Footer>
    </div>
</template>

<script>
import TopNavigation from '../../components/TopNav.vue'
import Footer from '../../components/footer.vue'
import Corner from '../../components/corner.vue'
export default {
    name:"VersionHistory",
    components:{TopNavigation,Footer,Corner},
    data() {
        return {
            versionList: [],
        }
    },
    mounted(){
        axios.get(`/api/resource/${this.$route.resourceId}/version`).then(res=>{
            if(res.data.code === 0){
                this.versionList = res.data.data.list
            }
        })
    },
}
</script>

<style scoped>
.middle-card-wrapper{
    width:100%;
    display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;flex-wrap:wrap;
    justify-content:center;
    /* align-items:center; */
}
.version-history{
    width: 1024px;
    height: auto;
    border-radius: 3px;
    background-color: #ffffff;
    padding: 60px 70px;
    margin-top: 30px;
}
.version-icon{
    width: 19px;
    height: 20px;
    font-size: 20px;
    margin-right: 20px;
}
.version-num{
    color: #262626;
    font-size: 21px;
    letter-spacing: 1.5px;
    font-weight: 600;
    margin-right: 20px;
}
.version-update-time{
    font-size: 14px;
    letter-spacing: 1px;
    color: #7f7f7f;
}
</style>

