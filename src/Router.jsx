import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./App"
import Login from "./pages/user/Login"
import Register from "./pages/user/Register"
import Profile from "./pages/user/Profile"
import ListUsers from "./pages/admin/ListUsers"
import NewProduct from "./pages/admin/NewProduct"
import ListProducts from "./pages/admin/ListProducts"
import Products from "./pages/products/Productos"
import Product from "./pages/products/Producto"
import BreweriesTypes from "./pages/CerveceriasTipos"
import Checkout from "./pages/payments/checkout"
import SuccessPage from "./pages/payments/success"
import CancelPage from "./pages/payments/cancel"
import About from "./pages/About"
import Contact from "./pages/Contact"
import NotFound from "./pages/NotFound"
import Layout from "./components/Layout"
import ProductState from "./contexts/product/ProductState"
import UserState from "./contexts/user/UserState"
import AuthRoute from "./routes/Auth"
import PrivateRoute from "./routes/Private"

const Router = () => {
  return (
    <>
      <UserState>
        <ProductState>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<App />} />
                <Route
                  path="/inicio-sesion"
                  element={ <AuthRoute component={Login} /> }
                />
                <Route path="/registro" element={<Register />} />
                <Route
                  path="/perfil"
                  element={ <PrivateRoute component={Profile} /> }
                />
                <Route
                  path="/carrito"
                  element={ <PrivateRoute component={Checkout} /> }
                />
                <Route
                  path="/admin-usuarios"
                  element={ <PrivateRoute component={ListUsers} /> }
                />
                <Route
                  path="/registrar-producto"
                  element={ <PrivateRoute component={NewProduct} /> }
                />
                <Route
                  path="/admin-productos"
                  element={ <PrivateRoute component={ListProducts} /> }
                />                
                <Route path="/productos" element={<Products />} />
                <Route path="/producto/:id" element={<Product />} />
                <Route path="/cerveceriasTipos" element={<BreweriesTypes />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/pago-exitoso" element={<SuccessPage />} />
                <Route path="/pago-cancelado" element={<CancelPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ProductState>
      </UserState>
    </>
  )
}

export default Router
