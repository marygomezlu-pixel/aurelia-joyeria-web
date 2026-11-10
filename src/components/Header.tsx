import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ActivePage, Category } from '../types';
import { STORE_NAME, STORE_CONTACT } from '../data/config';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight,
  MessageCircle,
  MapPin,
  Instagram,
  Facebook
} from 'lucide-react';

interface HeaderProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, categoryFilter?: Category | string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate, onOpenSearch }) => {
  const { itemCount, wishlist, setIsCartOpen, colorTheme, setColorTheme } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: ActivePage; category?: Category }[] = [
    { label: 'Inicio', page: 'inicio' },
    { label: 'Tienda', page: 'tienda' },
    { label: 'Anillos', page: 'tienda', category: 'Anillos' },
    { label: 'Collares', page: 'tienda', category: 'Collares' },
    { label: 'Pulseras', page: 'tienda', category: 'Pulseras' },
    { label: 'Aretes', page: 'tienda', category: 'Aretes' },
    { label: 'Colecciones', page: 'colecciones' },
    { label: 'Personalizados', page: 'personalizados' },
    { label: 'Nosotros', page: 'nosotros' },
  ];

  const handleNavClick = (page: ActivePage, category?: Category) => {
    onNavigate(page, category);
    setMobileMenuOpen(false);
  };

  const themes: { id: 'rubi' | 'esmeralda' | 'zafiro' | 'amatista'; name: string; color: string }[] = [
    { id: 'rubi', name: 'Rubí Imperial', color: '#751724' },
    { id: 'esmeralda', name: 'Esmeralda', color: '#0B3B2C' },
    { id: 'zafiro', name: 'Zafiro Real', color: '#0F2A52' },
    { id: 'amatista', name: 'Amatista', color: '#4A1238' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F8F5EF]/95 backdrop-blur-md border-b border-[#E9DFCF] transition-all">
      {/* Barra informativa superior con ubicación, WhatsApp 953 323 578 y redes sociales */}
      <div className="bg-brand-primary text-[#F8F5EF] text-[11px] py-1.5 px-4 tracking-wider font-light flex items-center justify-between gap-4 overflow-x-auto whitespace-nowrap transition-colors duration-500">
        {/* Ubicación y Celular / WhatsApp */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <span className="flex items-center gap-1.5 text-stone-200">
            <MapPin className="w-3 h-3 text-[#C6A15B]" />
            <span>{STORE_CONTACT.address}</span>
          </span>
          <span className="text-[#C6A15B] hidden sm:inline">·</span>
          <a
            href={STORE_CONTACT.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-white hover:text-[#C6A15B] transition-colors"
            title="Chatear al WhatsApp comercial"
          >
            <MessageCircle className="w-3 h-3 text-[#25D366] fill-[#25D366]" />
            <span>WhatsApp: <strong>953 323 578</strong></span>
          </a>
        </div>

        {/* Redes Sociales y Selector de Tono */}
        <div className="flex items-center gap-3 shrink-0 ml-auto">
          {/* Redes Sociales Rápidas */}
          <div className="flex items-center gap-2 border-r border-white/20 pr-3">
            <a
              href={STORE_CONTACT.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:text-[#25D366] text-white/90 transition-colors"
              title="WhatsApp: 953 323 578"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
            <a
              href={STORE_CONTACT.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:text-[#1877F2] text-white/90 transition-colors"
              title="Facebook Oficial"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href={STORE_CONTACT.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:text-pink-300 text-white/90 transition-colors"
              title="Instagram: @aurelia.joyas"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Selector de color llamativo */}
          <div className="hidden md:flex items-center gap-1.5 bg-black/25 px-2 py-0.5 rounded-full border border-white/20">
            <span className="text-[10px] uppercase tracking-widest text-[#C6A15B] mr-0.5">Tono:</span>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setColorTheme(t.id)}
                className={`w-3.5 h-3.5 rounded-full transition-transform hover:scale-125 ${
                  colorTheme === t.id ? 'ring-2 ring-white scale-110 shadow-sm' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: t.color }}
                title={`Color principal: ${t.name}`}
                aria-label={`Seleccionar tono ${t.name}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Encabezado principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Móvil: botón hamburguesa */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-black transition-colors"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Zona de Marca / Logotipo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('inicio')}
              className="text-left group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-brand-primary border border-[#C6A15B] flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-white transition-all duration-300 shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] uppercase font-normal text-stone-900 block leading-none group-hover:text-brand-primary transition-colors">
                  {STORE_NAME}
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-stone-500 font-light block mt-1">
                  JOYERÍA DE LUJO
                </span>
              </div>
            </button>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isSelected = activePage === link.page && !link.category;
              return (
                <button
                  key={`${link.label}-${link.category || ''}`}
                  onClick={() => handleNavClick(link.page, link.category)}
                  className={`text-xs uppercase tracking-widest transition-colors py-2 relative whitespace-nowrap ${
                    isSelected
                      ? 'text-brand-primary font-semibold'
                      : 'text-stone-600 hover:text-brand-primary'
                  }`}
                >
                  {link.label}
                  {isSelected && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zona de Acciones */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Buscador Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-stone-700 hover:text-brand-primary transition-colors relative"
              aria-label="Abrir buscador"
              title="Buscar joyas"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Favoritos */}
            <button
              onClick={() => onNavigate('tienda')}
              className="p-2.5 text-stone-700 hover:text-brand-primary transition-colors relative"
              aria-label={`Ver favoritos (${wishlist.length})`}
              title="Mis favoritos"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-brand-primary text-white text-[10px] font-mono flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Carrito con Contador */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 bg-brand-primary text-white hover:bg-[#C6A15B] transition-colors flex items-center gap-2 shadow-sm"
              aria-label={`Bolsa de compras (${itemCount} productos)`}
            >
              <ShoppingBag className="w-4 h-4 text-[#C6A15B]" />
              <span className="text-xs font-mono tabular-nums font-semibold pr-1">
                {itemCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F5EF] border-b border-[#E9DFCF] px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <div className="mb-4">
            <button
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 bg-white border border-[#E9DFCF] text-xs text-stone-500"
            >
              <span>Busca tu joya ideal...</span>
              <Search className="w-4 h-4 text-stone-400" />
            </button>
          </div>

          <div className="flex flex-col divide-y divide-[#E9DFCF]/60">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page, link.category)}
                className="py-3.5 flex items-center justify-between text-left text-sm uppercase tracking-wider text-stone-800 hover:text-[#C6A15B] transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#E9DFCF] flex flex-col gap-3 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C6A15B]" />
              <span>{STORE_CONTACT.address}</span>
            </div>
            <a
              href={STORE_CONTACT.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-[#25D366] text-white rounded font-medium flex items-center justify-between shadow-xs"
            >
              <span className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: 953 323 578</span>
              </span>
              <span className="text-[10px] uppercase font-bold bg-white/20 px-1.5 py-0.5 rounded">Chat</span>
            </a>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-stone-500">Síguenos:</span>
              <div className="flex items-center gap-3">
                <a
                  href={STORE_CONTACT.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-[#1877F2] text-white rounded-full"
                  title="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href={STORE_CONTACT.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white rounded-full"
                  title="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <p className="text-[10px] text-stone-400 text-center pt-1">Atención Lu - Sáb 10am - 8pm · Envíos a todo el Perú</p>
          </div>
        </div>
      )}
    </header>
  );
};
