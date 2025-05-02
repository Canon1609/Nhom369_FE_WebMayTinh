import React, { useState, useEffect, useRef } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Button,
  Typography,
  Spin,
  Empty,
  Rate,
  Menu,
} from "antd";
import Categories from "../components/HomeComponents/Category";
import FlashSales from "../components/HomeComponents/FlashSale";
import BestSellingProducts from "../components/HomeComponents/BestSellingProduct";
import ExploreOurProducts from "../components/HomeComponents/OurProducts/index";

const { Title } = Typography;

const fetchCategories = async () => {
  try {
    const response = await fetch("http://localhost:8082/api/categories");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await fetch(`http://localhost:8082/api/products/category/${categoryId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    return [];
  }
};

const fetchProductsBySearch = async (keyword) => {
  try {
    const response = await fetch(
      `http://localhost:8082/api/products/search?keyword=${encodeURIComponent(keyword)}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching products for keyword ${keyword}:`, error);
    return [];
  }
};

const formatVND = (price) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
};

const Home = ({ onSearchHandler }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loadingCategoryProducts, setLoadingCategoryProducts] = useState(false);
  const [errorCategoryProducts, setErrorCategoryProducts] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const categoryProductsRef = useRef(null);

  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCategories(true);
      setErrorCategories(null);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setErrorCategories(err.message || "Có lỗi xảy ra khi tải danh mục.");
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadCategoryProducts = async () => {
      if (selectedCategory) {
        setLoadingCategoryProducts(true);
        setErrorCategoryProducts(null);
        setSearchTerm("");
        try {
          const products = await fetchProductsByCategory(selectedCategory);
          setCategoryProducts(products);
          const category = categories.find((cat) => cat.id === selectedCategory);
          setCategoryName(category ? category.name : null);
        } catch (error) {
          setErrorCategoryProducts(error.message || "Có lỗi xảy ra khi tải sản phẩm theo danh mục.");
          setCategoryProducts([]);
          setCategoryName(null);
        } finally {
          setLoadingCategoryProducts(false);
        }
      } else if (searchTerm) {
        setLoadingCategoryProducts(true);
        setErrorCategoryProducts(null);
        try {
          const products = await fetchProductsBySearch(searchTerm);
          setCategoryProducts(products);
          setCategoryName(null);
        } catch (error) {
          setErrorCategoryProducts(error.message || "Có lỗi xảy ra khi tìm kiếm sản phẩm.");
          setCategoryProducts([]);
        } finally {
          setLoadingCategoryProducts(false);
        }
      } else {
        setCategoryProducts([]);
        setCategoryName(null);
        setSearchTerm("");
      }
    };

    loadCategoryProducts();
  }, [selectedCategory, searchTerm, categories]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchTerm("");
    if (categoryProductsRef.current) {
      categoryProductsRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSearch = (keyword) => {
    setSearchTerm(keyword);
    setSelectedCategory(null);
    if (categoryProductsRef.current) {
      categoryProductsRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Truyền handleSearch lên App.js khi component mount
  useEffect(() => {
    if (onSearchHandler) {
      onSearchHandler(handleSearch);
    }
  }, [onSearchHandler]);

  // const scrollToCategoryProducts = () => {
  //   categoryProductsSection.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // const handleCategorySelect = (products) => {
  //   setSelectedCategoryProducts(products);
  //   setSearchResults([]);
  //   scrollToCategoryProducts();
  // };

  // const handleShowAllProducts = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(`${API_URL}/products`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch products");
  //     }
  //     const products = await response.json();
  //     setSelectedCategoryProducts(products);
  //     setSearchResults([]);
  //     scrollToCategoryProducts();
  //   } catch (err) {
  //     api.error({
  //       message: "Lỗi",
  //       description: "Không thể tải danh sách sản phẩm",
  //       placement: "bottomRight",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleSearch = async (keyword) => {
  //   setSearchLoading(true);
  //   setError(null);
  //   setCurrentSearchTerm(keyword);
  //   setSearchResults([]);

  //   if (!keyword.trim()) {
  //     try {
  //       const response = await fetch(`${API_URL}/products`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch all products");
  //       }
  //       const allProducts = await response.json();
  //       setSearchResults(allProducts);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setSearchLoading(false);
  //     }
  //     setSelectedCategoryProducts([]);
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${API_URL}/products/search?keyword=${keyword}`);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     if (response.status === 204) {
  //       setSearchResults([]);
  //     } else {
  //       const data = await response.json();
  //       setSearchResults(data);
  //     }
  //     setSelectedCategoryProducts([]);
  //   } catch (err) {
  //     setError(err.message);
  //     setSearchResults([]);
  //   } finally {
  //     setSearchLoading(false);
  //   }
  // };

  // // Render functions for better organization
  // const renderCountdownTimer = () => {
  //   const now = new Date().getTime();
  //   const timeLeft = targetTime - now;

  //   if (timeLeft <= 0) return null;

  //   const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  //   const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  //   const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  //   return (
  //     <div className="countdown-container">
  //       <div className="countdown-item">
  //         <div className="countdown-value">{days}</div>
  //         <div className="countdown-label">Days</div>
  //       </div>
  //       <div className="countdown-separator">:</div>
  //       <div className="countdown-item">
  //         <div className="countdown-value">{hours}</div>
  //         <div className="countdown-label">Hours</div>
  //       </div>
  //       <div className="countdown-separator">:</div>
  //       <div className="countdown-item">
  //         <div className="countdown-value">{minutes}</div>
  //         <div className="countdown-label">Minutes</div>
  //       </div>
  //       <div className="countdown-separator">:</div>
  //       <div className="countdown-item">
  //         <div className="countdown-value">{seconds}</div>
  //         <div className="countdown-label">Seconds</div>
  //       </div>
  //     </div>
  //   );
  // };

  // const renderProductCard = (product, isFlashSale = false) => {
  //   const discountedPrice = product.discount > 0
  //     ? product.price * (1 - product.discount / 100)
  //     : null;

  //   return (
  //     <Badge.Ribbon
  //       text={`${product.discount}% OFF`}
  //       color="red"
  //       style={{ display: product.discount > 0 ? 'block' : 'none' }}
  //     >
  //       <Card
  //         hoverable
  //         className="product-card"
  //         cover={
  //           <div className="product-img-container">
  //             <img alt={product.name} src={product.image} />
  //           </div>
  //         }
  //         // actions={[
  //         //   <Button
  //         //     type="primary"
  //         //     icon={<ShoppingCartOutlined />}
  //         //     onClick={() => handleAddToCart(product.id, 1)}
  //         //   >
  //         //     Thêm vào giỏ
  //         //   </Button>
  //         // ]}
  //       >
  //         <Meta
  //           title={product.name}
  //           description={
  //             <>
  //               {discountedPrice ? (
  //                 <div className="price-container">
  //                   <Text delete type="secondary" className="original-price">
  //                     {product.price.toLocaleString()} VND
  //                   </Text>
  //                   <Text strong type="danger" className="discounted-price">
  //                     {Math.floor(discountedPrice).toLocaleString()} VND
  //                   </Text>
  //                 </div>
  //               ) : (
  //                 <Text strong className="price">
  //                   {product.price.toLocaleString()} VND
  //                 </Text>
  //               )}
  //               {isFlashSale && (
  //                 <div className="progress-container">
  //                   <div className="progress-bar">
  //                     <div
  //                       className="progress-fill"
  //                       style={{ width: `${Math.floor(Math.random() * 80) + 20}%` }}
  //                     />
  //                   </div>
  //                   <Text type="secondary">Đã bán: {Math.floor(Math.random() * 50) + 10}</Text>
  //                 </div>
  //               )}
  //             </>
  //           }
  //         />
  //       </Card>
  //     </Badge.Ribbon>
  //   );
  // };

  // const renderCategoryCard = (category) => (
  //   <Card
  //     hoverable
  //     className="category-card"
  //     cover={
  //       <img
  //         alt={category.name}
  //         src={categoryImages[category.name] || "https://via.placeholder.com/150"}
  //       />
  //     }
  //   >
  //     <Meta title={category.name} />
  //   </Card>
  // );

  // const renderFeaturedCard = (product) => (
  //   <Card hoverable className="featured-card">
  //     <Row gutter={[16, 16]} align="middle">
  //       <Col xs={24} sm={8}>
  //         <div className="featured-img-container">
  //           <img alt={product.name} src={product.image} />
  //         </div>
  //       </Col>
  //       <Col xs={24} sm={16}>
  //         <Title level={4}>{product.name}</Title>
  //         <Paragraph ellipsis={{ rows: 3 }}>{product.description}</Paragraph>
  //         <Button type="primary">Xem chi tiết</Button>
  //       </Col>
  //     </Row>
  //   </Card>
  // );

  // const renderSearchResults = () => (
  //   <div className="search-results-section">
  //     <Title level={3}>
  //       Kết quả tìm kiếm {currentSearchTerm && `cho "${currentSearchTerm}"`}
  //     </Title>
  //     {searchLoading ? (
  //       <div className="loading-container">
  //         <Spin size="large" />
  //         <Text>Đang tìm kiếm...</Text>
  //       </div>
  //     ) : searchResults.length > 0 ? (
  //       <Row gutter={[16, 16]}>
  //         {searchResults.map((product) => (
  //           <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
  //             {renderProductCard(product)}
  //           </Col>
  //         ))}
  //       </Row>
  //     ) : currentSearchTerm && (
  //       <Empty
  //         description={
  //           <Text>Không tìm thấy sản phẩm nào phù hợp với từ khóa .</Text>
  //         }
  //       />
  //     )}
  //   </div>
  // );

  // const renderSelectedCategoryProducts = () => (
  //   <div ref={categoryProductsSection} className="category-products-section">
  //     <Title level={3}>Sản phẩm</Title>
  //     <Row gutter={[16, 16]}>
  //       {selectedCategoryProducts.map((product) => (
  //         <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
  //           {renderProductCard(product)}
  //         </Col>
  //       ))}
  //     </Row>
  //   </div>
  // );

  // const renderServiceFeatures = () => {
  //   const services = [
  //     {
  //       icon: <CustomerServiceOutlined style={{ fontSize: '32px' }} />,
  //       title: 'Hỗ trợ 24/7',
  //       description: 'Sẵn sàng hỗ trợ bạn mọi lúc'
  //     },
  //     {
  //       icon: <ThunderboltOutlined style={{ fontSize: '32px' }} />,
  //       title: 'Giao hàng nhanh',
  //       description: 'Giao hàng trong vòng 24h'
  //     },
  //     {
  //       icon: <GiftOutlined style={{ fontSize: '32px' }} />,
  //       title: 'Quà tặng hấp dẫn',
  //       description: 'Nhiều ưu đãi cho khách hàng'
  //     }
  //   ];

  //   return (
  //     <Row gutter={[16, 16]} className="services-container">
  //       {services.map((service, index) => (
  //         <Col xs={24} md={8} key={index}>
  //           <Card className="service-card">
  //             <div className="service-icon">{service.icon}</div>
  //             <Title level={4}>{service.title}</Title>
  //             <Text>{service.description}</Text>
  //           </Card>
  //         </Col>
  //       ))}
  //     </Row>
  //   );
  // };

  // const renderFeaturedSection = () => (
  //   <div className="featured-section">
  //     <Row>
  //       <Col span={24}>
  //         <Title level={3} className="section-title">
  //           <StarOutlined /> Sản phẩm nổi bật
  //         </Title>
  //         <Divider />
  //       </Col>
  //     </Row>
  //     <Row gutter={[16, 16]}>
  //       {featuredProducts.map((product) => (
  //         <Col xs={24} md={12} key={product.id}>
  //           {renderFeaturedCard(product)}
  //         </Col>
  //       ))}
  //     </Row>
  //   </div>
  // );

  // if (error) {
  //   return (
  //     <Layout className="error-layout">
  //       <Content className="error-content">
  //         <Empty
  //           image={Empty.PRESENTED_IMAGE_SIMPLE}
  //           description={
  //             <Text type="danger">
  //               Đã xảy ra lỗi: {error}. Vui lòng thử lại sau.
  //             </Text>
  //           }
  //         />
  //         <Button type="primary" onClick={() => window.location.reload()}>
  //           Tải lại trang
  //         </Button>
  //       </Content>
  //     </Layout>
  //   );
  // }

  // const mainContent = (
  //   <Content className="main-content">
  //     {contextHolder}

  //     {searchResults.length > 0 ? renderSearchResults() : null}

  //     {selectedCategoryProducts.length > 0 ? renderSelectedCategoryProducts() : null}

  //     {!searchResults.length && !selectedCategoryProducts.length && (
  //       <>
  //         {/* Banner */}
  //         <div className="banner-container">
  //           <Carousel {...carouselSettings}>
  //             <div>
  //               <div className="carousel-slide slide1">
  //                 <div className="slide-content">
  //                   <Title level={2}>Khuyến mãi đặc biệt</Title>
  //                   <Title level={3}>Giảm giá đến 50%</Title>
  //                   <Button type="primary" size="large">Mua ngay</Button>
  //                 </div>
  //               </div>
  //             </div>
  //             <div>
  //               <div className="carousel-slide slide2">
  //                 <div className="slide-content">
  //                   <Title level={2}>Sản phẩm mới</Title>
  //                   <Title level={3}>Công nghệ tiên tiến</Title>
  //                   <Button type="primary" size="large">Khám phá</Button>
  //                 </div>
  //               </div>
  //             </div>
  //           </Carousel>
  //         </div>

  //         {/* Flash Sales Section */}
  //         <div className="section-container flash-sales-section">
  //           <Row align="middle" justify="space-between" className="section-header">
  //             <Col>
  //               <Title level={3} className="section-title">
  //                 <FireOutlined /> Flash Sales
  //               </Title>
  //             </Col>
  //             <Col>
  //               {renderCountdownTimer()}
  //             </Col>
  //           </Row>

  //           <Divider />

  //           <Row gutter={[16, 16]}>
  //             {loading ? (
  //               Array(4).fill(0).map((_, index) => (
  //                 <Col xs={24} sm={12} md={8} lg={6} key={index}>
  //                   <Card>
  //                     <Skeleton.Image active style={{ width: '100%', height: '200px' }} />
  //                     <Skeleton active paragraph={{ rows: 2 }} />
  //                   </Card>
  //                 </Col>
  //               ))
  //             ) : (
  //               flashSalesProducts.map((product) => (
  //                 <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
  //                   {renderProductCard(product, true)}
  //                 </Col>
  //               ))
  //             )}
  //           </Row>

  //           <div className="section-footer">
  //             <Button
  //               type="primary"
  //               size="large"
  //               onClick={handleShowAllProducts}
  //             >
  //               Xem tất cả <RightOutlined />
  //             </Button>
  //           </div>
  //         </div>

  //         {/* Categories Section */}
  //         <div className="section-container categories-section">
  //           <Row>
  //             <Col span={24}>
  //               <Title level={3} className="section-title">
  //                 <AppstoreOutlined /> Danh mục sản phẩm
  //               </Title>
  //               <Divider />
  //             </Col>
  //           </Row>

  //           <Row gutter={[16, 16]}>
  //             {loading ? (
  //               Array(7).fill(0).map((_, index) => (
  //                 <Col xs={12} sm={8} md={6} lg={4} xl={3} key={index}>
  //                   <Card>
  //                     <Skeleton.Image active style={{ width: '100%', height: '100px' }} />
  //                     <Skeleton active paragraph={{ rows: 1 }} />
  //                   </Card>
  //                 </Col>
  //               ))
  //             ) : (
  //               categories.map((category) => (
  //                 <Col xs={12} sm={8} md={6} lg={4} xl={3} key={category.id}>
  //                   {renderCategoryCard(category)}
  //                 </Col>
  //               ))
  //             )}
  //           </Row>
  //         </div>

  //         {/* This Month Section */}
  //         <div className="section-container this-month-section">
  //           <Row align="middle" justify="space-between" className="section-header">
  //             <Col>
  //               <Title level={3} className="section-title">
  //                 <CalendarOutlined /> Sản phẩm nổi bật tháng này
  //               </Title>
  //             </Col>
  //             <Col>
  //               <Button type="link" onClick={handleShowAllProducts}>
  //                 Xem tất cả <RightOutlined />
  //               </Button>
  //             </Col>
  //           </Row>

  //           <Divider />

  //           <Tabs defaultActiveKey="1">
  //             <TabPane tab="Tất cả" key="1">
  //               <Row gutter={[16, 16]}>
  //                 {loading ? (
  //                   Array(4).fill(0).map((_, index) => (
  //                     <Col xs={24} sm={12} md={8} lg={6} key={index}>
  //                       <Card>
  //                         <Skeleton.Image active style={{ width: '100%', height: '200px' }} />
  //                         <Skeleton active paragraph={{ rows: 2 }} />
  //                       </Card>
  //                     </Col>
  //                   ))
  //                 ) : (
  //                   thisMonthProducts.map((product) => (
  //                     <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
  //                       {renderProductCard(product)}
  //                     </Col>
  //                   ))
  //                 )}
  //               </Row>
  //             </TabPane>
  //             <TabPane tab="Điện thoại" key="2">
  //               <Row gutter={[16, 16]}>
  //                 {loading ? (
  //                   <Col span={24}>
  //                     <Spin />
  //                   </Col>
  //                 ) : (
  //                   thisMonthProducts.slice(0, 2).map((product) => (
  //                     <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
  //                       {renderProductCard(product)}
  //                     </Col>
  //                   ))
  //                 )}
  //               </Row>
  //             </TabPane>
  //             <TabPane tab="Laptop" key="3">
  //               <Row gutter={[16, 16]}>
  //                 {loading ? (
  //                   <Col span={24}>
  //                     <Spin />
  //                   </Col>
  //                 ) : (
  //                   thisMonthProducts.slice(2, 4).map((product) => (
  //                     <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
  //                       {renderProductCard(product)}
  //                     </Col>
  //                   ))
  //                 )}
  //               </Row>
  //             </TabPane>
  //           </Tabs>
  //         </div>

  //         {/* Banner 2 */}
  //         <div className="banner2-container">
  //           <Row gutter={[16, 16]}>
  //             <Col xs={24} md={12}>
  //               <div className="promo-banner promo-banner-1">
  //                 <div className="promo-content">
  //                   <Title level={3}>Khuyến mãi giảm giá</Title>
  //                   <Paragraph>Tiết kiệm đến 40% cho sản phẩm công nghệ</Paragraph>
  //                   <Button type="primary">Mua ngay</Button>
  //                 </div>
  //               </div>
  //             </Col>
  //             <Col xs={24} md={12}>
  //               <div className="promo-banner promo-banner-2">
  //                 <div className="promo-content">
  //                   <Title level={3}>Sản phẩm mới</Title>
  //                   <Paragraph>Khám phá những sản phẩm công nghệ mới nhất</Paragraph>
  //                   <Button type="primary">Khám phá</Button>
  //                 </div>
  //               </div>
  //             </Col>
  //           </Row>
  //         </div>

  //         {/* Our Products Section */}
  //         <div className="section-container our-products-section">
  //           <Row align="middle" justify="space-between" className="section-header">
  //             <Col>
  //               <Title level={3} className="section-title">
  //                 Sản phẩm của chúng tôi
  //               </Title>
  //             </Col>
  //             <Col>
  //               <Button type="link" onClick={handleShowAllProducts}>
  //                 Xem tất cả <RightOutlined />
  //               </Button>
  //             </Col>
  //           </Row>

  //           <Divider />

  //           <Row gutter={[16, 16]}>
  //             {loading ? (
  //               Array(8).fill(0).map((_, index) => (
  //                 <Col xs={24} sm={12} md={8} lg={6} key={index}>
  //                   <Card>
  //                     <Skeleton.Image active style={{ width: '100%', height: '200px' }} />
  //                     <Skeleton active paragraph={{ rows: 2 }} />
  //                   </Card>
  //                 </Col>
  //               ))
  //             ) : (
  //               ourProducts.map((product) => (
  //                 <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
  //                   {renderProductCard(product)}
  //                 </Col>
  //               ))
  //             )}
  //           </Row>

  //           <div className="section-footer">
  //             <Button
  //               type="primary"
  //               size="large"
  //               onClick={handleShowAllProducts}
  //             >
  //               Xem tất cả sản phẩm <RightOutlined />
  //             </Button>
  //           </div>
  //         </div>

  //         {/* Featured Section */}
  //         {renderFeaturedSection()}

  //         {/* Services Section */}
  //         {renderServiceFeatures()}
  //       </>
  //     )}
  //   </Content>
  // );

  // return (
  //   <Layout className="layout">
  //     {/* <Affix>
  //       <Navbar onSearch={handleSearch} />
  //     </Affix> */}

  //     <Layout className="site-layout">
  //       <Row gutter={[16, 16]}>
  //         <Col xs={0} sm={0} md={5} lg={4}>
  //           <Affix offsetTop={64}>
  //             <Sidebar onCategorySelect={handleCategorySelect} />
  //           </Affix>
  //         </Col>
  //         <Col xs={24} sm={24} md={19} lg={20}>
  //           {loading && !searchResults.length && !selectedCategoryProducts.length ? (
  //             <div className="loading-container">
  //               <Spin size="large" />
  //               <Text>Đang tải dữ liệu...</Text>
  //             </div>
  //           ) : (
  //             mainContent
  //           )}
  //         </Col>
  //       </Row>
  //     </Layout>

  //     {/* <Footer /> */}
  //   </Layout>
  // );

  // const categories = [
  //   { key: "1", label: "Pc Gaming" },
  //   { key: "2", label: "Pc văn phòng" },
  //   { key: "3", label: "Laptop Gaming", icon: null },
  //   { key: "4", label: "Laptop văn phòng", icon: null },
  //   { key: "5", label: "Linh kiện máy tính", icon: null },
  //   { key: "6", label: "Điện thoại", icon: null },
  // ];

  // const bannerData = [
  //   {
  //     key: "1",
  //     title: "Up to 10% off Voucher",
  //     subTitle: "iPhone 14 Series",
  //     image: "/api/placeholder/400/300", // Thay thế bằng URL hình ảnh thực tế của iPhone 14
  //     buttonText: "Shop Now",
  //     buttonLink: "#",
  //   },
  //   {
  //     key: "2",
  //     title: "Khởi động mùa hè",
  //     subTitle: "iPhone 16 Series",
  //     image: "/api/placeholder/400/300", // Thay thế bằng URL hình ảnh thực tế của iPhone 14
  //     buttonText: "Mua ngay",
  //     buttonLink: "#",
  //   },
  //   // Thêm các slide khác nếu cần
  // ];
  return (
    <>
      <div className="home-container">
        <div className="container">
          {/* Sidebar & Banner */}
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* Sidebar Categories */}
            <div
              className="sidebar-categories"
              style={{
                width: "220px",
                background: "white",
                borderRight: "1px solid #f0f0f0",
                height: "100%",
              }}
            >
              {loadingCategories ? (
                <Spin size="small" style={{ display: "block", textAlign: "center", marginTop: 20 }} />
              ) : errorCategories ? (
                <div style={{ color: "red", textAlign: "center", marginTop: 20 }}>{errorCategories}</div>
              ) : (
                <Menu
                  mode="vertical"
                  style={{ borderRight: "none" }}
                  items={categories.map((category) => ({
                    key: category.id,
                    label: (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        onClick={() => handleCategorySelect(category.id)}
                      >
                        <span>{category.name}</span>
                      </div>
                    ),
                  }))}
                />
              )}
            </div>
            {/* Banner */}
            <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "30px" }}>
              <div
                className="banner"
                style={{ width: "100%", maxWidth: "1200px", height: "400px", position: "relative" }}
              >
                <img
                  src="https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg"
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
            </div>
          </div>

          {/* Khu vực sản phẩm theo category hoặc tìm kiếm */}
          <div style={{ marginTop: "30px" }} ref={categoryProductsRef}>
            {(selectedCategory || searchTerm) && (
              <>
                <Title level={3} style={{ marginBottom: 16, textAlign: "center" }}>
                  {searchTerm
                    ? `Kết quả tìm kiếm theo "${searchTerm}"`
                    : categoryName
                    ? `Sản phẩm thuộc danh mục "${categoryName}"`
                    : "Sản phẩm theo danh mục"}
                </Title>
                {loadingCategoryProducts ? (
                  <div style={{ textAlign: "center" }}>
                    <Spin />
                  </div>
                ) : errorCategoryProducts ? (
                  <div style={{ color: "red", textAlign: "center" }}>{errorCategoryProducts}</div>
                ) : categoryProducts.length > 0 ? (
                  <Row gutter={[16, 16]}>
                    {categoryProducts.map((product) => (
                      <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                          hoverable
                          cover={
                            <div style={{ height: 80, overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                              {product.image && (
                                <img
                                  alt={product.name}
                                  src={product.image}
                                  style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                                />
                              )}
                            </div>
                          }
                        >
                          <Card.Meta
                            title={
                              <Typography.Paragraph ellipsis={{ rows: 2 }}>
                                {product.name}
                              </Typography.Paragraph>
                            }
                            description={
                              <>
                                <div className="price">
                                  <span className="current-price">{formatVND(product.price)}</span>
                                  {product.oldPrice && (
                                    <span className="old-price">{formatVND(product.oldPrice)}</span>
                                  )}
                                </div>
                                <Rate
                                  disabled
                                  allowHalf
                                  value={product.rating}
                                  style={{ fontSize: 12 }}
                                />
                              </>
                            }
                          />
                          <Button
                            type="primary"
                            style={{ marginTop: 16 }}
                            block
                            // onClick={() => handleAddToCart(product)}
                          >
                            Thêm vào giỏ hàng
                          </Button>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Empty description={searchTerm ? "Không tìm thấy sản phẩm." : "Không có sản phẩm nào trong danh mục này."} />
                )}
              </>
            )}
          </div>

          {/* Flash Sales today */}
          <div style={{ marginTop: "50px" }}>
            <FlashSales />
          </div>

          {/* Category */}
          <div style={{ marginTop: "50px" }}>
            <Categories onCategorySelect={handleCategorySelect} />
          </div>

          {/* Best selling product */}
          <div style={{ marginTop: "50px" }}>
            <BestSellingProducts />
          </div>

          {/* Middle banner */}
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src="https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg"
                alt=""
              />
            </div>
          </div>

          {/* Our product */}
          <div style={{ marginTop: "50px" }}>
            <ExploreOurProducts selectedCategory={selectedCategory} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;