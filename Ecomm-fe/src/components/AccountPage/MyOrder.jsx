import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  Card,
  Tag,
  Typography,
  Descriptions,
  Space,
  Button,
  Badge,
  Divider,
  Skeleton,
  Empty,
  Spin,
  Row,
  Col,
  Statistic,
  Alert,
  Timeline,
  Tooltip,
  Image,
  Popconfirm,
  notification,
  Modal,
  Radio,
  Input,
  message,
} from "antd";
import {
  ShoppingCartOutlined,
  CalendarOutlined,
  InboxOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  SyncOutlined,
  CarOutlined,
  HomeOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import AccountSidebar from "./AccountSidebar";
import { AuthContext } from "../context/auth.context";
import { getOrderAPI, updateOrderStatusAPI } from "../../services/api.service";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("vi-VN", options);
};

const getStatusInfo = (status) => {
  const statusMap = {
    PENDING: {
      color: "orange",
      icon: <ClockCircleOutlined />,
      text: "Chờ xác nhận",
      description: "Đơn hàng của bạn đang chờ xác nhận",
    },
    PROCESSING: {
      color: "blue",
      icon: <SyncOutlined spin />,
      text: "Đang xử lý",
      description: "Đơn hàng của bạn đang được chuẩn bị",
    },
    SHIPPING: {
      color: "cyan",
      icon: <CarOutlined />,
      text: "Đang giao hàng",
      description: "Đơn hàng của bạn đang được vận chuyển",
    },
    COMPLETED: {
      color: "green",
      icon: <CheckCircleOutlined />,
      text: "Hoàn thành",
      description: "Đơn hàng của bạn đã được giao thành công",
    },
    CANCELED: {
      color: "red",
      icon: <CloseCircleOutlined />,
      text: "Đã hủy",
      description: "Đơn hàng của bạn đã bị hủy",
    },
  };

  return (
    statusMap[status] || {
      color: "default",
      icon: <InfoCircleOutlined />,
      text: status,
      description: "Trạng thái đơn hàng",
    }
  );
};

const OrderStatusTag = ({ status }) => {
  const statusInfo = getStatusInfo(status);

  return (
    <Tag icon={statusInfo.icon} color={statusInfo.color}>
      {statusInfo.text}
    </Tag>
  );
};

const OrderTimeline = ({ status }) => {
  const getTimelineItems = () => {
    const items = [
      {
        color: status === "CANCELED" ? "red" : "green",
        children: "Đơn hàng đã được tạo",
        dot:
          status === "CANCELED" ? (
            <CloseCircleOutlined />
          ) : (
            <CheckCircleOutlined />
          ),
      },
      {
        color:
          status === "CANCELED"
            ? "red"
            : ["PROCESSING", "SHIPPING", "COMPLETED"].includes(status)
            ? "green"
            : "gray",
        children: "Đã xác nhận đơn hàng",
        dot:
          status === "CANCELED" ? (
            <CloseCircleOutlined />
          ) : ["PROCESSING", "SHIPPING", "COMPLETED"].includes(status) ? (
            <CheckCircleOutlined />
          ) : (
            <ClockCircleOutlined />
          ),
      },
      {
        color:
          status === "CANCELED"
            ? "red"
            : ["SHIPPING", "COMPLETED"].includes(status)
            ? "green"
            : "gray",
        children: "Đang giao hàng",
        dot:
          status === "CANCELED" ? (
            <CloseCircleOutlined />
          ) : ["SHIPPING", "COMPLETED"].includes(status) ? (
            <CarOutlined />
          ) : (
            <ClockCircleOutlined />
          ),
      },
      {
        color:
          status === "CANCELED"
            ? "red"
            : status === "COMPLETED"
            ? "green"
            : "gray",
        children: "Đã giao hàng thành công",
        dot:
          status === "CANCELED" ? (
            <CloseCircleOutlined />
          ) : status === "COMPLETED" ? (
            <CheckCircleOutlined />
          ) : (
            <ClockCircleOutlined />
          ),
      },
    ];

    if (status === "CANCELED") {
      items.push({
        color: "red",
        children: "Đơn hàng đã bị hủy",
        dot: <CloseCircleOutlined />,
      });
    }

    return items;
  };

  return <Timeline items={getTimelineItems()} />;
};

