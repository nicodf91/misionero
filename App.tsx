import React, { useState, useEffect, useContext, createContext } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Wizard from './pages/Wizard';
import SetBuilder from './pages/SetBuilder';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Products from './pages/Products';
import CustomizationInfo from './pages/CustomizationInfo';
import CartDrawer from './components/CartDrawer';
import { CartItem, Product } from './types';
import { PRODUCTS } from './constants';

// --- Context Setup ---

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

// --- App Component ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      // NOTE: Because product here might contain customization properties embedded in a unique ID object
      // (or we need to check equality deeply), we rely on ProductDetail sending unique IDs for custom items.
      // If the ID is the same, we increase quantity.
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => {
    // Check if customization price is added (it should be embedded in item.price or calculated separate if logic differs)
    // For this implementation, ProductDetail will modify the base price of the item added to cart if customized.
    const price = item.discountPrice || item.price;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      isCartOpen, setIsCartOpen, cartTotal 
    }}>
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <div className="border-b border-amber-300 bg-amber-50 px-4 py-2 text-center text-xs text-amber-900">
            Demo de portfolio: catálogo, precios y checkout ficticios; no se envían formularios ni se procesan pagos.
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/wizard" element={<Wizard />} />
            <Route path="/builder" element={<SetBuilder />} />
            <Route path="/custom" element={<CustomizationInfo />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Layout>
        <CartDrawer />
      </HashRouter>
    </CartContext.Provider>
  );
};

export default App;
