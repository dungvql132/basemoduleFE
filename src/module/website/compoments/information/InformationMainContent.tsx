import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, DatePicker, message, Tag, Row, Col, Card, Typography, Divider, Tooltip, Select, Space } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Enviroment } from '@src/constants/eviroment';
import {CapacityType} from '@src/constants/Type';
import { PlusSquareOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Title, Text } = Typography;

interface Capacity {
    id: number;
    informationId: number;
    description: string;
    type: string;
    createDate: string;
    updateDate: string;
}

interface UserData {
    id: number;
    userId: number;
    name: string;
    currentLocation: string;
    birthday: string;
    email: string;
    website: string;
    createDate: string;
    updateDate: string;
    capacities: Capacity[];
}

const Container = styled.div`
  padding: 24px;
`;

const InfoCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 12px;
  font-size: 20px;
`;

const CapacityItem = styled.li`
  margin-bottom: 8px;
`;

const InformationMainContent: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalCreateInformationVisible, setIsModalCreateInformationVisible] = useState<boolean>(false);
    const [isModalEditCapacityVisible, setIsModalEditCapacityVisible] = useState<boolean>(false);
    const [isModalCreateCapacityVisible, setIsModalCreateCapacityVisible] = useState<boolean>(false);
    const [isResetData, setIsResetData] = useState<boolean>(false);
    const [selectedCapacity, setSelectedCapacity] = useState<Capacity | null>(null);
    const [form] = Form.useForm();
    const [formEditCapacity] = Form.useForm();
    const [formCreateCapacity] = Form.useForm();
    const userId = Number(localStorage.getItem('userId'));

    useEffect(() => {
        handleFetchFirstData();
    }, []);

    const handleFetchFirstData = () => {
        fetch(`${Enviroment.backendUrl}/information/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.responseStatus === 200) {
                    setUserData(data.data);
                } else {
                    setUserData(null);
                }
                setLoading(false);
            })
            .catch(() => {
                setUserData(null);
                setLoading(false);
            });
    }

    const handleCreateInformation = (values: any) => {
        const formattedValues = {
            ...values,
            birthday: values.birthday.toISOString(),
        };

        fetch(`${Enviroment.backendUrl}/information`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedValues),
        })
            .then(response => response.json())
            .then(data => {
                if (data.responseStatus === 200) {
                    message.success('Information created successfully');
                    setIsModalCreateInformationVisible(false);
                    window.location.reload();
                } else {
                    message.error('Failed to create information');
                }
            })
            .catch(() => {
                message.error('Failed to create information');
            });
    };

    const handleEditCapacity = (values: any) => {
        if (!selectedCapacity) return;

        const formattedValues = {
            ...values,
            informationId: userData?.id,
        };

        fetch(`${Enviroment.backendUrl}/capacity/${selectedCapacity.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedValues),
        })
            .then(response => response.json())
            .then(data => {
                if (data.responseStatus === 200) {
                    message.success('Capacity updated successfully');
                    setIsModalEditCapacityVisible(false);
                    setSelectedCapacity(null);
                    handleFetchFirstData(); // reload data
                } else {
                    message.error('Failed to update capacity');
                }
            })
            .catch(() => {
                message.error('Failed to update capacity');
            });
    };


    const showCreateInformationModal = () => {
        setIsModalCreateInformationVisible(true);
    };

    const handleCancelInformationModal = () => {
        setIsModalCreateInformationVisible(false);
    };

    const showEditCapacityModal = (capacity: Capacity) => {
        setSelectedCapacity(capacity);
        formEditCapacity.setFieldsValue({
            description: capacity.description,
            type: capacity.type,
        });
        setIsModalEditCapacityVisible(true);
    };


    const handleCancelCapacityModal = () => {
        setIsModalEditCapacityVisible(false);
    };

    const showCreateCapacityModal = () => {
        setIsModalCreateCapacityVisible(true);
    };

    const handleCancelCreateCapacityModal = () => {
        setIsModalCreateCapacityVisible(false);
    };


    const handleCreateCapacity = (values: any) => {
        const payload = {
            ...values,
            informationId: userData?.id,
        };

        fetch(`${Enviroment.backendUrl}/capacity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.responseStatus === 200) {
                    message.success('Capacity created successfully');
                    setIsModalCreateCapacityVisible(false);
                    handleFetchFirstData(); // Làm mới dữ liệu
                } else {
                    message.error('Failed to create capacity');
                }
            })
            .catch(() => {
                message.error('Failed to create capacity');
            });
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {userData ? (
                <>
                    <Row gutter={24}>
                        {/* Left Side */}
                        <Col span={6}>
                            <Card>
                                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                                    <div
                                        style={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: '50%',
                                            backgroundColor: '#ddd',
                                            margin: '0 auto',
                                        }}
                                    />
                                    <Typography.Title level={3} style={{ marginTop: 16 }}>
                                        {userData.name}
                                    </Typography.Title>
                                </div>

                                <Divider orientation="left">Thông tin cá nhân</Divider>
                                <Typography.Paragraph>🎂 {dayjs(userData.birthday).format('DD/MM/YYYY')}</Typography.Paragraph>
                                <Typography.Paragraph>📧 {userData.email}</Typography.Paragraph>
                                <Typography.Paragraph>📍 {userData.currentLocation}</Typography.Paragraph>
                                <Typography.Paragraph>🔗 {userData.website || 'N/A'}</Typography.Paragraph>

                                <Divider orientation="left">Kỹ năng</Divider>
                                <Typography.Paragraph type="secondary">(Chưa có dữ liệu kỹ năng)</Typography.Paragraph>

                                <Divider orientation="left">Sở thích</Divider>
                                <Typography.Paragraph type="secondary">(Chưa có dữ liệu sở thích)</Typography.Paragraph>
                            </Card>
                        </Col>

                        {/* Right Side */}
                        <Col span={18}>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Card title={<Space>
                                        <Text>Điểm mạnh</Text>
                                        <Tooltip placement="topLeft" title={"Thêm Điểm Mạnh"}>
                                            <PlusSquareOutlined onClick={showCreateCapacityModal} style={{ cursor: 'pointer' }} />
                                        </Tooltip>
                                    </Space>} style={{ marginBottom: 16, backgroundColor: "rgb(182, 255, 182)" }}>
                                        {userData.capacities.map((value) => {
                                            if (value.type === CapacityType.STRONG)
                                                return (
                                                    <Tooltip placement="topLeft" title={"Chỉnh sửa điểm mạnh"}>
                                                        <Typography.Paragraph
                                                            key={value.id}
                                                            onClick={() => showEditCapacityModal(value)}
                                                            type="secondary"
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {value.description}
                                                        </Typography.Paragraph>
                                                    </Tooltip>
                                                );
                                            return null;
                                        })}

                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card title={<Space>
                                        <Text>Điểm yếu</Text>
                                        <Tooltip placement="topLeft" title={"Thêm Điểm Yếu"}>
                                            <PlusSquareOutlined onClick={showCreateCapacityModal} style={{ cursor: 'pointer' }} />
                                        </Tooltip>
                                    </Space>} style={{ marginBottom: 16, backgroundColor: 'rgb(255, 170, 170)' }}>
                                        {userData.capacities.map((value) => {
                                            if (value.type === CapacityType.WEAK)
                                                return (
                                                    <Tooltip placement="topLeft" title={"Chỉnh sửa điểm yếu"}>
                                                        <Typography.Paragraph
                                                            key={value.id}
                                                            onClick={() => showEditCapacityModal(value)}
                                                            type="secondary"
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {value.description}
                                                        </Typography.Paragraph>
                                                    </Tooltip>
                                                );
                                            return null;
                                        })}
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Modal
                        title="Edit Capacity"
                        open={isModalEditCapacityVisible}
                        onCancel={handleCancelCapacityModal}
                        footer={null}
                    >
                        <Form
                            form={formEditCapacity}
                            onFinish={handleEditCapacity}
                            layout="vertical"
                        >
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: true, message: 'Please input description!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="type"
                                label="Type"
                                rules={[{ required: true, message: 'Please select a type!' }]}
                            >
                                <Select placeholder="Select a type">
                                    <Option value={CapacityType.STRONG}>{CapacityType.STRONG}</Option>
                                    <Option value={CapacityType.WEAK}>{CapacityType.WEAK}</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Save
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal title="Create Capacity" open={isModalCreateCapacityVisible} onCancel={handleCancelCreateCapacityModal} footer={null}>
                        <Form form={form} onFinish={handleCreateCapacity} layout="vertical">
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: true, message: 'Please input description!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="type"
                                label="Type"
                                rules={[{ required: true, message: 'Please select a type!' }]}
                            >
                                <Select placeholder="Select a type">
                                    <Option value={CapacityType.STRONG}>{CapacityType.STRONG}</Option>
                                    <Option value={CapacityType.WEAK}>{CapacityType.WEAK}</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Save
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            ) : (
                <div>
                    <p>You don't have Information, Please create one.</p>
                    <Button type="primary" onClick={showCreateInformationModal}>
                        Create Information
                    </Button>
                    <Modal title="Create Information" open={isModalCreateInformationVisible} onCancel={handleCancelInformationModal} footer={null}>
                        <Form form={formCreateCapacity} onFinish={handleCreateInformation} layout="vertical">
                            <Form.Item name="userId" initialValue={1} hidden>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="currentLocation"
                                label="Current Location"
                                rules={[{ required: true, message: 'Please input your current location!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="birthday"
                                label="Birthday"
                                rules={[{ required: true, message: 'Please input your birthday!' }]}
                            >
                                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="website" label="Website">
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            )}
        </div>
    );

};

export default InformationMainContent;
