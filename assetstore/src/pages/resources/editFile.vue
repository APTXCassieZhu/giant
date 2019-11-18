<template>
  <div style="background:#eff2f5;padding-bottom:200px;">
    <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
    <section class="uploadfile">

      <a-form id="components-form-demo-validate-other" :form="form" >
        <div class="form-wrap">
          <div class="uploadfile-l">
            <section class="">
              <header class="uploadfile-header">STEP.1 <br/>资源编辑</header>
              <a-form-item v-bind="formItemLayout" label="" style="">
                <div class="dropbox" style="margin:10px 0;">
                  <a-upload-dragger

                    v-decorator="[
                      'dragger',
                      {
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile
                      }
                    ]"
                    :beforeUpload="beforeUpload"
                    name="files"
                    action="/api/file/upload"
										:headers="{token:this.$store.state.token}"
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
                      <p>支持 ZIP ，请将单个文件控制在 200 MB之内</p>
                    </p>
                  </a-upload-dragger>
                </div>
              </a-form-item>

            </section>

            <section>
              <header class="uploadfile-header">STEP.2 <br/>资源信息编辑</header>
   
               <a-form-item label="资源名称：" :label-col="labelCol" :wrapper-col="wrapperCol ">
                <a-input
                  v-decorator="['resource-name', { rules: [{ required: true, message: '请输入资源名称' }] }]"
                />
              </a-form-item>

              <a-form-item v-bind="formItemLayout" label="初始版本号："  :label-col="labelCol" :wrapper-col="wrapperCol "> 
                <a-input
                  v-decorator="['resource-version', { rules: [{ required: true, message: '请填写版本号' }] }]"
                />
              </a-form-item>
              <!-- <a-form-item v-bind="formItemLayout" label="文件描述："  :label-col="labelCol" :wrapper-col="wrapperCol ">
                <a-textarea v-decorator="['resource-description', { rules: [{ required: true, message: '请填写文件描述' }] }]"
                placeholder="Basic usage" :rows="4" />
              </a-form-item> -->
              <section class="editor-wrap">
                <div class="editor-label"> <span>文件描述：</span> </div>
                <div>
                  <div ref="editor-owo" class="editor-owo"></div>
                  <div ref="editor-owo-content" class="editor-owo-content"></div>
                </div>
                
              </section>
              <a-form-item v-bind="formItemLayout" label="资源分类：" :label-col="labelCol" :wrapper-col="wrapperCol ">
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
              <a-form-item v-bind="formItemLayout" label=" " :label-col="labelCol" :wrapper-col="wrapperCol ">
                <a-cascader  v-decorator="[ 'resource-cascader',{
                    rules:[{ required: true, message: '请选择一个分类' }]
                  },
                  ]" :options="options"  placeholder="请选择一个分类" />
              </a-form-item>

              <template v-if="showArtStyle">
                <a-form-item v-bind="formItemLayout" label="美术资源风格：" :label-col="labelCol" :wrapper-col="wrapperCol ">
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


              <a-form-item v-bind="formItemLayout" label="引擎选项（可选）" :label-col="labelCol" :wrapper-col="wrapperCol ">
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
                <div class="checkboxgroup-wrap">
                  <a-checkbox :indeterminate="indeterminate" @change="onCheckAllChange" :checked="checkAll">
                    全选
                  </a-checkbox>
                  <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="checkboxChange" />
                </div>
                
              </template>
            
              <template v-if="showCheckBoxGroup=='unreal'">
                <div class="checkboxgroup-wrap">
                  <a-checkbox :indeterminate="indeterminate_unreal" @change="onCheckAllChangeUnreal" :checked="checkAll_unreal">
                    全选
                  </a-checkbox>
                  <a-checkbox-group :options="plainOptions_unreal" v-model="checkedList_unreal" @change="checkboxChangeUnreal" />

                </div>
              </template>
            </section>


            <section>
              <a-form-item v-bind="formItemLayout" label="自定义标签" :label-col="labelCol" :wrapper-col="wrapperCol ">
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
                <a-tag v-else @click="showInput" ref="enterIpt" style="background: #fff; borderStyle: dashed;">
                  <a-icon type="plus" /> 增加标签
                </a-tag>
              </a-form-item>
        
            </section>

            <section>
              <header class="uploadfile-header" >
                STEP.3 <br/>展示用媒体
              </header>
              <a-form-item
                v-bind="formItemLayout"
              >
                <a-upload
                  action="/api/file/upload"
                  listType="picture-card"
                  :multiple="false"
                  :beforeUpload="beforeUpload2"
									:headers="{token:this.$store.state.token}"
                  @preview="handlePreview"
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
                <a-modal :visible="previewVisible" :footer="null"  @cancel="handleCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </a-form-item>
            </section>


            <a-form-item style="border:none;">
              <input style="background:#1ebf73;margin-top:60px; border:none;outline:none;cursor:pointer;width:100%;height:67px;font-size:17px;font-weight:bold;color:#fff;" 
              @click="handleSubmit"  type="button" value="保存"/>
            </a-form-item>
          </div>

          <section class="uploadfile-r">
            <div class="uploadfile-r-wrap" >
              <header class="uploadfile-header">
                其他设置
              </header>
            
              <div class="file-public-switch">
								<span>是否公开</span>
								<a-switch :defaultChecked="this.isPublic" @change="onChangeSwitch" />
							</div>
              <p style="color:#7d7d7d;">* 开启该选项意味着其他用户可以自由浏览、下载和使用你的资源</p>
            </div>
            
          </section>
        </div>
      </a-form>
    </section>
   </div>
