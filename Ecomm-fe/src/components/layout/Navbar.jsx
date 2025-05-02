// Navbar/index.js
import React, { useContext, useState } from "react";
import {
  Layout,
  Menu,
  Input,
  Badge,
  Avatar,
  Dropdown,
  Typography,
  Button,
  theme
} from "antd";
import {
  HomeOutlined,
  ContactsOutlined,
  InfoCircleOutlined,
  LoginOutlined,
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { logoutAPI } from "../../services/api.service";

const { Header } = Layout;
const { Search } = Input;
const { Title } = Typography;
const { useToken } = theme;

const Navbar = ({ onSearch }) => {
  const { token } = useToken();
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = async () => {
    try {
      await logoutAPI();
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      navigate("/login");

      setUser({
        avatar: "",
        email: "",
        fullName: "",
        id: "",
        phone: "",
        role: "",
        username: "",
        sum: 0,
        cartDetails: [],
        refresh: false,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSearchInputChange = (value) => {
    setSearchTerm(value);
  };

  const handleSearchSubmit = () => {
    if (onSearch) {
      onSearch(searchTerm.trim()); // Gọi onSearch với searchTerm đã trim
    }
  };

  const goToCartPage = () => {
    navigate("/cartPage");
  };

  // User menu items
  const userMenuProps = {
    items: [
      {
        key: "profile",
        icon: <UserOutlined />,
        label: "Thông tin cá nhân",
        onClick: () => navigate("/account/profile"),
      },
      ...(user.role === "ADMIN" ? [
        {
          key: "admin",
          icon: <SettingOutlined />,
          label: "Trang quản lý",
          onClick: () => navigate("/admin"),
        },
      ] : []),
      {
        type: "divider",
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Đăng xuất",
        onClick: handleLogout,
      },
    ],
  };

  // Main menu items
  const mainMenuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      key: "contact",
      icon: <ContactsOutlined />,
      label: <Link to="/contactPage">Liên hệ</Link>,
    },
    {
      label: <Link to="/about">Giới thiệu</Link>,
      key: "about",
      icon: <InfoCircleOutlined />,
 
    },
  ];


  const navbarStyle = {
    header: {
      background: token.colorBgContainer,
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      padding: "0 24px",
      position: "sticky",
      top: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 64,
    },
    logo: {
      display: "flex",
      alignItems: "center",
    },
    logoText: {
      margin: 0,
      color: token.colorPrimary,
      fontWeight: "bold",
      fontSize: "24px",
    },
    searchSection: {
      display: "flex",
      alignItems: "center",
    },
    actionButtons: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
    username: {
      maxWidth: 120,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      marginLeft: 8,
    },
    mainMenu: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      border: "none",
    },
    iconButton: {
      fontSize: "20px",
    },
    mobileMenuButton: {
      display: "none",
      "@media (max-width: 768px)": {
        display: "block",
      },
    },
    desktopMenu: {
      "@media (max-width: 768px)": {
        display: "none",
      },
    },
  };


  return (
    <Header style={navbarStyle.header}>
      {/* Logo */}
      <div style={navbarStyle.logo}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Title level={3} style={navbarStyle.logoText}>369</Title>
        </Link>
      </div>

      {/* Main Navigation Menu */}
      <Menu
        mode="horizontal"
        items={mainMenuItems}
        style={navbarStyle.mainMenu}
      />

      {/* Search & Action Icons */}
      <div style={navbarStyle.searchSection}>
        <Search
          placeholder="Tìm kiếm sản phẩm"
          value={searchTerm}
          onChange={(e) => handleSearchInputChange(e.target.value)}
          onSearch={handleSearchSubmit}
          style={{ width: 250, marginRight: 16 }}
        />

        <div style={navbarStyle.actionButtons}>
          {/* Wishlist Icon */}
          <Badge count={0} size="small">
            <Button
              type="text"
              icon={<HeartOutlined style={navbarStyle.iconButton} />}
              aria-label="Wishlist"
            />
          </Badge>

          {/* Cart Icon */}
          <Badge count={user.sum || 0} size="small" overflowCount={99}>
            <Button
              type="text"
              icon={<ShoppingCartOutlined style={navbarStyle.iconButton} />}
              onClick={goToCartPage}
              aria-label="Cart"
            />
          </Badge>

          {/* User Account / Login Button */}
          {user.id ? (
            <Dropdown menu={userMenuProps} placement="bottomRight">
              <div style={navbarStyle.userSection}>
                <Avatar
                  src={user?.avatar || null} // Prevent empty string for src
                  icon={!user?.avatar && <UserOutlined />}
                  size="default"
                  style={{ backgroundColor: user?.avatar ? undefined : token.colorPrimary }}
                />
                <span style={navbarStyle.username}>{user.fullName || user.username}</span>
              </div>
            </Dropdown>
          ) : (
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </Header>
  );
};

export default Navbar;