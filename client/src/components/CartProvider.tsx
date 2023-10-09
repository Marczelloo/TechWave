import React, { createContext, useContext, useState } from 'react';

interface ContextData {
    cartContext: { id_product: number, quantity: number},
    updateCart: (newCart: { id_product: number, quantity: number}) => void;
}

const CartContext = createContext<ContextData | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const cart = localStorage.getItem("cart");
    const parsedCart = cart ? JSON.parse(cart) : [];

    const [contextValue, setContextValue] = useState<ContextData>({ cartContext: parsedCart,
    updateCart: (newVal) => {
        setContextValue((prevData) => (
            { ...prevData, cartContext: newVal}));
    }});

    
    return <CartContext.Provider value={contextValue}> {children} </CartContext.Provider>;
}

export const useCartContext = () => {
    const context = useContext(CartContext);

    if(context === undefined) {
        throw new Error('useCartContext muse be used within a CartContextProvider');
    }

    return context;
}
