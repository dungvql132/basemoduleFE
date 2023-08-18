import { Form, Input, Button } from 'antd'
import styled from 'styled-components'
import React from 'react'

const Div = styled.div`
  position: absolute;
  width: 80%;
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 50%;
  transform: translateY(-50%);
  .ant-form.ant-form-vertical {
    width: 100%;
  }
`

export const RegisterForm: React.FC = () => {
  const [form] = Form.useForm()
  // const [errorMessge, setErrorMessge] = React.useState('')
  return (
    <Div>
      <Form
        layout={'vertical'}
        form={form}
        initialValues={{
          layout: 'vertical'
        }}
        onFinish={() => {}}
      >
        <Form.Item label='Email' name={'email'}>
          <Input placeholder='input email' />
        </Form.Item>
        <Form.Item label='Password' name={'password'}>
          <Input.Password placeholder='input password' />
        </Form.Item>
        <Form.Item label='Name' name={'name'}>
          <Input placeholder='input name' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <hr style={{ width: '100%' }} />
    </Div>
  )
}

export default RegisterForm
