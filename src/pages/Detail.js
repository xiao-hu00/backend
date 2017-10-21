import React, { Component } from 'react';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

class Detail extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      post_detail: {},
      pic_name:'',
      pic_url: ''
    };
  }
  fetch(){
    let id = (this.props.location.search).replace(/\?id=/g,'');
    let _this = this;
    let promise = new Promise(function(resolve, reject){
      axios.post('http://127.0.0.1:3003/api/detail',{
        id: parseInt(id, 10)
      })
      .then((data) => {
        _this.setState({
          post_detail: data.data.data[0],
          pic_name: data.data.pic_filename,
        })
        resolve()
      });
    })

    promise.then(() => {
      // 请求图片
      axios.post('http://127.0.0.1:3003/api/getpic',{
        filename: _this.state.pic_name
      }).then((data) => {
        if(data.data.url === '') return;
        _this.setState({
          pic_url: data.data.url,
        })
      })
    });
    
  }
	componentWillMount() {
    this.fetch();
  }
  componentDidUpdate() {
    document.getElementById("detail_content").innerHTML = this.state.post_detail.post_con;
  }
  render() {
    return (
      <div className="post-detail">
        <div className="title">
          标题： {this.state.post_detail.post_title}
        </div>
        <div className="detail-pic">
          <img src={this.state.pic_url} alt="图片" width="200"/>
        </div>
        <div className="ql-container ql-snow post-detail-con">
          <div className="ql-editor" id="detail_content" data-gramm="false">

          </div>
        </div>
        
      </div>
    );
  }
}



export default Detail;