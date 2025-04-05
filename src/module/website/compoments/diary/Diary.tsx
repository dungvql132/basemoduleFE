// src/components/Diary.tsx

import React, { useEffect, useState } from "react";
import { Row, Col, Card, Spin, Alert, Button, Modal } from "antd";
import { Enviroment } from "@src/constants/eviroment";
import FormSubmitDiary from "./FormSubmitDiary"; // Import component form
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import StringText from '@src/constants/StringText';

// Interface cho dữ liệu từ API
interface Diary {
  id: number;
  name: string;
  dailyDiaries: {
    id: number;
    content: string;
    eventDate: string;
  }[];
}

const Diary: React.FC = () => {
  const { t } = useTranslation();
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái modal
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await fetch(`${Enviroment.backendUrl}/diary`);
        const result = await response.json();

        if (result.responseStatus === 200) {
          setDiaries(result.data);
        } else {
          setError(t(StringText.ERROR_API)); // Thông báo lỗi API
        }
      } catch (err) {
        setError(t(StringText.ERROR_SERVER)); // Thông báo lỗi server
      } finally {
        setLoading(false);
      }
    };

    fetchDiaries();
  }, []);

  const handleCreateDiary = async (values: { name: string }) => {
    try {
      const response = await fetch(`${Enviroment.backendUrl}/diary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: Number(userId),
          name: values.name,
        }),
      });

      const result = await response.json();

      if (result.responseStatus === 200) {
        setDiaries((prevDiaries) => [
          ...prevDiaries,
          {
            id: result.data.id,
            name: result.data.name,
            dailyDiaries: [],
          },
        ]);
        setIsModalVisible(false); // Đóng modal sau khi gửi dữ liệu
      } else {
        setError(t(StringText.ERROR_API)); // Thông báo lỗi API khi không thể tạo nhật ký
      }
    } catch (err) {
      setError(t(StringText.ERROR_SERVER)); // Thông báo lỗi server khi không thể tạo nhật ký
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row>
        <Col span={12}>
          <h2>📖 Danh sách Nhật ký</h2>
        </Col>
        <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="primary"
            style={{ marginTop: "20px" }}
            onClick={() => setIsModalVisible(true)}
          >
            {t(StringText.CREATE_DIARY)}  {/* Sử dụng key từ StringText */}
          </Button>
        </Col>
      </Row>

      {loading && <Spin size="large" />}
      {error && <Alert message={error} type="error" showIcon />}

      <Row gutter={16} justify="center" style={{ marginTop: "20px" }}>
        {diaries.map((diary) => (
          <Col span={6} key={diary.id}>
            <Link to={`/diary/${diary.id}`}>
              <Card title={diary.name} bordered hoverable>
                {/* Không hiển thị nội dung của dailyDiaries */}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* Modal Tạo Nhật Ký */}
      <Modal
        title={t(StringText.CREATE_DIARY)}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <FormSubmitDiary onFinish={handleCreateDiary} />
      </Modal>
    </div>
  );
};

export default Diary;
