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

export const RegisterForm: React.FC = () => {
  const [form] = Form.useForm()
  const { t } = useTranslation()

  const handleRegister = async (values: { email: string; password: string; name: string }) => {
    try {
      const response = await fetch(`${Enviroment.backendUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (data.responseStatus === 200) {
        message.success(t(StringText.REGISTER_SUCCESS))
        // Ví dụ: window.location.href = '/login';
      } else {
        message.error(data.message || t(StringText.REGISTER_FAILED))
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
        onFinish={handleRegister}
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

        <Form.Item
          label={t(StringText.NAME)}
          name="name"
          rules={[{ required: true, message: t(StringText.REQUIRED_NAME) }]}
        >
          <Input placeholder={t(StringText.ENTER_NAME)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t(StringText.REGISTER)}
          </Button>
        </Form.Item>
      </Form>

      <hr style={{ width: '100%' }} />
    </Div>
  )
}

export default RegisterForm
