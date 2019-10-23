<template>
    <div style="background-color: #eff2f5" >
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>  
        <div class="bread-container"> 
            <br>     
            <Breadcrumb>
                <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                <BreadcrumbItem to="/home/software">软件</BreadcrumbItem>
                <BreadcrumbItem>当前内容</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <Alert class="alert" type="warning" closable show-icon>你正在访问的栏目内容可能需要你完成申领后方可正常使用</Alert>
        <Menu active-name="1" class="sidemenu-card">
            <MenuItem name="1">
                <Icon size="18" type="ios-apps" />通用软件
            </MenuItem>
            <MenuItem name="2">
                <Icon size="18" type="md-key" />专用软件
            </MenuItem>
            <MenuItem name="3">
                <Icon size="18" type="md-list-box" />常用免费软件
            </MenuItem>
            <MenuItem name="4">
                <Icon size="18" type="md-calendar" />预装软件
            </MenuItem>
            <MenuItem name="5">
                <Icon size="18" type="md-car" />驱动软件
            </MenuItem>
        </Menu>
        <div class="software-page">
            <span class="card-title">通用软件（{{generalNum}}已收录）</span>
            <Divider/>
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
    name:"software",
    components:{TopNavigation, Footer, Corner},
    data(){
        return{
            generalNum: 20,
        }
    }
}
</script>

<style scoped>
.bread-container {
    position: relative;
    left: 3%;
}
.alert{
    position: relative;
    top: 15px;
    left: 2.5%;
    width: 90%;
}
.sidemenu-card{
    position: fixed; 
    float: left;
    z-index: 0; 
    left:2.5%;
    top: 255px;
    border-radius: 3px;
}
.software-page{
    position: relative;
    left: 350px;
    top: 28px;
    width: 1200px;
    height: 600px;
    border-radius: 3px;
    background-color: white;
}
.card-title{
    font-size:16px;
    position:relative;
    height:50px;
    left: 40px;
    top: 14px;
}
</style>

