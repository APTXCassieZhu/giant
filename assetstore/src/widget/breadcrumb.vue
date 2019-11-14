<template>
  <div class="gdrc-breadcurmb-owo">
    <Breadcrumb>
      <BreadcrumbItem v-for="(item,index) in this.$store.state.breadListState" :key="index" :to="item.fullPath"
        style="margin:5px 0;">{{item.name}}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script>
  export default{
    name:'breadcurmb',
    created() {},
    data() {
      return { }
    }
  }
</script>