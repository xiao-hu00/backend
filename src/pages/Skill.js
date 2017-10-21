import React, { Component } from 'react';
import { HashRouter as Router, Link} from 'react-router-dom'
import { Table, Button, Popconfirm, message } from 'antd';

import axios from 'axios';
const { Column } = Table;

class Skill extends Component {
  constructor(props){
    super(props)
    this.deleteItem = this.deleteItem.bind(this)
    this.confirm = this.confirm.bind(this)
    this.cancel = this.cancel.bind(this)
  }
	state = {
    data: [],
    pagination: {},
    loading: false,
    delete_id: ''
  };
  confirm(){
    let _this = this;
    axios.post('http://127.0.0.1:3003/api/delete',{
      id: _this.state.delete_id
    })
    .then((data) => {
      message.success(data.data.msg)
      _this.fetch();
    })
  }
  cancel(){
    message.info("取消删除该条数据")
  }
  deleteItem(e){
    let id = e.target.dataset.id
    this.setState({
      delete_id: id
    })
  }

	handleTableChange = (pagination, filters) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      // results: pagination.pageSize,
      page: pagination.current,
      ...filters,
    });
  }
  fetch = (params = {}) => {
    this.setState({ loading: true });
    axios.post('http://127.0.0.1:3003/api/list',{
    	page: params.page || 1,
      page_size: 10
    })
  	.then((data) => {
      const pagination = { ...this.state.pagination };
      pagination.total = parseInt(data.data.data.total, 10);
      this.setState({
        loading: false,
        data: data.data.data.list,
        pagination,
      });
    });
  }
  componentDidMount() {
    this.fetch();
  }
  render() {
    return (
      <div className="list-con">
        <Button type="primary"><Link to="/add">新增</Link></Button>  
      	<Table 
      	  rowKey={record => record.post_id}
      	  dataSource={this.state.data}
      	  pagination={this.state.pagination}
      	  loading={this.state.loading}
      	  onChange={this.handleTableChange}
          >
          <Column
              title="编号"
              dataIndex="post_id"
            />
          <Column
              title="Title"
              render = {(text ,record) => (<Link to={{ pathname:"/detail", search: `?id=${record.post_id}` }}>{record.post_title}</Link>)}
            />
          <Column
              title="Author"
              dataIndex="post_author"
            />
          <Column
              title="Time"
              dataIndex="post_time"
            />
          <Column
              title="Action"
              render={(text, record) => (
                <Router>
                  <span>
                    <Link to={{
                        pathname: '/edit',
                        search: `?id=${record.post_id}`,
                        state: { fromDashboard: true }
                      }}>编辑</Link>
                    <span className="ant-divider" />
                    <Popconfirm title="你确定要删除这条数据吗" onConfirm={this.confirm} onCancel={this.cancel} okText="确认" cancelText="取消">
                      <a onClick={this.deleteItem} data-id={record.post_id}>删除</a>
                    </Popconfirm>
                  </span>
                </Router>
              )}
            />
      	</Table>
      </div>
    );
  }
}


export default Skill;