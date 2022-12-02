import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import EditUser from "./components/dashboard/EditUser";
import EditProduct from "./components/dashboard/EditProduct";

import './App.css';
import Admin from "./pages/Admin";
import AddCategory from "./components/dashboard/AddCategory";
import AddProduct from "./components/dashboard/AddProduct";
import AllProducts from "./components/AllProducts";

function App() {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
          <Route path="/products" element={<AllProducts />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
}

export default App;
