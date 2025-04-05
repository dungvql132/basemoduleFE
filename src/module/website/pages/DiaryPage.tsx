import Layout3 from '@src/module/base/compoments/layouts/Layout3'
import React from 'react'
import Header from '../../base/compoments/layouts/Header'
import Footer from '../../base/compoments/layouts/Footer'
import Diary from '../compoments/diary/Diary'

export const DiaryPage: React.FC = () => {
  return <Layout3 Header={<Header />} Footer={<Footer />} Content1={<></>} Content2={<Diary />} Content3={<></>}></Layout3>
}

export default DiaryPage
