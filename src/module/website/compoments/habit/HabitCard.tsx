// src/components/HabitCard.tsx
import React, { useState } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  message,
  Popconfirm
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import { Enviroment } from "@src/constants/eviroment";
import { Habit } from "../../interfaces/IHabit";

interface HabitCardProps {
  habit: Habit;
  refreshHabits: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, refreshHabits }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [editGoal, setEditGoal] = useState<Habit["habitGoals"][0] | null>(null);
  const [editStep, setEditStep] = useState<Habit["habitSteps"][0] | null>(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [stepForm] = Form.useForm();
  const BASE_URL = Enviroment.backendUrl;

  const openCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(true);
  };

  const openEditModal = (goal: Habit["habitGoals"][0]) => {
    setEditGoal(goal);
    editForm.setFieldsValue({
      duration: goal.duration,
      note: goal.note
    });
    setIsEditModalOpen(true);
  };

  const openEditStepModal = (step?: Habit["habitSteps"][0]) => {
    if (step) {
      setEditStep(step);
      stepForm.setFieldsValue({
        stepCount: step.stepCount,
        description: step.description
      });
    } else {
      setEditStep(null);
      stepForm.resetFields();
    }
    setIsStepModalOpen(true);
  };

  const handleCreateHabitGoal = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        habitId: habit.id,
        actionDate: values.actionDate.toISOString()
      };
      await axios.post(`${BASE_URL}/habitGoal`, payload);
      message.success("HabitGoal created successfully");
      setIsCreateModalOpen(false);
      refreshHabits();
    } catch (error) {
      message.error("Failed to create HabitGoal");
    }
  };

  const handleEditHabitGoal = async () => {
    if (!editGoal) return;
    try {
      const values = await editForm.validateFields();
      const payload = {
        duration: values.duration,
        note: values.note
      };
      await axios.put(`${BASE_URL}/habitGoal/${editGoal.id}`, payload);
      message.success("HabitGoal updated successfully");
      setIsEditModalOpen(false);
      refreshHabits();
    } catch (error) {
      message.error("Failed to update HabitGoal");
    }
  };

  const handleDeleteHabitGoal = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/habitGoal/${id}`);
      message.success("HabitGoal deleted successfully");
      refreshHabits();
    } catch (error) {
      message.error("Failed to delete HabitGoal");
    }
  };

  const handleSubmitHabitStep = async () => {
    try {
      const values = await stepForm.validateFields();
      const payload = {
        stepCount: values.stepCount,
        description: values.description
      };
      if (editStep) {
        await axios.put(`${BASE_URL}/habitStep/${editStep.id}`, payload);
        message.success("HabitStep updated successfully");
      } else {
        await axios.post(`${BASE_URL}/habitStep`, {
          ...payload,
          habitId: habit.id
        });
        message.success("HabitStep created successfully");
      }
      setIsStepModalOpen(false);
      refreshHabits();
    } catch (error) {
      message.error("Failed to submit HabitStep");
    }
  };

  const handleDeleteHabitStep = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/habitStep/${id}`);
      message.success("HabitStep deleted successfully");
      refreshHabits();
    } catch (error) {
      message.error("Failed to delete HabitStep");
    }
  };

  return (
    <>
      <Card key={habit.id} title={habit.description} style={{ marginBottom: 16 }}>
        <p><strong>Type:</strong> {habit.type}</p>

        <p style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong>Goals:</strong>
          <Button type="text" icon={<PlusOutlined />} onClick={openCreateModal} />
        </p>

        <ul>
          {habit.habitGoals.map((goal) => (
            <li key={goal.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>
                Duration: {goal.duration} mins | Date: {moment(goal.actionDate).format("YYYY-MM-DD")} | Note: {goal.note || "-"}
              </span>
              <span>
                <Button icon={<EditOutlined />} type="text" onClick={() => openEditModal(goal)} />
                <Popconfirm
                  title="Are you sure to delete this goal?"
                  onConfirm={() => handleDeleteHabitGoal(goal.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button icon={<DeleteOutlined />} type="text" danger />
                </Popconfirm>
              </span>
            </li>
          ))}
        </ul>

        <p style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong>Steps:</strong>
          <Button type="text" icon={<PlusOutlined />} onClick={() => openEditStepModal()} />
        </p>

        <ul>
          {habit.habitSteps.map((step) => (
            <li key={step.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>
                Step {step.stepCount}: {step.description}
              </span>
              <span>
                <Button icon={<EditOutlined />} type="text" onClick={() => openEditStepModal(step)} />
                <Popconfirm
                  title="Are you sure to delete this step?"
                  onConfirm={() => handleDeleteHabitStep(step.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button icon={<DeleteOutlined />} type="text" danger />
                </Popconfirm>
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Modal for Creating HabitGoal */}
      <Modal
        title="Create HabitGoal"
        open={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        onOk={handleCreateHabitGoal}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="duration" label="Duration (minutes)" rules={[{ required: true }]}> 
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="actionDate" label="Action Date" rules={[{ required: true }]}> 
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="note" label="Note"> 
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Editing HabitGoal */}
      <Modal
        title="Edit HabitGoal"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={handleEditHabitGoal}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item name="duration" label="Duration (minutes)" rules={[{ required: true }]}> 
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="note" label="Note"> 
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Create/Edit HabitStep */}
      <Modal
        title={editStep ? "Edit HabitStep" : "Create HabitStep"}
        open={isStepModalOpen}
        onCancel={() => setIsStepModalOpen(false)}
        onOk={handleSubmitHabitStep}
      >
        <Form form={stepForm} layout="vertical">
          <Form.Item name="stepCount" label="Step Count" rules={[{ required: true }]}> 
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}> 
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default HabitCard;
