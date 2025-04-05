// FormSubmitDiary.tsx
import React from "react";
import { Form, Input, Button } from "antd";

// Interface nhận props từ Diary.tsx
interface FormSubmitDiaryProps {
  onFinish: (values: { name: string }) => void;
}

const FormSubmitDiary: React.FC<FormSubmitDiaryProps> = ({ onFinish }) => {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ name: "" }}
    >
      <Form.Item
        name="name"
        label="Tên Nhật Ký"
        rules={[{ required: true, message: "Vui lòng nhập tên nhật ký!" }]}
      >
        <Input placeholder="Nhập tên nhật ký" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Gửi
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormSubmitDiary;
