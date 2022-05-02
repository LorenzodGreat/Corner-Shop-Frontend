import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import Login from './layouts/auth/Login';
import Register from './layouts/auth/Register';
// import Home from './layouts/frontend/user/UserMain';
import MainUser from './layouts/frontend/user/UserMain';
import UserDashboard from './layouts/frontend/user/UserDashboard';
import UserProfile from './layouts/frontend/user/UserProfile';
import UserOrder from './layouts/frontend/user/UserOrders';
import Fail from './layouts/auth/404';
import None from './layouts/auth/Error';
import AdminMain from './layouts/frontend/admin/AdminMain';
import AdminDash from './layouts/frontend/admin/AdminDashboard';
import AdminCategory from './layouts/frontend/admin/category/AdminCategory';
import AdminProducts from './layouts/frontend/admin/products/AdminProducts';
import Home from './layouts/frontend/main/Home';
import CategoryPage from './layouts/frontend/main/Collections';
import Collection from './layouts/frontend/main/CollectionProduct';
import ItemView from './layouts/frontend/main/CollectionSelection';
import EditCategory from './layouts/frontend/admin/category/EditCategory';
import EditProduct from './layouts/frontend/admin/products/EditProducts';
import ProtectAdmin from './layouts/auth/AdminProtect';
import MyCart from './layouts/frontend/main/Cart';

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : ``;
  return config;
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:PageName' element={<None />} />
        <Route path='*' element={<Fail />} />

        {/* See Products Based On Category*/}
        <Route path='/collections' element={<CategoryPage />} />
        <Route path='/collections/:slug' element={<Collection />} />
        <Route path='/collections/:category/:product' element={<ItemView />} />


        {/* <Route path='/Cart' element={<Cart />} />
        <Route path='/Cart-Checkout' element={<CartCheckout />} />
        <Route path='/Checkout/Details' element={<ConfirmPurchase />} /> */}





        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<MainUser />} >
          <Route path='/User/Dashboard' element={<UserDashboard />} />
          <Route path='/User/Dashboard' element={<UserDashboard />} />
          <Route path='/User/Profile' element={<UserProfile />} />
          {/* <Route path='/User/Settings' element={<Register />} /> */}
        </Route>

          <Route path='/Cart' element={<MyCart />} />

        {/* <Route element={<ProtectAdmin />} > */}
        <Route element={<AdminMain />} >
          <Route path='/Admin/Dashboard' element={<AdminDash />} />
          <Route path='/Admin/Category' element={<AdminCategory />} />
          <Route path='/Admin/Category/Edit-Category/:id' element={<EditCategory />} />
          <Route path='/Admin/Products' element={<AdminProducts />} />
          <Route path='/Admin/Products/Edit-Products/:id' element={<EditProduct />} />
          <Route path='/Admin/Orders' element={<UserOrder />} />
          <Route path='/Admin/Payments' element={<UserOrder />} />
          {/* <Route path='/User/Settings' element={<Register />} /> */}
        </Route>
        {/* </Route> */}







        <Route element={<MainUser />} >
          <Route path='/User/Dashboard' element={<UserDashboard />} />
          <Route path='/User/Profile' element={<UserProfile />} />
          <Route path='/User/Orders' element={<UserOrder />} />
          {/* <Route path='/User/Settings' element={<Register />} /> */}
        </Route>






      </Routes>
    </Router>

  );
}

export default App;
