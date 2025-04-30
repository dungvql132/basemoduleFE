import Layout3 from '@src/module/base/compoments/layouts/Layout3'
import React from 'react'
import Header from '../../base/compoments/layouts/Header'
import Footer from '../../base/compoments/layouts/Footer'
import HabitMainContent from '../compoments/habit/HabitMainContent'

export const HabitPage: React.FC = () => {
  return <Layout3 Header={<Header />} Footer={<Footer />} Content1={<></>} Content2={<HabitMainContent />} Content3={<></>}></Layout3>
}

export default HabitPage
