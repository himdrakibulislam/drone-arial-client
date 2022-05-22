import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import 'swiper/css';
import './App.css';
import AuthContext from './context/AuthContext';
import Dashboard from './dashboard/Dashboard';
import Address from './pages/cart/address/Address';
import Cart from './pages/cart/Cart';
import Explore from './pages/explore/Explore';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import MyOrders from './pages/myOrders/MyOrders';
import Pay from './pages/pay/Pay';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import PrivateRoute from './pages/privateRoute/PrivateRoute';
import Register from './pages/register/Register';
import WriteReview from './pages/writeReview/WriteReview';
import Navigation from './shared/navigation/Navigation';
function App() {
  const [total,setTotal] = useState(0);
  const [productInfo,setProductInfo] = useState([]);
  const [address,setAddress] = useState({});
  return (
    <div className='App'>
      <AuthContext>
        <BrowserRouter>
       <Navigation></Navigation>
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='/home'>
          <Home></Home>
          </Route>
          <PrivateRoute path='/cart'>
           <Cart
           setProductInfo={setProductInfo}
           total={total}
           setTotal={setTotal}
           ></Cart>
          </PrivateRoute>
          <PrivateRoute path='/placeorder/:productId'>
           <PlaceOrder
           total={total}
           setTotal ={setTotal}
           setProductInfo={setProductInfo}
           ></PlaceOrder>
         </PrivateRoute>
          <PrivateRoute path='/address'>
           <Address
           setAddress={setAddress}
           ></Address>
          </PrivateRoute>
          <Route path='/login'> 
          <Login></Login>
          </Route>
          <Route path='/register'>
            <Register></Register>
          </Route>
          <Route path='/explore'>
           <Explore></Explore>
          </Route>
         
         <PrivateRoute path='/myorders'>
           <MyOrders></MyOrders>
         </PrivateRoute>
         <PrivateRoute path='/review'>
           <WriteReview></WriteReview>
         </PrivateRoute>
         <PrivateRoute path='/pay'>
           <Pay
           total={total}
           productInfo={productInfo}
           address={address}
           setTotal={setTotal}
           setAddress={setAddress}
           setProductInfo={setProductInfo}
           ></Pay>
         </PrivateRoute>
         <PrivateRoute path='/dashboard'>
          <Dashboard></Dashboard>
         </PrivateRoute>
          <Route path='*'>
           <h3>No Page Found</h3>
          </Route>
        </Switch>
        </BrowserRouter>
        </AuthContext>
        
    </div>
  );
}

export default App;
