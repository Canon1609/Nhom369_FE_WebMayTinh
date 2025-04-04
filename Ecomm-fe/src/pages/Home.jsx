import React from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/HomeComponents/Sidebar";
import Banner from "../components/HomeComponents/Banner";
import FlashSalesTitle from "../components/HomeComponents/FlashSalesTitle";
import CountdownTimer from "../components/HomeComponents/CountdownTimer";
import "../styles/HomeStyles/Home.scss";
import Arrow from "../components/HomeComponents/Arrow";
import FlashSalesProduct from "../components/HomeComponents/FlashSalesProduct";

import PS4 from "../images/PS4.png";
import Banphim from "../images/Banphim.png";
import Manhinh from "../images/Manhinh.png";
import Ghe from "../images/Ghe.png";
import ButtonShow from "../components/HomeComponents/ButtonShow";
import CategoriesTitle from "../components/HomeComponents/CategoriesTitle";
import ArrowCategories from "../components/HomeComponents/ArrowCategories";

import Iphone from "../images/smartphone.png";  // Hình ảnh iPhone
import Computers from "../images/dashboard.png";  // Hình ảnh Computer
import SmartWatch from "../images/smartwatch.png";  // Hình ảnh SmartWatch
import Camera from "../images/camera.png";  // Hình ảnh Camera
import Headphones from "../images/headphones.png";  // Hình ảnh Headphones
import Gaming from "../images/console.png";  // Hình ảnh Gaming

import ThisMonthTitle from "../components/HomeComponents/ThisMonthTitle";
import ButtonThisMonth from "../components/HomeComponents/ButtonThisMonth";

import ThisMonthProduct from "../components/HomeComponents/ThisMonthProduct";
import Hoodie from "../images/hoodie.png";
import Bag from "../images/bag.png";
import CPU from "../images/cpu.png";
import BookShelf from "../images/bookshelf.png";
import OurProductsTitle from "../components/HomeComponents/OurProductsTitle";

import Banner2 from "../components/HomeComponents/Banner2";
import ArrowOurProductsTitle from "../components/HomeComponents/ArrowOurProductsTitle";
import OurProducts from "../components/HomeComponents/OurProducts";

import Dog from "../images/dog.png";
import Cannon from "../images/canon.png";
import Laptop from "../images/laptop.png";
import Skin from "../images/skin.png";

import Car from "../images/car.png";
import Shoe from "../images/shoe.png";
import PS5 from "../images/ps5.png";
import jacket from "../images/jacket.png";

import ButtonOurproducts from "../components/HomeComponents/ButtonOurproducts";
import Featured from "../components/HomeComponents/Featured";

import PS5_2 from "../images/PS5(2).png";
import Girl from "../images/girl.png";
import Speaker from "../images/speaker.png";
import Perfume from "../images/perfume.png";
import FeaturedProduct from "../components/HomeComponents/FeaturedProduct";

import FeaturedService from "../components/HomeComponents/FeaturedService";
import Footer from "../components/layout/Footer";

