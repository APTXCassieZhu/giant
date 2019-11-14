<template>
  <div>
    <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
    <section class="uploadfile">

      <a-form id="components-form-demo-validate-other" :form="form" @submit="handleSubmit">
        <div class="uploadFile-l">
          <section>
            <header>STEP. 1 资源上传</header>
            <a-form-item v-bind="formItemLayout" label="资源上传">
              <div class="dropbox">
                <a-upload-dragger
                  v-decorator="[
                    'dragger',
                    {
                      valuePropName: 'fileList',
                      getValueFromEvent: normFile
                    }
                  ]"
                  name="files"
                  action="/api/file/upload"
                  :multiple="false"
                >
                  <p class="ant-upload-drag-icon">
                    <a-icon type="inbox" />
                  </p>
                  <p class="ant-upload-text">
                    可以将你的资源文件拖拽到此处进行上传
                  </p>
                  <p class="ant-upload-hint">
                    <p>*支持资源打包上传，请按照规定的目录结构打包</p>
                    <p>支持 ZIP / FBX / 3DS ，请将单个文件控制在 $000 MB之内</p>
                  </p>
                </a-upload-dragger>
              </div>
            </a-form-item>
          </section>

          <section>
            <header>STEP. 2 更新信息编辑</header>
            <a-form-item v-bind="formItemLayout" label="初始版本号：">
              <p>{{ver}}</p>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="文件描述：">
              <a-textarea v-decorator="['resource-description', { rules: [{ required: true, message: '请填写文件描述' }] }]"
              placeholder="Basic usage" :rows="4" />
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
              <a-button type="primary" html-type="submit" >
                保存
              </a-button>
            </a-form-item>
          </section>
        </div>

        <div class="uploadFile-r">
          <a-form-item v-bind="formItemLayout" label="是否公开">
            <a-switch  v-decorator="['public', { }]" />
          </a-form-item>
        </div>
      </a-form>
    </section>
   </div>
</template>
<style scoped lang="less">
.uploadfile{
  // display: flex;
  // box-sizing: border-box;
  padding:20px;
  &-l{
    width:80%;
  }
  &-l>div{
    border:1px solid #ddd;
    margin:15px 0;
  }
  &-r{
    width:20%;
  }
}
#components-form-demo-validate-other .dropbox {
  height: 180px;
  line-height: 1.5;
}
</style>
<script>
import TopNavigation from '@/components/TopNav'
import marked from 'marked'
import Vue from 'vue'

export default {
  components:{TopNavigation},
  props:[],
  data(){
    return{
      showArtStyle:false,
      art_v : '',
      ver:'1.3.3',
      art_options:[{value:'q',label:'q版风格'},{value:'j',label:'日漫'}],
      engine_options:{
        unity:[],
        unreal:[]
      },
      unity_checkall:false,
      unreal_checkall:false,

      options:[ ],

      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      },
      previewVisible: false,
      previewImage: '',
      tags: [],
      inputVisible: false,
      inputValue: '',
      showCheckBoxGroup:''
    }
  },

  beforeCreate() {
    var that = this
    this.form = this.$form.createForm(this, {
       name: 'validate_other' ,
       onFieldsChange(props, fields){
        
       }
    })
  },
  mounted(){
    // let E = window.wangEditor
    // let editor = new E(this.$refs['editor-owo'])
    // editor.create()
    
    // console.log('matched:', this.$route.matched)

    axios.get(`/api/resource/${this.$route.params.resourceId}`,{}).then(response=>{
      var res = response.data
      console.log('response:', response)
      this.ver = res.data.ver[0].verNum
    })
  },
  created(){
    
  },
  methods:{
    handleChangex(info) {
      const status = info.file.status

      //console.log(status)
      if(status=='done'){
        //console.log(info.fileList[0],info.fileList[0].response)
        let res = info.fileList[0].response
        this.fileid = res.data.fileid

        this.resource_fileid.push(this.fileid)
      }

      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }

    },
    handleSubmit(e) {

      e.preventDefault()
      this.form.validateFields((err, values) => {
        // console.log(values)

        if(!values.dragger) return this.$message.warning('你什么资源都没上传啊！')

        if(err){ return  }

        var file = values['dragger']?values['dragger'][0].response.data.fileId:null
        
        axios.put(`/api/resource/:${this.$route.params.resourceId}`,{
          params: {
            "state": values.public?'public':'private', // 是否公开
            "type": values['resource-type']=="art_classify"?'art':'dev', // 资源分类
            "file": file,  // 资源上传fileid
            "version": values['resource-version'], //资源版本号
            "descriptipon": values['resource-description'] //资源描述
          }
        }).then(response=>{
          
          this.$message.success('资源更新成功')
        })


      })
    },
    normFile(e) {
      //console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList
    },
   
    handleCancel() {
      this.previewVisible = false;
      //console.log('handleCancel.')
    },
    handleChange(info) {

      var {fileList} = info
      this.fileList = fileList

      const status = info.file.status

      if(status =='done'){
        console.log('handleChange.',this.fileList)
      }
      //debugger
    },
    onChange(value) {
      console.log(value)
    },
    handleChangex2(value) {
      console.log(`selected ${value}`)
    },
    onChangex(checked) {
      console.log(`a-switch to ${checked}`)
    }
  }

}
</script>