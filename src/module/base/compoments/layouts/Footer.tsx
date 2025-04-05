import { Layout } from 'antd'

const { Footer } = Layout

const CustomFooter = () => {
  return (
    <Footer className='footer'>
      {/* Nội dung của Footer */}© {new Date().getFullYear()} Your Website. All rights reserved.
    </Footer>
  )
}

export default CustomFooter
