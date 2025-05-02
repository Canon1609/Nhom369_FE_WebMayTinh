import React, { useEffect } from "react";
import { 
  Typography, 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Divider, 
  Space, 
  Avatar, 
  Layout, 
  Breadcrumb 
} from "antd";
import { 
  CustomerServiceOutlined, 
  SafetyOutlined, 
  TeamOutlined, 
  TrophyOutlined 
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import "../../styles/About_styles/About.scss";

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const AboutPage = () => {
  const { pathname } = useLocation();

  // Cuộn lên đầu trang khi chuyển trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const stats = [
    { count: "10.5k", label: "Người bán hoạt động trên trang web của chúng tôi", icon: <TeamOutlined /> },
    { count: "33k", label: "Doanh số sản phẩm hàng tháng", icon: <TrophyOutlined /> },
    { count: "45.5k", label: "Khách hàng hoạt động trên trang web của chúng tôi", icon: <TeamOutlined /> },
    { count: "25k", label: "Doanh thu hàng năm trên trang web của chúng tôi", icon: <TrophyOutlined /> },
  ];

  const teamMembers = [
    { 
      name: "Tom Cruise", 
      position: "Nhà sáng lập & Chủ tịch", 
      image: "https://images2.thanhnien.vn/528068263637045248/2024/11/28/5-1732774990424925790598.jpg",
      bio: "Dẫn dắt công ty với hơn 15 năm kinh nghiệm trong lĩnh vực bán lẻ và niềm đam mê đổi mới."
    },
    { 
      name: "Emma Watson", 
      position: "Giám đốc điều hành", 
      image: "https://laban.edu.vn/wp-content/uploads/2024/02/11.2_Emma_Watson.jpg",
      bio: "Quản lý hoạt động hàng ngày với sự tập trung vào hiệu quả và cơ hội phát triển."
    },
    { 
      name: "Will Smith", 
      position: "Nhà thiết kế sản phẩm", 
      image: "https://m.media-amazon.com/images/M/MV5BMGI3OTI0NjctMjM2ZC00MjZiLWIxMjctODczN2M4MTFjZmY1XkEyXkFqcGdeQXJoYW5uYWg@._V1_.jpg",
      bio: "Tạo ra các thiết kế sáng mới và thân thiện với người dùng để nâng cao trải nghiệm khách hàng."
    },
  ];

  const features = [
    { 
      title: "GIAO HÀNG MIỄN PHÍ VÀ NHANH CHÓNG", 
      description: "Miễn phí giao hàng cho tất cả đơn hàng trên 140 USD", 
      // icon: <DeliveryOutlined style={{ fontSize: 36, color: '#1890ff' }} /> 
    },
    { 
      title: "DỊCH VỤ KHÁCH HÀNG 24/7", 
      description: "Hỗ trợ khách hàng thân thiện 24/7", 
      icon: <CustomerServiceOutlined style={{ fontSize: 36, color: '#1890ff' }} /> 
    },
    { 
      title: "BẢO ĐẢM HOÀN TIỀN", 
      description: "Chúng tôi hoàn tiền trong vòng 30 ngày", 
      icon: <SafetyOutlined style={{ fontSize: 36, color: '#1890ff' }} /> 
    },
  ];

  return (
    <Layout className="about-page-layout">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-container">
        <Breadcrumb>
          <Breadcrumb.Item><a href="/">Trang chủ</a></Breadcrumb.Item>
          <Breadcrumb.Item>Giới thiệu</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Content className="site-content">
        {/* Hero Section with Title */}
        <div className="hero-section">
          <Title level={1}>Về công ty chúng tôi</Title>
          <Divider />
        </div>

        {/* Our Story Section */}
        <div className="about-section-container">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <div className="about-text-content">
                <Title level={2}>Câu chuyện của chúng tôi</Title>
                <Paragraph>
                  Ra mắt vào năm 2015, Exclusive là nền tảng mua sắm trực tuyến hàng đầu tại Nam Á, với sự hiện diện mạnh mẽ tại Bangladesh. 
                  Được hỗ trợ bởi các giải pháp tiếp thị, dữ liệu và dịch vụ được thiết kế riêng, Exclusive có 10.500 người bán và 300 thương hiệu, 
                  phục vụ 3 triệu khách hàng trên toàn khu vực.
                </Paragraph>
                <Paragraph>
                  Exclusive cung cấp hơn 1 triệu sản phẩm, đang phát triển với tốc độ rất nhanh. Exclusive mang đến một danh mục đa dạng 
                  từ các sản phẩm tiêu dùng.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="about-image-container">
                <img 
                  src="https://www.vib.com.vn/wps/wcm/connect/e40ff60a-fc38-4c42-b327-29a61e2adc68/E-commerce-va-E-business+%285%29.jpg.webp?MOD=AJPERES&CACHEID=ROOTWORKSPACE-e40ff60a-fc38-4c42-b327-29a61e2adc68-oKoX9MZ" 
                  alt="Giới thiệu" 
                  className="about-image"
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <Title level={2} className="section-title">Thống kê công ty</Title>
          <Divider />
          <Row gutter={[32, 32]}>
            {stats.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card className="stat-card" bordered={false}>
                  <div className="stat-icon">{stat.icon}</div>
                  <Statistic 
                    value={stat.count} 
                    className="stat-count" 
                  />
                  <Text className="stat-label">{stat.label}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Team Members Section */}
        <div className="team-section">
          <Title level={2} className="section-title">Gặp gỡ đội ngũ của chúng tôi</Title>
          <Divider />
          <Row gutter={[32, 32]} justify="center">
            {teamMembers.map((member, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card 
                  className="team-card" 
                  bordered={false}
                  cover={
                    <div className="team-image-container">
                      <img src={member.image} alt={member.name} className="team-image" />
                    </div>
                  }
                >
                  <div className="team-info">
                    <Title level={3}>{member.name}</Title>
                    <Text type="secondary" className="position">{member.position}</Text>
                    <Paragraph className="member-bio">{member.bio}</Paragraph>
                    <Space className="social-links">
                      <a href="#" className="social-icon">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="social-icon">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="social-icon">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </Space>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <Title level={2} className="section-title">Tại sao chọn chúng tôi</Title>
          <Divider />
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="feature-card" bordered={false}>
                  <div className="feature-icon">{feature.icon}</div>
                  <Title level={3} className="feature-title">{feature.title}</Title>
                  <Paragraph className="feature-description">{feature.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <Card className="cta-card" bordered={false}>
            <Title level={2}>Sẵn sàng mua sắm cùng chúng tôi?</Title>
            <Paragraph>
              Tham gia cùng hàng ngàn khách hàng hài lòng và trải nghiệm các sản phẩm cao cấp cùng dịch vụ xuất sắc của chúng tôi.
            </Paragraph>
            <a href="/" className="cta-button">Mua sắm ngay</a>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default AboutPage;