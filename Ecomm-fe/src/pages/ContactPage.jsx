import React, { useEffect } from "react";
import { Row, Col, Form, Input, Button, Card, Typography, Divider, Space } from "antd";
import { 
  PhoneOutlined, 
  MailOutlined, 
  EnvironmentOutlined, 
  ClockCircleOutlined, 
  SendOutlined 
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "../styles/ContactPage/ContactPage.scss";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const ContactPage = () => {
  const [form] = Form.useForm();
  const { pathname } = useLocation();

  // Cuộn lên đầu trang khi chuyển trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const onFinish = (values) => {
    console.log("Received form values:", values);
    // Here you would typically send the form data to your backend
    form.resetFields();
  };

  return (
    <div className="contact-page">
      <div className="contact-breadcrumb">
        <div className="container">
          <Typography.Text>
            <a href="/">Trang chủ</a> / <a href="/contactPage">Liên hệ</a>
          </Typography.Text>
        </div>
      </div>

      <div className="contact-header">
        <div className="container">
          <Title level={2} className="text-center">Liên hệ với chúng tôi</Title>
          <Paragraph className="text-center">
            Có thắc mắc về sản phẩm hoặc dịch vụ của chúng tôi? Chúng tôi luôn sẵn sàng hỗ trợ.
            Vui lòng liên hệ với chúng tôi qua thông tin bên dưới hoặc bằng cách điền vào biểu mẫu liên hệ.
          </Paragraph>
        </div>
      </div>

      <div className="contact-content container">
        <Row gutter={[32, 32]} className="contact-section">
          <Col xs={24} md={12} lg={10}>
            <Card bordered={false} className="contact-info-card">
              <Title level={3}>Cửa hàng 369</Title>
              <Divider />
              
              <Space direction="vertical" size="large" className="contact-details">
                <div className="contact-item">
                  <PhoneOutlined className="contact-icon" />
                  <div>
                    <Text strong>Điện thoại</Text>
                    <Paragraph className="mb-0">+84 123 456 789</Paragraph>
                  </div>
                </div>
                
                <div className="contact-item">
                  <MailOutlined className="contact-icon" />
                  <div>
                    <Text strong>Email</Text>
                    <Paragraph className="mb-0">info@shop369.com</Paragraph>
                  </div>
                </div>
                
                <div className="contact-item">
                  <EnvironmentOutlined className="contact-icon" />
                  <div>
                    <Text strong>Địa chỉ</Text>
                    <Paragraph className="mb-0">
                      12 Nguyễn Văn Bảo , P1 - Gò Vấp<br />
                      Thành phố Hồ Chí Minh, Việt Nam
                    </Paragraph>
                  </div>
                </div>
                
                <div className="contact-item">
                  <ClockCircleOutlined className="contact-icon" />
                  <div>
                    <Text strong>Giờ làm việc</Text>
                    <Paragraph className="mb-0">
                      Thứ Hai - Thứ Sáu: 8:00 sáng - 8:00 tối<br />
                      Thứ Bảy - Chủ Nhật: 9:00 sáng - 6:00 tối
                    </Paragraph>
                  </div>
                </div>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12} lg={14}>
            <Card bordered={false} className="contact-form-card">
              <Title level={3}>Gửi tin nhắn cho chúng tôi</Title>
              <Paragraph>
                Chúng tôi sẽ phản hồi bạn sớm nhất có thể.
              </Paragraph>
              
              <Form
                form={form}
                layout="vertical"
                name="contact_form"
                onFinish={onFinish}
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="name"
                      label="Tên"
                      rules={[{ required: true, message: "Vui lòng nhập tên của bạn" }]}
                    >
                      <Input placeholder="Tên của bạn" />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: "Vui lòng nhập email của bạn" },
                        { type: "email", message: "Vui lòng nhập email hợp lệ" }
                      ]}
                    >
                      <Input placeholder="Email của bạn" />
                    </Form.Item>
                  </Col>
                </Row>
                
                <Form.Item
                  name="phone"
                  label="Điện thoại"
                  rules={[{ required: true, message: "Vui lòng nhập số điện thoại của bạn" }]}
                >
                  <Input placeholder="Số điện thoại của bạn" />
                </Form.Item>
                
                <Form.Item
                  name="subject"
                  label="Chủ đề"
                  rules={[{ required: true, message: "Vui lòng nhập chủ đề" }]}
                >
                  <Input placeholder="Nội dung liên quan đến gì?" />
                </Form.Item>
                
                <Form.Item
                  name="message"
                  label="Tin nhắn"
                  rules={[{ required: true, message: "Vui lòng nhập tin nhắn của bạn" }]}
                >
                  <TextArea rows={5} placeholder="Tin nhắn của bạn" />
                </Form.Item>
                
                <Form.Item>
                  <Button type="primary" htmlType="submit" icon={<SendOutlined />} size="large">
                    Gửi tin nhắn
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
        
        <div className="map-section">
          <Card bordered={false}>
            <Title level={3} className="text-center">Tìm chúng tôi</Title>
            <div className="map-container">
              <div className="map-placeholder">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8582379826526!2d106.68427047492096!3d10.8221588893294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1746112645793!5m2!1svi!2s"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Bản đồ Google"
                  className="map-iframe"
                ></iframe>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;