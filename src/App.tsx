import ThemeContainer from './module/base/compoments/theme/ThemeContainer'
import authRoutesConfig from '@src/module/auth/routes'
import { useRoutes } from 'react-router-dom'
import webRoutesConfig from './module/website/routes'

function App() {
  const authRoutes = useRoutes(authRoutesConfig)
  const webRoutes = useRoutes(webRoutesConfig)
  return (
    <ThemeContainer>
      {authRoutes}
      {webRoutes}
    </ThemeContainer>
  )
}

export default App
