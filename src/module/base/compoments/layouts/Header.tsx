import { useState } from 'react'
import { Layout, Menu, Dropdown, Avatar, Row, Col } from 'antd'
import { HomeOutlined, UserOutlined, DownOutlined } from '@ant-design/icons'
import { HomePageFunction, IHomePageFunctionContent } from '@src/constants/homepageFunction'
import { useTranslation } from 'react-i18next'

const { Header } = Layout

const CustomHeader = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menu = (
    <Menu>
      <Menu.Item key='1'>Profile</Menu.Item>
      <Menu.Item key='2'>Settings</Menu.Item>
      <Menu.Item key='3'>Logout</Menu.Item>
    </Menu>
  )

  return (
    <Header className='header'>
      <Row>
        <Col span={19}>
          <div className='logo'>{/* Icon của trang web */}</div>
          <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']} className='menu'>
            <Menu.Item onClick={() => { window.location.href = '/' }} key='1' icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            {Object.values(HomePageFunction as unknown as Record<string, IHomePageFunctionContent>).map((item) => (
              <Menu.Item onClick={() => { window.location.href = `/${item.link}` }} key={item.link}>{t(item.display)}</Menu.Item>
            ))}
          </Menu>
        </Col>
        <Col span={3} style={{ color: 'white' }}>
          { }
        </Col>
        <Col span={2}>
          <div className='user-icon'>
            <Dropdown overlay={menu} trigger={['click']} visible={isMenuOpen} onVisibleChange={handleMenuClick}>
              <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
                <Avatar icon={<UserOutlined />} />
                <DownOutlined />
              </a>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Header>
  )
}

export default CustomHeader
