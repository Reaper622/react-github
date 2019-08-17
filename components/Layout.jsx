import {useState,useCallback} from 'react'
import getCofnig from 'next/config'
import { connect } from 'react-redux'
import { withRouter} from 'next/router'
import axios from 'axios'


import Link from 'next/link'
import { Button, Layout, Icon, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd'
const { Header, Content, Footer } = Layout

import Container from './Container'

import { Logout } from '../store/store'

const { publicRuntimeConfig } = getCofnig()


const githubIconStyle = {
  color: 'white',
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20,
}

const footerStyle = {
  textAlign: 'center'
}

const Comp = ({color, children, style}) => <div style={{color, ...style}}>{children}</div>


function MyLayout ({ children, user, logout, router })  {
  const [search,setSearch] = useState('')

  const handleSearchChange = useCallback((event) => {
    setSearch(event.target.value)
  }, [setSearch])

  const handleOnSearch = useCallback(() => {}, [])

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  const handleGotoAuth = useCallback((e) => {
    e.preventDefault()
    axios.get(`/prepare-auth?url=${router.asPath}`)
      .then(res => {
        if(res.status === 200) {
          location.href = publicRuntimeConfig.OAUTH_URL
        } else {
          console.log('prepare auth failed', res)
        }
      }).catch(err => {
        console.log('prepare auth failed', err)
      })
  },[])

  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a onClick={handleLogout}>
          登出
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />} >
          <div className="header-left">
            <Icon type="github" style={githubIconStyle} />
            <div>
              <Input.Search 
              placeholder="搜索仓库"
              value={search}
              onChange={handleSearchChange}
              onSearch={handleOnSearch} />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {
                (user && user.id) ? (
                  <Dropdown overlay={userDropDown}>
                    <a href="/">
                      <Avatar size={40} src={user.avatar_url} />
                    </a>
                  </Dropdown>
                ) : (
                  <Tooltip title="点击进行登录">
                    <a href={`/prepare-auth?url=${router.asPath}`} >
                      <Avatar size={40} icon="user" />
                    </a>
                  </Tooltip>
                )
              }
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container>{children}</Container>
      </Content>
      <Footer style={footerStyle}>
        Develop by Reaper622 @<a href="mailto:reaperlee622@gmail.com">Reaper622</a>
      </Footer>
      <style jsx>{`
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left{
          display: flex;
          justify-content: flex-start;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          height: 100%;
        }
        .ant-layout-header{
          padding-left: 0;
          padding-right: 0;
        }
        `}</style>
    </Layout>
  )
}

export default connect(function mapState(state) {
  return {
    user: state.user
  }
}, function mapReducer(dispatch) {
  return {
    logout: () => dispatch(Logout())
  }
})(withRouter(MyLayout))