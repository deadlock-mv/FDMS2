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

import {Routes as Switch,Route} from 'react-router-dom'

function Main() {
  return (
    <div className="Main">
      <Header />
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
      </Switch>
      <Footer />
    </div>
  );
}

export default Main;
