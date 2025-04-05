import React, { useEffect, useState } from 'react';
import ThemeContainer from './module/base/compoments/theme/ThemeContainer';
import authRoutesConfig from '@src/module/auth/routes';
import { useRoutes, Navigate } from 'react-router-dom';
import webRoutesConfig from './module/website/routes';
import { Enviroment } from '@src/constants/eviroment';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');

      if (!accessToken || !userId) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch(`${Enviroment.backendUrl}/checkUser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken }),
        });
        const data = await response.json();

        if (data.responseStatus === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  // Nếu chưa kiểm tra xong, có thể hiển thị loading hoặc không làm gì
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  const authRoutes = useRoutes(authRoutesConfig);
  const webRoutes = useRoutes(webRoutesConfig);
  // Nếu chưa đăng nhập, chuyển hướng về trang login
  if (!isAuthenticated) {
    // Kiểm tra nếu người dùng chưa đăng nhập và đang ở ngoài trang login và register
    if (location.pathname !== '/login' && location.pathname !== '/register') {
      return (
        <ThemeContainer>
          {authRoutes}
          <Navigate to="/login" /> {/* Điều hướng đến trang login */}
        </ThemeContainer>
      );
    }
  
    return (
      <ThemeContainer>
        {authRoutes}
      </ThemeContainer>
    );
  }

  return (
    <ThemeContainer>
      {authRoutes}
      {webRoutes}
    </ThemeContainer>
  );
}

export default App;
