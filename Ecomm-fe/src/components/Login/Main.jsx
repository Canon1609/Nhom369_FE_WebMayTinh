import React, { useContext } from "react";
import "../../styles/Login_styles/LoginForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message, notification } from "antd";
import { AuthContext } from "../context/auth.context";
import { loginAPI } from "../../services/api.service";

function LoginForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { setUser } = useContext(AuthContext);
const [note, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    console.log("Đăng nhập với thông tin: ", values);
  
    const { username, password } = values;
    const res = await loginAPI(username, password);
    console.log("abc", res);
    if (res.data) {
      
      note.info({
        message: `Notification `,
        description: "Đăng nhập thành công",
        type: "suscess",
      });

      // Lưu token và thông tin user vào localStorage và context
      localStorage.setItem("access_token", res.data.tokens.accessToken);
      setUser(res.data.user);

      // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
      setTimeout(() => {
        navigate("/");  // Chuyển hướng sau 1 giây
      }, 1000);
    } else {
      note.info({
        message: `Notification `,
        description: JSON.stringify(res.message),
        type: "error",
      });
      
    };
    
  };

  return (
    <>
    {contextHolder}
    <div className="login-container">
      <div className="login-image">
        <img
          src="https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_960_720.jpg"
          alt="login"
        />
      </div>
      <div className="login-form">
        <h2>Đăng nhập</h2>
        <p>Vui lòng nhập thông tin</p>

        <Form
          name="login"
          onFinish={onFinish} 
          layout="vertical"
        >
          <Form.Item
            label="Tên đăng nhập hoặc email"
            name="username" // Tên trường để gửi dữ liệu
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập hoặc email!",
              },
            ]}
          >
            <Input placeholder="Nhập tên đăng nhập hoặc email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="btn-submit"
              block
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <div className="google-login">
            <Button className="google-btn" block onClick={() => form.submit()}>
              Đăng nhập bằng Google
            </Button>
          </div>
        </Form>

        <div className="signup-link">
          <p>
            Chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}



export default LoginForm;
