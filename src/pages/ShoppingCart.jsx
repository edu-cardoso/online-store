import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppProvider";
import { Link } from 'react-router-dom';
import styles from '../styles/ShoppingCart.module.css';

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
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <header className={styles.headerContainer}>
        <Link to="/">
          <span className="material-symbols-outlined">
            arrow_back
          </span>
        </Link>
        <p>Online Store</p>
      </header>
      <div className={styles.productsContainer}>
        {products.length === 0 ? <p className={styles.emptyCart}>Seu carrinho está vazio</p> :
          products.map(({ id, name, thumbnail, price, quantity }) => (
            <div key={id} className={styles.productItem}>
              <img src={thumbnail} alt="" />
              <div className={styles.productInfo}>
                <p>{name}</p>
                <p className={styles.productPrice}>
                  <span>R$</span>
                  {(price * quantity).toFixed(2)}
                </p>
                <div className={styles.quantityControl}>
                  <button onClick={() => decrementQuantity(id)}>-</button>
                  <p>{quantity}</p>
                  <button onClick={() => incrementQuantity(id)}>+</button>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeProduct(id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
      </div>
      {products.length > 0 &&
        <p
          className={styles.totalPrice}
        >
          <span>Subtotal: </span>
          {totalPrice.toFixed(2)}
        </p>}
    </div>
  )
}