</template>

<style>
.ant-form-item-label{
  display: flex;
}
.ant-form-item-label label{
  font-size:16px;
  color:#7f7f7f;
  font-weight: bold;
}
.ant-row{
  margin:30px 0;
}
.ant-upload.ant-upload-drag{
  padding:15px 0;
}
</style>
<style scoped lang="less">
.file-public-switch{
	margin: 30px 0;
	display: flex;
	font-size: 16px;
	color: #7f7f7f;
	font-weight: bold;
	justify-content: space-between;
}
.checkboxgroup-wrap{
  margin-left: 289px;
  margin-top: -18px;
}
.editor-wrap{
  display:flex;
  >div{
    width:570px;
    height:200px;
  }
  .editor-owo{
    // border:1px solid blue;
    border: 1px solid #ccc;
  }
  .editor-owo-content{
    height:180px;
    border: 1px solid #ccc;
    // border:1px solid red;
  }
  .editor-label{
    width:233px;
    font-size: 16px;
    color: #7f7f7f;
    font-weight: bold;
    // border:1px solid black;
    
    &::before {
      display: inline-block;
      margin-right: 4px;
      color: #f5222d;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
      content: '*';
    }
    
  }
}
.form-wrap{
  display:flex;
  background:#fff;
  width:100%;
  max-width:1380px;
  margin:0 auto;
  box-sizing: border-box;
  padding:50px 60px 120px 85px;

}
.form-wrap .ant-form-item-label label {
  color: #7f7f7f;
  font-size: 16px;
}
.uploadfile{
  // display: flex;
  // box-sizing: border-box;
  position: relative;
  margin-top:75px;
  &-header{
    color:#7f7f7f;
    font-size:23px;
    font-weight: bold;
  }
  color:#7f7f7f;
  padding:20px;

  &-l{
    width:800px;
    box-sizing: border-box;
  }
  &-l>section{
    border-bottom:1px solid #e5e5e5;
    box-sizing: border-box;
    padding:10px 0;
    margin-bottom:10px;
    
  }
  &-l>div{
    border:1px solid #ddd;
    margin:15px 0;
  }
  &-r{
    box-sizing: border-box;
    // flex:1;
  }
  &-r-wrap{

    border-left: 1px solid #e5e5e5;
    height: 301px;
    width: 363px;
    margin-left: 84px;
    box-sizing: border-box;
    padding-left: 86px;

  }
}
#components-form-demo-validate-other .dropbox {
  //height: 180px;
  line-height: 1.5;
}
</style>
<script>
import TopNavigation from '@/components/TopNav'
import marked from 'marked'
import Vue from 'vue'



var plainOptions = []
var defaultCheckedList = []

var plainOptions_unreal = []
var defaultCheckedList_unreal = []




