import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CURRENCY, SHIPPING_CONFIG } from '../data/config';
import { ActivePage } from '../types';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ArrowLeft, Tag, Check, MessageCircle } from 'lucide-react';
import { WhatsAppModal } from '../components/WhatsAppModal';

interface CartPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    shippingCost,
    selectedShippingCity,
    setSelectedShippingCity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    total,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const freeShippingRemainder = SHIPPING_CONFIG.freeShippingThreshold - subtotal;
  const isFreeShipping = subtotal >= SHIPPING_CONFIG.freeShippingThreshold;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const generateWhatsAppOrderText = () => {
    let msg = `*PEDIDO DESDE BOLSA DE COMPRAS - ${CURRENCY} ${total.toFixed(2)}*\n\n`;
    msg += `Hola, deseo concretar la compra de los siguientes productos:\n\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.product.nombre}*\n`;
      msg += `   - Cantidad: ${item.quantity}\n`;
      msg += `   - Precio unitario: ${CURRENCY} ${item.product.precio.toFixed(2)}\n`;
      if (item.talla) msg += `   - Talla: ${item.talla}\n`;
      if (item.longitud) msg += `   - Longitud: ${item.longitud}\n`;
      if (item.personalizacion?.texto) msg += `   - Grabado: "${item.personalizacion.texto}"\n`;
      msg += `\n`;
    });
    msg += `*Subtotal:* ${CURRENCY} ${subtotal.toFixed(2)}\n`;
    if (appliedCoupon) {
      msg += `*Descuento (${appliedCoupon.code}):* -${CURRENCY} ${discountAmount.toFixed(2)}\n`;
    }
    msg += `*Envío (${selectedShippingCity.toUpperCase()}):* ${shippingCost === 0 ? 'Gratis' : `${CURRENCY} ${shippingCost.toFixed(2)}`}\n`;
    msg += `*TOTAL A PAGAR:* ${CURRENCY} ${total.toFixed(2)}\n\n`;
    msg += `¿Podrían ayudarme a coordinar los datos de entrega y el método de pago?`;
    return msg;
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto bg-white border border-[#E9DFCF] p-10 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F8F5EF] flex items-center justify-center text-stone-400 mx-auto">
            <ShoppingBag className="w-8 h-8 text-[#C6A15B]" />
          </div>
          <h1 className="font-serif text-2xl text-stone-900 font-normal">Tu bolsa de compras está vacía</h1>
          <p className="text-xs text-stone-500 leading-relaxed">
            Parece que aún no has agregado joyas a tu bolsa. Explora nuestra selección de anillos, collares y aretes exclusivos.
          </p>
          <button
            onClick={() => onNavigate('tienda')}
            className="py-3 px-8 bg-brand-primary hover:bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-medium transition-colors shadow-sm"
          >
            Ir al Catálogo de Joyas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Cabecera */}
      <div className="border-b border-[#E9DFCF] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-medium block mb-1">
            Revisión de Pedido
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
            Bolsa de Compras
          </h1>
        </div>

        <button
          onClick={() => onNavigate('tienda')}
          className="text-xs uppercase tracking-wider text-stone-600 hover:text-[#C6A15B] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Continuar Comprando
        </button>
      </div>

      {/* Barra de progreso de envío gratis */}
      <div className="p-4 bg-white border border-[#E9DFCF] text-xs">
        {isFreeShipping ? (
          <div className="flex items-center gap-2 text-emerald-800 font-medium">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>¡Tu pedido califica para <strong>Envío Gratis</strong> en todo el Perú!</span>
          </div>
        ) : (
          <div>
            <p className="text-stone-700">
              Agrega <strong>{CURRENCY} {freeShippingRemainder.toFixed(2)}</strong> más para disfrutar de <strong>Envío Gratis</strong> (compras mayores a S/ 150).
            </p>
            <div className="w-full bg-stone-100 h-2 mt-2 rounded-full overflow-hidden">
              <div
                className="bg-[#C6A15B] h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotal / SHIPPING_CONFIG.freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Grid: Lista de Productos y Resumen de Totales */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Lista de Joyas */}
        <div className="lg:col-span-8 bg-white border border-[#E9DFCF] divide-y divide-[#E9DFCF]">
          <div className="p-4 bg-[#F8F5EF] hidden sm:grid grid-cols-12 text-[11px] font-semibold uppercase tracking-wider text-stone-600">
            <span className="col-span-6">Joya</span>
            <span className="col-span-2 text-center">Precio</span>
            <span className="col-span-2 text-center">Cantidad</span>
            <span className="col-span-2 text-right">Subtotal</span>
          </div>

          {items.map((item) => (
            <div key={item.id} className="p-5 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center">
              {/* Joya y Variantes */}
              <div className="sm:col-span-6 flex gap-4 items-center w-full">
                <img
                  src={item.product.imagen}
                  alt={item.product.nombre}
                  className="w-20 h-20 object-cover bg-white border border-[#E9DFCF] shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-base text-stone-900 font-medium">{item.product.nombre}</h3>
                  <p className="text-[11px] text-stone-500 mt-0.5">{item.product.material}</p>
                  
                  {item.talla && (
                    <span className="inline-block text-[11px] text-stone-600 mt-1">
                      Talla: <strong className="font-mono">{item.talla}</strong>
                    </span>
                  )}
                  {item.longitud && (
                    <span className="inline-block text-[11px] text-stone-600 mt-1">
                      Longitud: <strong>{item.longitud}</strong>
                    </span>
                  )}
                  {item.personalizacion?.texto && (
                    <div className="text-[11px] text-[#C6A15B] italic mt-1 truncate">
                      Grabado: "{item.personalizacion.texto}"
                    </div>
                  )}

                  <button
                    onClick={() => removeItem(item.id)}
                    className="sm:hidden text-stone-400 hover:text-red-500 text-xs flex items-center gap-1 mt-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Quitar
                  </button>
                </div>
              </div>

              {/* Precio unitario */}
              <div className="sm:col-span-2 text-center text-xs font-mono tabular-nums text-stone-700">
                <span className="sm:hidden text-stone-400 mr-1">Precio:</span>
                {CURRENCY} {item.product.precio.toFixed(2)}
              </div>

              {/* Cantidad Stepper */}
              <div className="sm:col-span-2 flex justify-center items-center">
                <div className="flex items-center border border-[#E9DFCF] bg-[#F8F5EF]">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 hover:bg-white text-stone-600 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono tabular-nums font-semibold text-stone-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.product.stock}
                    className="p-1.5 hover:bg-white text-stone-600 disabled:opacity-30 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Total línea y botón eliminar desktop */}
              <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                <span className="text-sm font-semibold font-mono tabular-nums text-stone-900">
                  {CURRENCY} {(item.product.precio * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="hidden sm:block text-stone-400 hover:text-red-500 p-1"
                  title="Eliminar de la bolsa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="p-4 bg-[#F8F5EF] flex justify-between items-center text-xs text-stone-500">
            <button
              onClick={clearCart}
              className="text-stone-500 hover:text-red-600 underline"
            >
              Vaciar bolsa
            </button>
            <span>{items.length} productos en la bolsa</span>
          </div>
        </div>

        {/* Resumen de Compra */}
        <div className="lg:col-span-4 bg-white border border-[#E9DFCF] p-6 space-y-6 shadow-xs">
          <h2 className="font-serif text-xl text-stone-900 font-medium border-b border-[#E9DFCF] pb-3">
            Resumen de Compra
          </h2>

          {/* Cupones */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1.5">
              Cupón de Descuento (Demo):
            </label>
            {!appliedCoupon ? (
              <form onSubmit={handleApply} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ej: LUJO10"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 uppercase px-3 py-2 text-xs bg-[#F8F5EF] border border-[#E9DFCF] focus:outline-none focus:border-[#C6A15B]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 text-white text-xs uppercase font-medium hover:bg-[#C6A15B] transition-colors"
                >
                  Aplicar
                </button>
              </form>
            ) : (
              <div className="p-2.5 bg-[#C6A15B]/15 border border-[#C6A15B]/40 text-xs flex justify-between items-center">
                <span>Cupón <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discountPercent}%)</span>
                <button onClick={removeCoupon} className="text-stone-500 hover:text-stone-900 underline text-[11px]">
                  Quitar
                </button>
              </div>
            )}
            {couponError && <p className="text-[11px] text-red-500 mt-1">{couponError}</p>}
          </div>

          {/* Destino de Envío */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-700 font-medium mb-1.5">
              Calcular Envío en Perú:
            </label>
            <div className="space-y-1.5 text-xs">
              <label className="flex items-center justify-between p-2.5 border border-[#E9DFCF] cursor-pointer hover:bg-[#F8F5EF]">
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    checked={selectedShippingCity === 'lima'}
                    onChange={() => setSelectedShippingCity('lima')}
                    className="accent-[#C6A15B]"
                  />
                  <span>Lima Metropolitana</span>
                </span>
                <span className="font-mono">{subtotal >= 150 ? 'Gratis' : `S/ ${SHIPPING_CONFIG.limaCost.toFixed(2)}`}</span>
              </label>

              <label className="flex items-center justify-between p-2.5 border border-[#E9DFCF] cursor-pointer hover:bg-[#F8F5EF]">
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    checked={selectedShippingCity === 'provincias'}
                    onChange={() => setSelectedShippingCity('provincias')}
                    className="accent-[#C6A15B]"
                  />
                  <span>Provincias (Todo el Perú)</span>
                </span>
                <span className="font-mono">{subtotal >= 150 ? 'Gratis' : `S/ ${SHIPPING_CONFIG.provinciasCost.toFixed(2)}`}</span>
              </label>

              <label className="flex items-center justify-between p-2.5 border border-[#E9DFCF] cursor-pointer hover:bg-[#F8F5EF]">
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    checked={selectedShippingCity === 'recojo'}
                    onChange={() => setSelectedShippingCity('recojo')}
                    className="accent-[#C6A15B]"
                  />
                  <span>Recojo en Showroom (Av. Panamericana)</span>
                </span>
                <span className="font-mono text-emerald-700 font-semibold">Gratis</span>
              </label>
            </div>
          </div>

          {/* Desglose Numérico */}
          <div className="space-y-2 text-xs border-t border-[#E9DFCF] pt-4 text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-mono tabular-nums">{CURRENCY} {subtotal.toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Descuento aplicado:</span>
                <span className="font-mono tabular-nums">-{CURRENCY} {discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Envío:</span>
              <span className="font-mono tabular-nums">
                {shippingCost === 0 ? 'GRATIS' : `${CURRENCY} ${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-stone-900 border-t border-[#E9DFCF] pt-3">
              <span>Total a Pagar:</span>
              <span className="font-mono tabular-nums">{CURRENCY} {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Botones de Finalización */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => onNavigate('checkout')}
              className="w-full py-3.5 bg-brand-primary hover:bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              Proceder al Checkout
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsWhatsAppOpen(true)}
              className="w-full py-3 bg-white border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Realizar Pedido por WhatsApp
            </button>
          </div>
        </div>
      </div>

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        message={generateWhatsAppOrderText()}
        title="Enviar pedido por WhatsApp"
      />
    </div>
  );
};
