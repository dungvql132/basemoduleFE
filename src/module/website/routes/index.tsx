import HabitMainContent from '../compoments/habit/HabitMainContent';
import InformationMainContent from '../compoments/information/InformationMainContent';
import DailyDiaryPage from '../pages/DailyDiaryPage';
import DiaryPage from '../pages/DiaryPage'
import HabitPage from '../pages/HabitPage';
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
    path: `/${HomePageFunction.information.link}`,
    element: <InformationMainContent />
  },
  {
    path: `/${HomePageFunction.habit.link}`,
    element: <HabitPage />
  },
  {
    path: "/diary/:id", // Route mới cho nhật ký chi tiết
    element: <DailyDiaryPage />
  }
]

export default webRoutesConfig
