import React, { ReactNode } from 'react'
import { Row, Col } from 'antd'

interface LayoutProps {
  Header: ReactNode
  Content1: ReactNode
  Content2: ReactNode
}

const Layout1: React.FC<LayoutProps> = ({ Header, Content1, Content2 }) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Row style={{ background: '#f0f0f0', borderBottom: '1px solid #ddd' }}>
        <Col span={24}>{Header}</Col>
      </Row>
      <Row>
        <Col span={16}>{Content1}</Col>
        <Col span={8} style={{ background: '#f9f9f9' }}>
          {Content2}
        </Col>
      </Row>
    </div>
  )
}

export default Layout1
