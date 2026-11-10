import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { SHIPPING_CONFIG, DEMO_COUPONS } from '../data/config';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface CartContextType {
  items: CartItem[];
  addItem: (
    product: Product,
    quantity?: number,
    talla?: number,
    longitud?: string,
    personalizacion?: CartItem['personalizacion']
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, newQty: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shippingCost: number;
  selectedShippingCity: 'lima' | 'provincias' | 'recojo';
  setSelectedShippingCity: (city: 'lima' | 'provincias' | 'recojo') => void;
  couponCode: string;
  appliedCoupon: typeof DEMO_COUPONS[0] | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  total: number;
  
  // Wishlist
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;

  // Color Theme (Llamativo)
  colorTheme: 'rubi' | 'esmeralda' | 'zafiro' | 'amatista';
  setColorTheme: (theme: 'rubi' | 'esmeralda' | 'zafiro' | 'amatista') => void;

  // Drawer
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Notifications
  notifications: ToastNotification[];
  addNotification: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeNotification: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'aurelia_cart_v1';
const WISHLIST_STORAGE_KEY = 'aurelia_wishlist_v1';
const THEME_STORAGE_KEY = 'aurelia_color_theme';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorTheme, setColorThemeState] = useState<'rubi' | 'esmeralda' | 'zafiro' | 'amatista'>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as any;
      return (saved === 'esmeralda' || saved === 'zafiro' || saved === 'amatista') ? saved : 'rubi';
    } catch {
      return 'rubi';
    }
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', colorTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, colorTheme);
    } catch (e) {
      console.warn(e);
    }
  }, [colorTheme]);

  const setColorTheme = (theme: 'rubi' | 'esmeralda' | 'zafiro' | 'amatista') => {
    setColorThemeState(theme);
    addNotification(`Color principal cambiado a tono ${theme.charAt(0).toUpperCase() + theme.slice(1)}`, 'info');
  };
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedShippingCity, setSelectedShippingCity] = useState<'lima' | 'provincias' | 'recojo'>('lima');
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<typeof DEMO_COUPONS[0] | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [items]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const addNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeNotification(id);
    }, 3800);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addItem = (
    product: Product,
    quantity = 1,
    talla?: number,
    longitud?: string,
    personalizacion?: CartItem['personalizacion']
  ) => {
    // Generate deterministic ID according to options
    const variantKey = `${product.id}-${talla || 'none'}-${longitud || 'none'}-${personalizacion?.texto || 'none'}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === variantKey);
      if (existingIndex > -1) {
        const existingItem = prev[existingIndex];
        const newQuantity = Math.min(existingItem.quantity + quantity, product.stock);
        const updated = [...prev];
        updated[existingIndex] = {
          ...existingItem,
          quantity: newQuantity,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: variantKey,
          productId: product.id,
          product,
          quantity: Math.min(quantity, product.stock),
          talla,
          longitud,
          personalizacion,
        };
        return [...prev, newItem];
      }
    });

    addNotification(`Se agregó "${product.nombre}" a tu bolsa de compras`);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    addNotification('Producto retirado de la bolsa', 'info');
  };

  const updateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const clampedQty = Math.min(newQty, item.product.stock);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        addNotification('Retirado de favoritos', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addNotification('Agregado a tu lista de favoritos', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: number) => wishlist.includes(productId);

  // Calculations
  const itemCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

  const subtotal = items.reduce((acc, curr) => {
    return acc + curr.product.precio * curr.quantity;
  }, 0);

  const discountAmount = appliedCoupon
    ? (subtotal * appliedCoupon.discountPercent) / 100
    : 0;

  const shippingCost = (() => {
    if (items.length === 0 || selectedShippingCity === 'recojo') return 0;
    if (subtotal >= SHIPPING_CONFIG.freeShippingThreshold) return 0;
    return selectedShippingCity === 'lima'
      ? SHIPPING_CONFIG.limaCost
      : SHIPPING_CONFIG.provinciasCost;
  })();

  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = DEMO_COUPONS.find((c) => c.code === cleanCode);
    if (found) {
      setAppliedCoupon(found);
      setCouponCode(cleanCode);
      addNotification(`Cupón aplicado: ${found.label}`, 'success');
      return { success: true, message: `Descuento del ${found.discountPercent}% aplicado correctamente.` };
    } else {
      return {
        success: false,
        message: 'Cupón no válido. Prueba usando "LUJO10" para 10% de descuento demo.',
      };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    addNotification('Cupón retirado', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        shippingCost,
        selectedShippingCity,
        setSelectedShippingCity,
        couponCode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        total,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isCartOpen,
        setIsCartOpen,
        colorTheme,
        setColorTheme,
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
