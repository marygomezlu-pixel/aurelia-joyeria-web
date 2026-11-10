import React, { useState } from 'react';
import { Product, ActivePage } from '../types';
import { PRODUCTS_DATA } from '../data/products';
import { useCart } from '../context/CartContext';
import { CURRENCY } from '../data/config';
import { WhatsAppModal } from '../components/WhatsAppModal';
import { Sparkles, MessageCircle, ShoppingBag, CheckCircle2, Heart } from 'lucide-react';

interface CustomJewelryProps {
  onNavigate: (page: ActivePage) => void;
  onViewProduct: (product: Product) => void;
}

export const CustomJewelry: React.FC<CustomJewelryProps> = ({ onNavigate, onViewProduct }) => {
  const { addItem } = useCart();

  const customProducts = PRODUCTS_DATA.filter((p) => p.personalizable);

  const [selectedProduct, setSelectedProduct] = useState<Product>(customProducts[0]);
  const [engravedText, setEngravedText] = useState('');
  const [selectedFinish, setSelectedFinish] = useState<'Dorado' | 'Plateado'>('Dorado');
  const [fontStyle, setFontStyle] = useState<'Cursiva Clásica' | 'Minimalista Mayúsculas' | 'Monograma'>('Cursiva Clásica');
  const [desiredDate, setDesiredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const generateWhatsAppInquiry = () => {
    let msg = `*CONSULTA DE JOYA PERSONALIZADA*\n\n`;
    msg += `Hola, quisiera cotizar y consultar los detalles para esta joya personalizada:\n\n`;
    msg += `• Modelo: ${selectedProduct.nombre}\n`;
    msg += `• Precio base: ${CURRENCY} ${selectedProduct.precio.toFixed(2)}\n`;
    msg += `• Acabado preferido: ${selectedFinish}\n`;
    msg += `• Texto o inicial para grabado: "${engravedText || '(Por coordinar)'}"\n`;
    msg += `• Estilo de tipografía: ${fontStyle}\n`;
    if (desiredDate) msg += `• Fecha deseada de entrega: ${desiredDate}\n`;
    if (notes) msg += `• Observaciones: ${notes}\n`;
    msg += `\n¿Podrían indicarme los tiempos de elaboración y confirmación de diseño? Muchas gracias.`;
    return msg;
  };

  const handleAddCustomToCart = () => {
    if (!engravedText.trim()) {
      alert('Por favor ingresa el texto, nombre o inicial que deseas grabar.');
      return;
    }
    addItem(selectedProduct, 1, undefined, undefined, {
      texto: `${engravedText} (${fontStyle}, Acabado ${selectedFinish})`,
      fechaDeseada: desiredDate,
      observaciones: notes,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Cabecera Principal */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Taller de Personalización</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 font-light leading-tight">
          Una joya, una historia única.
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">
          Personaliza una joya con detalles que representen tu esencia. Elige las opciones disponibles y crea una pieza especial para ti o para alguien importante.
        </p>
      </div>

      {/* Configurador Interactivo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Paso 1: Elegir el modelo de joya */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 border border-[#E9DFCF] shadow-xs">
            <h2 className="font-serif text-xl text-stone-900 font-medium mb-4 flex items-center justify-between">
              <span>1. Selecciona tu joya base</span>
              <span className="text-xs font-mono text-stone-400 font-normal">
                {customProducts.length} modelos
              </span>
            </h2>

            <div className="space-y-3">
              {customProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className={`p-3 border flex items-center gap-3 cursor-pointer transition-all ${
                    selectedProduct.id === p.id
                      ? 'border-[#C6A15B] bg-[#F8F5EF]'
                      : 'border-[#E9DFCF] hover:border-stone-400 bg-white'
                  }`}
                >
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="w-14 h-14 object-cover border border-[#E9DFCF] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-sm text-stone-900 font-medium truncate">{p.nombre}</h3>
                    <p className="text-[11px] text-stone-500">{p.categoria} · {p.material}</p>
                    <span className="text-xs font-mono font-semibold text-stone-900">
                      {CURRENCY} {p.precio.toFixed(2)}
                    </span>
                  </div>
                  {selectedProduct.id === p.id && (
                    <CheckCircle2 className="w-5 h-5 text-[#C6A15B] shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Vista previa en vivo con color llamativo */}
          <div className="bg-brand-primary text-white p-6 border border-white/20 text-center space-y-3 shadow-md transition-colors duration-500">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] block font-semibold">
              Simulación de Grabado
            </span>
            <div className="w-28 h-28 mx-auto rounded-full border-2 border-[#C6A15B] flex items-center justify-center bg-brand-dark/90 p-2 shadow-inner">
              <span
                className={`text-stone-100 ${
                  fontStyle === 'Cursiva Clásica'
                    ? 'font-serif italic text-xl'
                    : fontStyle === 'Monograma'
                    ? 'font-serif uppercase tracking-widest text-2xl font-bold'
                    : 'font-mono uppercase text-sm tracking-widest'
                }`}
              >
                {engravedText || 'A & M'}
              </span>
            </div>
            <p className="text-[11px] text-stone-200">
              {selectedProduct.nombre} · Acabado {selectedFinish}
            </p>
          </div>
        </div>

        {/* Paso 2: Personalizar grabado y opciones */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#E9DFCF] space-y-6 shadow-xs">
          <h2 className="font-serif text-2xl text-stone-900 font-medium border-b border-[#E9DFCF] pb-4">
            2. Configura los detalles de personalización
          </h2>

          {/* Texto de Grabado */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
              Nombre, inicial, fecha o frase corta:*
            </label>
            <input
              type="text"
              maxLength={20}
              value={engravedText}
              onChange={(e) => setEngravedText(e.target.value)}
              placeholder="Ej: Sofía · 15.08.2026"
              className="w-full px-4 py-3 bg-[#F8F5EF] border border-[#E9DFCF] text-sm text-stone-900 focus:outline-none focus:border-[#C6A15B]"
            />
            <span className="block text-[11px] text-stone-400 mt-1">
              Máximo 20 caracteres para asegurar la nitidez del grabado láser.
            </span>
          </div>

          {/* Acabado del metal */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-2">
              Tono de acabado:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(['Dorado', 'Plateado'] as const).map((finish) => (
                <button
                  key={finish}
                  type="button"
                  onClick={() => setSelectedFinish(finish)}
                  className={`py-2.5 px-4 text-xs font-medium uppercase tracking-wider border transition-colors flex items-center justify-center gap-2 ${
                    selectedFinish === finish
                      ? 'border-[#C6A15B] bg-[#F8F5EF] text-[#171717] font-semibold'
                      : 'border-[#E9DFCF] text-stone-600 hover:border-stone-400'
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full ${
                      finish === 'Dorado' ? 'bg-[#C6A15B]' : 'bg-stone-300'
                    }`}
                  />
                  {finish}
                </button>
              ))}
            </div>
          </div>

          {/* Tipografía de Grabado */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-2">
              Estilo tipográfico:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(['Cursiva Clásica', 'Minimalista Mayúsculas', 'Monograma'] as const).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setFontStyle(style)}
                  className={`p-3 text-xs border text-center transition-colors ${
                    fontStyle === style
                      ? 'border-[#C6A15B] bg-[#F8F5EF] text-stone-900 font-semibold'
                      : 'border-[#E9DFCF] text-stone-600 hover:border-stone-400'
                  }`}
                >
                  <span className="block text-stone-800 font-medium mb-1">{style}</span>
                  <span className="block text-[11px] text-stone-400 italic">Ejemplo grabado</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fecha Deseada de Entrega */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
              Fecha deseada de entrega (opcional para aniversarios / regalos):
            </label>
            <input
              type="date"
              value={desiredDate}
              onChange={(e) => setDesiredDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F8F5EF] border border-[#E9DFCF] text-xs text-stone-800 focus:outline-none focus:border-[#C6A15B]"
            />
          </div>

          {/* Observaciones */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
              Instrucciones adicionales para el orfebre:
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Centrar las iniciales en el dije, incluir símbolo de corazón si es posible..."
              className="w-full px-4 py-2 bg-[#F8F5EF] border border-[#E9DFCF] text-xs text-stone-800 focus:outline-none focus:border-[#C6A15B]"
            />
          </div>

          {/* Resumen y Acciones */}
          <div className="pt-4 border-t border-[#E9DFCF] flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddCustomToCart}
              className="flex-1 py-3.5 px-6 bg-brand-primary hover:bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-[#C6A15B]" />
              Agregar a la Bolsa ({CURRENCY} {selectedProduct.precio.toFixed(2)})
            </button>

            <button
              onClick={() => setIsWhatsAppOpen(true)}
              className="py-3.5 px-6 bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/50 text-xs uppercase tracking-widest font-medium transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Consultar por WhatsApp
            </button>
          </div>
        </div>
      </div>

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        message={generateWhatsAppInquiry()}
        title="Consultar grabado por WhatsApp"
      />
    </div>
  );
};
