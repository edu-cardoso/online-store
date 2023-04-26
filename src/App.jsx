import ListProducts from "./Components/ListProducts"
import ShoppingCart from "./pages/ShoppingCart";
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
      </Routes>
    </>
  )
}

export default App
