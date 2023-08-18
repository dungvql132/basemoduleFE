import { LoginPage } from '../pages/Login'
import { RegisterPage } from '../pages/Register'

const authRoutesConfig = [
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
]

export default authRoutesConfig
