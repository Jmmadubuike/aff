"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "react-hot-toast";

export interface CartItem {
    productId: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

interface CartContextProps {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalAmount: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Load cart from localStorage
        const stored = localStorage.getItem("cart");
        if (stored) setCartItems(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item: CartItem) => {
        setCartItems((prev) => {
            const exists = prev.find((i) => i.productId === item.productId);
            if (exists) {
                return prev.map((i) =>
                    i.productId === item.productId
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            toast.success(`${item.name} added to cart`);
            return [...prev, item];
        });
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prev) => prev.filter((i) => i.productId !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        setCartItems((prev) =>
            prev.map((i) =>
                i.productId === productId ? { ...i, quantity } : i
            )
        );
    };

    const clearCart = () => setCartItems([]);

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalAmount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};
