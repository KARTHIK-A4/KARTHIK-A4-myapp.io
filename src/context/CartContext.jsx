import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
            toast.success(`Increased quantity of ${product.name}`);
        } else {
            setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
            toast.success(`${product.name} added to cart`);
        }
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
        toast.success('Item removed from cart');
    };

    const updateQuantity = (productId, amount) => {
        setCartItems(prevItems => {
            return prevItems.map(item => {
                if (item.id === productId) {
                    const newQuantity = item.quantity + amount;
                    if (newQuantity <= 0) {
                        // Let the component handle removal or just stay at 1? 
                        // Usually it's better to keep it min 1 or remove it. 
                        // Let's keep it min 1 here for safety, handle removal separately or explicitly.
                        return item;
                    }
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
