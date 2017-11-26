import React, { Component } from 'react';
import { HashRouter as Router, Link} from 'react-router-dom'
import { Table, Button, Popconfirm, message, Pagination } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const { Column } = Table;
const { shape, string, arrayOf, number, func, bool } = PropTypes;

class Skill extends Component {
  static propTypes = {
    match: shape({ url: string }),
    dispatch: func.isRequired,
    list: arrayOf(shape()).isRequired,
    loading: bool,
    current: number
  };
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
    let params = {
      id: this.state.delete_id,
      onSuccess(msg){
        message.success(msg)
      },
      onError(msg){
        message.success(msg)
      }
    }
    this.props.dispatch({ type: 'skills/deleteOne' , payload: params });
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

	handleTableChange = (pagination) => {
    this.setState({current: pagination})
    this.fetch({page: pagination});
  }
  fetch = (params = {page: 1}) => {
    this.setState({ loading: true });
    this.props.dispatch({ type: 'skills/queryAll' , payload: params});
  }
  componentWillReceiveProps(){
    // console.log(this.props)
  }
  componentDidMount() {
    this.fetch();
  }
  render() {
    const { list, total, current, loading } = this.props;
    return (
      <div className="list-con">
        <Button type="primary"><Link to="/add">新增</Link></Button>  
      	<Table 
      	  rowKey={record => record.post_id}
      	  dataSource={list}
      	  pagination={false}
      	  loading={loading}      	  
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
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.skills.list,
  total: state.skills.total,
  current: state.skills.current,
  loading: state.loading.effects['skills/queryAll'],
});

export default connect(mapStateToProps)(Skill);