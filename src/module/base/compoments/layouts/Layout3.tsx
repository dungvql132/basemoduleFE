import React, { ReactNode, useState } from 'react'
import { Row, Col } from 'antd'

interface LayoutProps {
  Header?: ReactNode
  Footer?: ReactNode
  Content1?: ReactNode
  Content2?: ReactNode
  Content3?: ReactNode
}

const Layout3: React.FC<LayoutProps> = ({ Header, Footer, Content1, Content2, Content3 }) => {
  const changeColSpanBegin = 3
  const firstColSpanDefault = 5
  const secondColSpanDefault = 15

  const [firstColSpan, setFirstColSpan] = useState(firstColSpanDefault)
  const [secondColSpan, setSecondColSpan] = useState(secondColSpanDefault)

  const handleFirstColSpan = () => {
    if (firstColSpan === firstColSpanDefault) {
      setFirstColSpan(firstColSpan - changeColSpanBegin)
      setSecondColSpan(secondColSpan + changeColSpanBegin)
    } else {
      setFirstColSpan(firstColSpan + changeColSpanBegin)
      setSecondColSpan(secondColSpan - changeColSpanBegin)
    }
  }
  return (
    <div style={{ minHeight: '100vh' }}>
      <Row style={{ background: '#f0f0f0', borderBottom: '1px solid #ddd' }}>
        <Col span={24}>{Header}</Col>
      </Row>
      <Row gutter={16} style={{ minHeight: '80vh', position: 'relative' }}>
        <Col span={firstColSpan} onClick={handleFirstColSpan}>
          {Content1}
        </Col>
        <Col span={secondColSpan}>{Content2}</Col>
        <Col span={4}>{Content3}</Col>
      </Row>
      <Row style={{ background: '#f0f0f0', borderBottom: '1px solid #ddd' }}>
        <Col span={24}>{Footer}</Col>
      </Row>
    </div>
  )
}

export default Layout3
