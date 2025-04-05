import Layout3 from '@src/module/base/compoments/layouts/Layout3'
import React from 'react'
import Header from '../../base/compoments/layouts/Header'
import Footer from '../../base/compoments/layouts/Footer'
import HomeMainContent from '../compoments/home/HomeMainContent'

export const HomePage: React.FC = () => {
  return <Layout3 Header={<Header />} Footer={<Footer />} Content1={<></>} Content2={<HomeMainContent />} Content3={<></>}></Layout3>
}

export default HomePage
