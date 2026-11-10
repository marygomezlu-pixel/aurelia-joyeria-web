import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { WHATSAPP_NUMBER, getWhatsAppUrl } from '../data/config';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  title?: string;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  message,
  title = "Consulta personalizada por WhatsApp",
}) => {
  const [copied, setCopied] = useState(false);
  const [customPhone, setCustomPhone] = useState('');

  if (!isOpen) return null;

  const { isConfigured, url } = getWhatsAppUrl(message);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const activeUrl = isConfigured
    ? url
    : customPhone.trim()
    ? `https://wa.me/${customPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#F8F5EF] border border-[#E9DFCF] w-full max-w-lg p-6 md:p-8 shadow-2xl relative text-[#171717]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-500 hover:text-[#171717] p-1 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-medium text-[#171717]">{title}</h3>
            <p className="text-xs text-stone-500">Línea oficial: <strong className="font-mono text-stone-800">953 323 578</strong> · Av. Panamericana</p>
          </div>
        </div>

        {!isConfigured && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs flex gap-2.5 items-start">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-1">Aviso de configuración comercial</p>
              <p className="text-amber-800 leading-relaxed">
                El número comercial de WhatsApp está en formato de plantilla (<code>{WHATSAPP_NUMBER}</code>). 
                Para conectarlo directamente con tu línea oficial de Perú, edita la variable <code>WHATSAPP_NUMBER</code> en el archivo <code>src/data/config.ts</code> con tu número (ej: <code>51987654321</code>).
              </p>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1.5 font-medium">
            Mensaje pre-formateado listo para enviar:
          </label>
          <div className="bg-white p-3.5 border border-[#E9DFCF] text-xs font-mono text-stone-700 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
            {message}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-4 bg-white border border-[#171717] text-[#171717] text-xs font-medium tracking-wide uppercase flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? '¡Copiado al portapapeles!' : 'Copiar mensaje para WhatsApp'}
          </button>

          {isConfigured ? (
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-[#25D366] text-white text-xs font-medium tracking-wide uppercase flex items-center justify-center gap-2 hover:bg-[#20ba5a] transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Abrir WhatsApp ahora
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <div className="mt-2 pt-3 border-t border-[#E9DFCF]">
              <label className="block text-xs text-stone-600 mb-1">
                ¿Deseas probarlo con un número de teléfono de prueba ahora?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ej: 51999888777"
                  value={customPhone}
                  onChange={(e) => setCustomPhone(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-[#E9DFCF] text-stone-800 focus:outline-none focus:border-[#C6A15B]"
                />
                {activeUrl ? (
                  <a
                    href={activeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 bg-[#25D366] text-white text-xs font-medium flex items-center gap-1.5 hover:bg-[#20ba5a]"
                  >
                    Abrir <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <button
                    disabled
                    className="py-2 px-3 bg-stone-200 text-stone-400 text-xs font-medium cursor-not-allowed"
                  >
                    Abrir
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
