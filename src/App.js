import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import ProductView from "./views/ProductView";
import TableView from "./views/TableView";
import DetailProductView from "./views/DetailProductView";
import AddProductView from "./views/AddProductView";
import EditProductView from "./views/EditProductView";
import GuestRoute from "./wrapper/GuestRoute";
import ProtectedRoute from "./wrapper/ProtectedRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/Website-ecommerce/login" element={<Login />} />
            <Route path="/Website-ecommerce/Register" element={<Register />} />
          </Route>

          <Route path="/Website-ecommerce" element={<Home />} />
          <Route path="/Website-ecommerce/Product" element={<ProductView />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/Website-ecommerce/Table" element={<TableView />} />
            <Route
              path="/Website-ecommerce/productdetails/:id"
              element={<DetailProductView />}
            />
            <Route
              path="/Website-ecommerce/editProduk/:id"
              element={<EditProductView />}
            />
            <Route
              path="/Website-ecommerce/addProduk"
              element={<AddProductView />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
