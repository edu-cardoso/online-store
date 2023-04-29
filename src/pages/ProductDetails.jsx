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
        attributes
      }

      setProduct([productObj]);
    }
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addProductToCart = () => {
    const productObj = {
      id: product[0].id,
      name: product[0].title,
      price: product[0].price,
      thumbnail: product[0].thumbnail,
      quantity: 1,
    }
    setcartItems([
      ...cartItems,
      productObj
    ])
  }

  return (
    <div>
      {product.length > 0 &&
        <div>
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
          <img src={product[0].thumbnail} alt={product[0].title} />
          <p>{product[0].title}</p>
          <p>{`R$ ${product[0].price}`}</p>
          <button
            onClick={() => addProductToCart()}
          >
            Comprar
          </button>
          {product[0].attributes.map(({ id, name, value_name }) => (
            <div key={id}>
              <h4>{name}</h4>
              <p>{value_name}</p>
            </div>
          ))}
        </div>
      }
    </div>
  )
}