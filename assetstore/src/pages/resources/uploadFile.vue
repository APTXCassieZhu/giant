<template>
  <div>
    <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
    <section class="uploadfile">

      <a-form id="components-form-demo-validate-other" :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="资源名称：">
            <a-input
              v-decorator="['resource-name', { rules: [{ required: true, message: '请填写资源名称' }] }]"
            />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="初始版本号：">
          <a-input
            v-decorator="['resource-version', { rules: [{ required: true, message: '请填写版本号' }] }]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="文件描述：">
          <a-textarea v-decorator="['resource-description', { rules: [{ required: true, message: '请填写文件描述' }] }]"
           placeholder="Basic usage" :rows="4" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="资源分类：" >
          <a-select
            v-decorator="[
              'resource-type',
              { rules: [{ required: true, message: '请选择一个分类' }] },
            ]"
            placeholder="请选择一个分类"
            @change="handleResChange"
          >
            <a-select-option value="res-art">
              美术资源
            </a-select-option>
            <a-select-option value="res-dev">
              研发资源
            </a-select-option>
          </a-select>
        </a-form-item>
      <a-form-item v-bind="formItemLayout" label=" ">
        <a-cascader  v-decorator="[ 'resource-cascader',{
            rules:[{ required: true, message: '请选择一个分类' }]
          },
          ]" :options="options"  placeholder="请选择一个分类" />
      </a-form-item>

      <template v-if="showArtStyle">
        <a-form-item v-bind="formItemLayout" label="美术资源风格：">
          <a-select
            v-decorator="[
              'resource-art-type',
              { rules: [{ required: true, message: '请选择风格' }] }
            ]"
            placeholder="美术资源风格"
          >
            <a-select-option v-for="(o,i) in art_options" :key="i" :value="o.value">{{o.label}}</a-select-option>
           
          </a-select>
        </a-form-item>
      </template>
      
      <a-form-item v-bind="formItemLayout" label="是否公开">
        <a-switch v-decorator="['public', { valuePropName: 'checked' }]" />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="引擎兼容性">
        <a-select
          v-decorator="[
            'resource-engine',
            { rules: [{ required: true, message: '请选择引擎' }] }
          ]"
          placeholder="请选择引擎"
        >  
          <a-select-option v-for="(o,i) in engine_options" :key="i" :value="o.value">{{o.label}}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="自定义标签">
        <template v-for="(tag, index) in tags">
          <a-tag :key="tag" closable  :afterClose="() => handleClose(tag)">
            {{tag}}
          </a-tag>
        </template>
        <a-input
          v-if="inputVisible"
          ref="input"
          type="text"
          size="small"
          :style="{ width: '128px' }"
          :value="inputValue"
          placeholder="请输入2-8个字符"
          @change="handleInputChange"
          @blur="handleInputConfirm"
          @keyup.enter="handleInputConfirm"
        />
        <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
          <a-icon type="plus" /> 增加标签
        </a-tag>
      </a-form-item>
     
      <a-form-item
        v-bind="formItemLayout"
        label="展示用媒体"
      >
        <a-upload
          action="//localhost:3000/api/upload"
          listType="picture-card"
          :multiple="true"
          v-decorator="[
            'thumbnail',
            {
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
            }
          ]"
        >
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-item>

        <a-form-item v-bind="formItemLayout" label="资源上传">
          <div class="dropbox">
            <a-upload-dragger
              v-decorator="[
                'dragger',
                {
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,
                },
              ]"
              name="files"
              action="//localhost:3000/api/upload"
              :multiple="true"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
              </p>
              <p class="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p class="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </a-upload-dragger>
          </div>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
          <a-button type="primary" html-type="submit">
            Submit
          </a-button>
        </a-form-item>
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
      art_options:[{value:'q',label:'q版风格'},{value:'j',label:'日漫'}],
      engine_options:[
        {value:'1.0.0',label:'unity 1.0.0'},
        {value:'1.2.0',label:'unity 1.3.0'}
      ],
      
      options:[ ],

      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      },
      previewVisible: false,
      previewImage: '',
      tags: [],
      inputVisible: false,
      inputValue: ''

    }
  },
 
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'validate_other' });
  },
  mounted(){
    // let E = window.wangEditor
    // let editor = new E(this.$refs['editor-owo'])
    // editor.create()
    
    console.log('matched:', this.$route.matched)
  },
  created(){
   
  },
  methods:{
    handleResChange(val){
      this.art_v = val 
      if(this.art_v == 'res-art'){
        this.showArtStyle = true
      }else{
        this.showArtStyle = false
      }

      this.$http.get(`//localhost:3000/api/tag/`,{v:this.art_v}).then(response=>{
        var res =response.data
        if(res.data==401){
          return alert('未登录！')
        }
        
        var {options} = res.data
      
        this.options = options
      },err=>{

      })
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(values,'tags:',this.tags)
        if(!values.dragger)
          return this.$message.warning('你什么资源都没上传啊！')

        if(err){
          return 
        }
        
        Vue.http.headers.common['token'] = localStorage['token']
        this.$http.post(`//localhost:3000/api/resource/${'resourceid-222222'}`,
         {
           aa:'aaAAAA',bb:'bbBBBBBB'
         }).then((res)=>{

           if(res.data.code == 401){
             return alert('未登录！')
           }

        }, err=>{

        })
      
      })
    },
    normFile(e) {
      //console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
    // check() {
    //   this.form.validateFields(err => {
    //     if (!err) {
    //       console.info('success');
    //     }
    //   });
    // },
    // handleChange(e) {
    //   this.checkNick = e.target.checked;
    //   this.$nextTick(() => {
    //     this.form.validateFields(['nickname'], { force: true });
    //   });
    // },



    // handleChange(e){
    //   let fdata = new FormData()
    //   fdata.append('file', e.target.files[0])

    //   let xhr = new XMLHttpRequest()
  
    //   xhr.onload = ()=>{
    //     let res = JSON.parse(xhr.responseText)
    //     this.fileid = res.data.fileid
    //   }
    //   xhr.open("POST", "//localhost:3000/api/upload")
    //   xhr.setRequestHeader("token", "tokenxxxxxxxxxxx");

    //   // 文件上传过程的回调
    //   xhr.upload.onprogress = (e)=> {
    //     console.log((e.loaded/e.total)*100+'%')
    //   }
    //   xhr.send(fdata)
    // },
    // handleSave(e){
    //   let fdata = new FormData()

    //   fdata.append('fileid',this.fileid)
    //   fdata.append('tagList',['aa','bb','cc','dd'])

    //   let xhr = new XMLHttpRequest()
    //   xhr.onload = ()=>{
    //     let res = JSON.parse(xhr.responseText)
    //     console.log()
    //   }
    //   xhr.open("POST", `//localhost:3000/api/resource`)
    //   xhr.setRequestHeader("token", "tokenxxxxxxxxxxx");
    //   xhr.send(fdata)

    // },
    handleCancel() {
      this.previewVisible = false;
      //console.log('handleCancel.')
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
      //console.log('handlePreview.')
      //debugger
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
    handleClose(removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag);
      console.log(tags);
      this.tags = tags;
    },


    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      //console.log(tags);
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: '',
      });
    },
    handleSave(){
      //console.log('tags:',this.tags,'fileList:',this.fileList, 'fileid:',this.fileid)

      
    },

    handleChangex(info) {
      const status = info.file.status

      //console.log(status)
      if(status=='done'){
        //console.log(info.fileList[0],info.fileList[0].response)
        let res = info.fileList[0].response
        this.fileid = res.data.fileid

        this.resource_fileid.push(this.fileid)
      }
      // // console.log(info)

      // console.log(info)

      // Object.assign(this,{
      //   file:info.file
      // })
      // if (status !== 'uploading') {
      //   //console.log(info.file)
      // }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }

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