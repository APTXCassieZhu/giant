<template>
  <div>
    <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
    <section class="uploadfile">

      <a-form id="components-form-demo-validate-other" :form="form" @submit="handleSubmit">
        <div class="uploadFile-l">
          <section class="">
            <header>STEP.1 资源编辑</header>
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
            <header>STEP.2 资源信息编辑</header>
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
                <a-select-option value="art_classify">
                  美术资源
                </a-select-option>
                <a-select-option value="dev_classify">
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

            <a-form-item v-bind="formItemLayout" label="引擎选项（可选）">
            <a-radio-group v-decorator="['radio-group']">
              <a-radio value="none">
                无
              </a-radio>
              <a-radio value="unity">
                Unity
              </a-radio>
              <a-radio value="unreal">
                Unreal
              </a-radio>
            </a-radio-group>
          </a-form-item>

            <template v-if="showCheckBoxGroup=='unity'">
              <a-form-item v-bind="formItemLayout" label="Unity" >
                <a-checkbox-group v-decorator="['checkbox-group-unity']">
                  <a-checkbox value="unity" @click="handleUnityCheckBox">所有 </a-checkbox>

                  <a-checkbox v-for="(item,i) in engine_options.unity" :key="i" :checked="item.checked" :value="item.value">{{item.label}}</a-checkbox>
                </a-checkbox-group>
              </a-form-item>     
            </template>
          
            <template v-if="showCheckBoxGroup=='unreal'">
              <a-form-item v-bind="formItemLayout" label="Unreal" >
                <a-checkbox-group v-decorator="['checkbox-group-unreal']">
                  <a-checkbox value="unreal" @click="handleUnrealCheckBox">所有</a-checkbox>
                  <a-checkbox v-for="(item,i) in engine_options.unreal" :key="i" :checked="item.checked" :value="item.value">{{item.label}}</a-checkbox>
                </a-checkbox-group>
              </a-form-item>
            </template>
          </section>


          <section>
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
      
          </section>

          <section>
            <a-form-item
              v-bind="formItemLayout"
              label="展示用媒体"
            >
              <a-upload
                action="/api/file/upload"
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
          </section>


          <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
            <a-button type="primary" html-type="submit" >
              保存
            </a-button>
          </a-form-item>
        </div>

        <div class="uploadFile-r">
          <a-form-item v-bind="formItemLayout" label="是否公开">
            <a-switch v-decorator="['public', { valuePropName: 'checked' }]" />
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
         var keys = Object.keys(fields)

         //console.log(keys,fields)

         if(keys.length === 1 && keys[0] === 'radio-group'){
           let o = fields[keys[0]]
           that.showCheckBoxGroup = o.value
         }


        //  if(keys.length ===1 && keys[0] === 'checkbox-group-unreal' || keys[0] === 'checkbox-group-unity'){
          

        //  }    
       }
    })
  },
  mounted(){
    // let E = window.wangEditor
    // let editor = new E(this.$refs['editor-owo'])
    // editor.create()
    
    // console.log('matched:', this.$route.matched)

    axios.get(`/api/tag/tree`,{ params:{type:'engine_ver'} }).then(response=>{
      var res = response.data 
      var options = res.data
      options.forEach(o=>{
        this.engine_options[o.label] = []
        o.children.forEach((o2)=>{
          this.engine_options[o.label].push({
            label:o2.label,
            value:o2.value,
            checked:false
          })
        })
      })

    })
  },
  created(){
    
  },
  methods:{
    handleUnityCheckBox(){
      this.unity_checkall ^= true
      if(this.unity_checkall){
        
        
        //console.log(this.form.getFieldsValue('resource-name'))
      }else{
        

      }

    },
    handleUnrealCheckBox(){
      
    },
    handleKeyDown(e){
      // debugger

    },
    handleResChange(val){
      this.art_v = val 
      if(this.art_v == 'art_classify'){
        this.showArtStyle = true
        axios.get(`/api/tag/tree`,{ params:{type:'art_style'} }).then(response=>{
           var res = response.data 
           var options = res.data
           this.art_options = options
        })
      }else{
        this.showArtStyle = false
      }

      axios.get(`/api/tag/tree`,  { params:{type:this.art_v} } ).then(response=>{
        var res = response.data  
        var options = res.data 
        this.options = options 
      })

    },
    handleSubmit(e) {

      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(values)


        if(!values.dragger) return this.$message.warning('你什么资源都没上传啊！')

        if(err){ return  }


        var tag1 = values['resource-cascader']?values['resource-cascader']:[]
        var tag2 = [values['resource-art-type']]
        var tag3 = 
          values['checkbox-group-unity']?values['checkbox-group-unity']:
          values['checkbox-group-unreal']

     
        // debugger

        var file = values['dragger']?values['dragger'][0].response.data.fileId:null
        var images = values['thumbnail']?  values['thumbnail'].map(o=>o.response.data.fileId):[]

        axios.post(`/api/resource`,{
          params:{
            "state": values.public?'public':'private', // 是否公开
            "type": values['resource-type']=="art_classify"?'art':'dev', // 资源分类
            "name": values['resource-name'], //资源名称
            "tags":[
              ...tag1,
              ...tag2,
              ...tag3
            ], // dropdown下的所有选项 风格，引擎选项
            "file": file,  // 资源上传fileid
            "version": values['resource-version'], //资源版本号
            "label": [ //自定义标签
              ...this.tags
            ],
            "images": [ // 资源缩略图fileid
              ...images
            ],
            "descriptipon": values['resource-description'] //资源描述
          }
        }).then(response=>{
          
          this.$message.success('发布成功')
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
      //console.log(tags);
      this.tags = tags;
    },


    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus()
      })
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