const Home = () => {
  const targetTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000; // 3 ngày từ bây giờ

  // Dữ liệu sản phẩm Flash Sale
  const products = [
    {
      id: 1,
      image: PS4, // Sử dụng biến import
      name: "Havit HV-692 Gamepad",
      price: 160,
      discount: 40,
    },
    {
      id: 2,
      image: Banphim, 
      name: "AK-900 Wired Keyboard",
      price: 160,
      discount: 35,
    },
    {
      id: 3,
      image: Manhinh, 
      name: "IPS LCD Gaming Monitor",
      price: 400,
      discount: 30,
    },
    {
      id: 4,
      image: Manhinh, 
      name: "S-Series Comfort Chair",
      price: 400,
      discount: 25,
    },
  ];

  // Dữ liệu danh mục đơn giản (chỉ có hình ảnh và tên)
  const categories = [
    { id: 1, name: "Phones", image: Iphone },
    { id: 2, name: "Computers", image: Computers },
    { id: 3, name: "SmartWatch", image: SmartWatch },
    { id: 4, name: "Camera", image: Camera },
    { id: 5, name: "Headphones", image: Headphones },
    { id: 6, name: "Gaming", image: Gaming },
  ];

  // Dữ liệu sản phẩm This Month
  const thisMonthProducts  = [
    {
      id: 1,
      image: Hoodie, // Sử dụng biến import
      name: "Havit HV-692 Gamepad",
      price: 160,
      discount: 40,
    },
    {
      id: 2,
      image: Bag, 
      name: "AK-900 Wired Keyboard",
      price: 160,
      discount: 35,
    },
    {
      id: 3,
      image: CPU, 
      name: "IPS LCD Gaming Monitor",
      price: 400,
      discount: 30,
    },
    {
      id: 4,
      image: CPU, 
      name: "S-Series Comfort Chair",
      price: 400,
      discount: 25,
    },
  ];

  // Dữ liệu sản phẩm Our Products
  const ourProductsData = [
    {
      id: 1,
      image: Dog,
      name: "Havit HV-692 Gamepad",
      price: 160,
      discount: 40,
    },
    {
      id: 2,
      image: Cannon,
      name: "AK-900 Wired Keyboard",
      price: 160,
      discount: 35,
    },
    {
      id: 3,
      image: Laptop,
      name: "IPS LCD Gaming Monitor",
      price: 400,
      discount: 30,
    },
    {
      id: 4,
      image: Skin,
      name: "S-Series Comfort Chair",
      price: 400,
      discount: 25,
    },
    {
      id: 5,
      image: Car,
      name: "S-Series Comfort Chair",
      price: 400,
      discount: 25,
    },
    {
      id: 6,
      image: Shoe,
      name: "S-Series Comfort Chair",
      price: 400,
      discount: 25,
    },

    {
      id: 7,
      image: PS5,
      name: "S-Series Comfort Chair",
      price: 400,
      discount: 25,
    },

    {
      id: 8,
      image: jacket,
      name: "S-Series Comfort Chair",
      price: 400,
      discount: 25,
    },

    {
      id: 9,
      image: Manhinh,
      name: "S-Series Comfort Chair",
      price: 400,
      discount: 25,
    },
  ];

// Dữ liệu Featured Products
const featuredProducts = [
  {
    id: 1,
    image: PS5_2,
    name: "PlayStation 5",
    description: "Black and White version of the PS5 coming out on sale.",
  },
  {
    id: 2,
    image: Speaker,
    name: "Speakers",
    description: "Amazon wireless speakers available now.",
  },
  {
    id: 3,
    image: Perfume,
    name: "Perfume",
    description: "GUCCI INTENSE OUD EDP, now in stock.",
  },
  {
    id: 4,
    image: Girl,
    name: "Women’s Collections",
    description: "Featured women collections that give you another vibe.",
  },
];


  return (
    <div className="home-container">

      <div className="content">
        <Sidebar />
        <Banner />
      </div>

      <div className="flash-sales-container">
        <FlashSalesTitle />
        {/* <CountdownTimer targetTime={targetTime} /> */}
        <Arrow />
      </div>

      {/* Hiện sản phẩm trong Flash Sales */}
      <div className="flash-sales-products">
        {products.map((product) => (
          <FlashSalesProduct
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            discount={product.discount}
          />
        ))}
      </div>

      <div className="footer-button">
          <ButtonShow />
      </div>

      {/* Categories */}
      <div className="categories-container">
        <CategoriesTitle />
        <ArrowCategories />
      </div>

      {/* Hiện sản phẩm trong categories */}
      <div className="category-products">
        <div className="category-list">
          {categories.map((category) => (
            <div key={category.id} className="category-item">
              <img src={category.image} alt={category.name} className="category-image" />
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* This Month */}
      <div className="thisMonth-container">
          <ThisMonthTitle />
          <ButtonThisMonth />
      </div>

      {/* Hiện sản phẩm trong This Month */}
      <div className="this-month-products">
        {thisMonthProducts.map((product) => (
          <ThisMonthProduct
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            discount={product.discount}
          />
        ))}
      </div>

      {/* Banner2 */}
      <div className="banner2-container">
        <Banner2 />
      </div>

      {/* Our products */}
      <div className="our-products-container">
        <OurProductsTitle />
        <ArrowOurProductsTitle />
      </div>

      {/* Hiển thị sản phẩm trong Our Product */}
      <div className="our-ProductSales-products">
        {ourProductsData.map((product) => (
          <OurProducts
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            discount={product.discount}
          />
        ))}
      </div>

      <div className="footer-buttonOurProducts">
          <ButtonOurproducts />
      </div>

      {/* Featured */}
      <div className="featured-container">
          <Featured />
      </div>

      {/* Hiển thị Featured Products */}
      <div className="featured-products">
        {featuredProducts.map((product) => (
          <FeaturedProduct
            key={product.id}
            image={product.image}
            name={product.name}
            description={product.description}
          />
        ))}
      </div>

      {/* Các dịch vụ nổi bật */}
      <div className="featured-service-container">
        <FeaturedService />
      </div>

      <div className="footer-home">
          <Footer />
      </div>

    </div>
  );
};

export default Home;




