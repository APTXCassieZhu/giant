<template>
  <div class="gdrc-breadcommentcurmb-owo">
    <Breadcrumb>
      <BreadcrumbItem v-for="(item,index) in this.$store.state.breadCommentListState" :key="index" :to="item.fullPath"
        style="margin:5px 0;">{{item.name}}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script>
  export default{
    name:'bct',
    created() {},
    data() {
      return { }
    }
  }
</script>