import Layout2 from '@src/module/base/compoments/layouts/Layout2'
import React from 'react'
import LoginForm from '../compoments/Login'

export const LoginPage: React.FC = () => {
  return <Layout2 Header={<></>} Content2={<></>} Content1={<LoginForm />}></Layout2>
}

export default LoginPage
