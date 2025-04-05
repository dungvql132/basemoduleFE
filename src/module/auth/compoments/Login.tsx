import React from 'react'
import { Form, Input, Button, message } from 'antd'
import styled from 'styled-components'
import { Enviroment } from '@src/constants/eviroment'
import { useTranslation } from 'react-i18next'
import StringText from '@src/constants/StringText'

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

export const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  console.log("dịch: ",t('login'));
  

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const response = await fetch(`${Enviroment.backendUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })

      const data = await response.json()

      if (data.responseStatus === 200) {
        localStorage.setItem('accessToken', data.accessToken)
        message.success(t(StringText.LOGIN_SUCCESS))

        const checkUserResponse = await fetch(`${Enviroment.backendUrl}/checkUser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessToken: data.accessToken,
          }),
        })

        const userData = await checkUserResponse.json()

        if (userData.responseStatus === 200) {
          localStorage.setItem('userId', userData.data.id.toString())
          message.success(t(StringText.USER_VERIFIED))
          window.location.href = '/'
        } else {
          message.error(t(StringText.USER_VERIFY_FAILED))
        }
      } else {
        message.error(data.message || t(StringText.LOGIN_FAILED))
      }
    } catch (error) {
      message.error(t(StringText.ERROR_OCCURRED))
    }
  }

  return (
    <Div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ layout: 'vertical' }}
        onFinish={handleLogin}
      >
        <Form.Item
          label={t(StringText.EMAIL)}
          name="email"
          rules={[{ required: true, message: t(StringText.REQUIRED_EMAIL) }]}
        >
          <Input placeholder={t(StringText.ENTER_EMAIL)} />
        </Form.Item>

        <Form.Item
          label={t(StringText.PASSWORD)}
          name="password"
          rules={[{ required: true, message: t(StringText.REQUIRED_PASSWORD) }]}
        >
          <Input.Password placeholder={t(StringText.ENTER_PASSWORD)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t(StringText.LOGIN)}
          </Button>
        </Form.Item>
      </Form>

      <hr style={{ width: '100%' }} />
    </Div>
  )
}

export default LoginForm
