import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Gift, Coffee, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { PRODUCTS, TESTIMONIALS } from '../constants';

const Home: React.FC = () => {
  const featuredProduct = PRODUCTS.find(p => p.tags.includes('premium'));

  // Contact Form State
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio.';
    if (!form.email.trim()) {
      newErrors.email = 'El email es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Ingresá un email válido.';
    }
    if (!form.message.trim()) newErrors.message = 'Por favor escribí tu mensaje.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof form]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="fade-in bg-misionero-50">
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] w-full bg-misionero-900 overflow-hidden flex items-center py-20 md:py-0">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cdn.pixabay.com/photo/2020/12/13/20/49/chimarrao-5829332_1280.jpg" 
            alt="Momento de mate" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-misionero-900 via-misionero-900/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full text-center md:text-left md:flex md:justify-end">
          <div className="max-w-2xl md:max-w-xl mx-auto md:mx-0 md:ml-auto md:mr-4 lg:mr-12">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-misionero-50 border border-misionero-500 uppercase rounded-full bg-misionero-900/50 backdrop-blur-md">
              Misionero
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white leading-tight mb-6">
              Tu próximo mate perfecto <br/><span className="italic text-accent-500">empieza acá</span>
            </h1>
            <p className="text-lg md:text-xl text-misionero-100 mb-8 font-light leading-relaxed">
              No somos un catálogo. Somos tus guías en el ritual. <br className="hidden md:block"/>
              Encontrá el compañero ideal para tus mañanas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/wizard" 
                className="inline-flex w-fit items-center justify-center gap-2 bg-misionero-50 text-misionero-900 px-8 py-4 rounded-lg font-medium hover:bg-white transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-misionero-500 focus-visible:ring-offset-2 focus-visible:ring-offset-misionero-900"
              >
                Descubrí tu mate ideal <ArrowRight size={20} />
              </Link>
              <Link 
                to="/builder" 
                className="inline-flex w-fit items-center justify-center bg-misionero-900/50 backdrop-blur-sm border border-misionero-50/30 text-white px-8 py-4 rounded-lg font-medium hover:bg-misionero-900/80 transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-misionero-50 focus-visible:ring-offset-2 focus-visible:ring-offset-misionero-900"
              >
                Armá tu set
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Profiles / Paths */}
      <section className="py-12 md:py-20 px-4 bg-misionero-50 relative -mt-0 md:-mt-20 z-20 rounded-t-3xl md:rounded-none max-w-7xl mx-auto md:bg-transparent">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProfileCard 
            title="Recién Empiezo"
            description="Quiero probar sin complicarme. Packs simples y funcionales."
            icon={<Coffee className="text-misionero-900" size={32} />}
            link="/wizard?profile=beginner"
            color="bg-white"
          />
          <ProfileCard 
            title="Matero de Ley"
            description="Tomo todos los días. Busco calidad y durabilidad."
            icon={<Heart className="text-misionero-900" size={32} />}
            link="/wizard?profile=daily"
            color="bg-misionero-100 border border-misionero-200"
          />
          <ProfileCard 
            title="Para Regalar"
            description="Quiero quedar bien. Sets listos con presentación premium."
            icon={<Gift className="text-accent-500" size={32} />}
            link="/wizard?profile=gift"
            color="bg-misionero-900 text-white dark-mode"
          />
        </div>
      </section>

      {/* Featured Recommendation */}
      <section className="py-12 md:py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <span className="h-px w-8 bg-misionero-300"></span>
            <span className="text-misionero-900 font-bold text-xs uppercase tracking-widest">Lo recomendado por Misionero</span>
            <span className="h-px w-8 bg-misionero-300"></span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-1 md:order-1 relative group">
               <div className="absolute -inset-4 bg-misionero-200 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
               <img 
                 src={featuredProduct?.image} 
                 alt="Featured" 
                 className="relative z-10 w-full rounded-2xl shadow-xl transform transition-transform group-hover:scale-[1.02]" 
               />
            </div>
            <div className="order-2 md:order-2 text-center md:text-left">
              <h2 className="font-serif text-3xl md:text-4xl text-misionero-900 mb-4">{featuredProduct?.name}</h2>
              <p className="text-misionero-600 mb-6 text-lg">{featuredProduct?.description}</p>
              
              <ul className="space-y-3 mb-8 text-left inline-block">
                {featuredProduct?.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-misionero-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                 <Link to={`/product/${featuredProduct?.id}`} className="bg-misionero-900 text-white px-8 py-3 rounded-md hover:bg-misionero-800 transition-colors shadow-lg shadow-misionero-900/10">
                   Ver detalle
                 </Link>
                 <span className="flex items-center gap-1 text-sm text-misionero-600 self-center justify-center">
                   <Star size={16} className="fill-accent-500 text-accent-500"/> 
                   {featuredProduct?.rating} ({featuredProduct?.reviews} opiniones)
                 </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 md:py-20 bg-misionero-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl text-misionero-900 mb-8 md:mb-12">La comunidad matera elige</h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-8 bg-white rounded-xl shadow-sm border border-misionero-100">
                <div className="flex justify-center gap-1 text-accent-500 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                </div>
                <p className="italic text-misionero-700 mb-4">"{t.text}"</p>
                <div className="text-xs font-bold text-misionero-900 uppercase tracking-wide">
                  {t.author} <span className="text-misionero-400">• {t.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-12 md:py-20 bg-white border-t border-misionero-200">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-misionero-900 mb-4">Hablemos</h2>
            <p className="text-misionero-600 text-lg">¿Tenés dudas sobre cómo curar tu mate o qué yerba elegir? <br className="hidden md:block"/>Estamos acá para ayudarte.</p>
          </div>

          <div className="bg-misionero-50 p-6 md:p-12 rounded-2xl shadow-xl shadow-misionero-900/5">
            {status === 'success' ? (
               <div className="text-center py-10 animate-fadeIn">
                 <div className="w-20 h-20 bg-misionero-200 rounded-full flex items-center justify-center mx-auto mb-6 text-misionero-900">
                   <CheckCircle size={40} />
                 </div>
                  <h3 className="font-serif text-2xl text-misionero-900 mb-4">Validación completada</h3>
                  <p className="text-misionero-600 mb-6">La demo no envió ni guardó tus datos. Este estado solo muestra el comportamiento de la interfaz.</p>
                 <button 
                   onClick={() => setStatus('idle')} 
                   className="text-misionero-900 font-bold hover:underline"
                 >
                    Probar nuevamente
                 </button>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-misionero-900 mb-1 uppercase tracking-wide">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    className={`w-full p-4 bg-white text-misionero-900 placeholder-misionero-300 border rounded-lg outline-none transition-all appearance-none
                      ${errors.name 
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                        : 'border-misionero-200 focus:border-misionero-500 focus:ring-1 focus:ring-misionero-500'
                      }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-misionero-900 mb-1 uppercase tracking-wide">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tucorreo@ejemplo.com"
                    className={`w-full p-4 bg-white text-misionero-900 placeholder-misionero-300 border rounded-lg outline-none transition-all appearance-none
                      ${errors.email 
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                        : 'border-misionero-200 focus:border-misionero-500 focus:ring-1 focus:ring-misionero-500'
                      }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.email}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-misionero-900 mb-1 uppercase tracking-wide">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="¿En qué podemos ayudarte hoy?"
                    className={`w-full p-4 bg-white text-misionero-900 placeholder-misionero-300 border rounded-lg outline-none transition-all resize-none appearance-none
                      ${errors.message 
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                        : 'border-misionero-200 focus:border-misionero-500 focus:ring-1 focus:ring-misionero-500'
                      }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-lg font-bold text-lg text-white shadow-lg transition-all flex items-center justify-center gap-2 bg-misionero-900 hover:bg-misionero-800 hover:shadow-xl active:scale-[0.99]"
                >
                  Validar formulario de demo <Send size={18} />
                </button>

                <p className="text-center text-xs text-misionero-500">No hay backend: el formulario no transmite ni conserva información.</p>

              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

interface ProfileCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ title, description, icon, link, color }) => {
  return (
    <Link to={link} className={`block p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${color}`}>
      <div className="mb-4">{icon}</div>
      <h3 className={`font-serif text-xl font-bold mb-2 ${color.includes('text-white') ? 'text-white' : 'text-misionero-900'}`}>{title}</h3>
      <p className={`text-sm mb-6 ${color.includes('text-white') ? 'text-misionero-200' : 'text-misionero-600'}`}>{description}</p>
      <div className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${color.includes('text-white') ? 'text-white' : 'text-misionero-900'}`}>
        Comenzar <ArrowRight size={14} />
      </div>
    </Link>
  );
};

export default Home;
