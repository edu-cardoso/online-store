export default function ShoppingCart() {
  
  const filteredProducts = JSON.parse(localStorage.getItem('cartItems')) || [];
  return (
    <div>
      { 
        filteredProducts.map(({ id, name, thumbnail, price }) => (
          <div key={id}>
            <img src={thumbnail} alt="" />
            <p>{name}</p>
            <p>{price.toFixed(2)}</p>
            <button>Excluir</button>
          </div>
        ))}
    </div>
  )
}