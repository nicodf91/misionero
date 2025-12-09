import React, { useState, useEffect } from 'react';
import { useCart } from '../App';
import { Link } from 'react-router-dom';
import { CheckCircle, Truck, Store, CreditCard, AlertCircle, Lock, PenTool } from 'lucide-react';

type DeliveryMethod = 'shipping' | 'pickup';

interface FormData {
  email: string;
  name: string;
  lastname: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('shipping');
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    lastname: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form on change
  useEffect(() => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let valid = true;

    // Contact Validation
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresá un email válido';
      valid = false;
    }
    if (!formData.name) { newErrors.name = 'Requerido'; valid = false; }
    if (!formData.lastname) { newErrors.lastname = 'Requerido'; valid = false; }

    // Shipping Validation (only if shipping is selected)
    if (deliveryMethod === 'shipping') {
      if (!formData.address) { newErrors.address = 'Requerido'; valid = false; }
      if (!formData.city) { newErrors.city = 'Requerido'; valid = false; }
      if (!formData.zip) { newErrors.zip = 'Requerido'; valid = false; }
    }

    // Payment Validation
    if (!formData.cardNumber || formData.cardNumber.length < 13) { newErrors.cardNumber = 'Número inválido'; valid = false; }
    if (!formData.cardExpiry) { newErrors.cardExpiry = 'Requerido'; valid = false; }
    if (!formData.cardCvc || formData.cardCvc.length < 3) { newErrors.cardCvc = 'Requerido'; valid = false; }

