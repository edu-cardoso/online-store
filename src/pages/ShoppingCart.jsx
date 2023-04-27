import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppProvider";

export default function ShoppingCart() {
  const { setcartItems } = useContext(AppContext);
  const filteredProducts = JSON.parse(localStorage.getItem('cartItems')) || [];
  const [products, setProducts] = useState(filteredProducts);
  const [totalPrice, settotalPrice] = useState(0);

  useEffect(() => {
    const total = products.reduce((acc, curr) => {
      return acc + curr.price
    }, 0)
    settotalPrice(total)
  }, [])

  const removeProduct = (productID) => {
    const newProducts = filteredProducts.filter(({ id }) => {
      return id !== productID;
    });

    setProducts(newProducts)
    setcartItems(newProducts)
    localStorage.setItem('cartItems', JSON.stringify(newProducts));

    updateTotal(productID)
  }

  const updateTotal = (productID) => {
    const currProduct = filteredProducts.find(({ id }) => {
      return id === productID
    })
    const updaTotalPrice = totalPrice - currProduct.price
    settotalPrice(Number(updaTotalPrice.toFixed(2)))
  }

  return (
    <div>
      {products.length === 0 ? <p>Seu carrinho está vazio</p> :
        products.map(({ id, name, thumbnail, price }) => (
          <div key={id}>
            <img src={thumbnail} alt="" />
            <p>{name}</p>
            <p>{price.toFixed(2)}</p>
            <button onClick={() => removeProduct(id)}>Excluir</button>
          </div>
        ))}
        <p>{totalPrice.toFixed(2)}</p>
    </div>
  )
}