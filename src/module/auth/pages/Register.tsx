import Layout2 from '@src/module/base/compoments/layouts/Layout2'
import React from 'react'
import RegisterForm from '../compoments/Register'

export const RegisterPage: React.FC = () => {
  return <Layout2 Header={<></>} Content2={<></>} Content1={<RegisterForm />}></Layout2>
}

export default RegisterPage
