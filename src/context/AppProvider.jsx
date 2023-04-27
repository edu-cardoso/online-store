import { createContext, useMemo, useState, useEffect } from "react";

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
function AppProvider({ children }) {
  const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  const [cartItems, setcartItems] = useState(cart);

  useEffect(() => {
    const newSet = new Set();

    const filterItem = cartItems.filter((item) => {
      const duplicatedItem = newSet.has(item.id);
      newSet.add(item.id);
      return !duplicatedItem;
    });

    localStorage.setItem('cartItems', JSON.stringify(filterItem));
  }, [cartItems])

  const values = useMemo(() => ({
    cartItems,
    setcartItems,
  }), [cartItems, setcartItems]);

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;
