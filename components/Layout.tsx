import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, MessageCircle, Instagram } from 'lucide-react';
import { useCart } from '../App';

const NAV_LOGO_SRC = 'data:image/jpeg;base64,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';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cart, setIsCartOpen } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll for subtle shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('contact');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavLink = ({ to, label, isAction = false }: { to: string, label: string, isAction?: boolean }) => {
    const isActive = location.pathname === to;
    
    if (isAction) {
      return (
        <a 
          href={to} 
          onClick={handleContactClick}
          className="relative group py-2 text-xs font-bold tracking-[0.15em] uppercase text-misionero-100 hover:text-white transition-colors duration-300"
        >
          {label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
      );
    }

    return (
      <Link 
        to={to} 
        className={`relative py-2 text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${
          isActive ? 'text-white border-b-2 border-accent-500' : 'text-misionero-200 hover:text-white'
        }`}
      >
        {label}
        {!isActive && (
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-misionero-500 transition-all duration-300 group-hover:w-full"></span>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-misionero-900 bg-misionero-50 selection:bg-misionero-900 selection:text-white">
      
      {/* Header */}
      <header 
        className={`sticky top-0 z-40 bg-misionero-900 transition-all duration-300 border-b border-misionero-800 ${
          isScrolled ? 'shadow-md py-3' : 'py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <img 
                  src={NAV_LOGO_SRC} 
                  alt="Misionero" 
                  className="h-10 w-auto rounded-sm object-cover ring-1 ring-misionero-800/60 shadow-sm bg-misionero-950" 
                />
                <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-white transition-opacity group-hover:opacity-90">
                  MISIONERO
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
              <NavLink to="/products" label="Productos" />
              <NavLink to="/custom" label="Personalizados" />
              <div className="h-4 w-px bg-misionero-700"></div>
              <NavLink to="#contact" label="Contacto" isAction />
            </nav>

            {/* Actions (Mobile Menu & Cart) */}
            <div className="flex items-center gap-4 md:gap-6">
              
              {/* Cart */}
              <button 
                className="text-misionero-100 hover:text-white transition-colors relative p-1.5 group"
                onClick={() => setIsCartOpen(true)}
                aria-label="Carrito"
              >
                <ShoppingBag size={22} strokeWidth={1.5} className="group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-500 text-misionero-900 text-[9px] font-bold h-3.5 w-3.5 flex items-center justify-center rounded-full ring-2 ring-misionero-900">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <button 
                className="md:hidden text-misionero-100 hover:text-white transition-colors p-1.5"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Abrir menú"
              >
                <Menu size={26} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full Screen Menu */}
      <div className={`fixed inset-0 z-50 bg-misionero-900 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Mobile Header */}
        <div className="flex justify-between items-center p-6 border-b border-misionero-800">
          <div className="flex items-center gap-3">
            <img 
              src={NAV_LOGO_SRC} 
              alt="Misionero" 
              className="h-9 w-auto rounded-sm object-cover ring-1 ring-misionero-800/60 shadow-sm bg-misionero-950" 
            />
            <span className="font-serif text-2xl font-bold text-white">MISIONERO</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-misionero-300 hover:text-white p-2"
          >
            <X size={26} strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile Links */}
        <div className="flex flex-col p-8 space-y-8 text-center flex-1 justify-center">
          <Link 
            to="/products" 
            className="text-2xl font-serif text-white hover:text-accent-500 transition-colors"
          >
            Nuestros Productos
          </Link>
          <Link 
            to="/custom" 
            className="text-2xl font-serif text-white hover:text-accent-500 transition-colors"
          >
            Personalizados
          </Link>
          <a 
            href="#contact" 
            onClick={handleContactClick}
            className="text-2xl font-serif text-white hover:text-accent-500 transition-colors"
          >
            Contacto
          </a>
          
          <div className="pt-12 flex justify-center space-x-4">
             <Link to="/wizard" className="text-xs font-bold uppercase tracking-widest text-misionero-200 border border-misionero-700 px-6 py-3 rounded-full hover:bg-misionero-800 hover:text-white transition-all">
                Test de Perfil
             </Link>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="p-8 text-center bg-misionero-950">
           <p className="text-xs text-misionero-400 uppercase tracking-widest">Tu ritual del mate</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-misionero-900 text-misionero-100 py-12 md:py-16 border-t border-misionero-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
          
          {/* Brand & Socials */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-serif text-3xl mb-6 text-white tracking-tight">MISIONERO</h3>
            <p className="text-sm opacity-80 leading-relaxed max-w-xs mb-8 text-misionero-200">
              Diseñamos experiencias para que disfrutes de la tradición con un enfoque moderno y personal.
            </p>
            
            {/* Social Media Links */}
            <div>
              <h4 className="font-bold text-white mb-4 uppercase text-[10px] tracking-[0.2em]">Seguinos</h4>
              <div className="flex flex-col gap-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-misionero-300 hover:text-accent-500 transition-colors group">
                  <Instagram size={18} className="text-misionero-400 group-hover:text-accent-500 transition-colors" />
                  <span className="text-sm font-medium tracking-wide">Instagram</span>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-misionero-300 hover:text-accent-500 transition-colors group">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-misionero-400 group-hover:text-accent-500 transition-colors">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                  <span className="text-sm font-medium tracking-wide">TikTok</span>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-[10px] tracking-[0.2em]">Explorar</h4>
            <ul className="space-y-4 text-sm text-misionero-300">
              <li><Link to="/wizard" className="hover:text-white transition-colors">Test de Perfil</Link></li>
              <li><Link to="/builder" className="hover:text-white transition-colors">Armador de Sets</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Catálogo Completo</Link></li>
              <li><Link to="/custom" className="hover:text-white transition-colors">Personalización Láser</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-[10px] tracking-[0.2em]">Soporte</h4>
            <ul className="space-y-4 text-sm text-misionero-300">
              <li><a href="#" className="hover:text-white transition-colors">Envíos y Devoluciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guía de Curado</a></li>
              <li><a href="#contact" onClick={handleContactClick} className="hover:text-white transition-colors">Contacto Directo</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-[10px] tracking-[0.2em]">Seguridad</h4>
            <div className="flex items-center gap-3 mb-4 text-misionero-300">
              <MessageCircle size={18} />
              <span className="text-sm">Atención Personalizada</span>
            </div>
            <p className="text-xs opacity-50 leading-relaxed text-misionero-200">
              Todos los pagos son procesados de forma segura. Garantía de satisfacción en todos nuestros productos.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-misionero-800 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest opacity-40 gap-4 md:gap-0">
          <p className="text-center md:text-left">© 2024 MISIONERO. Buenos Aires, Argentina.</p>
          <p className="text-center md:text-right">Diseñado con ❤️ para materos</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
