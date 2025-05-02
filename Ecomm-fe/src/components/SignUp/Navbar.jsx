import React from "react";
import "../../styles/SignUp_styles/NavbarStyle.scss";
import heartIcon from "../../images/heart.png";  
import searchIcon from "../../images/search-interface-symbol.png";
import cartIcon from "../../images/shopping-cart.png";
import { Link , useNavigate } from "react-router-dom";



const Navbar = () => {
  const navigate = useNavigate();
  const toHome = ()=>{
    navigate("/");
  }
  return (
    <div className="navbar-container">
      <h1 className="logo" onClick={toHome}>369</h1>
      <ul className="nav-links">
          <li><Link to= "/"></Link></li>
          <li><Link to="/about">Liên hệ</Link></li>
          <li><Link to="/introduce">Giới thiệu</Link></li>
          <li><Link to="/register">Đăng kí</Link></li>
        </ul>
        
      <div className="search-container">
        <input type="text" placeholder="Nhập từ khóa để tìm" />
        <button className="search-button">
          <img src={searchIcon} width="20" height="20" alt="Search" className="search-icon" />
        </button>
      </div>

      <div className="icons">
        <img src={heartIcon} width="20" height="20" alt="Search" className="search-icons" />
        <img src={cartIcon} width="20" height="20" alt="Cart"  className="search-icons"/>
      </div>
    </div>
  );
};

export default Navbar;
