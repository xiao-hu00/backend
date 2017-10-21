import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, withRouter } from 'react-router-dom'
// import { Redirect } from 'react-router'
import { Menu, Icon, Button, Dropdown, Breadcrumb ,Layout, Form, Input, message} from 'antd';
import Skill from '../pages/Skill'
import Home1 from '../pages/Home'
import Edit from '../pages/Edit'
import Add from '../pages/Add'
import Detail from '../pages/Detail'
import Cookie from 'js-cookie'
import axios from 'axios'

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;

const Daily = () => (
  <div className="main-content">
    <h2>daily</h2>
  </div>
)
const dropmenu = (
  <Menu>
    <Menu.Item key="0">
      <a href="/Home">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="/Home">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3d menu item</Menu.Item>
  </Menu>
);

const breadcrumbNameMap = {
  '/skill': '技术文章',
  '/daily': '其他文章',
  '/story': 'story',
  '/team': 'team',
  '/videos': 'videos',
  '/blog': 'blog',
  '/blog/diary': 'diary',
  '/blog/moods': 'moods',
  '/blog/news': 'news',
  '/blog/sheet': 'sheet',
  '/blog/videos': 'videos',
  '/contact': 'contact',
  '/edit': '编辑文章',
  '/detail': '文章详情',
  '/add': '新增文章',
};
const Home = withRouter((props) => {
  const { location } = props;
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}> 
       {/* <Link to={url}> */}
          {breadcrumbNameMap[url]}
       {/* </Link> */}
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [(
    <Breadcrumb.Item key="home">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>
  )].concat(extraBreadcrumbItems);
  return (
    <div className="little-nav">
      <Breadcrumb>
        {breadcrumbItems}
      </Breadcrumb>
    </div>
  );
});

// Cookie.remove('name')
// Cookie.remove('token')

class LoginSuccess extends Component{
  state = {
    collapsed: false,
    mode: 'inline',
    menuClass: false,
    conClass: false,
    menuKey: ['1'],
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }
  componentWillMount(){
    // 刷新后能找到对应的菜单
    let key = localStorage.current_key || ['1'];
    let key_arr = [];
    if(key === '7'||key === '8'||key === '9'||key === '10'||key === '11'){
      key_arr.push('sub1')
    }
    this.setState({menuKey: key.split()})
    this.setState({subKeys: key_arr})
  }
  handleClick = (e) => {
    localStorage.current_key = e.key;
  }
  render() {
    return (
      <Router>
      <div className="root1">
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            >      
            <div className="logo">
            </div>
            <Menu
              defaultSelectedKeys={this.state.menuKey}
              mode={this.state.mode}
              theme="dark"
              inlineCollapsed={this.state.collapsed}
              onClick={this.handleClick}
              defaultOpenKeys={this.state.subKeys}
              >

              <Menu.Item key="1">    
                <Link to="/"><Icon type="pie-chart" /><span>首页</span></Link>
              </Menu.Item>
              <Menu.Item key="2">    
                <Link to="/skill"><Icon type="code-o" /><span>技术文章</span></Link>
              </Menu.Item>
              <Menu.Item key="3">    
                <Link to="/daily"><Icon type="inbox" /><span>其他文章</span></Link>
              </Menu.Item>

              <Menu.Item key="4">    
                <Link to="/story"><Icon type="inbox" /><span>story</span></Link>
              </Menu.Item>
              <Menu.Item key="5">    
                <Link to="/team"><Icon type="inbox" /><span>team</span></Link>
              </Menu.Item>
              <Menu.Item key="6">    
                <Link to="/videos"><Icon type="inbox" /><span>videos</span></Link>
              </Menu.Item>

              <SubMenu key="sub1" title={<span><Icon type="book" /><span>Blog</span></span>}>
                <Menu.Item key="7"><Link to="/blog/diary"><Icon type="code-o" /><span>blog/diary</span></Link></Menu.Item>
                <Menu.Item key="8"><Link to="/blog/moods"><Icon type="code-o" /><span>blog/moods</span></Link></Menu.Item>
                <Menu.Item key="9"><Link to="/blog/news"><Icon type="code-o" /><span>blog/news</span></Link></Menu.Item>
                <Menu.Item key="10"><Link to="/blog/sheet"><Icon type="code-o" /><span>blog/sheet</span></Link></Menu.Item>
                <Menu.Item key="11"><Link to="/blog/videos"><Icon type="code-o" /><span>blog/videos</span></Link></Menu.Item>
              </SubMenu>
              <Menu.Item key="12">    
                <Link to="/contact"><Icon type="inbox" /><span>contact</span></Link>
              </Menu.Item>
            </Menu>                       
          </Sider>

          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} >
              <div className="set">
                <Dropdown overlay={dropmenu} trigger={['click']}>
                  <span className="ant-dropdown-link">
                    个人设置 <Icon type="down" />
                  </span>
                </Dropdown>
              </div>
            </Header>

            <Content style={{ margin: '0 16px' }}>
              <Home />
              <Route exact path="/" component={Home1}/>
              <Route path="/skill" component={Skill}/>
              <Route path="/daily" component={Daily}/>
              <Route path="/story" component={Daily}/>
              <Route path="/team" component={Daily}/>
              <Route path="/blog/diary" component={Daily}/>
              <Route path="/blog/moods" component={Daily}/>
              <Route path="/blog/news" component={Daily}/>
              <Route path="/blog/sheet" component={Daily}/>
              <Route path="/blog/videos" component={Daily}/>
              <Route path="/contact" component={Daily}/>
              <Route path="/edit" component={Edit}/>
              <Route path="/detail" component={Detail}/>
              <Route path="/add" component={Add}/>    
            </Content> 

            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2016 Created by Ant UED
            </Footer>

          </Layout>
        </Layout>
      </div>
      </Router>
    );
  }
}

class route extends Component {
  state = {
    logined: Cookie.get('token'),
    username: '',
    password: '',
  };
  constructor(props){
    super(props);
    this.login = this.login.bind(this)
    this.setUsername = this.setUsername.bind(this)
    this.setPassword = this.setPassword.bind(this)
  }
  setUsername(e){
    this.setState({
      username: e.target.value
    });
  }
  setPassword(e){
    this.setState({
      password: e.target.value
    });
  }
  login(e){
    let _this = this;
    if(!Cookie.get('token')){
      axios.post('http://127.0.0.1:3003/api/login',{
        username: _this.state.username,
        password: _this.state.password
      }).then((response) => {
        console.log(response.data.msg);
        if(response.data.msg === "ok"){
          console.log(response.data.msg)
          Cookie.set('token', response.data.token, { expires: 7 })
          Cookie.set('name', response.data.user.name, { expires: 7 })
          _this.setState({logined: true});
          return false;        
        }else{
          console.log(response.data.msg)
          message.warning(response.data.msg);
          return false;
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  render() {
    if(this.state.logined) {
     return (
      <LoginSuccess />
     )
    }
    return (
      <div className="login-page">        
        <Form onSubmit={this.login} className="login-form">
          <FormItem>
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" value={this.state.username} onChange={this.setUsername} />
          </FormItem>
          <FormItem>
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" value={this.state.password} onChange={this.setPassword}/>
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    );
    
    
  }
}

export default route;