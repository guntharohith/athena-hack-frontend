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
import AdminNavbar from './Components/AdminNavbar'
import AdminSidebar from './Components/AdminSidebar'
import Welcome from './Components/Welcome'
import AdminHome from './Pages/Admin/AdminHome'
import AddProduct from './Pages/Admin/AddProduct'
import AdminSingleProduct from './Pages/Admin/AdminSingleProduct'
import EditProduct from './Pages/Admin/EditProduct';
import AdminOrders from './Pages/Admin/AdminOrders';
import history from './utils/history'

const token = localStorage.getItem("token")
const role = localStorage.getItem("role")
const user = role === "user"
const admin = role === "admin"

const UserRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        user ? (<Component {...props} />) : admin ? (<Redirect to={{ pathname: "/admin-home" }} />) : (<Redirect to={{ pathname: "/login" }} />)
      }
    />)
}

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>

      admin ? (<Component {...props} />) : user ? (<Redirect to={{ pathname: "/home" }} />) : (<Redirect to={{ pathname: "/login" }} />)

    }
  />
)
function App() {
  return (
    <Router history = {history}>
      {user && <Navbar />}
      {user && <Sidebar />}
      {admin && <AdminNavbar />}
      {admin && <AdminSidebar />}
      {!token  && <Welcome />}
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <UserRoute exact path="/home" component={Home}/>
        <Route exact path="/login"><Login /></Route>
        <UserRoute exact path="/products" component={Products}/>
        <UserRoute exact path="/products/:id" component={SingleProduct}/>
        <Route exact path="/signup"><Signup /></Route>
        <UserRoute exact path="/about" component={About}/>
        <UserRoute exact path="/cart" component={Cart}/>
        <UserRoute exact path="/checkout" component={Checkout}/>
        <UserRoute exact path="/orders" component={Orders}/>
        <AdminRoute exact path="/admin-home" component={AdminHome}/>
        <AdminRoute exact path="/add-product" component={AddProduct}/>
        <AdminRoute exact path="/admin-home/:id" component={AdminSingleProduct}/>
        <AdminRoute exact path="/edit-product/:id" component={EditProduct}/>
        <AdminRoute exact path="/admin-orders" component={AdminOrders}/>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
