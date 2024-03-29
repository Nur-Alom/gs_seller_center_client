import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import Products from './Components/Pages/Products/Products';
import Category from './Components/Pages/Category/Category';
import Customers from './Components/Pages/Customers/Customers';
import DashboardHome from './Components/Pages/DashboardHome/DashboardHome';
import AuthProvider from './Components/Context/AuthProvider';
import Login from './Components/UserAccount/Login/Login';
import Register from './Components/UserAccount/Register/Register';
import PrivateRoute from './Components/UserAccount/PrivateRoute/PrivateRoute';
import NotFound from './Components/Pages/NotFound/NotFound';
import Orders from './Components/Pages/Orders/Orders';
import Coupons from './Components/Pages/Coupons/Coupons';
import OurStaff from './Components/Pages/OurStaff/OurStaff';
import AddStaff from './Components/Pages/AddStaff/AddStaff';
import { ToastContainer } from 'react-toastify';
import AddCoupon from './Components/Pages/AddCoupon/AddCoupon';
import AddProducts from './Components/Pages/AddProducts/AddProducts';
import AddCategory from './Components/Pages/AddCategory/AddCategory';
import UpdateProduct from './Components/Pages/UpdatePages/UpdateProduct/UpdateProduct';
import ForgotPassword from './Components/UserAccount/ForgotPassword/ForgotPassword';
import ProductDetails from './Components/Pages/DetailPages/ProductDetails/ProductDetails';
import UpdateCategory from './Components/Pages/UpdatePages/UpdateCategory/UpdateCategory';
import CustomerOrders from './Components/Pages/DetailPages/CusromerOrders/CustomerOrders';
import UpdateCoupon from './Components/Pages/UpdatePages/UpdateCoupon/UpdateCoupon';
import UserProfile from './Components/Pages/UserProfile/UserProfile';
import Invoice from './Components/Pages/Invoce/Invoice';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
              <Route path="/" element={<PrivateRoute><DashboardHome /></PrivateRoute>} />
              <Route path="products" element={<PrivateRoute><Products /></PrivateRoute>} />
              <Route path="category" element={<PrivateRoute><Category /></PrivateRoute>} />
              <Route path="customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
              <Route path="orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
              <Route path="coupons" element={<PrivateRoute><Coupons /></PrivateRoute>} />
              <Route path="our-staff" element={<PrivateRoute><OurStaff /></PrivateRoute>} />
              <Route path="setting" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
              <Route path="add-products" element={<PrivateRoute><AddProducts /></PrivateRoute>} />
              <Route path="add-category" element={<PrivateRoute><AddCategory /></PrivateRoute>} />
              <Route path="add-coupon" element={<PrivateRoute><AddCoupon /></PrivateRoute>} />
              <Route path="add-staff" element={<PrivateRoute><AddStaff /></PrivateRoute>} />
              <Route path="up-product/:id" element={<PrivateRoute><UpdateProduct /></PrivateRoute>} />
              <Route path="up-category/:id" element={<PrivateRoute><UpdateCategory /></PrivateRoute>} />
              <Route path="up-coupon/:id" element={<PrivateRoute><UpdateCoupon /></PrivateRoute>} />
              <Route path="product/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
              <Route path="customer-order/:id" element={<PrivateRoute><CustomerOrders /></PrivateRoute>} />
              <Route path="order/:id" element={<PrivateRoute><Invoice /></PrivateRoute>} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot_password" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
