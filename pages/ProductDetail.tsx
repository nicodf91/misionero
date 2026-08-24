import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS, CUSTOMIZATION_PRICE } from '../constants';
import { useCart } from '../App';
import { Star, Truck, ShieldCheck, Heart, PenTool, Upload, AlertCircle, Type } from 'lucide-react';

const FONT_OPTIONS = [
  { id: 'serif', name: 'Serif Elegante', class: 'font-serif' },
  { id: 'sans', name: 'Sans Minimalista', class: 'font-sans' },
  { id: 'script', name: 'Script Caligráfico', class: 'font-script' },
  { id: 'mono', name: 'Monospace Técnico', class: 'font-mono' },
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Customization State
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customText, setCustomText] = useState('');
  const [customFont, setCustomFont] = useState(FONT_OPTIONS[0].id);
  const [customFile, setCustomFile] = useState<File | null>(null);
  const [customLocation, setCustomLocation] = useState('');
  const [errors, setErrors] = useState<{text?: string, file?: string}>({});

  if (!product) return <div className="p-20 text-center">Producto no encontrado</div>;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (['image/jpeg', 'image/png'].includes(file.type) && file.size <= 5 * 1024 * 1024) {
        setCustomFile(file);
        setErrors(prev => ({ ...prev, file: undefined }));
      } else {
        setCustomFile(null);
        setErrors(prev => ({ ...prev, file: 'Usá una imagen JPG o PNG de hasta 5 MB.' }));
      }
    }
  };

  const handleAddToCart = () => {
    // Basic validation if customizing
    if (isCustomizing) {
      if (!customText && !customFile) {
        setErrors(prev => ({ ...prev, text: 'Ingresá un texto o subí una imagen.' }));
        return;
      }
      if (customText.length > 20) {
        setErrors(prev => ({ ...prev, text: 'El texto no puede superar los 20 caracteres.' }));
        return;
      }
    }

    const price = product.discountPrice || product.price;
    const finalPrice = isCustomizing ? price + CUSTOMIZATION_PRICE : price;
    const selectedFontName = FONT_OPTIONS.find(f => f.id === customFont)?.name;

    const itemToAdd = {
      ...product,
      id: isCustomizing ? `${product.id}-custom-${Date.now()}` : product.id,
      price: finalPrice,
      discountPrice: undefined, // Price is finalized
      customization: isCustomizing ? {
        text: customText,
        font: customText ? selectedFontName : undefined,
        image: undefined,
        location: customLocation,
        price: CUSTOMIZATION_PRICE
      } : undefined
    };

    addToCart(itemToAdd);
    setIsCustomizing(false);
    setCustomText('');
    setCustomFile(null);
    setCustomFont(FONT_OPTIONS[0].id);
  };

  const currentPrice = (product.discountPrice || product.price) + (isCustomizing ? CUSTOMIZATION_PRICE : 0);

  const getPreviewFontClass = () => {
    return FONT_OPTIONS.find(f => f.id === customFont)?.class || 'font-sans';
  };

  return (
    <div className="min-h-screen bg-misionero-50">
      {/* Breadcrumb - fake */}
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 text-xs text-misionero-500 uppercase tracking-widest truncate">
        Inicio / {product.category} / <span className="text-misionero-900 font-bold">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-sm relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {isCustomizing && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur border border-accent-200 text-misionero-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1 animate-fadeIn">
                <PenTool size={12}/> Personalización activada
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-square bg-white rounded-lg cursor-pointer hover:ring-2 ring-misionero-900 overflow-hidden shadow-sm">
                 <img src={product.image} className="w-full h-full object-cover opacity-80 hover:opacity-100" alt="thumb" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col bg-white p-6 md:p-8 rounded-2xl shadow-sm h-fit">
          <div className="mb-2 flex items-center gap-2 flex-wrap">
            <span className="bg-misionero-100 text-misionero-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              {product.tags[0]?.replace('_', ' ')}
            </span>
            {product.discountPrice && !isCustomizing && (
              <span className="bg-accent-100 text-accent-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                Oferta
              </span>
            )}
          </div>
          
          <h1 className="font-serif text-2xl md:text-4xl text-misionero-900 mb-2 leading-tight">{product.name}</h1>
          <p className="text-lg text-misionero-500 mb-6 font-light">{product.subtitle}</p>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-misionero-900">
                ${currentPrice.toLocaleString()}
              </span>
              {product.discountPrice && !isCustomizing && (
                 <span className="text-lg text-misionero-300 line-through">${product.price.toLocaleString()}</span>
              )}
            </div>
            <div className="h-6 w-px bg-misionero-200"></div>
            <div className="flex items-center gap-1 text-sm text-misionero-600">
              <Star size={16} className="fill-accent-500 text-accent-500" />
              <span className="font-bold">{product.rating}</span> ({product.reviews})
            </div>
          </div>

          <div className="prose prose-stone text-misionero-700 mb-8 text-sm md:text-base">
            <p>{product.description}</p>
          </div>

          {/* Customization Section */}
          {product.customizable && (
            <div className="bg-misionero-50 rounded-xl p-4 md:p-6 border border-misionero-200 mb-8 transition-all duration-300">
              <div className="flex items-start gap-3 mb-4">
                <input 
                  type="checkbox" 
                  id="customize"
                  checked={isCustomizing}
                  onChange={(e) => setIsCustomizing(e.target.checked)}
                  className="w-5 h-5 mt-1 text-misionero-900 rounded border-misionero-300 focus:ring-misionero-500 flex-shrink-0"
                />
                <label htmlFor="customize" className="font-serif text-lg text-misionero-900 cursor-pointer select-none leading-tight">
                  ¿Querés personalizarlo con grabado láser?
                  <span className="block text-xs font-sans text-misionero-500 mt-1">+ ${CUSTOMIZATION_PRICE.toLocaleString()} por grabado</span>
                </label>
              </div>

              {isCustomizing && (
                <div className="space-y-6 pt-4 border-t border-misionero-200 animate-slideIn">
                  
                  {/* Text Input */}
                  <div>
                    <label className="block text-xs font-bold text-misionero-700 mb-1 uppercase">Frase o Nombre (Máx 20 car.)</label>
                    <input 
                      type="text" 
                      value={customText}
                      onChange={(e) => {
                        setCustomText(e.target.value);
                        if (errors.text) setErrors(p => ({...p, text: undefined}));
                      }}
                      maxLength={20}
                      placeholder="Escribí aquí tu grabado..."
                      className="w-full p-3 bg-white text-misionero-900 border border-misionero-300 rounded-md focus:border-misionero-500 outline-none transition-shadow focus:shadow-md appearance-none"
                    />
                    {errors.text && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.text}</p>}
                  </div>

                  {/* Font Selector & Preview - Only shown when text is present */}
                  {customText.length > 0 && (
                    <div className="animate-fadeIn space-y-4">
                      {/* Dropdown */}
                      <div>
                        <label className="block text-xs font-bold text-misionero-700 mb-1 uppercase flex items-center gap-1">
                          <Type size={12} /> Elegí la tipografía
                        </label>
                        <div className="relative">
                          <select
                            value={customFont}
                            onChange={(e) => setCustomFont(e.target.value)}
                            className="w-full p-3 bg-white text-misionero-900 border border-misionero-300 rounded-md focus:border-misionero-500 outline-none appearance-none cursor-pointer"
                          >
                            {FONT_OPTIONS.map(opt => (
                              <option key={opt.id} value={opt.id}>{opt.name}</option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-misionero-500">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                          </div>
                        </div>
                      </div>

                      {/* Real-time Preview */}
                      <div>
                         <label className="block text-xs font-bold text-misionero-700 mb-1 uppercase">Vista previa del grabado</label>
                         <div className="w-full h-24 bg-misionero-100 rounded-lg border border-misionero-200 flex items-center justify-center relative overflow-hidden shadow-inner">
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>
                            <span className={`text-2xl md:text-3xl text-misionero-950 opacity-90 ${getPreviewFontClass()} drop-shadow-sm px-4 text-center break-words`}>
                              {customText}
                            </span>
                         </div>
                         <p className="text-[10px] text-misionero-500 mt-1 italic text-center">
                           *Simulación digital. El tono final del grabado láser puede variar levemente según el material.
                         </p>
                      </div>
                    </div>
                  )}

                  {/* File Upload (Optional) */}
                  <div className="pt-2 border-t border-misionero-200 border-dashed">
                    <label className="block text-xs font-bold text-misionero-700 mb-1 uppercase">O subí tu diseño (Opcional)</label>
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/jpeg,image/png"
                        onChange={handleFileChange}
                        className="hidden" 
                        id="file-upload"
                      />
                      <label 
                        htmlFor="file-upload" 
                        className="flex items-center justify-center gap-2 w-full p-3 bg-white border border-dashed border-misionero-300 rounded-md cursor-pointer hover:bg-misionero-50 text-misionero-600 text-sm transition-colors"
                      >
                        <Upload size={16} /> {customFile ? customFile.name : 'Subir imagen (JPG o PNG, hasta 5 MB)'}
                      </label>
                    </div>
                    {errors.file && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.file}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-misionero-700 mb-1 uppercase">Ubicación del grabado (Opcional)</label>
                    <input 
                      type="text" 
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      placeholder="Ej: En la virola, centrado"
                      className="w-full p-3 bg-white text-misionero-900 border border-misionero-300 rounded-md focus:border-misionero-500 outline-none appearance-none"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-4 mb-8">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-misionero-900 text-white py-4 rounded-lg font-bold hover:bg-misionero-800 transition-colors shadow-lg shadow-misionero-900/20 active:scale-[0.99]"
            >
              Agregar al Carrito
            </button>
            <button className="p-4 border border-misionero-200 rounded-lg hover:bg-misionero-50 text-misionero-400 hover:text-red-500 transition-colors flex-shrink-0">
              <Heart size={24} />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-misionero-100 pt-6">
            <div className="flex items-start gap-3">
              <Truck className="text-accent-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-sm text-misionero-900">Entrega simulada</h4>
                <p className="text-xs text-misionero-500">La interfaz modela retiro o envío sin procesarlos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-accent-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-sm text-misionero-900">Sin cobro</h4>
                <p className="text-xs text-misionero-500">Nunca se solicitan datos de tarjeta</p>
              </div>
            </div>
          </div>

          {/* Emotional "Misionero Tip" */}
          <div className="mt-8 bg-misionero-50 p-4 rounded-xl border border-misionero-100">
            <h4 className="font-serif text-misionero-900 mb-1">El consejo de Misionero</h4>
            <p className="text-sm text-misionero-600 italic">
              "{product.category === 'mate' ? 'Recordá curarlo por 24hs con yerba usada antes del primer uso para sellar los poros.' : 'Ideal para disfrutar un momento de pausa en tu día.'}"
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
