import React, { Component } from 'react';
import axios from 'axios';
import { Input, Button, Upload, Icon, Modal} from 'antd';
import ReactQuill from 'react-quill'; // 富文本
import 'react-quill/dist/quill.snow.css'; // 富文本
import Cookie from 'js-cookie'

class Add extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      title: '',
      id: '',
      // 上传图片
      pic_data:[],
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleChangePic = this.handleChangePic.bind(this)
    this.submitCon = this.submitCon.bind(this)
    this.setTitle = this.setTitle.bind(this)
    this.goBack = this.goBack.bind(this)
  }
  goBack(){
    this.props.history.goBack()
  }
  handleChange(value) {
    this.setState({ 
      text: value 
    })
  }
  setTitle(e){
    this.setState({ 
      title: e.target.value
    }) 
  }
  // 新增文章
  submitCon() {
    let _this = this;
    axios.post('http://127.0.0.1:3003/api/add',{
      post_id: _this.state.id,
      post_title: _this.state.title,
      post_con: _this.state.text,
      pic_data: _this.state.pic_data,
      name: Cookie.get("name")
    }).then(function(response) {
      console.log(response.data)
      _this.props.history.goBack()
    })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChangePic = (info) => {
    let fileList = info.fileList;
    let _this = this;
    let arr = new Set()
    // 3. filter successfully uploaded files according to response from server
    fileList = fileList.map((file) => {
      if (file.response) {
        arr.add(file.response)
      }
      return file;
    });
    _this.setState({
      pic_data: [...arr]
    })
    console.log([...arr])

    this.setState({ fileList })
    console.log(fileList)
  }

	// componentWillMount() {
 //    this.fetch();
 //  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传文章图片</div>
      </div>
    );
    return (
      <div className="edit-con">
        <Input placeholder="文章标题" onChange={this.setTitle}/>
      	<ReactQuill value={this.state.text}
                  onChange={this.handleChange} 
                  modules={Add.modules}
                  formats={Add.formats}/>

        <Upload
          action="http://127.0.0.1:3003/api/uploadpic"
          listType="picture-card"
          name='avatar'
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChangePic}
          
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>


        <div className="btn-wrap">
          <Button type="primary" onClick={this.submitCon}>提交</Button>
          <Button onClick={this.goBack} type="default">返回</Button>  
        </div>
      </div>
    );
  }
}

Add.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'code-block', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ]
}

Add.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'code-block','blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]


export default Add;