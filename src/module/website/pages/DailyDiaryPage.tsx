import Layout3 from '@src/module/base/compoments/layouts/Layout3'
import React from 'react'
import Header from '../../base/compoments/layouts/Header'
import Footer from '../../base/compoments/layouts/Footer'
import Diary from '../compoments/diary/Diary'
import DailyDiary from '../compoments/diary/DailyDiary'

export const DailyDiaryPage: React.FC = () => {
  return <Layout3 Header={<Header />} Footer={<Footer />} Content1={<></>} Content2={<DailyDiary />} Content3={<></>}></Layout3>
}

export default DailyDiaryPage
