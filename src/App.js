import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Products from './Pages/Products';
import Signup from './Pages/Signup';
import About from './Pages/About'
import SingleProduct from './Pages/SingleProduct';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Orders from './Pages/Orders';
import { useUserContext } from './context/user_context'
import AdminNavbar from './Components/AdminNavbar'
import AdminSidebar from './Components/AdminSidebar'
import Welcome from './Components/Welcome'
import AdminHome from './Pages/Admin/AdminHome'
import AddProduct from './Pages/Admin/AddProduct'
import AdminSingleProduct from './Pages/Admin/AdminSingleProduct'
import EditProduct from './Pages/Admin/EditProduct';
import AdminOrders from './Pages/Admin/AdminOrders';
function App() {
  const {userDetails} = useUserContext()
  const admin = userDetails.role === "admin"
  const user = userDetails.role === "user"
  const token = localStorage.getItem("token")
  return (
      <Router>
        {user && <Navbar />}
        {user && <Sidebar />}
        {admin && <AdminNavbar/>}
        {admin && <AdminSidebar/>}
        {token === "" && <Welcome/>}
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route exact path="/home"><Home /></Route>
          <Route exact path="/login"><Login/></Route>
          <Route exact path="/products"><Products/></Route>
          <Route exact path="/products/:id" children={<SingleProduct/>}/>
          <Route exact path="/signup"><Signup/></Route>
          <Route exact path="/about"><About/></Route>
          <Route exact path="/cart"><Cart/></Route>
          <Route exact path="/checkout"><Checkout/></Route>
          <Route exact path="/orders"><Orders/></Route>
          <Route exact path="/admin-home"><AdminHome/></Route>
          <Route exact path="/add-product"><AddProduct /></Route>
          <Route exact path="/admin-home/:id"><AdminSingleProduct /></Route>
          <Route exact path="/edit-product/:id"><EditProduct/></Route>
          <Route exact path="/admin-orders"><AdminOrders/></Route>
        </Switch>
        <Footer />
      </Router> 
  );
}

export default App;
