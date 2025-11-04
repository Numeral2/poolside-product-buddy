import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  quantity: number;
  variantId?: string;
  variantSize?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, animationStart?: { x: number; y: number }) => void;
  removeFromCart: (id: string, variantId?: string) => void;
  updateQuantity: (id: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  animationStart: { x: number; y: number } | null;
  clearAnimation: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [animationStart, setAnimationStart] = useState<{ x: number; y: number } | null>(null);

  const addToCart = (item: Omit<CartItem, 'quantity'>, animStart?: { x: number; y: number }) => {
    if (animStart) {
      setAnimationStart(animStart);
    }
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (i) => i.id === item.id && i.variantId === item.variantId
      );

      if (existingItemIndex > -1) {
        const newItems = [...currentItems];
        newItems[existingItemIndex].quantity += 1;
        toast.success('Količina ažurirana u košarici');
        return newItems;
      }

      toast.success('Proizvod dodan u košaricu');
      return [...currentItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string, variantId?: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => !(item.id === id && item.variantId === variantId))
    );
    toast.success('Proizvod uklonjen iz košarice');
  };

  const updateQuantity = (id: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, variantId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id && item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Košarica ispražnjena');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const clearAnimation = () => {
    setAnimationStart(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        animationStart,
        clearAnimation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
