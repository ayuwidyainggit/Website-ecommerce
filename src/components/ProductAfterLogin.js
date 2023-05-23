import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import sale from "../assets/sale-tag.png";
import { Link } from "react-router-dom";

const ProductAfterLogin = () => {
  const { fetchProduct, product } = useContext(GlobalContext);

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="w-[100%] relative">
      <div className="relative w-[90%] left-[5%] grid grid-cols-5 gap-8  mt-20 ">
        {product.map((produk, index) => (
          <div
            key={produk.id}
            className="border border-[#2DCFC1] shadow-md rounded-md p-[1rem] "
          >
            {produk.is_diskon === true ? (
              <div className=" absolute ">
                <img
                  src={sale}
                  alt=""
                  className="relative w-[50px] h-[50px] -top-5 -left-5"
                />
              </div>
            ) : (
              <p></p>
            )}

            <img src={produk.image_url} alt="" />
            <p>{produk.name}</p>
            {produk.is_diskon === true ? (
              <p className="line-through">Rp {produk.harga}</p>
            ) : (
              <p>Rp {produk.harga}</p>
            )}

            {produk.is_diskon === true ? (
              <p>Rp {produk.harga_diskon}</p>
            ) : (
              <p></p>
            )}
            <div>
              <Link to={`/productdetails/${produk.id}`}>
                <button className=" mr-4 mt-8 border border-[#2DCFC1] bg-[#2DCFC1] text-white h-[40px] w-[120px] rounded-md hover:bg-white hover:text-black">
                  Lihat Detail
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAfterLogin;
