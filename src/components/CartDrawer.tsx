import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CURRENCY, SHIPPING_CONFIG, getWhatsAppUrl } from '../data/config';
import { ActivePage } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, MessageCircle } from 'lucide-react';
import { WhatsAppModal } from './WhatsAppModal';

interface CartDrawerProps {
  onNavigate: (page: ActivePage) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shippingCost,
    selectedShippingCity,
    setSelectedShippingCity,
    couponCode,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    total,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingRemainder = SHIPPING_CONFIG.freeShippingThreshold - subtotal;
  const isFreeShipping = subtotal >= SHIPPING_CONFIG.freeShippingThreshold;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setInputCoupon('');
    }
  };

  // WhatsApp order message summary
  const generateWhatsAppOrderText = () => {
    let msg = `*PEDIDO DESDE WEB - ${CURRENCY} ${total.toFixed(2)}*\n\n`;
    msg += `Hola, quisiera realizar el pedido de los siguientes productos en mi bolsa de compras:\n\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.product.nombre}*\n`;
      msg += `   - Cantidad: ${item.quantity}\n`;
      msg += `   - Precio unitario: ${CURRENCY} ${item.product.precio.toFixed(2)}\n`;
      if (item.talla) msg += `   - Talla: ${item.talla}\n`;
      if (item.longitud) msg += `   - Longitud: ${item.longitud}\n`;
      if (item.personalizacion?.texto) msg += `   - Grabado/Texto: "${item.personalizacion.texto}"\n`;
      msg += `\n`;
    });
    msg += `*Subtotal:* ${CURRENCY} ${subtotal.toFixed(2)}\n`;
    if (appliedCoupon) {
      msg += `*Descuento (${appliedCoupon.code}):* -${CURRENCY} ${discountAmount.toFixed(2)}\n`;
    }
    msg += `*Envío (${selectedShippingCity.toUpperCase()}):* ${shippingCost === 0 ? 'Gratis' : `${CURRENCY} ${shippingCost.toFixed(2)}`}\n`;
    msg += `*TOTAL ESTIMADO:* ${CURRENCY} ${total.toFixed(2)}\n\n`;
    msg += `¿Podrían confirmarme la disponibilidad y coordinar la entrega? Muchas gracias.`;
    return msg;
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
        onClick={() => setIsCartOpen(false)}
      >
        <div 
          className="bg-[#F8F5EF] w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#E9DFCF] animate-in slide-in-from-right duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del carrito */}
          <div className="p-5 border-b border-[#E9DFCF] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#C6A15B]" />
              <h2 className="font-serif text-xl tracking-wide font-medium text-[#171717]">
                Tu Bolsa de Compras
              </h2>
              <span className="text-xs text-stone-500 font-mono">
                ({items.length} {items.length === 1 ? 'pieza' : 'piezas'})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-stone-400 hover:text-[#171717] transition-colors"
              aria-label="Cerrar bolsa"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Barra de progreso de envío gratis */}
          <div className="bg-[#E9DFCF]/40 p-3 px-5 border-b border-[#E9DFCF] text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-2 text-emerald-800 font-medium">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>¡Felicidades! Calificas para <strong>Envío Gratis</strong> en tu pedido.</span>
              </div>
            ) : (
              <div>
                <p className="text-stone-700">
                  Agrega <strong>{CURRENCY} {freeShippingRemainder.toFixed(2)}</strong> más para obtener <strong>Envío Gratis</strong>.
                </p>
                <div className="w-full bg-stone-200 h-1.5 mt-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C6A15B] h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / SHIPPING_CONFIG.freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Lista de productos */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#E9DFCF]/60">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 text-stone-500">
                <div className="w-16 h-16 rounded-full bg-[#E9DFCF]/60 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-stone-800 mb-1">Tu bolsa está vacía</h3>
                  <p className="text-xs text-stone-500 max-w-xs">
                    Descubre nuestras colecciones de anillos, collares y piezas exclusivas.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('tienda');
                  }}
                  className="py-2.5 px-6 bg-brand-primary hover:bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-medium transition-colors shadow-sm"
                >
                  Explorar Tienda
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-start">
                  <img
                    src={item.product.imagen}
                    alt={item.product.nombre}
                    className="w-20 h-20 object-cover bg-white border border-[#E9DFCF] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-serif text-sm font-medium text-stone-900 truncate">
                        {item.product.nombre}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Variantes seleccionadas */}
                    <div className="text-[11px] text-stone-500 mt-0.5 space-y-0.5">
                      {item.talla && <div>Talla: <span className="font-mono text-stone-800 font-semibold">{item.talla}</span></div>}
                      {item.longitud && <div>Longitud: <span className="text-stone-800">{item.longitud}</span></div>}
                      {item.personalizacion?.texto && (
                        <div className="truncate">
                          Personalización: <span className="italic font-medium text-[#C6A15B]">"{item.personalizacion.texto}"</span>
                        </div>
                      )}
                    </div>

                    {/* Precios y stepper */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#E9DFCF] bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600 transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono tabular-nums text-stone-800 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-1 hover:bg-stone-100 text-stone-600 disabled:opacity-30 transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-stone-900 font-mono tabular-nums">
                        {CURRENCY} {(item.product.precio * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer del Drawer con totales y checkout */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E9DFCF] space-y-3 shadow-lg">
              {/* Cupón */}
              {!appliedCoupon ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Cupón (ej: LUJO10)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="w-full text-xs uppercase px-3 py-2 bg-[#F8F5EF] border border-[#E9DFCF] focus:outline-none focus:border-[#C6A15B]"
                    />
                    <Tag className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-stone-400" />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-stone-900 text-white text-xs font-medium tracking-wide hover:bg-[#C6A15B] transition-colors"
                  >
                    Aplicar
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-2 bg-[#C6A15B]/10 border border-[#C6A15B]/30 text-xs">
                  <span className="text-[#171717] font-medium">
                    Cupón <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discountPercent}%)
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-stone-900 text-[11px] underline"
                  >
                    Quitar
                  </button>
                </div>
              )}
              {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}

              {/* Selector de tipo de envío */}
              <div className="pt-2 border-t border-[#E9DFCF]/50">
                <div className="flex justify-between items-center text-xs text-stone-500 mb-1.5">
                  <span>Destino de envío:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedShippingCity('lima')}
                      className={`text-[11px] px-2 py-0.5 border ${
                        selectedShippingCity === 'lima'
                          ? 'border-brand-primary bg-brand-primary text-white font-medium'
                          : 'border-[#E9DFCF] text-stone-600'
                      }`}
                    >
                      Lima (S/ 10)
                    </button>
                    <button
                      onClick={() => setSelectedShippingCity('provincias')}
                      className={`text-[11px] px-2 py-0.5 border ${
                        selectedShippingCity === 'provincias'
                          ? 'border-brand-primary bg-brand-primary text-white font-medium'
                          : 'border-[#E9DFCF] text-stone-600'
                      }`}
                    >
                      Provincias (S/ 18)
                    </button>
                    <button
                      onClick={() => setSelectedShippingCity('recojo')}
                      className={`text-[11px] px-2 py-0.5 border ${
                        selectedShippingCity === 'recojo'
                          ? 'border-brand-primary bg-brand-primary text-white font-medium'
                          : 'border-[#E9DFCF] text-stone-600'
                      }`}
                    >
                      Recojo (Gratis)
                    </button>
                  </div>
                </div>
              </div>

              {/* Desglose de totales */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-[#E9DFCF]/60">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono tabular-nums">{CURRENCY} {subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Descuento aplicado:</span>
                    <span className="font-mono tabular-nums">-{CURRENCY} {discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Envío estimado:</span>
                  <span className="font-mono tabular-nums">
                    {shippingCost === 0 ? 'GRATIS' : `${CURRENCY} ${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-stone-900 pt-2 border-t border-[#E9DFCF]">
                  <span>Total estimado:</span>
                  <span className="font-mono tabular-nums">{CURRENCY} {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Acciones principales */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('checkout');
                  }}
                  className="w-full py-3 bg-brand-primary hover:bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  Finalizar Compra
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsWhatsAppModalOpen(true)}
                  className="w-full py-2.5 bg-white border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Pedir por WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        message={generateWhatsAppOrderText()}
        title="Enviar pedido por WhatsApp"
      />
    </>
  );
};
