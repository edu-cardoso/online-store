import { useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { Link } from 'react-router-dom';
import styles from '../styles/ProductDetails.module.css';

export default function ProductDetails() {
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const { cartItems, setcartItems } = useContext(AppContext);

  useEffect(() => {
    const id = location.pathname.split("/")[2]
    async function getProduct() {
      const request = await fetch(`https://api.mercadolibre.com/items/${id}`);
      const data = await request.json();

      const { title, price, thumbnail, attributes } = data;

      const productObj = {
        id,
        title,
        price,
        thumbnail,
        attributes,
        quantity: 1,
      }

      setProduct([productObj]);
    }
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addProductToCart = () => {
    setcartItems([
      ...cartItems,
      ...product
    ])
  }

  return (
    <>
      {product.length > 0 &&
        <div className={styles.productDetails}>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
          <header className={styles.headerContainer}>
            <Link to="/">
              <span className="material-symbols-outlined">
                arrow_back
              </span>
            </Link>
            <p className={styles.title}>Online Store</p>
            <Link to="/carrinho">
              <button className={styles.cartBtn}>
                {cartItems.length > 0 && <div className={styles.quantityOfItems}></div>}
                <span className="material-symbols-outlined">
                  shopping_cart
                </span>
              </button>
            </Link>
          </header>
          <div className={styles.productContainer}>
            <div className={styles.productDetailsContainer}>
              <div className={styles.productDetailsTop}>
                <p className={styles.productTitle}>{product[0].title}</p>
                <img src={product[0].thumbnail} alt={product[0].title} />
                <p className={styles.productPrice}>{`R$ ${(product[0].price).toFixed(2)}`}</p>
                <button
                  className={styles.buyBtn}
                  onClick={() => addProductToCart()}
                >
                  Comprar
                </button>
              </div>
              {product[0].attributes.map(({ id, name, value_name }) => (
                <ul key={id}>
                  <li>
                    <h4>{name}</h4>
                    <p className={styles.productDetailText}>{value_name}</p>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      }
    </>
  )
}