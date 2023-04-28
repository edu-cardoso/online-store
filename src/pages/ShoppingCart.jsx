import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppProvider";

export default function ShoppingCart() {
  const { setcartItems } = useContext(AppContext);
  const filteredProducts = JSON.parse(localStorage.getItem('cartItems')) || [];
  const [products, setProducts] = useState(filteredProducts);
  const [totalPrice, settotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const total = products.reduce((acc, curr) => {
      return acc + (curr.price * curr.quantity)
    }, 0)
    settotalPrice(total)
  }, [quantity, products])

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

  const incrementQuantity = (id) => {
    const currProduct = products;
    currProduct.find((item) => item.id === id).quantity += 1;
    setQuantity(quantity + 1)
    localStorage.setItem('cartItems', JSON.stringify(currProduct));
  };

  const decrementQuantity = (id) => {
    const currProduct = products;
    if (currProduct.find((item) => item.id === id).quantity > 1) {
      currProduct.find((item) => item.id === id).quantity -= 1;
      setQuantity(quantity - 1)
    }
    localStorage.setItem('cartItems', JSON.stringify(currProduct));
  };

  return (
    <div>
      {products.length === 0 ? <p>Seu carrinho está vazio</p> :
        products.map(({ id, name, thumbnail, price, quantity }) => (
          <div key={id}>
            <img src={thumbnail} alt="" />
            <p>{name}</p>
            <p>{(price * quantity).toFixed(2)}</p>
            <button onClick={() => removeProduct(id)}>Excluir</button>
            <div>
              <button onClick={() => decrementQuantity(id)}>-</button>
              <p>{quantity}</p>
              <button onClick={() => incrementQuantity(id)}>+</button>
            </div>

          </div>
        ))}
      <p>{totalPrice.toFixed(2)}</p>
    </div>
  )
}