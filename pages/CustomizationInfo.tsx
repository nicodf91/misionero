import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool, CheckCircle, Image, ArrowRight } from 'lucide-react';
import { CUSTOMIZATION_PRICE } from '../constants';

const CustomizationInfo: React.FC = () => {
  return (
    <div className="min-h-screen bg-misionero-50 fade-in">
      
      {/* Hero */}
      <div className="bg-misionero-900 text-white py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Misionero Custom
          </span>
          <h1 className="font-serif text-4xl md:text-6xl mb-6 leading-tight">Tu huella en tu mate</h1>
          <p className="text-lg md:text-xl text-misionero-200 mb-8 max-w-2xl mx-auto font-light">
            Personalizá la virola con grabado láser de alta precisión. <br className="hidden md:block"/>
            Hacé que tu compañero sea único, como vos.
          </p>
          <Link 
            to="/products?category=custom" 
            className="inline-flex items-center gap-2 bg-misionero-50 text-misionero-900 px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold hover:bg-white transition-colors"
          >
            Ver productos personalizables <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Examples Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-20">
          <div className="relative order-1 md:order-1">
             <div className="absolute -inset-4 bg-misionero-200 rounded-full blur-3xl opacity-50 z-0"></div>
             <img 
               src="https://picsum.photos/id/113/800/800" 
               alt="Mate Grabado" 
               className="relative z-10 w-full rounded-xl shadow-2xl"
             />
             <div className="absolute bottom-6 right-6 z-20 bg-white p-4 rounded-lg shadow-lg">
                <p className="font-serif text-misionero-900 text-lg">"El mate de Juan"</p>
                <p className="text-xs text-misionero-500 uppercase tracking-widest">Grabado de texto</p>
             </div>
          </div>
          <div className="order-2 md:order-2">
            <h2 className="font-serif text-3xl md:text-4xl text-misionero-900 mb-6">Precisión y Estilo</h2>
            <p className="text-lg text-misionero-600 mb-6 leading-relaxed">
              Utilizamos tecnología láser de última generación para grabar sobre acero inoxidable y alpaca. 
              El resultado es un trazo negro, nítido e imborrable que contrasta perfectamente con el brillo del metal.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-misionero-800">
                <CheckCircle className="text-accent-500" /> Nombres, fechas o iniciales.
              </li>
              <li className="flex items-center gap-3 text-misionero-800">
                <CheckCircle className="text-accent-500" /> Logos de empresas o clubes.
              </li>
              <li className="flex items-center gap-3 text-misionero-800">
                <CheckCircle className="text-accent-500" /> Escudos de fútbol o diseños vectoriales.
              </li>
            </ul>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl p-8 md:p-16 text-center border border-misionero-100 shadow-sm">
          <h2 className="font-serif text-3xl text-misionero-900 mb-12">¿Cómo funciona?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-misionero-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-misionero-200 text-misionero-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-misionero-900">1. Elegí tu producto</h3>
              <p className="text-sm text-misionero-600">Busca mates o termos etiquetados como "Personalizables".</p>
            </div>

            <div className="bg-misionero-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-misionero-200 text-misionero-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <PenTool size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-misionero-900">2. Diseñalo</h3>
              <p className="text-sm text-misionero-600">Escribí tu frase o subí tu logo (JPG, PNG) directamente en la página del producto.</p>
            </div>

            <div className="bg-misionero-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-misionero-200 text-misionero-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Image size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-misionero-900">3. Recibilo listo</h3>
              <p className="text-sm text-misionero-600">Nos encargamos del grabado y te lo enviamos listo para usar o regalar.</p>
            </div>
          </div>
          
          <div className="mt-12 inline-block bg-white border border-misionero-200 px-6 py-3 rounded-full text-misionero-700 font-medium text-sm md:text-base">
             Costo del servicio: <span className="text-misionero-900 font-bold ml-1">+ ${CUSTOMIZATION_PRICE.toLocaleString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomizationInfo;