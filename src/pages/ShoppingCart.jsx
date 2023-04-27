import { useState } from "react";

export default function ShoppingCart() {
  const filteredProducts = JSON.parse(localStorage.getItem('cartItems')) || [];
  const [products, setProducts] = useState(filteredProducts)

  const removeProduct = (productID) => {
    const newProducts = filteredProducts.filter(({ id }) => {
      return id !== productID
    });

    setProducts(newProducts)
    localStorage.setItem('cartItems', JSON.stringify(newProducts));
  }
  return (
    <div>
      {
        products.map(({ id, name, thumbnail, price }) => (
          <div key={id}>
            <img src={thumbnail} alt="" />
            <p>{name}</p>
            <p>{price.toFixed(2)}</p>
            <button onClick={() => removeProduct(id)}>Excluir</button>
          </div>
        ))}
    </div>
  )
}