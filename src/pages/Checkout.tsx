import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CURRENCY, PERU_DEPARTMENTS, SHIPPING_CONFIG, STORE_NAME, getWhatsAppUrl } from '../data/config';
import { ActivePage } from '../types';
import { WhatsAppModal } from '../components/WhatsAppModal';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  CreditCard, 
  Smartphone, 
  Building2, 
  AlertCircle, 
  MessageCircle, 
  ArrowLeft,
  Calendar,
  Lock
} from 'lucide-react';

interface CheckoutProps {
  onNavigate: (page: ActivePage) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onNavigate }) => {
  const {
    items,
    subtotal,
    shippingCost,
    discountAmount,
    total,
    appliedCoupon,
    clearCart,
  } = useCart();

  // Formulario del cliente
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    departamento: 'Lima',
    provincia: 'Lima',
    distrito: 'Miraflores',
    direccion: '',
    referencia: '',
    tipoEntrega: 'domicilio' as 'domicilio' | 'recojo',
    fechaDeseada: '',
    horarioPreferido: 'Cualquier horario (9am - 7pm)',
    observaciones: '',
    metodoPago: 'yape' as 'yape' | 'plin' | 'transferencia' | 'tarjeta',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.nombres.trim()) errors.nombres = 'Ingresa tus nombres';
    if (!formData.apellidos.trim()) errors.apellidos = 'Ingresa tus apellidos';
    if (!formData.telefono.trim() || formData.telefono.replace(/\D/g, '').length < 9) {
      errors.telefono = 'Ingresa un teléfono válido de 9 dígitos';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = 'Ingresa un correo electrónico válido';
    }

    if (formData.tipoEntrega === 'domicilio') {
      if (!formData.direccion.trim()) errors.direccion = 'Ingresa tu dirección exacta';
      if (!formData.distrito.trim()) errors.distrito = 'Ingresa tu distrito';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const demoOrderId = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedOrderId(demoOrderId);
    setOrderCompleted(true);
    // Note: Do not clear cart immediately so user can still see summary or send to WhatsApp
  };

  const generateWhatsAppCheckoutMessage = () => {
    let msg = `*CONFIRMACIÓN DE PEDIDO WEB - #${generatedOrderId || 'NUEVO'}*\n\n`;
    msg += `*Cliente:* ${formData.nombres} ${formData.apellidos}\n`;
    msg += `*Teléfono:* ${formData.telefono}\n`;
    msg += `*Correo:* ${formData.email}\n\n`;
    msg += `*Tipo de entrega:* ${formData.tipoEntrega === 'domicilio' ? 'Envío a domicilio' : 'Recojo en Showroom Av. Panamericana'}\n`;
    if (formData.tipoEntrega === 'domicilio') {
      msg += `*Destino:* ${formData.departamento}, ${formData.provincia}, ${formData.distrito}\n`;
      msg += `*Dirección:* ${formData.direccion}\n`;
      if (formData.referencia) msg += `*Referencia:* ${formData.referencia}\n`;
    }
    if (formData.fechaDeseada) msg += `*Fecha deseada:* ${formData.fechaDeseada}\n`;
    msg += `*Horario preferido:* ${formData.horarioPreferido}\n`;
    msg += `*Método de pago simulado:* ${formData.metodoPago.toUpperCase()}\n\n`;

    msg += `*JOYAS SELECCIONADAS:*\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.product.nombre} (x${item.quantity}) - ${CURRENCY} ${(item.product.precio * item.quantity).toFixed(2)}\n`;
      if (item.talla) msg += `   Talla: ${item.talla}\n`;
      if (item.personalizacion?.texto) msg += `   Grabado: "${item.personalizacion.texto}"\n`;
    });

    msg += `\n*TOTAL A PAGAR:* ${CURRENCY} ${total.toFixed(2)}\n\n`;
    msg += `Hola, acabo de registrar este pedido de demostración. ¿Podrían confirmarme la recepción para coordinar el pago oficial?`;
    return msg;
  };

  if (items.length === 0 && !orderCompleted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl mb-4">No hay productos para procesar</h2>
        <button
          onClick={() => onNavigate('tienda')}
          className="py-3 px-6 bg-brand-primary hover:bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-medium transition-colors shadow-sm"
        >
          Volver a la tienda
        </button>
      </div>
    );
  }

  // PANTALLA DE PEDIDO FINALIZADO (DEMOSTRACIÓN)
  if (orderCompleted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white border border-[#C6A15B]/50 p-8 sm:p-12 shadow-md space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-[#C6A15B]" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-semibold block mb-1">
              Registro de Demostración Exitoso
            </span>
            <h1 className="font-serif text-3xl text-stone-900 font-normal">
              ¡Gracias por tu compra, {formData.nombres}!
            </h1>
            <p className="text-sm font-mono text-stone-600 mt-2">
              Número de Pedido Simulado: <strong className="text-stone-900">{generatedOrderId}</strong>
            </p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left space-y-2">
            <div className="flex gap-2 items-start">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">AVISO IMPORTANTE DE DEMOSTRACIÓN:</p>
                <p className="text-amber-800 leading-relaxed mt-0.5">
                  Esta tienda opera actualmente en modo demostración para previsualización comercial. No se ha realizado ningún cobro a tu tarjeta ni débito a tu cuenta. Para concretar tu compra real o consultar disponibilidad inmediata, pulsa el botón a continuación para enviar tu orden por WhatsApp:
                </p>
              </div>
            </div>
          </div>

          {/* Resumen de la Orden */}
          <div className="text-left bg-[#F8F5EF] p-5 border border-[#E9DFCF] space-y-3 text-xs">
            <h3 className="font-serif text-base text-stone-900 font-medium border-b border-[#E9DFCF] pb-2">
              Resumen de la orden
            </h3>
            <div className="space-y-1.5 text-stone-700">
              <p><strong>Destinatario:</strong> {formData.nombres} {formData.apellidos} ({formData.telefono})</p>
              <p><strong>Entrega:</strong> {formData.tipoEntrega === 'domicilio' ? `${formData.direccion}, ${formData.distrito}, ${formData.departamento}` : 'Recojo en Showroom (San Isidro)'}</p>
              <p><strong>Método de pago seleccionado:</strong> {formData.metodoPago.toUpperCase()} (Simulado)</p>
              <p><strong>Monto total:</strong> {CURRENCY} {total.toFixed(2)}</p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setIsWhatsAppOpen(true)}
              className="flex-1 py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Enviar comprobante por WhatsApp
            </button>

            <button
              onClick={() => {
                clearCart();
                onNavigate('tienda');
              }}
              className="py-3.5 px-6 bg-brand-primary hover:bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-medium transition-colors shadow-sm"
            >
              Seguir Explorando
            </button>
          </div>
        </div>

        <WhatsAppModal
          isOpen={isWhatsAppOpen}
          onClose={() => setIsWhatsAppOpen(false)}
          message={generateWhatsAppCheckoutMessage()}
          title="Confirmar orden por WhatsApp"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Cabecera */}
      <div className="border-b border-[#E9DFCF] pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-medium block mb-1">
            Proceso de Compra Seguro
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
            Finalizar Compra
          </h1>
        </div>

        <button
          onClick={() => onNavigate('carrito')}
          className="text-xs uppercase tracking-wider text-stone-600 hover:text-brand-primary flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver a la Bolsa
        </button>
      </div>

      <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Formulario de Datos (Izquierda) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Bloque 1: Datos Personales */}
          <div className="bg-white p-6 border border-[#E9DFCF] space-y-4">
            <h2 className="font-serif text-xl text-stone-900 font-medium flex items-center gap-2 border-b border-[#E9DFCF] pb-3">
              <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-xs flex items-center justify-center font-mono">1</span>
              Datos del Cliente
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Nombres:*
                </label>
                <input
                  type="text"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleInputChange}
                  placeholder="Ej: Luciana María"
                  className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F5EF] border ${
                    formErrors.nombres ? 'border-red-500' : 'border-[#E9DFCF]'
                  } focus:outline-none focus:border-[#C6A15B]`}
                />
                {formErrors.nombres && <span className="text-[10px] text-red-500">{formErrors.nombres}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Apellidos:*
                </label>
                <input
                  type="text"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  placeholder="Ej: Gómez Mendoza"
                  className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F5EF] border ${
                    formErrors.apellidos ? 'border-red-500' : 'border-[#E9DFCF]'
                  } focus:outline-none focus:border-[#C6A15B]`}
                />
                {formErrors.apellidos && <span className="text-[10px] text-red-500">{formErrors.apellidos}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Teléfono / WhatsApp (Perú):*
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="Ej: 987654321"
                  className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F5EF] border ${
                    formErrors.telefono ? 'border-red-500' : 'border-[#E9DFCF]'
                  } focus:outline-none focus:border-[#C6A15B]`}
                />
                {formErrors.telefono && <span className="text-[10px] text-red-500">{formErrors.telefono}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Correo Electrónico:*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ej: luciana@correo.pe"
                  className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F5EF] border ${
                    formErrors.email ? 'border-red-500' : 'border-[#E9DFCF]'
                  } focus:outline-none focus:border-[#C6A15B]`}
                />
                {formErrors.email && <span className="text-[10px] text-red-500">{formErrors.email}</span>}
              </div>
            </div>
          </div>

          {/* Bloque 2: Método y Dirección de Entrega */}
          <div className="bg-white p-6 border border-[#E9DFCF] space-y-4">
            <h2 className="font-serif text-xl text-stone-900 font-medium flex items-center gap-2 border-b border-[#E9DFCF] pb-3">
              <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-xs flex items-center justify-center font-mono">2</span>
              Método de Entrega en Perú
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-4 border cursor-pointer transition-all ${
                  formData.tipoEntrega === 'domicilio'
                    ? 'border-[#C6A15B] bg-[#F8F5EF]'
                    : 'border-[#E9DFCF] bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="tipoEntrega"
                    value="domicilio"
                    checked={formData.tipoEntrega === 'domicilio'}
                    onChange={() => setFormData((p) => ({ ...p, tipoEntrega: 'domicilio' }))}
                    className="accent-[#C6A15B]"
                  />
                  <div>
                    <span className="font-semibold text-xs text-stone-900 block">Envío a Domicilio</span>
                    <span className="text-[11px] text-stone-500">Lima y Provincias con Olva / Shalom</span>
                  </div>
                </div>
              </label>

              <label
                className={`p-4 border cursor-pointer transition-all ${
                  formData.tipoEntrega === 'recojo'
                    ? 'border-[#C6A15B] bg-[#F8F5EF]'
                    : 'border-[#E9DFCF] bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="tipoEntrega"
                    value="recojo"
                    checked={formData.tipoEntrega === 'recojo'}
                    onChange={() => setFormData((p) => ({ ...p, tipoEntrega: 'recojo' }))}
                    className="accent-[#C6A15B]"
                  />
                  <div>
                    <span className="font-semibold text-xs text-stone-900 block">Recojo en Showroom</span>
                    <span className="text-[11px] text-stone-500">Av. Panamericana (Gratis)</span>
                  </div>
                </div>
              </label>
            </div>

            {formData.tipoEntrega === 'domicilio' ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Departamento:*
                  </label>
                  <select
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 text-xs bg-[#F8F5EF] border border-[#E9DFCF] focus:outline-none focus:border-[#C6A15B]"
                  >
                    {PERU_DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Provincia:*
                  </label>
                  <input
                    type="text"
                    name="provincia"
                    value={formData.provincia}
                    onChange={handleInputChange}
                    placeholder="Ej: Lima"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F8F5EF] border border-[#E9DFCF] focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Distrito:*
                  </label>
                  <input
                    type="text"
                    name="distrito"
                    value={formData.distrito}
                    onChange={handleInputChange}
                    placeholder="Ej: Miraflores"
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F5EF] border ${
                      formErrors.distrito ? 'border-red-500' : 'border-[#E9DFCF]'
                    } focus:outline-none focus:border-[#C6A15B]`}
                  />
                  {formErrors.distrito && <span className="text-[10px] text-red-500">{formErrors.distrito}</span>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Dirección exacta (Calle, Av., Nro, Dpto):*
                  </label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    placeholder="Ej: Av. Larco 1234, Dpto 402"
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F5EF] border ${
                      formErrors.direccion ? 'border-red-500' : 'border-[#E9DFCF]'
                    } focus:outline-none focus:border-[#C6A15B]`}
                  />
                  {formErrors.direccion && <span className="text-[10px] text-red-500">{formErrors.direccion}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Referencia:
                  </label>
                  <input
                    type="text"
                    name="referencia"
                    value={formData.referencia}
                    onChange={handleInputChange}
                    placeholder="Ej: Frente al parque"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F8F5EF] border border-[#E9DFCF] focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              </div>
            ) : (
              <div className="p-4 bg-[#F8F5EF] border border-[#E9DFCF] text-xs text-stone-700 space-y-1">
                <span className="font-semibold block text-stone-900">Punto oficial de entrega en Lima:</span>
                <p>{SHIPPING_CONFIG.pickupAddress}</p>
                <p className="text-stone-500 text-[11px]">Horario: Lunes a Sábado de 10:00 am a 8:00 pm.</p>
              </div>
            )}

            {/* Fecha y Horario Preferido */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#E9DFCF]/60">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Fecha deseada de entrega (opcional):
                </label>
                <input
                  type="date"
                  name="fechaDeseada"
                  value={formData.fechaDeseada}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs bg-[#F8F5EF] border border-[#E9DFCF] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Horario preferido:
                </label>
                <select
                  name="horarioPreferido"
                  value={formData.horarioPreferido}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs bg-[#F8F5EF] border border-[#E9DFCF] focus:outline-none focus:border-[#C6A15B]"
                >
                  <option value="Cualquier horario (9am - 7pm)">Cualquier horario (9am - 7pm)</option>
                  <option value="Mañana (9am - 1pm)">Mañana (9am - 1pm)</option>
                  <option value="Tarde (2pm - 7pm)">Tarde (2pm - 7pm)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bloque 3: Métodos de Pago Simulados (Yape, Plin, Transferencia, Tarjeta) */}
          <div className="bg-white p-6 border border-[#E9DFCF] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E9DFCF] pb-3">
              <h2 className="font-serif text-xl text-stone-900 font-medium flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-xs flex items-center justify-center font-mono">3</span>
                Método de Pago de Demostración
              </h2>
              <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 border border-amber-200">
                Modo Simulado
              </span>
            </div>

            <p className="text-xs text-stone-500">
              Selecciona cómo deseas simular el pago. No se solicitarán claves secretas ni CVV:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'yape', name: 'Yape', icon: Smartphone, desc: 'Billetera móvil BCP' },
                { id: 'plin', name: 'Plin', icon: Smartphone, desc: 'Interbank, BBVA, Scotiabank' },
                { id: 'transferencia', name: 'Transferencia', icon: Building2, desc: 'BCP / BBVA / Interbank' },
                { id: 'tarjeta', name: 'Tarjeta (Simulada)', icon: CreditCard, desc: 'Visa / Mastercard' },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = formData.metodoPago === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setFormData((p) => ({ ...p, metodoPago: m.id as any }))}
                    className={`p-3.5 border cursor-pointer transition-all flex flex-col items-center text-center justify-between gap-2 ${
                      isSelected
                        ? 'border-[#C6A15B] bg-[#F8F5EF]'
                        : 'border-[#E9DFCF] bg-white hover:border-stone-400'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-[#C6A15B]' : 'text-stone-500'}`} />
                    <div>
                      <span className="font-semibold text-xs text-stone-900 block">{m.name}</span>
                      <span className="text-[10px] text-stone-400 leading-tight block">{m.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200 text-stone-600 text-xs">
              <strong>Nota de transparencia:</strong> Los pagos reales se integran mediante pasarelas certificadas o comprobante directo vía WhatsApp. No se realiza ningún cargo a tarjetas en este entorno.
            </div>
          </div>
        </div>

        {/* Resumen del Pedido (Derecha Sticky) */}
        <div className="lg:col-span-5 bg-white border border-[#E9DFCF] p-6 space-y-6 shadow-xs lg:sticky lg:top-28">
          <h2 className="font-serif text-xl text-stone-900 font-medium border-b border-[#E9DFCF] pb-3">
            Detalle del Pedido
          </h2>

          <div className="divide-y divide-[#E9DFCF] max-h-64 overflow-y-auto pr-1 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                <img
                  src={item.product.imagen}
                  alt={item.product.nombre}
                  className="w-14 h-14 object-cover border border-[#E9DFCF] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-medium text-stone-900 truncate">
                    {item.product.nombre}
                  </h4>
                  <div className="text-[11px] text-stone-500">
                    <span>Cant: {item.quantity}</span>
                    {item.talla && <span> · Talla: {item.talla}</span>}
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold text-stone-900">
                  {CURRENCY} {(item.product.precio * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs border-t border-[#E9DFCF] pt-4 text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-mono tabular-nums">{CURRENCY} {subtotal.toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-emerald-700">
                <span>Descuento ({appliedCoupon.code}):</span>
                <span className="font-mono tabular-nums">-{CURRENCY} {discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Costo de Envío:</span>
              <span className="font-mono tabular-nums">
                {shippingCost === 0 ? 'GRATIS' : `${CURRENCY} ${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-stone-900 border-t border-[#E9DFCF] pt-3">
              <span>Total a Pagar:</span>
              <span className="font-mono tabular-nums">{CURRENCY} {total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              className="w-full py-4 bg-brand-primary hover:bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Lock className="w-3.5 h-3.5 text-[#C6A15B]" />
              Completar Pedido (Simulado)
            </button>

            <button
              type="button"
              onClick={() => setIsWhatsAppOpen(true)}
              className="w-full py-3 bg-white border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Enviar Datos por WhatsApp
            </button>
          </div>
        </div>
      </form>

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        message={generateWhatsAppCheckoutMessage()}
        title="Enviar datos de compra por WhatsApp"
      />
    </div>
  );
};
