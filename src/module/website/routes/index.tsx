import DailyDiaryPage from '../pages/DailyDiaryPage';
import DiaryPage from '../pages/DiaryPage'
import HomePage from '../pages/HomePage'
import { HomePageFunction } from "@src/constants/homepageFunction";

const webRoutesConfig = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: `/${HomePageFunction.diary.link}`,
    element: <DiaryPage />
  },
  {
    path: "/diary/:id", // Route mới cho nhật ký chi tiết
    element: <DailyDiaryPage />
  }
]

export default webRoutesConfig
