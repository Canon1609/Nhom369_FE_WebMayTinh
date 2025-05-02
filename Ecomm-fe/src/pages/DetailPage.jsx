import React, { use, useEffect, useState } from "react";
import "../styles/DetailPage/DetailPage.scss";
import { useParams } from "react-router-dom";
import { Button, InputNumber, Rate } from "antd";
import deliver from "../images/detailproduct/icon-delivery.png";
import returnShip from "../images/detailproduct/icon-return.png";
import BestSellingProducts from "../components/HomeComponents/BestSellingProduct";
const DetailPage = () => {
  const params = useParams();
  const { productId } = params;
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fakeProduct = {
      id: productId,
      name: "HAVIT HV-G92 Gamepad",
      image:
        "https://hanoicomputercdn.com/media/product/86482_may_choi_game_sony_playstation_5_ps5_pro_1.jpg",
      price: 12000000,
      originalPrice: 16000000,
      rating: 5,
      reviews: 88,
      instock : 10,
      description:
        "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
    };
    setProduct(fakeProduct);
  }, [productId]);
  return (
    <div className="container">
      <div
        className="detailProduct"
        style={{ marginTop: "100px", display: "flex" }}
      >
        {/* Hình ảnh sản phẩm */}
        <div className="product-detail" style={{ width: "50%" }}>
          <img
          style={{ width: "100%" , aspectRatio: "1/1"}}
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="product-info" style={{ width: "50%" , display: "flex", flexDirection: "column",paddingLeft : '50px'}}> 
          {/* Tên sản phẩm */}
          <h1 className="product-name" style={{textAlign : 'center'}}>{product.name}</h1>
          {/* Đánh giá và tồn kho */}
          <div style={{marginTop : '20px' , display : 'flex' , alignItems : "center"}} >
          <Rate disabled allowHalf value={product.rating}></Rate>
          <div style={{marginLeft : '20px'}}>
            {product.instock > 0 ? (
              <span style={{fontSize : '15px'}}>còn hàng ({product.instock})</span>
            ):(
              <span style={{color : "red" , fontSize : '15px'}}>Hết hàng</span>
            )}
          </div>
          </div>
            {/* Giá sản phẩm */}
          <div className="product-price" style={{marginTop : '20px'}}>
            {/* format vnd  */}

          <span className="current-price">{product.price}</span>
          <span className="original-price">{product.originalPrice}</span>

          </div>
          {/* mô tả sản phẩm */}
          <div className="product-description" style={{marginTop : '20px'}}>
            <p style={{fontSize : '15px' , textAlign : 'left'}}>
              {product.description}
            </p>
            <hr style={{marginTop : '50px'}} />
          </div>
         
          {/* số lượng , nút mua ngay , yêu thích*/}
            <div className="product-button" style={{marginTop : '20px' , display : 'flex' , alignItems : 'center'}}>
             <InputNumber 
                min={1}
                max={product.instock}
                defaultValue={1}
                style={{ padding : '0 5px'}}
              />
              <Button
                type="primary"
                style={{
                  backgroundColor: "#DB4444",
                  marginLeft: "10px",       
                }}
                size="middle"
                onClick={() => {
                  alert("Đã thêm vào giỏ hàng");
                }}
              >Mua ngay</Button>
             <div style={{width : '30px' , height : '30px' , marginLeft : '10px' , display : 'flex' , borderRadius : '10px', justifyContent : 'center' , alignItems : 'center' , border : "1px solid #ccc"}}>
              {/* icon thêm yêu thích */}
            </div>
          </div>
                {/* freeship */}
            <div style={{position: 'absolute' , bottom : 0 }}>
                <div style={{border : "1px solid #ccc" , padding : '10px' , borderRadius : '10px'  }}>
                  <div style={{display : 'flex'  , alignItems : 'center'}}>
                    <img src={deliver}>
                    </img>
                    <div style={{marginLeft : '15px'}}>
                      <span style={{fontSize : '15px'}}>Miễn phí vận chuyển</span>
                      <p>Nhập mã postal code của bạn để được miễn phí vận chuyển</p>
                    </div> 
                  </div>

                  <div style={{display : 'flex'  , alignItems : 'center' , marginTop : '10px' }}>
                    <img src={returnShip}>
                    </img>
                    <div  style={{marginLeft : '15px'}}>
                      <span style={{fontSize : '15px'}}>Đổi trả</span>
                      <p>Đổi trả hàng miễn phí trong vòng 30 ngày</p>
                    </div> 
                  </div>

                </div>
            </div>
        </div>
        
      </div>
      {/* sản phẩm nổi bật */}
      <BestSellingProducts/>  
    </div>
  );
};

export default DetailPage;
