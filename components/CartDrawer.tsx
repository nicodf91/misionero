import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, PenTool, CheckCircle } from 'lucide-react';
import { useCart } from '../App';
import { useNavigate } from 'react-router-dom';
import { SHIPPING_THRESHOLD } from '../constants';

const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, cartTotal } = useCart();
  const navigate = useNavigate();
  const [removedItemMessage, setRemovedItemMessage] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min((cartTotal / SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(SHIPPING_THRESHOLD - cartTotal, 0);

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    setRemovedItemMessage(`Eliminaste "${name}" del carrito`);
    setTimeout(() => setRemovedItemMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-misionero-900/40 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-out animate-slideIn border-l border-misionero-200">
        
        {/* Header */}
        <div className="p-4 border-b border-misionero-100 flex items-center justify-between bg-white z-10">
          <h2 className="font-serif text-xl text-misionero-900 font-bold">Tu Compra</h2>
          <button 
            onClick={() => setIsCartOpen(false)} 
            className="p-2 -mr-2 text-misionero-400 hover:text-misionero-900 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Feedback Message (Toast inline) */}
        {removedItemMessage && (
          <div className="bg-misionero-50 px-4 py-2 text-misionero-800 text-xs font-medium flex items-center gap-2 animate-fadeIn border-b border-misionero-100">
             <Trash2 size={12} /> {removedItemMessage}
          </div>
        )}

        {/* Free Shipping Progress */}
        <div className="px-6 py-4 bg-misionero-50 border-b border-misionero-100">
          {remainingForFreeShipping > 0 ? (
            <p className="text-xs text-center mb-2 text-misionero-600">
              ¡Te faltan <span className="font-bold text-misionero-900">${remainingForFreeShipping.toLocaleString()}</span> para envío gratis!
            </p>
          ) : (
            <p className="text-xs text-center mb-2 text-green-700 font-bold flex items-center justify-center gap-1">
              <CheckCircle size={12} /> ¡Tenés envío gratis en este pedido!
            </p>
          )}
          <div className="h-1.5 w-full bg-misionero-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-misionero-900 transition-all duration-500 ease-out" 
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto bg-white">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60 p-8">
              <ShoppingBagIcon />
              <p className="text-misionero-900 font-medium">Tu carrito está esperando tu mate ideal.</p>
              <button 
                onClick={() => { setIsCartOpen(false); navigate('/wizard'); }}
                className="text-misionero-900 font-bold hover:underline text-sm border-b-2 border-accent-500 pb-0.5"
              >
                Descubrir mi mate
              </button>
            </div>
          ) : (
            <div className="divide-y divide-misionero-50">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 p-5 hover:bg-misionero-50/50 transition-colors group">
                  {/* Image */}
                  <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-misionero-100 relative shadow-sm">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    {item.customization && (
                      <div className="absolute bottom-0 right-0 bg-misionero-900 text-white p-1 rounded-tl-md shadow-sm" title="Personalizado">
                        <PenTool size={10} />
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="pr-2">
                        <h3 className="text-sm font-bold text-misionero-900 leading-tight mb-1">{item.name}</h3>
                        <p className="text-xs text-misionero-500 mb-1">{item.category}</p>
                        {item.customization && (
                          <div className="text-[10px] text-misionero-700 bg-misionero-50 px-1.5 py-0.5 rounded border border-misionero-200 inline-flex items-center gap-1 max-w-full truncate">
                            <PenTool size={8} className="text-misionero-900" />
                            <span className="truncate max-w-[120px]">{item.customization.text || 'Diseño personalizado'}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="p-2 -mt-2 -mr-2 text-misionero-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                        title="Eliminar producto"
                        aria-label={`Eliminar ${item.name}`}
                      >
                        <Trash2 size={18} strokeWidth={2} />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-misionero-200 rounded-lg bg-white shadow-sm">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-misionero-50 text-misionero-500 rounded-l-lg transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-xs w-6 text-center font-bold text-misionero-900 select-none">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-misionero-50 text-misionero-500 rounded-r-lg transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-misionero-900">
                          ${((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                        </span>
                        {item.discountPrice && !item.customization && (
                           <span className="text-[10px] line-through text-misionero-400">
                             ${(item.price * item.quantity).toLocaleString()}
                           </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-misionero-100 bg-misionero-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] z-10">
            <div className="flex justify-between items-center mb-4 text-misionero-900">
              <span className="text-sm font-medium">Subtotal</span>
              <span className="text-xl font-bold font-serif tracking-tight">${cartTotal.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
              className="w-full bg-misionero-900 text-white py-4 px-4 rounded-xl font-bold hover:bg-misionero-800 transition-all hover:shadow-lg hover:shadow-misionero-900/20 flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              Iniciar Compra <ArrowRight size={18} />
            </button>
            <p className="text-[10px] text-center text-misionero-400 mt-4 flex items-center justify-center gap-1 uppercase tracking-wide font-medium">
              Compra protegida y segura
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ShoppingBagIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-misionero-300">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

export default CartDrawer;