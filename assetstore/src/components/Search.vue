<template>
    <Card>
        <span slot="title" style="color: blue">热门搜索
        <Icon type="ios-repeat" @click="change()"></Icon>换一批</span>
        <Tag color="blue">three.js</Tag>
        <Tag color="blue">JiaFu</Tag>
        <Tag color="blue">Candy</Tag>
        <Tag color="blue">仙侠</Tag>
        <Tag color="blue">lalalala</Tag>
        <Divider />

    </Card>

</template>

<script>
export default {
    name:"Search",
    data() {
        return {
            data: ['three.js', 'jiaFu', 'juju', 'ruirui', 'candy', '仙侠', 
            'lala', 'detective', '凑数', '饿了', '好饿', '饿的不行了', '再编几个', 
            '想编几个编几个','conan', 'sos'],
            tagList: [],     //存放每次点击换一批放出来的5个对象
            arr: [],
            num: ''
        }
    },
    // 页面加载时就自动生成推荐内容
    mounted() {
        for(var i = 0; i < 5; i++) {
            this.tagList.push(this.data[i])
        }
    },
    methods: {
        // 每次点击换一批，更换推荐内容
        change() {
            // 清空之前的数据
            this.num = ''
            this.arr = []
            this.tagList = []
            while(this.arr.length < 5) {
                let num = parseInt(Math.random * 15)
                if(this.arr.indexOf(num) == -1) {
                    this.arr.push(num)
                    this.num = num
                    this.tagList.push(this.data[this.num])
                }
            }
        }
    }
}
</script>

<style scoped>
.Card {
    display: none;
}
</style>
