import Home from './home'
import Header from './header_home'
import Footer from './footer'
import About from './about'
import Login from './login'
import MyAccount from './myaccount'
import Settings from './settings'
import Orders from './orders'
import Signup from './signup'
import Cuisines from './cuisines'
import OrderList from './orderlist'
import Payment from './payment_methods'
import Logout from './logout'
import ManagerDash from './manager_dashboard'
import ManagerCategory from './manager_category'
import ManagerOrder from './manager_order'
import ManagerItem from './manager_item'

import {Routes as Switch,Route} from 'react-router-dom'

function Main() {
  return (
    <div className="Main">
      {/* <Header /> */}
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/myacc" element={<MyAccount/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/detail/:cuisine_id" element={<Cuisines/>}/>
        <Route path="/order_review" element={<OrderList/>}/>
        <Route path="/payment_method" element={<Payment/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/manager/dashboard" element={<ManagerDash/>}/>
        <Route path="/manager/dashboard/category" element={<ManagerCategory/>}/>
        <Route path="/manager/dashboard/item" element={<ManagerItem/>}/>
        <Route path="/manager/dashboard/order" element={<ManagerOrder/>}/>
      </Switch>
      {/* <Footer /> */}
    </div>
  );
}

export default Main;
