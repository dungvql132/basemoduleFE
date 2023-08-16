import Layout1 from './module/base/compoments/layouts/Layout2'
import RegisterForm from './module/auth/compoments/register'
import ThemeContainer from './module/base/compoments/theme/ThemeContainer'

function App() {
  return (
    <ThemeContainer>
      <Layout1 Header={<></>} Content2={<></>} Content1={<RegisterForm />}></Layout1>
    </ThemeContainer>
  )
}

export default App
