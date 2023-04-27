import { createContext, useMemo, useState } from "react";

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
function AppProvider({ children }) {
  const [cartItems, setcartItems] = useState([]);

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
