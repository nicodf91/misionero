import React, { useState } from 'react';
import { Product, ProductCategory, SetBuilderState } from '../types';
import { PRODUCTS } from '../constants';
import { useCart } from '../App';
import { Check, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STEPS = ['Mate', 'Bombilla', 'Yerba', 'Resumen'];

const SetBuilder: React.FC = () => {
  const [state, setState] = useState<SetBuilderState>({
    step: 0,
    selections: { mate: null, bombilla: null, yerba: null, extras: [] }
  });
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const currentCategory = [ProductCategory.MATE, ProductCategory.BOMBILLA, ProductCategory.YERBA][state.step];
  
  const stepProducts = PRODUCTS.filter(p => p.category === currentCategory);

  const handleSelect = (product: Product) => {
    const key = currentCategory as keyof typeof state.selections;
    setState(prev => ({
      ...prev,
      selections: { ...prev.selections, [key]: product }
    }));
  };

  const nextStep = () => {
    setState(prev => ({ ...prev, step: prev.step + 1 }));
  };

  const finish = () => {
    const { mate, bombilla, yerba } = state.selections;
    if (mate) addToCart(mate);
    if (bombilla) addToCart(bombilla);
    if (yerba) addToCart(yerba);
    navigate('/');
  };

  const totalPrice = [state.selections.mate, state.selections.bombilla, state.selections.yerba]
    .reduce((acc, curr) => acc + (curr?.price || 0), 0);

  // --- Summary View (Final Step) ---
  if (state.step === 3) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 fade-in bg-misionero-50">
        <h1 className="font-serif text-3xl text-center mb-8 text-misionero-900">¡Tu set está listo!</h1>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-misionero-200">
           <div className="bg-misionero-100 p-8 flex items-center justify-center">
             <div className="relative w-full max-w-sm aspect-square">
                {/* Visual composition simulation */}
                <img src={state.selections.mate?.image} className="absolute bottom-0 left-0 w-2/3 rounded-lg shadow-lg z-10" alt="Mate" />
                <img src={state.selections.yerba?.image} className="absolute top-0 right-0 w-1/2 rounded-lg shadow-lg z-0 opacity-90" alt="Yerba" />
             </div>
           </div>
           <div className="p-8 flex flex-col justify-center">
             <h3 className="font-serif text-xl mb-6 text-misionero-900">Resumen del Set</h3>
             <ul className="space-y-4 mb-8">
               {[state.selections.mate, state.selections.bombilla, state.selections.yerba].map(item => item && (
                 <li key={item.id} className="flex justify-between items-center border-b border-misionero-100 pb-2">
                   <div>
                     <span className="font-bold text-sm block text-misionero-900">{item.name}</span>
                     <span className="text-xs text-misionero-500">{item.subtitle}</span>
                   </div>
                   <span className="text-sm font-medium text-misionero-900">${item.price.toLocaleString()}</span>
                 </li>
               ))}
             </ul>
             <div className="flex justify-between items-center text-xl font-bold text-misionero-900 mb-8">
               <span>Total</span>
               <span>${totalPrice.toLocaleString()}</span>
             </div>
             <button 
               onClick={finish}
               className="w-full bg-misionero-900 text-white py-4 rounded-lg font-bold hover:bg-misionero-800 transition-colors"
             >
               Agregar todo al carrito
             </button>
           </div>
        </div>
      </div>
    );
  }

  // --- Selection Views ---
  return (
    <div className="min-h-screen bg-misionero-50 py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Stepper */}
        <div className="flex justify-center mb-8 md:mb-12">
           <div className="flex items-center space-x-2 md:space-x-4">
             {STEPS.map((label, idx) => (
               <div key={idx} className={`flex items-center ${idx <= state.step ? 'text-misionero-900' : 'text-misionero-300'}`}>
                 <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 mr-2 ${idx <= state.step ? 'border-misionero-900 bg-misionero-900 text-white' : 'border-misionero-300'}`}>
                   {idx + 1}
                 </span>
                 <span className="hidden md:inline font-medium text-sm uppercase tracking-wide">{label}</span>
                 {idx < STEPS.length - 1 && <div className="w-8 md:w-12 h-px bg-misionero-300 mx-2 md:mx-4" />}
               </div>
             ))}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Selection Area */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
             <h2 className="font-serif text-2xl md:text-3xl text-misionero-900">Elegí tu {STEPS[state.step]}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {stepProducts.map(product => {
                 const isSelected = state.selections[currentCategory as keyof typeof state.selections]?.id === product.id;
                 return (
                   <div 
                    key={product.id}
                    onClick={() => handleSelect(product)}
                    className={`cursor-pointer bg-white p-4 rounded-xl border-2 transition-all hover:shadow-md flex gap-4 items-center ${isSelected ? 'border-misionero-900 ring-1 ring-misionero-900' : 'border-transparent'}`}
                   >
                     <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-md bg-gray-100 flex-shrink-0" />
                     <div>
                       <h3 className="font-bold text-misionero-900">{product.name}</h3>
                       <p className="text-xs text-misionero-500 mb-2">{product.subtitle}</p>
                       <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-semibold">${product.price.toLocaleString()}</span>
                          {isSelected && <div className="bg-misionero-900 text-white p-1 rounded-full"><Check size={12}/></div>}
                       </div>
                     </div>
                   </div>
                 )
               })}
             </div>
          </div>

          {/* Sticky Summary */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-misionero-100 lg:sticky lg:top-24">
              <h3 className="font-serif text-lg mb-4 text-misionero-900 border-b border-misionero-100 pb-2">Tu Set en Progreso</h3>
              <div className="space-y-4 mb-6">
                 <SummaryItem label="Mate" product={state.selections.mate} />
                 <SummaryItem label="Bombilla" product={state.selections.bombilla} />
                 <SummaryItem label="Yerba" product={state.selections.yerba} />
              </div>
              <div className="flex justify-between items-center font-bold text-lg mb-6 text-misionero-900">
                <span>Total</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              
              <button 
                onClick={nextStep}
                disabled={!state.selections[currentCategory as keyof typeof state.selections]}
                className="w-full bg-misionero-900 disabled:bg-misionero-300 text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
              >
                Siguiente Paso <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryItem: React.FC<{ label: string, product: Product | null }> = ({ label, product }) => (
  <div className="flex items-center gap-3">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${product ? 'bg-misionero-100 text-misionero-700' : 'bg-gray-100 text-gray-400'}`}>
      {product ? <Check size={16} /> : label[0]}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-misionero-400 uppercase font-bold">{label}</p>
      <p className="text-sm text-misionero-900 truncate">{product ? product.name : 'Pendiente...'}</p>
    </div>
  </div>
);

export default SetBuilder;