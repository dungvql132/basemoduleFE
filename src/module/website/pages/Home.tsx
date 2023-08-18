import Layout3 from '@src/module/base/compoments/layouts/Layout3'
import React from 'react'
import Header from '../compoments/Header'
import Footer from '../compoments/Footer'

export const HomePage: React.FC = () => {
  return <Layout3 Header={<Header />} Footer={<Footer />} Content2={<></>} Content1={<></>}></Layout3>
}

export default HomePage
