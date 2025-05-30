import React, { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Card,
  Steps,
  Button,
  Divider,
  Result,
  List,
  Space,
  Tag,
} from "antd";
import {
  CheckCircleOutlined,
  ShoppingOutlined,
  HomeOutlined,
  CreditCardOutlined,
  PrinterOutlined,
  ShoppingCartOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  UserOutlined,
  MailOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { placeOrderAPI } from "../../services/api.service";
const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const OrderSuccessBank = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [order , setOrder] = useState(JSON.parse(localStorage.getItem("pendingOrder"))|| null);
  const [vnpayResult, setVnpayResult] = useState(null);
 

  // call api dể lấy thông tin đơn hàng
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    const fetchResult = async () => {
      try {
        const response = await fetch(
          `http://localhost:8088/payment-result?${searchParams.toString()}`
        );
        const data = await response.json();
        setVnpayResult(data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };
    fetchResult();
    if (!vnpayResult) return;
    if (vnpayResult.paymentData.paymentStatus === "success"){
   // call api để lưu đơn hàng vào database
    const saveOrder = async () => {
      const response = await placeOrderAPI(
        order.products,
        1,
        `${order.selectedAddress.street}, ${order.selectedAddress.city}`,
        order.noteValue
      );
      if (response && response.data) {
        console.log("Đơn hàng đã được lưu thành công");
      } else {
        console.error("Lỗi khi lưu đơn hàng:", response);
      }
    };  
      saveOrder();
      
    // Xóa thông tin đơn hàng khỏi localStorage
    localStorage.removeItem("pendingOrder");
    }
 

  }, []);
  // Lấy thông tin từ state (được truyền từ trang Checkout)
  const { orderInfo, cartItems, user, selectedAddress, total, note } =
    location.state || {};

  // Tạo orderID mẫu nếu không có
  const [orderId] = useState(
    orderInfo?.id || `ORD${Math.floor(Math.random() * 1000000)}`
  );
  const [orderDate] = useState(new Date().toLocaleString("vi-VN"));

  // Giả lập thời gian giao hàng dự kiến (3-5 ngày từ hiện tại)
  const getEstimatedDelivery = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(
      deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3
    );
    return deliveryDate.toLocaleDateString("vi-VN");
  };

  useEffect(() => {
    // Cuộn lên đầu trang khi component được mount
    window.scrollTo(0, 0);

    // Nếu không có dữ liệu đơn hàng, có thể điều hướng về trang chủ
    if (!cartItems || cartItems.length === 0) {
      // Có thể bỏ comment phần này nếu muốn điều hướng khi không có dữ liệu
      // navigate('/');
    }
  }, [cartItems, navigate]);

  // Hàm chuyển hướng về trang chủ
  const goToHome = () => {
    navigate("/");
  };

  // Hàm chuyển hướng đến trang đơn hàng của tôi
  const goToMyOrders = () => {
    navigate("/account/myOrder");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "0 50px", marginTop: 24, marginBottom: 24 }}>
        <Row gutter={24} justify="center">
          <Col xs={24} lg={20}>
             <Result
              status="success"
              icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              title={
                <Title level={2} style={{ color: "#52c41a" }}>
                  Đặt hàng thành công!
                </Title>
              }
              subTitle={
                <Paragraph style={{ fontSize: 16 }}>
                  Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được xác nhận và
                  đang được xử lý.
                </Paragraph>
              }
            />
            <Card
              style={{ marginBottom: 24, borderRadius: 8 }}
              headStyle={{ backgroundColor: "#f0f7ff" }}
              title={
                <Space>
                  <ShoppingOutlined />
                  <span style={{ fontSize: 18, fontWeight: "bold" }}>
                    Thông tin đơn hàng
                  </span>
                </Space>
              }
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    <div>
                      <Text strong style={{ fontSize: 16 }}>
                        Mã đơn hàng:
                      </Text>
                      <Tag
                        color="blue"
                        style={{
                          marginLeft: 8,
                          padding: "4px 8px",
                          fontSize: 14,
                        }}
                      >
                        {orderId}
                      </Tag>
                    </div>
                    <div>
                      <Text strong style={{ fontSize: 16 }}>
                        Ngày đặt hàng:
                      </Text>
                      <Text style={{ marginLeft: 8, fontSize: 14 }}>
                        {orderDate}
                      </Text>
                    </div>
                    <div>
                      <Text strong style={{ fontSize: 16 }}>
                        Phương thức thanh toán:
                      </Text>
                      <Tag
                        color="green"
                        style={{ marginLeft: 8, fontSize: 14 }}
                      >
                        Chuyển khoản ngân hàng
                      </Tag>
                    </div>
                  </Space>
                </Col>
                <Col xs={24} md={12}>
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    <div>
                      <Text strong style={{ fontSize: 16 }}>
                        Trạng thái:
                      </Text>
                      <Tag
                        color="processing"
                        style={{
                          marginLeft: 8,
                          padding: "4px 8px",
                          fontSize: 14,
                        }}
                      >
                        Đang xử lý
                      </Tag>
                    </div>
                    <div>
                      <Text strong style={{ fontSize: 16 }}>
                        Giao hàng dự kiến:
                      </Text>
                      <Text style={{ marginLeft: 8, fontSize: 14 }}>
                        {getEstimatedDelivery()}
                      </Text>
                    </div>
                    <div>
                      <Text strong style={{ fontSize: 16 }}>
                        Tổng tiền:
                      </Text>
                      <Text
                        style={{
                          marginLeft: 8,
                          fontSize: 16,
                          color: "#f5222d",
                          fontWeight: "bold",
                        }}
                      >
                        {(order.total || 0).toLocaleString()} VND
                      </Text>
                    </div>
                  </Space>
                </Col>
              </Row>

              <Divider />

              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Card
                    type="inner"
                    title={
                      <Space>
                        <UserOutlined />
                        <span>Thông tin khách hàng</span>
                      </Space>
                    }
                    style={{ height: "100%" }}
                  >
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ width: "100%" }}
                    >
                      <div>
                        <UserOutlined style={{ marginRight: 8 }} />
                        <Text>
                          {order.user?.fullName || order.user?.username}
                        </Text>
                      </div>
                      <div>
                        <PhoneOutlined style={{ marginRight: 8 }} />
                        <Text>{order.user?.phone}</Text>
                      </div>
                      <div>
                        <MailOutlined style={{ marginRight: 8 }} />
                        <Text>{order.user?.email}</Text>
                      </div>
                    </Space>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card
                    type="inner"
                    title={
                      <Space>
                        <EnvironmentOutlined />
                        <span>Địa chỉ giao hàng</span>
                      </Space>
                    }
                    style={{ height: "100%" }}
                  >
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ width: "100%" }}
                    >
                      <div>
                        <HomeOutlined style={{ marginRight: 8 }} />
                        <Text>
                          {order.selectedAddress
                            ? `${order.selectedAddress.street} - ${order.selectedAddress.city}`
                            : "Không có địa chỉ"}
                        </Text>
                      </div>
                    </Space>
                  </Card>
                </Col>
              </Row>

              {/* Thêm phần Ghi chú đơn hàng */}
              {note && note.trim() !== "" && (
                <>
                  <Divider />
                  <Card
                    type="inner"
                    title={
                      <Space>
                        <MessageOutlined />
                        <span>Ghi chú đơn hàng</span>
                      </Space>
                    }
                    style={{ marginBottom: 16 }}
                  >
                    <Paragraph style={{ margin: 0 }}>{note}</Paragraph>
                  </Card>
                </>
              )}

              <Divider />

              <Card
                type="inner"
                title={
                  <Space>
                    <ShoppingCartOutlined />
                    <span>Sản phẩm đã đặt</span>
                  </Space>
                }
                style={{ marginBottom: 16 }}
              >
                <List
                  dataSource={order.cartItems || []}
                  renderItem={(item) => (
                    <List.Item key={item.id} style={{ padding: "16px 0" }}>
                      <List.Item.Meta
                        avatar={
                          <div
                            style={{
                              width: 60,
                              height: 60,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "#f5f5f5",
                              borderRadius: 4,
                            }}
                          >
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.productName}
                                style={{ maxWidth: 50, maxHeight: 50 }}
                              />
                            ) : (
                              <ShoppingOutlined style={{ fontSize: 24 }} />
                            )}
                          </div>
                        }
                        title={<Text strong>{item.productName}</Text>}
                        description={
                          <Space direction="vertical" size={0}>
                            <Text type="secondary">
                              Số lượng: {item.quantity}
                            </Text>
                            <Text type="secondary">
                              Đơn giá: {item.price.toLocaleString()} VND
                            </Text>
                          </Space>
                        }
                      />
                      <div>
                        <Text strong style={{ fontSize: 16 }}>
                          {item.totalPrice.toLocaleString()} VND
                        </Text>
                      </div>
                    </List.Item>
                  )}
                />

                <Divider />

                <Row justify="end">
                  <Col>
                    <Space
                      direction="vertical"
                      align="end"
                      style={{ width: "100%" }}
                    >
                      <div>
                        <Text>Tạm tính:</Text>
                        <Text
                          strong
                          style={{
                            marginLeft: 16,
                            width: 120,
                            display: "inline-block",
                            textAlign: "right",
                          }}
                        >
                          {order.cartItems
                            ? order.cartItems
                                .reduce((acc, item) => acc + item.totalPrice, 0)
                                .toLocaleString()
                            : 0}{" "}
                          VND
                        </Text>
                      </div>
                      <div>
                        <Text>Phí vận chuyển:</Text>
                        <Text
                          strong
                          style={{
                            marginLeft: 16,
                            width: 120,
                            display: "inline-block",
                            textAlign: "right",
                            color: "#52c41a",
                          }}
                        >
                          Miễn phí
                        </Text>
                      </div>
                      <div>
                        <Text strong style={{ fontSize: 16 }}>
                          Tổng cộng:
                        </Text>
                        <Text
                          strong
                          style={{
                            marginLeft: 16,
                            fontSize: 16,
                            color: "#f5222d",
                            width: 120,
                            display: "inline-block",
                            textAlign: "right",
                          }}
                        >
                          {(order.total || 0).toLocaleString()} VND
                        </Text>
                      </div>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </Card>

            <Card
              style={{ marginBottom: 24, borderRadius: 8 }}
              bodyStyle={{ backgroundColor: "#f6ffed", padding: 16 }}
            >
              <Steps
                progressDot
                current={1}
                direction="horizontal"
                items={[
                  {
                    title: "Đặt hàng",
                    description: "Hoàn thành",
                    icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
                  },
                  {
                    title: "Xác nhận",
                    description: "Đang xử lý",
                  },
                  {
                    title: "Đóng gói",
                    description: "Chờ xử lý",
                  },
                  {
                    title: "Vận chuyển",
                    description: "Chờ xử lý",
                  },
                  {
                    title: "Giao hàng",
                    description: "Chờ xử lý",
                  },
                ]}
              />
            </Card>

            <Row justify="center" gutter={16}>
              <Col>
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingOutlined />}
                  onClick={goToHome}
                  style={{ marginRight: 16 }}
                >
                  Tiếp tục mua sắm
                </Button>
              </Col>
              <Col>
                <Button
                  icon={<CreditCardOutlined />}
                  size="large"
                  onClick={goToMyOrders}
                >
                  Xem đơn hàng của tôi
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default OrderSuccessBank;
