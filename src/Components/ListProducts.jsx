import { useState, useEffect, useContext } from "react"
import {
  fetchProductsByCategory,
  fetchProductsByName,
  fetchProductByID,
} from "../services/fetchAPI";
import { Link } from 'react-router-dom';
import { AppContext } from "../context/AppProvider";
import styles from '../styles/ListProducts.module.css';

export default function ListProducts() {
  const { cartItems, setcartItems } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productName, setproductName] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [isOpen, setisOpen] = useState(true);

  useEffect(() => {
    async function getCategories() {
      const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
      const data = await request.json()

      setCategories(data)
    }
    getCategories()
  }, [])

  const getProductsByCategory = async (id) => {
    setisLoading(true);
    const data = await fetchProductsByCategory(id)
    setProducts(data.results);
    setisLoading(false);
  }

  const onInputChange = ({ target }) => {
    const { value } = target;
    setproductName(value);
  }

  const getProductsByName = async () => {
    setisLoading(true);
    const name = productName
    const data = await fetchProductsByName(name)
    setProducts(data.results);
    setisLoading(false);
    setproductName('');
  }

  const addProductToCart = async (id) => {
    const { title, price, thumbnail } = await fetchProductByID(id)
    const productObj = {
      id: id,
      name: title,
      price: price,
      thumbnail: thumbnail,
      quantity: 1,
    }
    setcartItems([
      ...cartItems,
      productObj
    ])
    addProductToLocalStorage();
  }

  const addProductToLocalStorage = () => {
    const newSet = new Set();

    const filterItem = cartItems.filter((item) => {
      const duplicatedItem = newSet.has(item.id);
      newSet.add(item.id);
      return !duplicatedItem;
    });

    localStorage.setItem('cartItems', JSON.stringify(filterItem));
  }

  const openCategories = () => {
    isOpen ? setisOpen(false) : setisOpen(true)
  }

  const cartLength = JSON.parse(localStorage.getItem('cartItems')) || []

  return (
    <div className={styles.ListProducts}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

      <header className={styles.headerContainer}>
        <span className="material-symbols-outlined" onClick={() => openCategories()}>
          view_cozy
        </span>
        <h3>Online Store</h3>
        <Link to="/carrinho">
          <button className={styles.cartBtn}>
            <div className={styles.quantityOfItems}>
              {cartLength.length}
            </div>
            <span className="material-symbols-outlined">
              shopping_cart
            </span>
          </button>
        </Link>
      </header>
      <div className={styles.searchContainer}>
        <div className={styles.searchProduct}>
          <input
            value={productName}
            onChange={onInputChange}
            type="text"
            placeholder="Buscar produto"
          />
          <button onClick={() => getProductsByName()}>
            <span className="material-symbols-outlined">
              search
            </span>
          </button>
        </div>
      </div>
      <div className={isOpen ? styles.categories : styles.categoriesOpen}>
        {categories.map(({ id, name }) => (
          <button
            key={id}
            onClick={() => getProductsByCategory(id)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className={styles.productsContainer}>
        {isLoading ? <p className={styles.loading}>Carregando...</p> :
          products.map(({ id, title, thumbnail, price }) => (
            <div key={id} className={styles.products}>
              <img src={thumbnail} alt="" />
              <div className={styles.productInfo}>
                <p>{title}</p>
                <p className={styles.productPrice}>
                  <span>R$</span>
                  {price.toFixed(2)}
                </p>
                <button 
                  className={styles.buyBtn}
                  onClick={() => addProductToCart(id)}
                >
                  Comprar
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}