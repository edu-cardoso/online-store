import ListProducts from "./Components/ListProducts"
import ShoppingCart from "./pages/ShoppingCart";
import ProductDetails from "./pages/ProductDetails";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<ListProducts />}
        />
        <Route
          path="/carrinho"
          element={<ShoppingCart />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />
      </Routes>
    </>
  )
}

export default App
