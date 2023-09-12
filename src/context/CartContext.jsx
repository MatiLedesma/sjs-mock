import React, { createContext } from 'react';


export const cartContext = createContext();

export default function CartProvider({ children }) {
    const [data, setData] = React.useState([]);
    const addToCart = (value) => {
        console.log("added", value);
        const newData = data.push(value);
        setData(newData);
    }
    const getCartItemsCount = () => data.length;
    const valueProps = { data, addToCart, getCartItemsCount };
    return <cartContext.Provider value={valueProps}>{children}</cartContext.Provider>
}