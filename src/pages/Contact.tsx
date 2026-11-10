import React, { useState } from 'react';
import { STORE_NAME, STORE_CONTACT, getWhatsAppUrl } from '../data/config';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, ChevronDown, ChevronUp, Instagram, Facebook, Sparkles } from 'lucide-react';
import { WhatsAppModal } from '../components/WhatsAppModal';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    asunto: 'Consulta general de joyas',
    mensaje: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!formData.nombre.trim()) err.nombre = 'Ingresa tu nombre';
    if (!formData.email.trim() || !formData.email.includes('@')) err.email = 'Ingresa un correo válido';
    if (!formData.mensaje.trim()) err.mensaje = 'Escribe tu mensaje o consulta';

    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const generateWhatsAppContactMessage = () => {
    return `Hola ${STORE_NAME}, me contacto desde su sitio web:\n\nNombre: ${formData.nombre || '(Cliente)'}\nAsunto: ${formData.asunto}\nMensaje: ${formData.mensaje || 'Quisiera recibir asesoría personalizada sobre sus joyas.'}\n\n¿Podrían atender mi consulta? Muchas gracias.`;
  };

  const faqs = [
    {
      q: '¿Qué materiales utilizan en sus joyas?',
      a: 'Nuestras piezas son elaboradas principalmente en acero quirúrgico inoxidable 316L de grado médico hipoalergénico con baños dorados de alta fijación, plata con acabado rodio, circonias cúbicas facetadas calidad AAA y perlas seleccionadas. Cada producto especifica su ficha técnica detallada.'
    },
    {
      q: '¿Cómo puedo saber la talla de mi anillo?',
      a: 'Contamos con una Guía de Tallas interactiva donde puedes consultar el diámetro en milímetros y la equivalencia estadounidense (US 5 al 10) que utilizamos en Perú. También te brindamos el método paso a paso con una tira de papel.'
    },
    {
      q: '¿Cuáles son los tiempos y costos de entrega en Perú?',
      a: 'Para Lima Metropolitana el costo es de S/ 10.00 (entrega en 24 a 48 horas hábiles). Para Provincias es de S/ 18.00 (entrega en 2 a 5 días hábiles vía Olva Courier o Shalom). Si tu compra supera los S/ 150.00, el envío es completamente gratuito.'
    },
    {
      q: '¿Puedo personalizar una joya con nombres o fechas?',
      a: '¡Sí! En nuestra sección de Joyas Personalizadas puedes elegir medallas, collares, anillos sello y pulseras para grabar nombres, iniciales o fechas especiales mediante grabado láser de alta precisión.'
    },
    {
      q: '¿Las joyas vienen con estuche de regalo?',
      a: 'Todas las piezas se entregan debidamente protegidas en un estuche acolchado y bolsa especial de la boutique, listas para obsequiar.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Cabecera */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-semibold block">
          Atención al Cliente
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 font-light leading-tight">
          Contacto & Asesoría
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">
          ¿Tienes dudas sobre una joya, tu talla ideal o un grabado personalizado? Estamos aquí para brindarte una atención cercana y personalizada.
        </p>
      </div>

      {/* Grid: Formulario y Canales */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Canales de Contacto Directo */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#E9DFCF] space-y-6 shadow-xs">
          <h2 className="font-serif text-2xl text-stone-900 font-normal border-b border-[#E9DFCF] pb-3">
            Canales Oficiales
          </h2>

          <div className="space-y-4 text-xs text-stone-600">
            <div className="flex gap-3 items-start">
              <MapPin className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900">Ubicación & Punto de Recojo:</strong>
                <span className="text-stone-700 font-medium">{STORE_CONTACT.address}</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <Phone className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900">Celular de Atención:</strong>
                <a href={`tel:${STORE_CONTACT.phoneRaw}`} className="text-stone-900 font-mono font-bold hover:text-[#C6A15B] transition-colors">
                  {STORE_CONTACT.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900">WhatsApp Oficial:</strong>
                <a
                  href={STORE_CONTACT.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-900 font-mono font-bold hover:text-[#25D366] transition-colors"
                >
                  {STORE_CONTACT.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <Clock className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900">Horario de Atención:</strong>
                <span>{STORE_CONTACT.hours}</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <Mail className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900">Correo Electrónico:</strong>
                <span>{STORE_CONTACT.email}</span>
              </div>
            </div>
          </div>

          {/* Bloque de Redes Sociales con Conexión Directa */}
          <div className="pt-4 border-t border-[#E9DFCF] space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#C6A15B] font-semibold block">
              Conéctate a Nuestras Redes Sociales:
            </span>

            {/* WhatsApp Directo */}
            <a
              href={STORE_CONTACT.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-between shadow-xs hover:scale-[1.01]"
            >
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chatear por WhatsApp</span>
              </div>
              <span className="font-mono text-xs font-bold bg-white/20 px-2 py-0.5 rounded">
                953 323 578
              </span>
            </a>

            {/* Facebook Oficial */}
            <a
              href={STORE_CONTACT.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-between shadow-xs hover:scale-[1.01]"
            >
              <div className="flex items-center gap-2.5">
                <Facebook className="w-4 h-4 fill-white" />
                <span>Página de Facebook</span>
              </div>
              <span className="text-[10px] tracking-wider uppercase font-medium opacity-90">
                Seguir
              </span>
            </a>

            {/* Instagram Oficial */}
            <a
              href={STORE_CONTACT.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-between shadow-xs hover:scale-[1.01]"
            >
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4" />
                <span>Perfil de Instagram</span>
              </div>
              <span className="text-[10px] tracking-wider uppercase font-medium opacity-90">
                @aurelia.joyas
              </span>
            </a>

            <span className="block text-[11px] text-stone-400 text-center pt-1">
              Atendemos tus consultas de lunes a sábado de 10:00 am a 8:00 pm.
            </span>
          </div>
        </div>

        {/* Formulario de Mensaje */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#E9DFCF] shadow-xs">
          <h2 className="font-serif text-2xl text-stone-900 font-normal border-b border-[#E9DFCF] pb-3 mb-6">
            Envíanos un mensaje
          </h2>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Tu Nombre:*
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej: Luciana Gómez"
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F5EF] border ${
                      errors.nombre ? 'border-red-500' : 'border-[#E9DFCF]'
                    } focus:outline-none focus:border-[#C6A15B]`}
                  />
                  {errors.nombre && <span className="text-[10px] text-red-500">{errors.nombre}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Teléfono / WhatsApp:
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    placeholder="Ej: 987654321"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F8F5EF] border border-[#E9DFCF] focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Correo Electrónico:*
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Ej: luciana@correo.pe"
                  className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F5EF] border ${
                    errors.email ? 'border-red-500' : 'border-[#E9DFCF]'
                  } focus:outline-none focus:border-[#C6A15B]`}
                />
                {errors.email && <span className="text-[10px] text-red-500">{errors.email}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Motivo de Consulta:
                </label>
                <select
                  value={formData.asunto}
                  onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs bg-[#F8F5EF] border border-[#E9DFCF] focus:outline-none focus:border-[#C6A15B]"
                >
                  <option value="Consulta general de joyas">Consulta general de joyas</option>
                  <option value="Asesoría de tallas de anillos">Asesoría de tallas de anillos</option>
                  <option value="Cotización de joya personalizada">Cotización de joya personalizada</option>
                  <option value="Estado de un pedido">Estado de un pedido</option>
                  <option value="Cambio o garantía">Cambio o garantía</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Tu Mensaje:*
                </label>
                <textarea
                  rows={4}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  placeholder="Escribe aquí tu consulta o los detalles de la joya de tu interés..."
                  className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F5EF] border ${
                    errors.mensaje ? 'border-red-500' : 'border-[#E9DFCF]'
                  } focus:outline-none focus:border-[#C6A15B]`}
                />
                {errors.mensaje && <span className="text-[10px] text-red-500">{errors.mensaje}</span>}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-primary hover:bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Enviar Mensaje
              </button>

              <p className="text-[10px] text-stone-400 text-center">
                Envío de demostración. Puedes también enviar tu consulta instantáneamente por WhatsApp.
              </p>
            </form>
          ) : (
            <div className="p-8 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#C6A15B] mx-auto" />
              <h3 className="font-serif text-2xl text-stone-900">¡Mensaje recibido!</h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                Gracias {formData.nombre}, hemos recibido tu consulta. En un entorno de producción, este formulario notifica a nuestro equipo en tiempo real.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setIsWhatsAppOpen(true)}
                  className="py-2.5 px-4 bg-[#25D366] text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Continuar por WhatsApp
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="py-2.5 px-4 bg-stone-100 text-stone-700 text-xs uppercase tracking-wider"
                >
                  Enviar otro mensaje
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preguntas Frecuentes (FAQ Accordion) */}
      <div className="bg-white p-6 sm:p-10 border border-[#E9DFCF] max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-semibold block mb-1">
            Respuestas Rápidas
          </span>
          <h2 className="font-serif text-3xl text-stone-900 font-normal">
            Preguntas Frecuentes
          </h2>
        </div>

        <div className="divide-y divide-[#E9DFCF]">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center text-left text-sm font-serif font-medium text-stone-900 hover:text-[#C6A15B] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#C6A15B]" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>
                {isOpen && (
                  <p className="text-xs text-stone-600 leading-relaxed mt-2 pt-1 font-light animate-in fade-in duration-200">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        message={generateWhatsAppContactMessage()}
        title="Enviar consulta por WhatsApp"
      />
    </div>
  );
};
