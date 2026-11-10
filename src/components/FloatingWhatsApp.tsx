import React, { useState } from 'react';
import { MessageCircle, Phone, MapPin, Instagram, Facebook, X, Sparkles } from 'lucide-react';
import { STORE_CONTACT, WHATSAPP_NUMBER } from '../data/config';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappDirectUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hola Aurelia Joyería, quisiera consultar sobre sus joyas y piezas exclusivas.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Ventana emergente con Redes Sociales y Contacto */}
      {isOpen && (
        <div className="mb-3 w-80 bg-[#F8F5EF] border border-[#C6A15B]/50 rounded-2xl shadow-2xl p-4 text-stone-800 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#E9DFCF]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-brand-primary text-[#C6A15B] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-serif text-sm font-semibold text-stone-900 block leading-tight">
                  AURELIA JOYERÍA
                </span>
                <span className="text-[10px] text-stone-500 font-light flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Atención en línea
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-700 p-1 rounded-full transition-colors"
              aria-label="Cerrar ventana de contacto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 space-y-2 text-xs">
            <p className="text-[11px] text-stone-600 leading-snug">
              ¡Hola! Conéctate con nosotros en nuestras redes sociales o chatea directamente a nuestro WhatsApp:
            </p>

            {/* Botón WhatsApp */}
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-lg flex items-center justify-between font-medium shadow-xs transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span className="text-xs">WhatsApp Directo</span>
              </div>
              <span className="text-[11px] font-mono font-bold bg-white/20 px-1.5 py-0.5 rounded">
                953 323 578
              </span>
            </a>

            {/* Botón Facebook */}
            <a
              href={STORE_CONTACT.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-lg flex items-center justify-between font-medium shadow-xs transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-2.5">
                <Facebook className="w-4 h-4 fill-white text-white" />
                <span className="text-xs">Facebook Oficial</span>
              </div>
              <span className="text-[10px] opacity-80 uppercase tracking-wider">Ver página</span>
            </a>

            {/* Botón Instagram */}
            <a
              href={STORE_CONTACT.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white rounded-lg flex items-center justify-between font-medium shadow-xs transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-white" />
                <span className="text-xs">Instagram Oficial</span>
              </div>
              <span className="text-[10px] opacity-90 tracking-wider">@aurelia.joyas</span>
            </a>

            {/* Llamada directa */}
            <a
              href={`tel:${STORE_CONTACT.phoneRaw}`}
              className="w-full py-2 px-3 bg-white hover:bg-stone-50 border border-[#E9DFCF] text-stone-800 rounded-lg flex items-center justify-between font-medium transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span className="text-xs">Llamar por teléfono</span>
              </div>
              <span className="text-[11px] font-mono text-stone-600">{STORE_CONTACT.phone}</span>
            </a>
          </div>

          <div className="pt-2 border-t border-[#E9DFCF] text-[10px] text-stone-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
            <span>Ubicación: <strong className="text-stone-800">{STORE_CONTACT.address}</strong></span>
          </div>
        </div>
      )}

      {/* Botón Flotante Principal de WhatsApp */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <span className="hidden sm:inline-block bg-white text-stone-800 text-xs px-3 py-1.5 rounded-full shadow-lg border border-[#E9DFCF] font-medium tracking-wide animate-pulse">
            WhatsApp: 953 323 578
          </span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 relative ring-4 ring-white/50"
          aria-label="Abrir WhatsApp y redes sociales"
          title="Conectar por WhatsApp (953 323 578) o Redes Sociales"
        >
          <MessageCircle className="w-7 h-7 fill-white text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
            1
          </span>
        </button>
      </div>
    </div>
  );
};
