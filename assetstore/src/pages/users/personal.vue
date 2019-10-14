<template>
    <div>
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        <div class="self-card">
            <div class="self">
                <img src="../../assets/鲸.jpg" style="border-radius: 50%; width: 104px; height:104px;">
                <Icon size="20" style="edit-self" type="md-create" />
                <ul style="font-size: 21px;font-weight: bold;">{{getUser}}</ul>
                <!-- TODO 属于哪个部门从amt那里得到-->
                <ul style="font-size: 14px; color: #7f7f7f;">前沿技术部门</ul>
            </div>
            <br>
            <!-- TODO 用户自己输入-->
            <ul style="font-size: 14px; color: #7f7f7f;">
                啦啦啦啦啦啦啦啦啦啦啦这一段是瞎写的座右铭：今天明天和后天，一直快乐单身狗╮(╯▽╰)╭
            </ul>
            <Divider />
            <!-- TODO 从后端数据库读取-->
            <ul style="font-size: 16px; font-weight: bold">标签</ul>
            <Tag size="large">小天使</Tag><Tag size="large">小棉袄</Tag>
            <Tag size="large">小甜饼</Tag><Tag size="large">柯南骨灰粉</Tag>
            <Tag size="large">正义使者</Tag><Tag size="large">未来的大佬</Tag>
            <Divider />
            <ul style="font-size: 16px; font-weight: bold">优秀作品集</ul>
        </div>
        <br><br><br><br>
        <Footer style="position:relative; bottom: 0px;"></Footer>
    </div>
</template>

<script>
import TopNavigation from '../../components/TopNav.vue'
import Footer from '../../components/footer.vue'
export default {
    name:"Personal",
    components:{TopNavigation, Footer},
    computed:{
        getUser(){
            return this.$store.state.token;
        }
    },
}
</script>

<style scoped>
.self-card{
    position: relative;
    font-family: MicrosoftYaHei;
    width: 360px;
    left: 30px;
    top: 30px;
    padding: 30px 20px 30px 25px;
    border: 1px solid lightgrey;
    box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.2);
    background-color: #ffffff;
}
.self{
    position: relative;
    font-family: MicrosoftYaHei;
    text-align: center;
}
.edit-self{
    color: rgb(0, 140, 255);
    cursor: pointer;
}
</style>

