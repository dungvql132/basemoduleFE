import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Row, Space, Typography, DatePicker, Modal, Form, Input, Tooltip, message, Popconfirm } from "antd";
import styled from "styled-components";
import dayjs, { Dayjs } from "dayjs";
import { RangeValue } from "rc-picker/lib/interface";
import { Enviroment } from "@src/constants/eviroment";
import diaryPageBackground from "@src/public/diarypage-background.jpg";
import diaryPageBackground1 from "@src/public/diarypage-background1.jpg";
import { PlusSquareOutlined } from "@ant-design/icons";
const showMessage = (type: "success" | "info" | "warning" | "error", content: string) => {
    message[type](content);
};
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

// Styled Components
const Container = styled.div`
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  border: 2px solid black;
`;

const DiaryHeader = styled.div`
  padding: 15px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const DailyContent = styled.div`
  padding: 15px;
  margin-bottom: 10px;
  color: black;
`;

const EventCard = styled(Card)`
    background-image: url("${diaryPageBackground1}");
    background-size: 'repeat';
    background-position: 'center';
    border: 2px solid black;
`;

const EventContainer = styled.div`
  padding: 10px;
`;

const DiaryItem = styled.div`
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
  }
`;

const DailyDiary: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [diary, setDiary] = useState<any>(null);
    const [fromDate, setFromDate] = useState<Dayjs>(dayjs().subtract(10, "days"));
    const [endDate, setEndDate] = useState<Dayjs>(dayjs());
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Modal tạo sự kiện
    const [isDetailModalVisible, setIsDetailModalVisible] = useState<boolean>(false); // Modal chi tiết nhật ký
    const [modalData, setModalData] = useState<any>(null);
    const [form] = Form.useForm(); // Form dùng cho các hành động chính
    const [formEvent] = Form.useForm(); // Form dùng cho tạo sự kiện
    const [formDailyEdit] = Form.useForm(); // Form chỉnh sửa nhật ký
    const [isEditMode, setIsEditMode] = useState(false);  // Trạng thái Edit Mode
    const [isEditingEvent, setIsEditingEvent] = useState<number | null>(null); // Trạng thái chỉnh sửa sự kiện
    const [isNeedFetchData, setIsNeedFetchData] = useState<number>(0); // Trạng thái chỉnh sửa sự kiện

    // Hàm gọi API để lấy dữ liệu nhật ký
    const fetchDiaryData = () => {
        const fromDateStr = fromDate.format("YYYY-MM-DD");
        const endDateStr = endDate.format("YYYY-MM-DD");

        fetch(
            `${Enviroment.backendUrl}/diary/${id}?lang=vietnamese&fromDate=${fromDateStr}&endDate=${endDateStr}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.responseStatus === 200) {
                    setDiary(data.data);
                }
            })
            .catch((error) => showMessage("error", error));
    };

    // Gọi lại API mỗi khi có sự thay đổi từDate và endDate
    useEffect(() => {
        fetchDiaryData();
    }, [id, fromDate, endDate]);

    // Hàm xử lý thay đổi ngày tháng
    const handleDateChange = (values: RangeValue<Dayjs>, formatString: [string, string]) => {
        if (values && values[0] && values[1]) {
            setFromDate(values[0]);
            setEndDate(values[1]);
        }
    };

    const handleSubmit = () => {
        // Mở modal khi bấm Submit
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        // Lấy giá trị từ form tạo sự kiện
        const eventDate = formEvent.getFieldValue("eventDate").format("YYYY-MM-DDTHH:mm:ss.SSSZ");
        const content = formEvent.getFieldValue("content");

        const body = {
            diaryId: Number(id),  // Đảm bảo diaryId đã có sẵn
            content: content,
            eventDate: eventDate,
        };

        // Gọi API để gửi thông tin
        fetch(`${Enviroment.backendUrl}/daily-diary`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.responseStatus === 200) {
                    showMessage("success", "Sự kiện đã được tạo thành công");
                    setIsModalVisible(false);
                    formEvent.resetFields(); // Reset form sau khi gửi thành công
                    fetchDiaryData();
                }
            })
            .catch((error) => showMessage("error", error));
    };

    const handleModalCancel = () => {
        setIsModalVisible(false); // Đóng modal khi bấm Cancel
    };

    const handleDetailModalCancel = () => {
        setIsDetailModalVisible(false); // Đóng modal chi tiết nhật ký
        if(isNeedFetchData === 1){
            setIsNeedFetchData(0);
            fetchDiaryData();
        }
    };

    const handleDiaryItemClick = (dailyId: string) => {
        // Gọi API lấy dữ liệu chi tiết của nhật ký khi click vào
        fetch(`${Enviroment.backendUrl}/daily-diary/${dailyId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.responseStatus === 200) {
                    setModalData(data.data);
                    setIsDetailModalVisible(true); // Hiển thị modal chi tiết nhật ký
                }
            })
            .catch((error) => showMessage("error", error));
    };

    const handleCreateEvent = () => {
        if (modalData) {
            const body = {
                content: "",
                eventDate: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                dailyDiaryId: modalData.id,
            };

            // Gọi API tạo sự kiện mới
            fetch(`${Enviroment.backendUrl}/event`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.responseStatus === 200) {
                        showMessage("success", "Sự kiện mới đã được tạo!");

                        // Sau khi tạo thành công, reload lại modal để lấy dữ liệu mới nhất
                        fetch(`${Enviroment.backendUrl}/daily-diary/${modalData.id}`)
                            .then((res) => res.json())
                            .then((data) => {
                                if (data.responseStatus === 200) {
                                    setModalData(data.data);  // Cập nhật dữ liệu mới
                                    setIsDetailModalVisible(false);  // Đóng modal
                                    setIsDetailModalVisible(true);   // Mở lại modal với dữ liệu mới
                                    setIsNeedFetchData(1);
                                }
                            })
                            .catch((error) => showMessage("error", error));
                    }
                })
                .catch((error) => showMessage("error", error));
        }
    };

    // Hàm chuyển chế độ chỉnh sửa nhật ký
    const handleEditMode = () => {
        setIsEditMode(true);
    };

    // Hàm chuyển chế độ xem nhật ký
    const handleViewMode = () => {
        setIsEditMode(false);
        formDailyEdit.resetFields(); // Reset form khi quay lại view mode
    };

    // Hàm lưu dữ liệu chỉnh sửa nhật ký
    const handleSave = () => {
        if (modalData) {
            const updatedContent = formDailyEdit.getFieldValue("content");
            const updatedEventDate = formDailyEdit.getFieldValue("eventDailyDate");

            // Cập nhật nhật ký
            fetch(`${Enviroment.backendUrl}/daily-diary/${modalData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: updatedContent,
                    eventDate: updatedEventDate,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.responseStatus === 200) {
                        showMessage("success", "Daily diary updated successfully");

                        // Reload modal data sau khi lưu
                        fetch(`${Enviroment.backendUrl}/daily-diary/${modalData.id}`)
                            .then((res) => res.json())
                            .then((data) => {
                                if (data.responseStatus === 200) {
                                    setModalData(data.data);  // Cập nhật dữ liệu mới
                                    handleViewMode();
                                    setIsNeedFetchData(1);
                                }
                            })
                            .catch((error) => showMessage("error", error));
                    }
                })
                .catch((error) => showMessage("error", error));
        }
    };

    // Hàm chỉnh sửa sự kiện
    const handleEditEvent = (eventId: number) => {
        setIsEditingEvent(eventId); // Cho phép chỉnh sửa sự kiện này
    };

    // Hàm lưu sự kiện
    const handleSaveEvent = (eventId: number) => {
        const updatedEventContent = formEvent.getFieldValue(`eventContent`);
        const updatedEventDate = formEvent.getFieldValue(`eventDate`).format("YYYY-MM-DDTHH:mm:ss.SSSZ");

        fetch(`${Enviroment.backendUrl}/event/${eventId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: updatedEventContent,
                eventDate: updatedEventDate,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.responseStatus === 200) {
                    showMessage("success", `Event ${eventId} updated successfully`);

                    // Reload modal data sau khi lưu
                    fetch(`${Enviroment.backendUrl}/daily-diary/${modalData.id}`)
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.responseStatus === 200) {
                                setModalData(data.data);  // Cập nhật dữ liệu mới
                                handleCancelEditEvent();
                                setIsNeedFetchData(1);
                            }
                        })
                        .catch((error) => showMessage("error", error));
                }
            })
            .catch((error) => showMessage("error", error));
    };

    const handleDeleteEvent = (eventId: number) => {
        fetch(`${Enviroment.backendUrl}/event/${eventId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.responseStatus === 200) {
                    showMessage("success", `Event ${eventId} deleted successfully`);

                    // Reload modal data sau khi lưu
                    fetch(`${Enviroment.backendUrl}/daily-diary/${modalData.id}`)
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.responseStatus === 200) {
                                setModalData(data.data);  // Cập nhật dữ liệu mới
                                handleCancelEditEvent();
                                setIsNeedFetchData(1);
                            }
                        })
                        .catch((error) => showMessage("error", error));
                }
            })
            .catch((error) => showMessage("error", error));
    };

    const handleDeleteDailyDiary = (dailyId: number) => {
        fetch(`${Enviroment.backendUrl}/daily-diary/${dailyId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.responseStatus === 200) {
                    showMessage("success", `Daily Diary ${dailyId} deleted successfully`);
                    setIsNeedFetchData(1);
                    handleDetailModalCancel();
                }
            })
            .catch((error) => showMessage("error", error));
    };

    const handleDeleteDiary = (diaryId: number) => {
        fetch(`${Enviroment.backendUrl}/diary/${diaryId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.responseStatus === 200) {
                    showMessage("success", `Daily Diary ${diaryId} deleted successfully`);
                    window.location.href = '/diary';
                }
            })
            .catch((error) => showMessage("error", error));
    };

    // Hàm hủy chỉnh sửa sự kiện
    const handleCancelEditEvent = () => {
        setIsEditingEvent(null); // Hủy chỉnh sửa sự kiện
    };

    if (!diary) return <Text>Loading...</Text>;

    return (
        <Container>
            <Space direction="horizontal" style={{ marginBottom: "20px" }}>
                <Text>Từ:</Text>
                <RangePicker value={[fromDate, endDate]} onChange={handleDateChange} />
                <Button type="primary" onClick={handleSubmit}>
                    Thêm mục nhật ký
                </Button>
                <Popconfirm
                    title="Bạn có chắc chắn muốn xóa nhật ký này không?"
                    onConfirm={() => handleDeleteDiary(Number(id))}
                    okText="Đồng ý"
                    cancelText="Hủy"
                >
                    <Button danger>
                        Xóa
                    </Button>
                </Popconfirm>
            </Space>

            {/* Tiêu đề nhật ký */}
            <DiaryHeader>{diary.name}</DiaryHeader>

            {/* Hiển thị nhật ký theo ngày */}
            {diary.dailyDiaries.map((daily: any) => (
                <Tooltip placement="topLeft" title={"Chỉnh sửa nhật ký"}>
                    <DiaryItem key={daily.id} onClick={() => handleDiaryItemClick(daily.id)}>
                        <Title level={4}>
                            {`Vào lúc ${dayjs(daily.eventDate).format("HH:mm:ss")} ngày ${dayjs(daily.eventDate).format("DD/MM/YYYY")}`}
                        </Title>
                        <Row gutter={16}>
                            {/* Nội dung nhật ký */}
                            <Col style={{
                                backgroundImage: `url("${diaryPageBackground}")`,
                                backgroundSize: 'repeat',
                                backgroundPosition: 'center'
                            }} span={16}>
                                <DailyContent>{daily.content}</DailyContent>
                            </Col>

                            {/* Danh sách sự kiện */}
                            <Col span={8} >
                                <EventContainer>
                                    {daily.events.map((event: any) => (
                                        <EventCard style={{ marginBottom: "5px" }} key={event.id} title={dayjs(event.eventDate).format("HH:mm")}>
                                            <Text>{event.content}</Text>
                                        </EventCard>
                                    ))}
                                </EventContainer>
                            </Col>
                        </Row>
                    </DiaryItem>
                </Tooltip>
            ))}

            {/* Modal tạo sự kiện */}
            <Modal
                title="Tạo mục nhật ký"
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText="Tạo mục nhật ký"
                cancelText="Hủy"
            >
                <Form form={formEvent} layout="vertical" initialValues={{ eventDate: dayjs() }}>
                    <Form.Item label="Ngày viết" name="eventDate">
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>
                    <Form.Item label="Nội dung" name="content">
                        <Input.TextArea rows={4} placeholder="Mô tả sự kiện..." />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal chi tiết nhật ký */}
            <Modal
                visible={isDetailModalVisible}
                onCancel={handleDetailModalCancel}
                footer={null}
                width={800}
            >
                {modalData && (
                    <>
                        <Row style={{ margin: "20px 0", paddingBottom: "5px" }}>
                            <Typography.Title level={4} style={{ color: "#000000", margin: 0 }}>
                                {`Chi tiết nhật ký ngày ${dayjs(modalData.eventDate).format("DD/MM/YYYY")}`}
                            </Typography.Title>
                        </Row>
                        {isEditMode ? (
                            <Form form={formDailyEdit} layout="vertical" initialValues={{ content: modalData.content, eventDailyDate: dayjs(modalData.eventDate) }}>
                                <Form.Item label="Nội dung nhật ký" name="content">
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                                <Form.Item label="Ngày sự kiện" name="eventDailyDate">
                                    <DatePicker showTime />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" onClick={handleSave}>Lưu</Button>
                                    <Button onClick={handleViewMode} style={{ marginLeft: "10px" }}>Hủy</Button>
                                </Form.Item>
                            </Form>
                        ) : (
                            <div>
                                <Tooltip placement="topLeft" title={"Chỉnh sửa nội dung nhật ký"}>
                                    <Text onClick={handleEditMode} style={{ marginTop: "10px" }} >{modalData.content}</Text>
                                </Tooltip>
                            </div>
                        )}
                        <Row style={{ margin: "20px 0", borderTop: "2px solid rgb(0, 0, 0)", paddingBottom: "5px" }}>
                            <Typography.Title level={4} style={{ color: "#000000", margin: 0 }}>
                                Sự kiện
                                <Tooltip placement="topLeft" title={"Tạo sự kiện"}>
                                    <Button onClick={handleCreateEvent}><PlusSquareOutlined /></Button>
                                </Tooltip>
                            </Typography.Title>
                        </Row>
                        {/* Các sự kiện của nhật ký */}
                        <Row gutter={16}>
                            {modalData.events.map((event: any) => (
                                <Col span={8} key={event.id}>
                                    <Card title={
                                        <Space>
                                            <Tooltip placement="topLeft" title={"chỉnh sửa sự kiện"}>
                                                <Text onClick={() => handleEditEvent(event.id)}>{dayjs(event.eventDate).format("HH:mm")}</Text>
                                            </Tooltip>
                                        </Space>
                                    }>
                                        {isEditingEvent === event.id ? (
                                            <Form form={formEvent} layout="vertical" initialValues={{ eventContent: event.content, eventDate: dayjs(event.eventDate) }}>
                                                <Form.Item label="Nội dung" name="eventContent">
                                                    <Input.TextArea rows={4} />
                                                </Form.Item>
                                                <Form.Item label="Ngày sự kiện" name="eventDate">
                                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                                </Form.Item>
                                                <Button type="primary" onClick={() => handleSaveEvent(event.id)}>Lưu</Button>
                                                <Button onClick={handleCancelEditEvent} style={{ marginLeft: "7px", marginRight: "7px" }}>Hủy</Button>
                                                <Popconfirm
                                                    title="Bạn có chắc chắn muốn xóa sự kiện này không?"
                                                    onConfirm={() => handleDeleteEvent(event.id)}
                                                    okText="Đồng ý"
                                                    cancelText="Hủy"
                                                >
                                                    <Button danger>
                                                        Xóa
                                                    </Button>
                                                </Popconfirm>
                                            </Form>
                                        ) : (
                                            <Space>
                                                <Tooltip placement="topLeft" title={"chỉnh sửa sự kiện"}>
                                                    <Text onClick={() => handleEditEvent(event.id)}>{event.content}</Text>
                                                </Tooltip>
                                            </Space>
                                        )}
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <Row style={{ margin: "20px 0", paddingBottom: "5px" }}>
                            <Typography.Title level={4} style={{ color: "#000000", margin: 0 }}>
                                <Popconfirm
                                    title="Bạn có chắc chắn muốn xóa mục nhật ký này không?"
                                    onConfirm={() => handleDeleteDailyDiary(modalData.id)}
                                    okText="Đồng ý"
                                    cancelText="Hủy"
                                >
                                    <Button danger>
                                        Xóa mục nhật ký
                                    </Button>
                                </Popconfirm>
                            </Typography.Title>
                        </Row>
                    </>
                )}
            </Modal>
        </Container>
    );
};

export default DailyDiary;
