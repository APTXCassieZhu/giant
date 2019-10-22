<template>
    <div>
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
        <br>
        <Menu active-name="1" style="position:relative; z-index:0; left:2.5%;">
            <!--TODO 未完成，仅有样式-->
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
        <br><br><br><br>
        <footer style="position:fixed; bottom: 0px;"></footer>
    </div>
</template>
    
<script>
import TopNavigation from '../components/TopNav.vue'
import Footer from '../components/footer.vue'
export default {
    name:"software",
    components:{TopNavigation, Footer}
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
</style>

