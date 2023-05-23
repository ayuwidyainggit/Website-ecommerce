import { createContext, useState } from "react";
import axios from "axios";
export const GlobalContext = createContext();
// komponen provider
export const GlobalProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [diskon, setDiskon] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api-project.amandemy.co.id/api/final/products",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProduct(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <GlobalContext.Provider
      value={{
        product: product,
        setProduct: setProduct,
        loading: loading,
        setLoading: setLoading,
        fetchProduct: fetchProduct,
        diskon: diskon,
        setDiskon: setDiskon,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