const CancelOrderButton = ({ orderId, onCancelOrder }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [error, setError] = useState("");

  const cancelReasons = [
    "Tôi muốn thay đổi địa chỉ giao hàng",
    "Tôi muốn thay đổi phương thức thanh toán",
    "Tôi đặt nhầm sản phẩm",
    "Tôi tìm thấy sản phẩm rẻ hơn ở nơi khác",
    "Tôi không còn nhu cầu mua sản phẩm này",
    "Khác",
  ];

  const showModal = () => {
    setIsModalOpen(true);
    setError("");
    setCancelReason("");
    setOtherReason("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    if (!cancelReason) {
      setError("Vui lòng chọn lý do hủy đơn hàng");
      return;
    }

    if (cancelReason === "Khác" && !otherReason.trim()) {
      setError("Vui lòng nhập lý do hủy đơn hàng");
      return;
    }

    setConfirmLoading(true);

    const finalReason = cancelReason === "Khác" ? otherReason : cancelReason;

    onCancelOrder(orderId, finalReason);

    setConfirmLoading(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        danger
        type="primary"
        block
        icon={<CloseCircleOutlined />}
        onClick={showModal}
      >
        Hủy đơn hàng
      </Button>

      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <ExclamationCircleOutlined
              style={{ color: "#ff4d4f", marginRight: 8 }}
            />
            <span>Hủy đơn hàng</span>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Quay lại
          </Button>,
          <Button
            key="submit"
            type="primary"
            danger
            loading={confirmLoading}
            onClick={handleConfirm}
          >
            Xác nhận hủy
          </Button>,
        ]}
        confirmLoading={confirmLoading}
      >
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
            closable
          />
        )}

        <div style={{ marginBottom: 16 }}>
          <Text>Vui lòng chọn lý do hủy đơn hàng:</Text>
        </div>

        <Radio.Group
          onChange={(e) => {
            setCancelReason(e.target.value);
            setError("");
          }}
          value={cancelReason}
          style={{ width: "100%" }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            {cancelReasons.map((reason) => (
              <Radio
                key={reason}
                value={reason}
                style={{ display: "block", marginBottom: 8 }}
              >
                {reason}
              </Radio>
            ))}
          </Space>
        </Radio.Group>

        {cancelReason === "Khác" && (
          <TextArea
            placeholder="Nhập lý do hủy đơn hàng..."
            value={otherReason}
            onChange={(e) => {
              setOtherReason(e.target.value);
              setError("");
            }}
            rows={3}
            style={{ marginTop: 12 }}
          />
        )}

        <div style={{ marginTop: 16 }}>
          <Text type="warning">
            Lưu ý: Sau khi hủy đơn hàng, bạn không thể hoàn tác hành động này.
          </Text>
        </div>
      </Modal>
    </>
  );
};

