import { useState, useEffect, useContext } from "react"
import {
  fetchProductsByCategory,
  fetchProductsByName,
  fetchProductByID,
} from "../services/fetchAPI";
import { Link } from 'react-router-dom';
import { AppContext } from "../context/AppProvider";

export default function ListProducts() {
  const { cartItems, setcartItems } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productName, setproductName] = useState('');
  const [isLoading, setisLoading] = useState(false);

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
    const {title, price, thumbnail} = await fetchProductByID(id)
    const productObj = {
      id: id,
      name: title,
      price: price,
      thumbnail: thumbnail,
    }
    setcartItems([
      ...cartItems,
      productObj
    ])
  }

  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
      <header>
        <h1>Online Store</h1>
        <Link to="/carrinho">
          <button>
            <span className="material-symbols-outlined">
              shopping_cart
            </span>
          </button>
        </Link>
      </header>
      <input
        value={productName}
        onChange={onInputChange}
        type="text"
        placeholder="Buscar Produto"
      />
      <button onClick={() => getProductsByName()}>
        <span className="material-symbols-outlined">
          search
        </span>
      </button>
      <div>
        {categories.map(({ id, name }) => (
          <button
            key={id}
            onClick={() => getProductsByCategory(id)}
          >
            {name}
          </button>
        ))}
      </div>
      <div>
        {isLoading ? <p>Carregando...</p> :
          products.map(({ id, title, thumbnail, price }) => (
            <div key={id}>
              <img src={thumbnail} alt="" />
              <p>{title}</p>
              <p>{price.toFixed(2)}</p>
              <button onClick={() => addProductToCart(id)}>Comprar</button>
            </div>
          ))}
      </div>
    </div>
  )
}