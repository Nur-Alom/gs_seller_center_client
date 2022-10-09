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

function App() {
  return (
    <div className="App">
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
              <Route path="setting" element={<PrivateRoute><Customers /></PrivateRoute>} />
              <Route path="add-staff" element={<PrivateRoute><AddStaff /></PrivateRoute>} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