export default {
  components:{TopNavigation},
  props:[],
  data(){
    return{
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions,

      checkedList_unreal: defaultCheckedList_unreal,
      indeterminate_unreal: true,
      checkAll_unreal: false,
      plainOptions_unreal,


			isPublic:true,
      showArtStyle:false,
      art_v : '',
      art_options:[{value:'q',label:'q版风格'},{value:'j',label:'日漫'}],
      engine_options:{
        unity:[],
        unreal:[]
      },
      editor:null,
      
      labelCol:{span:4},
      wrapperCol:{ span: 17 ,offset:3},
      unity_checkall:false,
      unreal_checkall:false,
      
      options:[ ],

      formItemLayout: {
        // labelCol: { span: 6 },
        // wrapperCol: { span: 14 },
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
           that.checkedList = []
           that.checkedList_unreal = []
         }
        


        //  if(keys.length ===1 && keys[0] === 'checkbox-group-unreal' || keys[0] === 'checkbox-group-unity'){
          
        //  }    
       }
    })
  },
  mounted(){

    document.querySelector('#components-form-demo-validate-other').addEventListener('keydown',e=>{

      if(e.keyCode===13 && e.target.classList.contains('ant-input-sm')){
        e.preventDefault()
      }

    })

    
    let E = window.wangEditor
    let editor = new E(this.$refs['editor-owo'],this.$refs['editor-owo-content'])
    editor.customConfig.zIndex = 2
    this.editor = editor
		
		
     // 自定义菜单配置
    editor.customConfig.menus = [
      'head',
      'bold',
      'italic',
      'underline',
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
      'emoticon',  // 表情
    ]


    editor.create()
    
  
		axios.get(`/api/resource/${this.$route.params.resourceId}`).then(response=>{
      var res = response.data
      var data = res.data
      
      this.resource_name = data.name
			this.resource_ver = data.ver[0].verNum
			this.isPublic = data.state

			this.form.setFieldsValue({
				'resource-name':this.resource_name,
				'resource-version':this.resource_ver
			})
			
			this.editor.txt.html(data.description)
			
    })
    
    // console.log('matched:', this.$route.matched)
    axios.get(`/api/tag/tree`,{ params:{type:'engine_ver'} }).then(response=>{
      var res = response.data 
      var options = res.data
      options.forEach(o=>{
        this.engine_options[o.label] = []
        o.children.forEach((o2)=>{

          if(o.label === 'unity'){
            plainOptions.push({
              label:o2.label,
              value:o2.value
            })
          }

          if(o.label === 'unreal'){
            plainOptions_unreal.push({
              label:o2.label,
              value:o2.value

            })
          }
          
        })
        
      })

    })
  },
  created(){
    
  },
  methods:{
    checkboxChangeUnreal(checkedList){
      this.indeterminate_unreal = !!checkedList.length && checkedList.length < plainOptions_unreal.length
      this.checkAll_unreal = checkedList.length === plainOptions_unreal.length

      this.checkedList_unreal = checkedList
      console.log('checkedList_unreal:',this.checkedList_unreal)

    },
    onCheckAllChangeUnreal(e){
       Object.assign(this, {
        checkedList_unreal: e.target.checked ? plainOptions : [],
        indeterminate_unreal: false,
        checkAll_unreal: e.target.checked
      })

      if(e.target.checked){
        this.checkedList_unreal = plainOptions_unreal.map(o=>o.value)
      }else{
        this.checkedList_unreal = []
      }
      console.log('checkedList_unreal:',this.checkedList_unreal)

    },
    checkboxChange(checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length
      this.checkAll = checkedList.length === plainOptions.length

      this.checkedList = checkedList
      console.log('checkedList:',this.checkedList)
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
      })

      if(e.target.checked){
        this.checkedList = plainOptions.map(o=>o.value)
      }else{
        this.checkedList = []
      }

      console.log('checkedList:',this.checkedList)
    },


		onChangeSwitch(e){
			this.isPublic = e
		},

    beforeUpload2(file){
			if(!/jpg|jpeg|png|gif/.test(file.type)){
				this.$message.warning('请上传图片')
				return Promise.reject()
			}

      return true
    },
    beforeUpload(file){
			console.log(file)
			//
			if(file.type != 'application/x-zip-compressed'){
				this.$message.warning('请上传一个zip')
				return Promise.reject()
			}

			let isLt200 = file.size/1024/1024  < 200
			if(isLt200 > 200){
			  this.$message.warning('文件太大')
				return Promise.reject()
			}

      return true
    },
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

         //console.log(this.editor.txt.html(),this.editor.txt.html().length)
        
        // console.log('txt html:', this.editor.txt.html())

        if(err){ return  }

        if(!values.dragger) return this.$message.warning('请上传一个资源')
       
        //if(!this.editor.txt.text().length ) return this.$message.warning('请填写文件描述')

        var tag1 = values['resource-cascader']?values['resource-cascader']:[]
        var tag2 = [values['resource-art-type']]
        var tag3 = [
          ...this.checkedList,
          ...this.checkedList_unreal
        ]
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
            "descriptipon": this.editor.txt.html() //资源描述
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