import React from 'react';
import { ActivePage, Category } from '../types';
import { STORE_NAME, STORE_FULL_NAME, STORE_CONTACT, CURRENCY } from '../data/config';
import { Sparkles, MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageCircle, Palette } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FooterProps {
  onNavigate: (page: ActivePage, category?: Category | string) => void;
  onOpenLegal: (topic: 'privacidad' | 'terminos' | 'envios' | 'cambios') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal }) => {
  const { colorTheme, setColorTheme } = useCart();

  const themes: { id: 'rubi' | 'esmeralda' | 'zafiro' | 'amatista'; name: string; color: string }[] = [
    { id: 'rubi', name: 'Rubí Imperial', color: '#751724' },
    { id: 'esmeralda', name: 'Esmeralda', color: '#0B3B2C' },
    { id: 'zafiro', name: 'Zafiro Real', color: '#0F2A52' },
    { id: 'amatista', name: 'Amatista', color: '#4A1238' },
  ];

  return (
    <footer className="bg-brand-primary text-[#F8F5EF] pt-16 pb-12 border-t border-[#C6A15B]/40 shadow-inner transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Fila principal de 5 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          {/* Columna 1: Marca y Filosofía */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#C6A15B] flex items-center justify-center text-[#C6A15B]">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl tracking-[0.2em] uppercase text-white font-normal">
                {STORE_NAME}
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Piezas atemporales diseñadas para celebrar tus momentos más íntimos y deslumbrar con sutileza. Calidad, armonía y dedicación en cada detalle.
            </p>
            <div className="pt-2 text-xs text-stone-300 space-y-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span className="font-medium">{STORE_CONTACT.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <a href={`tel:${STORE_CONTACT.phoneRaw}`} className="hover:text-white transition-colors">
                  Celular: <strong className="font-mono text-white">{STORE_CONTACT.phone}</strong>
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={STORE_CONTACT.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  WhatsApp: <strong className="font-mono text-white">{STORE_CONTACT.phone}</strong>
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>{STORE_CONTACT.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>{STORE_CONTACT.hours}</span>
              </div>
            </div>

            {/* Redes sociales interactivas */}
            <div className="pt-3 space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-[#C6A15B] font-semibold block">
                Conéctate en Redes Sociales:
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {/* WhatsApp */}
                <a
                  href={STORE_CONTACT.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/60 text-white hover:bg-[#25D366] text-xs flex items-center gap-1.5 transition-all shadow-xs"
                  aria-label="Chatear por WhatsApp"
                  title="Chatear al WhatsApp 953 323 578"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </a>

                {/* Facebook */}
                <a
                  href={STORE_CONTACT.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-[#1877F2]/20 border border-[#1877F2]/60 text-white hover:bg-[#1877F2] text-xs flex items-center gap-1.5 transition-all shadow-xs"
                  aria-label="Visitar página de Facebook"
                  title="Seguir en Facebook"
                >
                  <Facebook className="w-3.5 h-3.5 fill-current" />
                  <span>Facebook</span>
                </a>

                {/* Instagram */}
                <a
                  href={STORE_CONTACT.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/60 text-white hover:bg-pink-600 text-xs flex items-center gap-1.5 transition-all shadow-xs"
                  aria-label="Ver perfil de Instagram"
                  title="Seguir en Instagram @aurelia.joyas"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Columna 2: Tienda */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C6A15B] mb-4">
              Tienda
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('inicio')} className="hover:text-white transition-colors">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tienda')} className="hover:text-white transition-colors">
                  Catálogo Completo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tienda', 'Anillos')} className="hover:text-white transition-colors">
                  Anillos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tienda', 'Collares')} className="hover:text-white transition-colors">
                  Collares & Cadenas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tienda', 'Pulseras')} className="hover:text-white transition-colors">
                  Pulseras
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tienda', 'Aretes')} className="hover:text-white transition-colors">
                  Aretes & Pendientes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('colecciones')} className="hover:text-white transition-colors">
                  Colecciones Especiales
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tienda', 'ofertas')} className="hover:text-[#C6A15B] transition-colors">
                  Ofertas Seleccionadas
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Atención al cliente */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C6A15B] mb-4">
              Atención al Cliente
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('contacto')} className="hover:text-white transition-colors">
                  Contacto Directo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('guia-tallas')} className="hover:text-white transition-colors">
                  Guía de Tallas de Anillos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cuidado-joyas')} className="hover:text-white transition-colors">
                  Cuidado de Joyas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('seguimiento')} className="hover:text-white transition-colors">
                  Seguimiento de Pedidos
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('envios')} className="hover:text-white transition-colors">
                  Política de Envíos
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('cambios')} className="hover:text-white transition-colors">
                  Cambios y Devoluciones
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 4: Marca & Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C6A15B] mb-4">
              Información Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('nosotros')} className="hover:text-white transition-colors">
                  Nosotros & Filosofía
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('personalizados')} className="hover:text-white transition-colors">
                  Joyas Personalizadas
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('privacidad')} className="hover:text-white transition-colors">
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('terminos')} className="hover:text-white transition-colors">
                  Términos y Condiciones
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Selector de color de marca y Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-300">
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-stone-300 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#C6A15B]" />
              Color de Joyería:
            </span>
            <div className="flex items-center gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setColorTheme(t.id)}
                  className={`px-2.5 py-1 rounded text-[11px] transition-all flex items-center gap-1.5 border ${
                    colorTheme === t.id
                      ? 'bg-white text-stone-900 border-white font-medium shadow-xs'
                      : 'bg-black/30 text-stone-300 border-white/20 hover:border-white'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-stone-300 text-center md:text-right max-w-xl">
            <p>© 2026 {STORE_FULL_NAME}. Todos los derechos reservados.</p>
            <span className="text-[10px] text-stone-400">Precios en Soles ({CURRENCY}). Modo demostración comercial.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
