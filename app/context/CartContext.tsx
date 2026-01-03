import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthContext";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => Promise<void>;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  totalPrice: number;
  totalQty: number;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: any) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  const CART_KEY = user ? `cart_user_${user.id}` : null;

  useEffect(() => {
    if (CART_KEY) loadCart();
    else setCart([]);
  }, [CART_KEY]);

  const loadCart = async () => {
    if (!CART_KEY) return;

    const saved = await AsyncStorage.getItem(CART_KEY);
    setCart(saved ? JSON.parse(saved) : []);
  };

  const saveCart = async (data: CartItem[]) => {
    if (!CART_KEY) return;

    setCart(data);
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(data));
  };

  const addToCart = (product: any) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      increaseQty(product.id);
    } else {
      saveCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1,
        },
      ]);
    }
  };

  const increaseQty = (id: number) => {
    saveCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    saveCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id: number) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = async () => {
    if (!CART_KEY) return;

    setCart([]);
    await AsyncStorage.removeItem(CART_KEY);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQty,
        decreaseQty,
        totalPrice,
        totalQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
