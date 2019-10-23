<template>
    <div class="source-box">
        <div class="upper">
            <div class="font-image">{{sourceName.charAt(0)}}</div>
            <div class="font-title">{{sourceName}}</div>
            <div class="font-content">下载次数&emsp;&emsp;&emsp;关注人数</div>
            <div class="font-num">{{downloadCount}}<span style="margin-left: 63px;">2,019</span></div>
        </div>
        <Row class="font-footer">
            <Col span="8" class="footer-col">
                <Icon size="25" type="md-download" class="foot-icon" />     
            </Col>
            <Col span="8" class="footer-col">
                <Divider type="vertical" class="foot-divider"/>
                <Icon size="25" type="md-create" class="foot-icon" />
                
            </Col>
            <Col span="8" class="footer-col1">
                <Divider type="vertical" class="foot-divider"/>
                <Icon size="25" type="md-more" class="foot-icon" />
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    name: "SoftwareDownload",
    data() {
        return {
            
        }
    },
    methods:{

    }
}
</script>
<style scoped>
.source-box{
    float: left;
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
    top: -10px;
    right: -10px;
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: bold; 
    line-height: 21px;
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
</style>