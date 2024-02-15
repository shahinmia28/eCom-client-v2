import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from './components/Header';
import Footer from './components/Footer';
import PageNotFound from './pages/PageNotFound';
import Policy from './pages/Policy';
import Contact from './pages/Contact';
import About from './pages/About';
import Register from './pages/auth/Register';
import { Toaster } from 'react-hot-toast';
import Login from './pages/auth/Login';
import PrivateRoute from './components/router/Private';
import ForgetPassword from './pages/auth/ForgetPassword';
import AdminRoute from './components/router/AdminRoute';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/Profile';
import Products from './pages/admin/Products';
import AdminDashboard from './pages/admin/AdminDashboard';
import Search from './components/extraUnused/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFail from './pages/PaymentFail';
import AdminOrders from './pages/admin/AdminOrders';
import CartPage from './pages/CartPage';
import AllProductPage from './pages/AllProductPage';
import CreateHeroImg from './pages/admin/CreateHeroImg';
import DeliveryCharge from './pages/admin/DeliveryCharge';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<AllProductPage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/cart' element={<CartPage />} />

        <Route path='/payment/success/:trx_id' element={<PaymentSuccess />} />
        <Route path='/payment/fail/:trx_id' element={<PaymentFail />} />
        <Route path='/product-details/:slug' element={<ProductDetails />} />

        {/* private user route */}
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/orders' element={<Orders />} />
        </Route>

        {/* admin Route */}
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin/profile' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/create-hero-img' element={<CreateHeroImg />} />
          <Route path='admin/all-products' element={<Products />} />
          <Route path='admin/users' element={<Users />} />
          <Route path='admin/orders' element={<AdminOrders />} />
          <Route path='admin/delivery-charge' element={<DeliveryCharge />} />
        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget-password' element={<ForgetPassword />} />

        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
      <Toaster />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
