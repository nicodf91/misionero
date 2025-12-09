import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Filter, X, ChevronDown, Check, ShoppingBag, ArrowLeft, Zap } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { ProductCategory, Product } from '../types';
import { useCart } from '../App';

// Mapping user-facing categories to internal enum or generic strings
const CATEGORIES = [
  { label: 'Todos', value: 'all' },
  { label: 'Personalizables', value: 'custom' }, // New Category
  { label: 'Mates', value: ProductCategory.MATE },
  { label: 'Termos', value: ProductCategory.TERMO },
  { label: 'Bolso Matero', value: 'bolso' },
  { label: 'Yerba Envasada', value: ProductCategory.YERBA },
  { label: 'Toppings', value: 'topping' },
  { label: 'Bombillas', value: ProductCategory.BOMBILLA },
  { label: 'Té', value: 'tea' },
  { label: 'Accesorios', value: ProductCategory.ACCESORIO },
];

// Extract available models and colors from products for the filters
const AVAILABLE_MODELS = Array.from(new Set(PRODUCTS.map(p => p.model).filter(Boolean))) as string[];
const AVAILABLE_COLORS = Array.from(new Set(PRODUCTS.map(p => p.color).filter(Boolean))) as string[];

const Products: React.FC = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<{min: number, max: number}>({ min: 0, max: 100000 });
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  // Filtered Products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);

  // Check URL params for category on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  useEffect(() => {
    let result = PRODUCTS;

    // Filter by Category
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'custom') {
        result = result.filter(p => p.customizable);
      } else {
        result = result.filter(p => p.category === selectedCategory);
      }
    }

    // Filter by Price
    result = result.filter(p => {
      const price = p.discountPrice || p.price;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Filter by Color
    if (selectedColor) {
      result = result.filter(p => p.color === selectedColor);
    }

    // Filter by Model
    if (selectedModel) {
      result = result.filter(p => p.model === selectedModel);
    }

    setFilteredProducts(result);
  }, [selectedCategory, priceRange, selectedColor, selectedModel]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange({ min: 0, max: 100000 });
    setSelectedColor(null);
    setSelectedModel(null);
    navigate('/products'); // Clear URL params
  };

  // --- Components for Filters ---

  const FilterPanel = ({ className = "" }: { className?: string }) => (
    <div className={`space-y-8 ${className}`}>
      
      {/* Header for Mobile */}
      <div className="flex md:hidden justify-between items-center mb-6 pb-4 border-b border-misionero-100">
        <h3 className="font-serif text-xl text-misionero-900">Filtros</h3>
        <button onClick={() => setIsMobileFilterOpen(false)}>
          <X size={24} className="text-misionero-500" />
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-bold text-sm text-misionero-900 uppercase tracking-widest mb-4">Categoría</h4>
        <div className="space-y-2">
          {CATEGORIES.map(cat => (
            <label key={cat.value} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border border-misionero-300 flex items-center justify-center transition-colors ${selectedCategory === cat.value ? 'border-misionero-900 bg-misionero-900' : 'group-hover:border-misionero-500'}`}>
                {selectedCategory === cat.value && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
              <input 
                type="radio" 
                name="category" 
                value={cat.value} 
                checked={selectedCategory === cat.value}
                onChange={() => setSelectedCategory(cat.value)}
                className="hidden"
              />
              <span className={`text-sm flex items-center gap-2 ${selectedCategory === cat.value ? 'text-misionero-900 font-bold' : 'text-misionero-600'}`}>
                {cat.label}
                {cat.value === 'custom' && <Zap size={12} className="text-accent-500" />}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="font-bold text-sm text-misionero-900 uppercase tracking-widest mb-4">Precio</h4>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1">
            <label className="text-xs text-misionero-500 mb-1 block">Mínimo</label>
            <div className="relative">
              <span className="absolute left-2 top-2 text-misionero-500 text-xs">$</span>
              <input 
                type="number" 
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                className="w-full pl-5 pr-2 py-1 text-sm border border-misionero-200 rounded-md focus:outline-none focus:border-misionero-500 bg-white text-misionero-900 appearance-none"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-xs text-misionero-500 mb-1 block">Máximo</label>
            <div className="relative">
              <span className="absolute left-2 top-2 text-misionero-500 text-xs">$</span>
              <input 
                type="number" 
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="w-full pl-5 pr-2 py-1 text-sm border border-misionero-200 rounded-md focus:outline-none focus:border-misionero-500 bg-white text-misionero-900 appearance-none"
              />
            </div>
          </div>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100000" 
          step="1000"
          value={priceRange.max}
          onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
          className="w-full accent-misionero-900 h-1 bg-misionero-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Colors */}
      {AVAILABLE_COLORS.length > 0 && (
        <div>
          <h4 className="font-bold text-sm text-misionero-900 uppercase tracking-widest mb-4">Color</h4>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_COLORS.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                className={`px-3 py-1 rounded-full text-xs border transition-all ${
                  selectedColor === color 
                    ? 'bg-misionero-900 text-white border-misionero-900' 
                    : 'bg-white text-misionero-600 border-misionero-200 hover:border-misionero-400'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Model */}
      {AVAILABLE_MODELS.length > 0 && (
        <div>
          <h4 className="font-bold text-sm text-misionero-900 uppercase tracking-widest mb-4">Modelo</h4>
          <div className="relative">
            <select 
              value={selectedModel || ''}
              onChange={(e) => setSelectedModel(e.target.value || null)}
              className="w-full p-2 text-sm bg-white border border-misionero-200 rounded-md appearance-none focus:outline-none focus:border-misionero-500 text-misionero-700 cursor-pointer"
            >
              <option value="">Todos los modelos</option>
              {AVAILABLE_MODELS.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-3 text-misionero-400 pointer-events-none" />
          </div>
        </div>
      )}

      <button 
        onClick={clearFilters}
        className="text-xs text-misionero-500 underline hover:text-misionero-700"
      >
        Limpiar todos los filtros
      </button>

      {/* Apply Button for Mobile */}
      <button 
        onClick={() => setIsMobileFilterOpen(false)}
        className="md:hidden w-full mt-6 bg-misionero-900 text-white py-3 rounded-lg font-bold"
      >
        Ver {filteredProducts.length} productos
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-misionero-50">
      {/* Banner */}
      <div className="bg-misionero-900 pt-8 pb-12 px-4 border-b border-misionero-800">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button 
             onClick={() => navigate('/')} 
             className="flex items-center gap-2 text-misionero-200 hover:text-white transition-colors mb-6"
           >
             <ArrowLeft size={18} /> <span className="text-sm font-medium">Volver</span>
           </button>

          <div className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl text-white mb-2">Nuestros Productos</h1>
            <p className="text-misionero-200 max-w-2xl mx-auto text-sm md:text-base">Explorá nuestra selección curada de mates, bombillas y yerbas de calidad premium.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* Mobile Filter Trigger */}
          <div className="md:hidden flex justify-between items-center mb-4">
             <span className="text-sm text-misionero-600 font-bold">{filteredProducts.length} productos</span>
             <button 
               onClick={() => setIsMobileFilterOpen(true)}
               className="flex items-center gap-2 px-4 py-2 bg-misionero-900 text-white rounded-md text-sm font-medium"
             >
               <Filter size={16} /> Filtrar
             </button>
          </div>

          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
             <FilterPanel />
          </aside>

          {/* Mobile Filter Modal */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden flex justify-end">
              <div className="w-[85%] max-w-sm bg-white h-full p-6 overflow-y-auto animate-slideIn">
                <FilterPanel />
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                <p className="text-misionero-500 text-lg mb-4">No encontramos productos con esos filtros.</p>
                <button 
                  onClick={clearFilters}
                  className="text-misionero-900 font-bold hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="group flex flex-col bg-white rounded-xl shadow-sm border border-misionero-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="relative aspect-square overflow-hidden bg-misionero-50">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                        {product.tags.includes('premium') && (
                          <span className="bg-misionero-900 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                            Premium
                          </span>
                        )}
                        {product.customizable && (
                          <span className="bg-white/90 backdrop-blur text-misionero-900 border border-misionero-200 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                            <Zap size={10} className="fill-current"/> Personalizable
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="mb-2">
                        <span className="text-[10px] font-bold text-misionero-500 uppercase tracking-widest">
                          {product.category === ProductCategory.PACK ? 'Pack' : product.category}
                        </span>
                        <h3 className="font-serif text-lg text-misionero-900 leading-tight group-hover:text-accent-600 transition-colors">
                          <Link to={`/product/${product.id}`}>
                            {product.name}
                          </Link>
                        </h3>
                      </div>
                      
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-misionero-50">
                        <div className="flex flex-col">
                          {product.discountPrice ? (
                            <>
                              <span className="text-xs text-misionero-400 line-through">${product.price.toLocaleString()}</span>
                              <span className="font-bold text-misionero-900">${product.discountPrice.toLocaleString()}</span>
                            </>
                          ) : (
                            <span className="font-bold text-misionero-900">${product.price.toLocaleString()}</span>
                          )}
                        </div>
                        <button 
                          onClick={() => addToCart(product)}
                          className="bg-misionero-100 hover:bg-misionero-900 hover:text-white text-misionero-900 p-2 rounded-full transition-all duration-300"
                          title="Agregar al carrito"
                        >
                          <ShoppingBag size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Products;