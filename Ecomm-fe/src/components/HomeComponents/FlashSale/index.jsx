import React, { useState, useEffect, use } from 'react';
import { Card, Button, Rate, Carousel } from 'antd';
import { EyeOutlined, HeartOutlined } from '@ant-design/icons';
import './FlashSale.css';
import { Link, Links, Navigate, useNavigate } from 'react-router-dom';
import ScrollToTop from '../../ScrollToTop';

const FlashSales = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const products = [
    {
      id: 1,
      image: 'https://hanoicomputercdn.com/media/product/86482_may_choi_game_sony_playstation_5_ps5_pro_1.jpg',
      discount: '-40%',
      name: 'HAVIT HV-G92 Gamepad',
      price: 120,
      originalPrice: 160,
      rating: 5,
      reviews: 88,
    },
    {
      id: 2,
      image: 'https://logico.com.vn/images/products/2023/10/19/original/bo-may-choi-game-ps5-spider-man-2-le_1697685688.png',
      discount: '-35%',
      name: 'AK-900 Wired Keyboard',
      price: 960,
      originalPrice: 1160,
      rating: 4,
      reviews: 75,
    },
    {
      id: 3,
      image: 'https://hailongcomputer.vn/wp-content/uploads/2024/01/pc-gaming-gia-re-g4060-i5-12400f-0.webp',
      discount: '-30%',
      name: 'IPS LCD Gaming Monitor',
      price: 370,
      originalPrice: 400,
      rating: 5,
      reviews: 99,
    },
    {
      id: 4,
      image: 'https://hailongcomputer.vn/wp-content/uploads/2024/01/pc-gaming-gia-re-g4060-i5-12400f-0.webp',
      discount: '-25%',
      name: 'S-Series Comfort Chair',
      price: 375,
      originalPrice: 400,
      rating: 4.5,
      reviews: 99,
    },
  ];
  // Function to handle click event on product card
  const handleClick = (productId) => {
    // Redirect to the detail page with the product ID
    navigate(`/detailPage/${productId}`);
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="flash-sales-container">
      <div className="flash-sales-header">
        <div className="flash-sales-title">
          <span className="red-bar"></span>
          <span>Hôm nay</span>
        </div>
        <div className="flash-sales-timer">
          <h2>Flash Sales</h2>
          <div className="timer">
            <div>
              <span>Ngày</span>
              <span>{String(timeLeft.days).padStart(2, '0')}</span>
            </div>
            <span className="separator">:</span>
            <div>
              <span>Giờ</span>
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
            </div>
            <span className="separator">:</span>
            <div>
              <span>Phút</span>
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
            </div>
            <span className="separator">:</span>
            <div>
              <span>Giây</span>
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
      <Carousel
        slidesToShow={4}
        slidesToScroll={1}
        arrows
        autoplay
        autoplaySpeed={5000}
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {products.map((product, index) => (
          <div key={index} className="product-slide"
            onClick={()=>{handleClick(product.id)}}
          >
            <Card
            style={{ width: '100%' , textAlign : 'center'}}
              hoverable
              cover={<img alt={product.name} src={product.image} style={{width : '200px' , height : 'auto' ,aspectRatio : '4/3' , margin : 'auto'}} />}
             
            >
              <div className="discount">{product.discount}</div>
              <h3>{product.name}</h3>
              <div className="price">
                <span className="current-price">{product.price}</span>
                <span className="original-price">{product.originalPrice}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <Button type="primary" icon={<EyeOutlined />} size="small" className="view-button">
                  Xem
                </Button>
                <Button type="default" icon={<HeartOutlined />} size="small" className="wishlist-button">
                  Yêu thích
                </Button>
              </div>
              {/* <Rate allowHalf defaultValue={product.rating} disabled /> */}
              {/* <span className="reviews">({product.reviews})</span> */}
            </Card>
          </div>
        ))}
      </Carousel>
      <div className="view-all">
        <Button type="primary" danger>
          Xem toàn bộ
        </Button>
      </div>
    </div>
  );
};

export default FlashSales;