import React from "react";
import styled from "styled-components";
import { Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { HomePageFunction, IHomePageFunctionContent } from "@src/constants/homepageFunction";
import { useTranslation } from "react-i18next";

// Styled Components cho Card
const StyledCard = styled(Card)`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid black;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 10px rgba(24, 144, 255, 0.3);
    transform: translateY(-3px);
  }
`;

// Styled Components cho Container chính
const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate(); // Hook điều hướng
  const { t } = useTranslation();

  return (
    <Container>
      {/* Hàng chứa các ô (Cards) */}
      <Row gutter={16} justify="center" style={{ marginBottom: "20px" }}>
        {Object.values(HomePageFunction as unknown as Record<string, IHomePageFunctionContent>).map((item) => (
          <Col style={{ marginBottom: "20px" }} span={6} key={item.link}>
            <StyledCard hoverable onClick={() => navigate(`/${item.link}`)}>
              {t(item.display)}
            </StyledCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