const MyOrder = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [note, contextHolder] = notification.useNotification();

  const toggleExpand = (record) => {
    setExpandedRowKeys(
      expandedRowKeys.includes(record.id)
        ? expandedRowKeys.filter((key) => key !== record.id)
        : [...expandedRowKeys, record.id]
    );
  };

  const filteredOrders =
    filter === "ALL"
      ? orders
      : orders.filter((order) => order.status === filter);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getOrderAPI();
        if (res.code === 200) {
          setOrders(res.data);
        } else {
          setError(res.message || "Không thể tải dữ liệu đơn hàng");
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu đơn hàng");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  console.log("Orders:", orders);

  const getOrderStats = () => {
    const completed = orders.filter((o) => o.status === "COMPLETED").length;
    const pending = orders.filter((o) => o.status === "PENDING").length;
    const processing = orders.filter((o) => o.status === "PROCESSING").length;
    const shipping = orders.filter((o) => o.status === "SHIPPING").length;
    const canceled = orders.filter((o) => o.status === "CANCELED").length;

    return { completed, pending, processing, shipping, canceled };
  };

  const handleCanceledOrder = async (orderId, reason) => {
    try {
      const res = await updateOrderStatusAPI(orderId, "CANCELED", reason);

      if (res) {
        note.success({
          message: "Hủy đơn hàng thành công",
          description: `Đơn hàng #${orderId} đã được hủy với ý do: ${reason}`,
        });

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? { ...order, status: "CANCELED", cancelReason: reason }
              : order
          )
        );
      } else {
        note.error({
          message: "Thông báo",
          description: "Hủy đơn hàng thất bại",
        });
      }
    } catch (err) {
      console.error("Error canceling order:", err);
      note.error({
        message: "Thông báo",
        description: "Có lỗi xảy ra khi hủy đơn hàng",
      });
    }
  };

  const orderStats = getOrderStats();

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (id) => <Text strong>#{id}</Text>,
    },
    {
      title: "Ngày đặt",
      dataIndex: "createAt",
      key: "createAt",
      width: 180,
      render: (date) => (
        <Space>
          <CalendarOutlined />
          {formatDate(date)}
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status) => <OrderStatusTag status={status} />,
      filters: [
        { text: "Chờ xác nhận", value: "PENDING" },
        { text: "Đang xử lý", value: "PROCESSING" },
        { text: "Đang giao", value: "SHIPPING" },
        { text: "Hoàn thành", value: "COMPLETED" },
        { text: "Đã hủy", value: "CANCELED" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 150,
      render: (price) => (
        <Text strong style={{ color: "#f50" }}>
          <DollarOutlined /> {formatPrice(price)}
        </Text>
      ),
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Địa chỉ giao hàng",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      width: 200,
      ellipsis: true,
      render: (address) => (
        <Tooltip title={address}>
          <Space>
            <HomeOutlined />
            {address}
          </Space>
        </Tooltip>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type={expandedRowKeys.includes(record.id) ? "default" : "primary"}
            icon={
              expandedRowKeys.includes(record.id) ? (
                <InfoCircleOutlined />
              ) : (
                <InfoCircleOutlined />
              )
            }
            size="middle"
            onClick={() => toggleExpand(record)}
          >
            {expandedRowKeys.includes(record.id)
              ? "Ẩn chi tiết"
              : "Xem chi tiết"}
          </Button>
        </Space>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    const detailColumns = [
      {
        title: "Sản phẩm",
        dataIndex: "productName",
        key: "productName",
        render: (name, record) => (
          <Space>
            {record.productImage && (
              <Image
                src={record.productImage}
                alt={name}
                width={50}
                height={50}
                style={{ objectFit: "cover", borderRadius: "4px" }}
              />
            )}
            <div>
              <Text strong>{name}</Text>
              {record.productVariant && (
                <div>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    {record.productVariant}
                  </Text>
                </div>
              )}
            </div>
          </Space>
        ),
      },
      {
        title: "Đơn giá",
        dataIndex: "price",
        key: "price",
        render: (price) => formatPrice(price),
      },
      {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
        render: (quantity) => (
          <Badge
            count={quantity}
            showZero
            style={{
              backgroundColor: quantity > 0 ? "#52c41a" : "#f5f5f5",
              color: quantity > 0 ? "white" : "#666",
            }}
          />
        ),
      },
      {
        title: "Thành tiền",
        key: "total",
        render: (_, record) => (
          <Text strong style={{ color: "#f50" }}>
            {formatPrice(record.price * record.quantity)}
          </Text>
        ),
      },
    ];

    if (!user) {
      return (
        <Card>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Card>
      );
    }

    const statusInfo = getStatusInfo(record.status);

    const showCancelReason =
      record.status === "CANCELED" && record.cancelReason;

    return (
      <Card
        className="order-details-card"
        bordered={false}
        style={{
          background: "#f9f9f9",
          marginBottom: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.09)",
        }}
      >
        {contextHolder}
        <Row gutter={[24, 24]}>
          <Col xs={24} md={16}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card title="Chi tiết đơn hàng" bordered={false}>
                  <Descriptions bordered size="small" column={{ xs: 1, sm: 2 }}>
                    <Descriptions.Item label="Mã đơn hàng" span={2}>
                      <Text strong>#{record.id}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày đặt" span={2}>
                      <CalendarOutlined /> {formatDate(record.createAt)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái" span={2}>
                      <OrderStatusTag status={record.status} />
                    </Descriptions.Item>
                    {record.note && (
                      <Descriptions.Item label="Ghi chú đơn hàng" span={2}>
                        <Text italic>{record.note}</Text>
                      </Descriptions.Item>
                    )}
                    {record.reasonCancel && (
                      <Descriptions.Item label="Lý do hủy" span={2}>
                        <Text type="danger">{record.reasonCancel}</Text>
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item label="Phương thức thanh toán" span={2}>
                      {record.paymentMethod.name} -{" "}
                      {record.paymentMethod.description}
                    </Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ giao hàng" span={2}>
                      <HomeOutlined /> {record.shippingAddress}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>

              <Col span={24}>
                <Card title="Danh sách sản phẩm" bordered={false}>
                  <Table
                    columns={detailColumns}
                    dataSource={record.orderDetails}
                    pagination={false}
                    rowKey="id"
                    summary={(pageData) => {
                      const total = pageData.reduce(
                        (acc, current) =>
                          acc + current.price * current.quantity,
                        0
                      );
                      const shipping = 0; // Giả sử phí ship
                      const discount = 0; // Giả sử giảm giá

                      return (
                        <>
                          <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={3}>
                              Tạm tính
                            </Table.Summary.Cell>
                            <Table.Summary.Cell>
                              <Text>{formatPrice(total)}</Text>
                            </Table.Summary.Cell>
                          </Table.Summary.Row>
                          <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={3}>
                              Phí vận chuyển
                            </Table.Summary.Cell>
                            <Table.Summary.Cell>
                              <Text>{formatPrice(shipping)}</Text>
                            </Table.Summary.Cell>
                          </Table.Summary.Row>
                          {discount > 0 && (
                            <Table.Summary.Row>
                              <Table.Summary.Cell colSpan={3}>
                                Giảm giá
                              </Table.Summary.Cell>
                              <Table.Summary.Cell>
                                <Text type="danger">
                                  - {formatPrice(discount)}
                                </Text>
                              </Table.Summary.Cell>
                            </Table.Summary.Row>
                          )}
                          <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={3}>
                              <Text strong>Tổng thanh toán</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell>
                              <Text
                                strong
                                style={{ color: "#f50", fontSize: "16px" }}
                              >
                                {formatPrice(record.totalPrice)}
                              </Text>
                            </Table.Summary.Cell>
                          </Table.Summary.Row>
                        </>
                      );
                    }}
                  />
                </Card>
              </Col>
            </Row>
          </Col>

          <Col xs={24} md={8}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card
                  title="Trạng thái đơn hàng"
                  bordered={false}
                  extra={<OrderStatusTag status={record.status} />}
                >
                  <Alert
                    message={statusInfo.text}
                    description={statusInfo.description}
                    type={
                      record.status === "CANCELED"
                        ? "error"
                        : record.status === "COMPLETED"
                        ? "success"
                        : "info"
                    }
                    showIcon
                    icon={statusInfo.icon}
                    style={{ marginBottom: "16px" }}
                  />
                  <OrderTimeline status={record.status} />
                </Card>
              </Col>

              {(record.status === "PENDING" ||
                record.status === "PROCESSING") && (
                <Col span={24}>
                  <Card bordered={false}>
                    <CancelOrderButton
                      orderId={record.id}
                      onCancelOrder={handleCanceledOrder}
                    />
                  </Card>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Card>
    );
  };

  const renderOrderStats = () => {
    const { completed, pending, processing, shipping, canceled } = orderStats;

    return (
      <Row gutter={16} className="order-stats">
        <Col xs={12} sm={8} md={4}>
          <Card size="small">
            <Statistic
              title="Tổng đơn hàng"
              value={orders.length}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card size="small">
            <Statistic
              title="Chờ xác nhận"
              value={pending}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card size="small">
            <Statistic
              title="Đang xử lý"
              value={processing}
              prefix={<SyncOutlined spin />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card size="small">
            <Statistic
              title="Đang giao"
              value={shipping}
              prefix={<CarOutlined />}
              valueStyle={{ color: "#13c2c2" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card size="small">
            <Statistic
              title="Hoàn thành"
              value={completed}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={4}>
          <Card size="small">
            <Statistic
              title="Đã hủy"
              value={canceled}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
      </Row>
    );
  };

  const renderFilterButtons = () => {
    return (
      <div className="filter-buttons">
        <Space wrap>
          <Button
            type={filter === "ALL" ? "primary" : "default"}
            onClick={() => setFilter("ALL")}
          >
            Tất cả ({orders.length})
          </Button>
          <Button
            type={filter === "PENDING" ? "primary" : "default"}
            onClick={() => setFilter("PENDING")}
          >
            Chờ xác nhận ({orderStats.pending})
          </Button>
          <Button
            type={filter === "PROCESSING" ? "primary" : "default"}
            onClick={() => setFilter("PROCESSING")}
          >
            Đang xử lý ({orderStats.processing})
          </Button>
          <Button
            type={filter === "SHIPPING" ? "primary" : "default"}
            onClick={() => setFilter("SHIPPING")}
          >
            Đang giao ({orderStats.shipping})
          </Button>
          <Button
            type={filter === "COMPLETED" ? "primary" : "default"}
            onClick={() => setFilter("COMPLETED")}
          >
            Hoàn thành ({orderStats.completed})
          </Button>
          <Button
            danger
            type={filter === "CANCELED" ? "primary" : "default"}
            onClick={() => setFilter("CANCELED")}
          >
            Đã hủy ({orderStats.canceled})
          </Button>
        </Space>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="order-page-container">
        <AccountSidebar />
        <div className="order-content-container">
          <Card className="loading-card">
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <Spin size="large" />
              <p style={{ marginTop: 16 }}>Đang tải dữ liệu đơn hàng...</p>
            </div>
          </Card>
        </div>

        <style>{`
          .order-page-container {
            display: flex;
            padding: 24px;
            background: #f0f2f5;
            min-height: calc(100vh - 64px);
          }
          
          .order-content-container {
            flex: 1;
            margin-left: 24px;
          }
          
          .loading-card {
            border-radius: 8px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
          }
          
          @media (max-width: 768px) {
            .order-page-container {
              flex-direction: column;
              padding: 16px;
            }
            
            .order-content-container {
              margin-left: 0;
              margin-top: 16px;
            }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-page-container">
        <AccountSidebar />
        <div className="order-content-container">
          <Alert
            message="Lỗi"
            description={error}
            type="error"
            showIcon
            action={
              <Button
                size="small"
                danger
                onClick={() => window.location.reload()}
              >
                Thử lại
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="order-page-container">
      <AccountSidebar />
      <div className="order-content-container">
        <Card className="page-header-card" bordered={false}>
          <div className="page-header">
            <div className="page-title">
              <ShoppingCartOutlined className="page-icon" />
              <Title level={2} className="m-0">
                Đơn hàng của tôi
              </Title>
            </div>
            <Badge count={orders.length} className="order-count-badge">
              <Text className="order-count-text">
                Bạn đã đặt {orders.length} đơn hàng
              </Text>
            </Badge>
          </div>
        </Card>

        {orders.length > 0 ? (
          <>
            <div className="order-statistics-section">{renderOrderStats()}</div>

            <Card title="Lọc đơn hàng" className="filter-card" bordered={false}>
              {renderFilterButtons()}
            </Card>

            <Card
              title={`Danh sách đơn hàng (${filteredOrders.length})`}
              className="order-list-card"
              bordered={false}
            >
              <Table
                columns={columns}
                dataSource={filteredOrders}
                rowKey="id"
                expandable={{
                  expandedRowRender,
                  expandedRowKeys,
                  onExpand: (expanded, record) => toggleExpand(record),
                }}
                pagination={{
                  pageSize: 5,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} của ${total} đơn hàng`,
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20"],
                }}
              />
            </Card>
          </>
        ) : (
          <Card bordered={false} className="empty-order-card">
            <Empty
              image={
                <InboxOutlined style={{ fontSize: 64, color: "#bfbfbf" }} />
              }
              description={
                <span>Bạn chưa có đơn hàng nào. Hãy tiếp tục mua sắm!</span>
              }
            >
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
              >
                Tiếp tục mua sắm
              </Button>
            </Empty>
          </Card>
        )}
      </div>

      <style>{`
        .order-page-container {
          display: flex;
          padding: 24px;
          background: #f0f2f5;
          min-height: calc(100vh - 64px);
        }
        
        .order-content-container {
          flex: 1;
          margin-left: 24px;
        }
        
        .page-header-card {
          margin-bottom: 24px;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
        }
        
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .page-title {
          display: flex;
          align-items: center;
        }
        
        .page-icon {
          font-size: 28px;
          color: #1890ff;
          margin-right: 12px;
        }
        
        .order-count-badge {
          display: flex;
          align-items: center;
        }
        
        .order-count-text {
          font-size: 16px;
          margin-right: 8px;
        }
        
        .order-statistics-section {
          margin-bottom: 24px;
        }
        
        .order-stats {
          margin-bottom: 0;
        }
        
        .filter-card {
          margin-bottom: 24px;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
        }
        
        .filter-buttons {
          padding: 8px 0;
        }
        
        .order-list-card {
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
        }
        
        .order-details-card {
          border-radius: 8px;
        }
        
        .empty-order-card {
          padding: 48px;
          text-align: center;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
        }
        
        @media (max-width: 768px) {
          .order-page-container {
            flex-direction: column;
            padding: 16px;
          }
          
          .order-content-container {
            margin-left: 0;
            margin-top: 16px;
          }
          
          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .order-count-badge {
            margin-top: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default MyOrder;