    setErrors(newErrors);
    setIsFormValid(valid);
  }, [formData, deliveryMethod]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setStep(2);
      clearCart();
    } else {
      // Mark all as touched to show errors
      const allTouched: any = {};
      Object.keys(formData).forEach(k => allTouched[k] = true);
      setTouched(allTouched);
    }
  };

  // Reusable Input Component with specific styling requirements
  // "half" means col-span-1 in a grid-cols-2 desktop, but typically full width in mobile unless we specify grid-cols-2 mobile.
  // We'll set the container to be grid-cols-1 sm:grid-cols-2.
  // If "half" is true, it stays col-span-1 (takes 100% on mobile since mobile is 1 col, takes 50% on desktop).
  // If "half" is false, it needs to span full width on desktop too (col-span-1 sm:col-span-2).
  const FormInput = ({ 
    name, 
    placeholder, 
    type = "text", 
    label,
    half = false,
    icon
  }: { 
    name: keyof FormData, 
    placeholder: string, 
    type?: string, 
    label?: string,
    half?: boolean,
    icon?: React.ReactNode
  }) => (
    <div className={`${half ? 'col-span-1' : 'col-span-1 sm:col-span-2'} mb-1`}>
      {label && <label className="block text-xs font-bold text-misionero-900 mb-1 uppercase tracking-wide">{label}</label>}
      <div className="relative">
        <input
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full p-3 bg-white text-misionero-900 placeholder-misionero-300 border rounded-md outline-none transition-all duration-200 appearance-none
            ${touched[name] && errors[name] 
              ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
              : 'border-misionero-200 focus:border-misionero-500 focus:ring-1 focus:ring-misionero-500'
            }
            ${icon ? 'pl-10' : ''}
          `}
        />
        {icon && <div className="absolute left-3 top-3.5 text-misionero-400">{icon}</div>}
      </div>
      {touched[name] && errors[name] && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <AlertCircle size={12} /> {errors[name]}
        </p>
      )}
    </div>
  );

  if (cart.length === 0 && step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-misionero-50 px-4">
        <div className="text-center p-8 w-full max-w-md">
          <h2 className="text-3xl font-serif mb-4 text-misionero-900">Tu carrito está vacío</h2>
          <p className="text-misionero-600 mb-8">Parece que todavía no elegiste tu compañero ideal.</p>
          <Link to="/" className="inline-block bg-misionero-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-misionero-800 transition-colors w-full sm:w-auto">
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-misionero-50 flex items-center justify-center px-4 py-12">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center max-w-lg w-full border border-misionero-100 animate-slideIn">
          <div className="w-20 h-20 bg-misionero-100 rounded-full flex items-center justify-center mx-auto mb-6 text-misionero-900 shadow-sm">
            <CheckCircle size={40} />
          </div>
          <h1 className="font-serif text-3xl text-misionero-900 mb-4">¡Gracias por tu compra!</h1>
          <p className="text-misionero-600 mb-8 leading-relaxed">
            Tu pedido <span className="font-bold text-misionero-900">#{(Math.random() * 10000).toFixed(0)}</span> ha sido confirmado.
            <br/>Te enviamos un email a <span className="font-medium text-misionero-800">{formData.email}</span> con los detalles.
          </p>
          
          <div className="bg-misionero-50 p-6 rounded-xl mb-8 border border-misionero-200">
            <p className="text-sm font-bold text-misionero-800 mb-2 uppercase tracking-wide">Próximo paso sugerido:</p>
            <p className="text-sm text-misionero-600">Mirá nuestro video de "Cómo curar tu mate" para estar listo cuando llegue.</p>
          </div>
          
          <Link to="/" className="block w-full bg-misionero-900 text-white py-4 rounded-lg font-bold hover:bg-misionero-800 transition-colors">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-misionero-50 py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
          <h1 className="font-serif text-3xl text-misionero-900 mb-8 border-b border-misionero-200 pb-4">Finalizar Compra</h1>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* 1. Contacto */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-misionero-500 mb-4 flex items-center gap-2">
                <span className="bg-misionero-200 text-misionero-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                Datos de Contacto
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput name="email" placeholder="ejemplo@email.com" label="Email" />
                <FormInput name="name" placeholder="Tu nombre" label="Nombre" half />
                <FormInput name="lastname" placeholder="Tu apellido" label="Apellido" half />
              </div>
            </section>

            {/* 2. Método de Entrega */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-misionero-500 mb-4 flex items-center gap-2">
                <span className="bg-misionero-200 text-misionero-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                Método de Entrega
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div 
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`cursor-pointer border-2 rounded-xl p-4 flex items-start gap-4 transition-all ${deliveryMethod === 'pickup' ? 'border-misionero-900 bg-white ring-1 ring-misionero-900 shadow-md' : 'border-misionero-200 bg-white hover:border-misionero-400'}`}
                >
                  <div className={`mt-1 ${deliveryMethod === 'pickup' ? 'text-misionero-900' : 'text-gray-400'}`}>
                    <Store size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-misionero-900">Retiro en Local</h3>
                    <p className="text-xs text-misionero-500 mt-1">Gratis</p>
                  </div>
                  <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${deliveryMethod === 'pickup' ? 'border-misionero-900' : 'border-gray-300'}`}>
                    {deliveryMethod === 'pickup' && <div className="w-2.5 h-2.5 rounded-full bg-misionero-900" />}
                  </div>
                </div>

                <div 
                  onClick={() => setDeliveryMethod('shipping')}
                  className={`cursor-pointer border-2 rounded-xl p-4 flex items-start gap-4 transition-all ${deliveryMethod === 'shipping' ? 'border-misionero-900 bg-white ring-1 ring-misionero-900 shadow-md' : 'border-misionero-200 bg-white hover:border-misionero-400'}`}
                >
                  <div className={`mt-1 ${deliveryMethod === 'shipping' ? 'text-misionero-900' : 'text-gray-400'}`}>
                    <Truck size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-misionero-900">Envío a Domicilio</h3>
                    <p className="text-xs text-misionero-500 mt-1">A todo el país</p>
                  </div>
                  <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${deliveryMethod === 'shipping' ? 'border-misionero-900' : 'border-gray-300'}`}>
                    {deliveryMethod === 'shipping' && <div className="w-2.5 h-2.5 rounded-full bg-misionero-900" />}
                  </div>
                </div>
              </div>

              {/* Conditional Content */}
              {deliveryMethod === 'pickup' ? (
                <div className="bg-white p-6 rounded-lg border border-misionero-200 shadow-sm animate-fadeIn">
                  <h4 className="font-bold text-misionero-900 mb-2">📍 Misionero Store</h4>
                  <p className="text-misionero-700 text-sm mb-1">Av. del Libertador 1234, Buenos Aires</p>
                  <p className="text-misionero-500 text-xs">Lunes a Viernes de 10 a 19hs. Sábados de 10 a 14hs.</p>
                  <div className="mt-4 bg-yellow-50 text-yellow-800 text-xs p-3 rounded border border-yellow-100">
                    Te avisaremos por email cuando tu pedido esté listo para retirar (aprox. 24hs).
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
                  <FormInput name="address" placeholder="Calle y altura" label="Dirección" />
                  <FormInput name="city" placeholder="Ciudad / Localidad" label="Ciudad" half />
                  <FormInput name="zip" placeholder="CP" label="Código Postal" half />
                </div>
              )}
            </section>

            {/* 3. Pago */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-misionero-500 mb-4 flex items-center gap-2">
                <span className="bg-misionero-200 text-misionero-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                Pago Seguro
              </h2>
              
              <div className="bg-white p-6 rounded-xl border border-misionero-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-bold text-misionero-900 flex items-center gap-2">
                    <CreditCard size={20} className="text-misionero-400"/> Tarjeta de Crédito / Débito
                  </span>
                  <div className="flex gap-2">
                    <div className="h-6 w-10 bg-misionero-50 rounded border border-misionero-200"></div>
                    <div className="h-6 w-10 bg-misionero-50 rounded border border-misionero-200"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput name="cardNumber" placeholder="0000 0000 0000 0000" label="Número de Tarjeta" icon={<CreditCard size={16}/>} />
                  <FormInput name="cardExpiry" placeholder="MM/AA" label="Vencimiento" half />
                  <FormInput name="cardCvc" placeholder="123" label="CVC" half icon={<Lock size={16}/>}/>
                </div>
                
                <div className="mt-4 flex items-center gap-2 text-xs text-misionero-500 bg-misionero-50 p-3 rounded">
                  <Lock size={12} /> Tus datos están encriptados y seguros.
                </div>
              </div>
            </section>

            <button 
              type="submit" 
              disabled={!isFormValid}
              className={`w-full py-4 rounded-lg font-bold text-lg shadow-lg transition-all transform active:scale-[0.99]
                ${isFormValid 
                  ? 'bg-misionero-900 text-white hover:bg-misionero-800 hover:shadow-xl' 
                  : 'bg-misionero-200 text-misionero-400 cursor-not-allowed shadow-none'
                }`}
            >
              Pagar ${cartTotal.toLocaleString()}
            </button>

          </form>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2">
          <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg border border-misionero-100 lg:sticky lg:top-24">
            <h2 className="font-serif text-xl mb-6 pb-4 border-b border-misionero-100 text-misionero-900">Resumen del Pedido</h2>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-misionero-50 rounded-md overflow-hidden relative flex-shrink-0 border border-misionero-100">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    <span className="absolute bottom-0 right-0 bg-misionero-900 text-white text-[10px] w-5 h-5 flex items-center justify-center font-bold">{item.quantity}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-misionero-900 truncate">{item.name}</p>
                    {item.customization ? (
                       <p className="text-xs text-misionero-500 flex items-center gap-1"><PenTool size={10}/> Personalizado</p>
                    ) : (
                       <p className="text-xs text-misionero-400 truncate">{item.category}</p>
                    )}
                  </div>
                  <div className="text-sm font-bold text-misionero-900 whitespace-nowrap">
                    ${((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-misionero-100 pt-4 space-y-3">
              <div className="flex justify-between text-sm text-misionero-600">
                <span>Subtotal</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-misionero-600">Envío</span>
                {deliveryMethod === 'pickup' ? (
                   <span className="text-misionero-900 font-bold uppercase text-xs">Retiro en local</span>
                ) : (
                   <span className="text-green-700 font-bold bg-green-50 px-2 py-1 rounded text-xs">GRATIS</span>
                )}
              </div>
              
              <div className="border-t border-misionero-100 mt-4 pt-4">
                 <div className="flex justify-between items-end">
                  <span className="text-lg font-serif text-misionero-900">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-misionero-900 block leading-none">${cartTotal.toLocaleString()}</span>
                    <span className="text-[10px] text-misionero-500">IVA incluido</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-misionero-100 text-center">
              <p className="text-xs text-misionero-400 flex items-center justify-center gap-2">
                <Lock size={12} /> Compra protegida SSL
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;