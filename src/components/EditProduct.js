import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const initialState = {
  name: "",
  harga: "",
  stock: "",
  image_url: "",
  is_diskon: false,
  harga_diskon: "",
  category: "",
  description: "",
};

const schemaValidation = Yup.object({
  name: Yup.string().required("Nama Wajib diisi"),
  harga: Yup.number()
    .typeError("Harga Harus Angka")
    .required("Harga Wajib diisi"),
  stock: Yup.number()
    .typeError("Stok Harus Angka")
    .required("Stock Url Wajib diisi"),
  image_url: Yup.string()
    .required("Image Url wajib diisi")
    .url("Image Url Tidak Valid"),
  is_diskon: Yup.boolean(),
  harga_diskon: Yup.number().when("is_diskon", {
    is: true,
    then: () =>
      Yup.number().required("Harga diskon wajib diisi ketika diskon aktif"),
  }),
  category: Yup.string().required("Category wajib diisi"),
  description: Yup.string().required("Deskripsi wajib diisi"),
});

const EditProduct = () => {
  const { diskon, setDiskon } = useContext(GlobalContext);
  const { fetchProduct } = useContext(GlobalContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const Swal = require("sweetalert2");

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://api-project.amandemy.co.id/api/final/products/${id}`,
        {
          name: values.name,
          harga: values.harga,
          stock: values.stock,
          image_url: values.image_url,
          is_diskon: values.is_diskon,
          harga_diskon: values.harga_diskon,
          category: values.category,
          description: values.description,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchProduct();
      Swal.fire({
        title: "Success!",
        text: "Berhasil Mengupdate Product",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/Website-ecommerce/table");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.info,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  const fetchArticleDetail = async (event) => {
    try {
      const response = await axios.get(
        `https://api-project.amandemy.co.id/api/final/products/${id}`
      );
      console.log(response.data.data);
      setInput({
        name: response.data.data.name,
        harga: response.data.data.harga,
        stock: response.data.data.stock,
        image_url: response.data.data.image_url,
        is_diskon: response.data.data.is_diskon,
        harga_diskon: response.data.data.harga_diskon,
        category: response.data.data.category,
        description: response.data.data.description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const disc = (event) => {
    if (event.target.name === "is_diskon") {
      setInput({ ...values, is_diskon: event.target.checked });
      setDiskon(!diskon);
    }
  };

  useEffect(() => {
    // fetch article detail
    fetchArticleDetail();
  }, []);

  const {
    handleChange,
    values,
    handleSubmit,
    resetForm,
    errors,
    handleBlur,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: input,
    onSubmit: handleUpdate,
    validationSchema: schemaValidation,
    enableReinitialize: true,
  });

  return (
    <div>
      {" "}
      <div className=" relative mt-14 bg-[#F9F9F9] pt-10">
        <p className="text-center font-bold text-[25px]  text-[#003049] pb-5">
          Form Edit Data Produk
        </p>
        <div className="relative w-[80%]  left-[10%] bg-white shadow-lg  rounded-md">
          <div className="relative flex justify-around p-4">
            <div className="w-[45%]">
              <p className="pb-3 font-bold text-[15px]  text-[#003049]">
                Nama Barang*
              </p>
              <input
                type="text"
                onChange={handleChange}
                name="name"
                value={values.name}
                onBlur={handleBlur}
                placeholder="Input nama barang"
                className="w-[440px] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
              />
              <p className="col-span-3 text-red-500">
                {touched.name === true && errors.name}
              </p>
            </div>
            <div className="w-[45%]">
              <p className="pb-3 font-bold text-[15px]  text-[#003049]">
                Stock Barang*
              </p>
              <input
                type="text"
                name="stock"
                onChange={handleChange}
                value={values.stock}
                onBlur={handleBlur}
                placeholder="Input stock barang"
                className="w-[440px] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
              />
              <p className="col-span-3 text-red-500">
                {touched.stock === true && errors.stock}
              </p>
            </div>
          </div>
          <div className="relative flex  p-4 pl-10">
            <div className="w-[45%]">
              <p className="pb-3 font-bold text-[15px]  text-[#003049]">
                Harga Barang*
              </p>
              <input
                type="text"
                name="harga"
                onChange={handleChange}
                value={values.harga}
                onBlur={handleBlur}
                placeholder="Input harga barang"
                className="w-[440px] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
              />
              <p className="col-span-3 text-red-500">
                {touched.harga === true && errors.harga}
              </p>
            </div>
            <div className="w-[10%] relative flex pl-10">
              <p className="pb-3 font-bold text-[15px]  text-[#003049]">
                Status Diskon
              </p>
              <input
                type="checkbox"
                checked={values.is_diskon}
                onChange={handleChange && disc}
                onBlur={handleBlur}
                name="is_diskon"
                className="-mt-12 ml-4"
              />
            </div>
            {!diskon ? (
              <p></p>
            ) : (
              <div className="w-[35%] pl-12">
                <p className="pb-3 font-bold text-[15px]  text-[#003049] ">
                  Harga Diskon
                </p>
                <input
                  type="text"
                  name="harga_diskon"
                  onChange={handleChange}
                  value={values.harga_diskon}
                  onBlur={handleBlur}
                  placeholder="Input nama barang"
                  className="w-[358px] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
                />
                <p className="col-span-3 text-red-500">
                  {touched.harga_diskon === true && errors.harga_diskon}
                </p>
              </div>
            )}
          </div>
          <div className="relative flex justify-around p-4">
            <div className="w-[45%]">
              <p className="pb-3 font-bold text-[15px]  text-[#003049]">
                Kategori Barang*
              </p>
              <select
                name="category"
                onChange={handleChange}
                value={values.category}
                onBlur={handleBlur}
                className="w-[430px] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
              >
                <option value="" disabled>
                  Pilih Kategori
                </option>
                <option value="teknologi">teknologi</option>
                <option value="makanan">makanan</option>
                <option selected value="minuman">
                  minuman
                </option>
                <option value="hiburan">hiburan</option>
                <option value="kendaraan">kendaraan</option>
              </select>
              <p className="col-span-3 text-red-500">
                {touched.category === true && errors.category}
              </p>
            </div>
            <div className="w-[45%]">
              <p className="pb-3 font-bold text-[15px]  text-[#003049]">
                Image Barang*
              </p>
              <input
                type="text"
                placeholder="Input Image barang"
                name="image_url"
                onChange={handleChange}
                value={values.image_url}
                onBlur={handleBlur}
                className="w-[440px] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
              />
              <p className="col-span-3 text-red-500">
                {touched.image_url === true && errors.image_url}
              </p>
            </div>
          </div>
          <div className="relative flex justify-left p-4 pl-[38px]">
            <div className="w-[45%]">
              <p className="pb-3 font-bold text-[15px]  text-[#003049]">
                Deskripsi Barang*
              </p>
              <textarea
                placeholder="Input deskripsi barang"
                name="description"
                onChange={handleChange}
                value={values.description}
                onBlur={handleBlur}
                className="w-[910px] h-[60px] border border-[#D3D3D3] rounded-lg p-4"
              />
              <p className="col-span-3 text-red-500">
                {touched.description === true && errors.description}
              </p>
            </div>
          </div>
          <div className="relative flex w-[85%] left-[13%] justify-end pb-8">
            <button
              onClick={handleSubmit}
              className=" mr-4 border border-sky-600 bg-sky-600 text-white h-[40px] w-[80px] rounded-md hover:bg-white hover:text-black"
            >
              Create
            </button>

            <button
              onClick={resetForm}
              className=" border border-red-500 bg-red-500 text-white h-[40px] w-[80px] rounded-md hover:bg-white hover:text-black"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
