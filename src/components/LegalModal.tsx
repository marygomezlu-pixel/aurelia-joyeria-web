import React from 'react';
import { X, ShieldCheck, Truck, RefreshCw, FileText } from 'lucide-react';
import { STORE_NAME, SHIPPING_CONFIG, CURRENCY } from '../data/config';

interface LegalModalProps {
  topic: 'privacidad' | 'terminos' | 'envios' | 'cambios' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ topic, onClose }) => {
  if (!topic) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#F8F5EF] border border-[#E9DFCF] w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative text-[#171717]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-500 hover:text-[#171717] p-1 transition-colors"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {topic === 'privacidad' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-[#C6A15B]" />
              <h3 className="font-serif text-2xl font-medium">Política de Privacidad</h3>
            </div>
            <div className="text-xs text-stone-600 space-y-3 leading-relaxed">
              <p>
                En <strong>{STORE_NAME}</strong> respetamos profundamente la confidencialidad de nuestros clientes en todo el territorio peruano. Esta política describe cómo se tratan los datos que nos proporcionas:
              </p>
              <h4 className="font-semibold text-stone-900 text-sm pt-1">1. Información recopilada</h4>
              <p>
                Los datos solicitados en los formularios de consulta, personalización y checkout (nombres, teléfono, correo electrónico y dirección de entrega) son utilizados exclusivamente para la coordinación, confirmación y despacho de tus pedidos.
              </p>
              <h4 className="font-semibold text-stone-900 text-sm pt-1">2. Seguridad de pagos</h4>
              <p>
                {STORE_NAME} nunca solicita ni almacena números completos de tarjetas de crédito ni códigos CVV en servidores propios. Los pagos se coordinan mediante canales autorizados (Yape, Plin, transferencias bancarias directas BCP/BBVA o pasarelas oficiales de pago con cifrado TLS/SSL).
              </p>
              <h4 className="font-semibold text-stone-900 text-sm pt-1">3. Comunicaciones comerciales</h4>
              <p>
                Solo te contactaremos por WhatsApp o correo electrónico para brindarte información sobre el estado de tu compra o si te suscribiste explícitamente a nuestro boletín de novedades.
              </p>
            </div>
          </div>
        )}

        {topic === 'terminos' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-[#C6A15B]" />
              <h3 className="font-serif text-2xl font-medium">Términos y Condiciones</h3>
            </div>
            <div className="text-xs text-stone-600 space-y-3 leading-relaxed">
              <p>
                Al navegar y realizar compras en el catálogo de <strong>{STORE_NAME}</strong>, aceptas las siguientes condiciones comerciales:
              </p>
              <h4 className="font-semibold text-stone-900 text-sm pt-1">1. Precios y disponibilidad</h4>
              <p>
                Todos los precios están expresados en Soles peruanos ({CURRENCY}). Las existencias mostradas corresponden a nuestro inventario de catálogo y son confirmadas de forma definitiva al coordinar el pedido.
              </p>
              <h4 className="font-semibold text-stone-900 text-sm pt-1">2. Especificaciones de materiales</h4>
              <p>
                Cada producto cuenta con su ficha técnica que detalla el material declarado (acero quirúrgico inoxidable, baños en oro de diferentes tonalidades, circonias cúbicas y perlas seleccionadas). Recomendamos seguir las indicaciones de la Guía de Cuidados para prolongar su brillo.
              </p>
              <h4 className="font-semibold text-stone-900 text-sm pt-1">3. Joyas personalizadas</h4>
              <p>
                Las piezas grabadas con nombres, fechas o iniciales se inician una vez validada la solicitud. Debido a su naturaleza individual, no admiten cancelaciones una vez comenzado el proceso de grabado en taller.
              </p>
            </div>
          </div>
        )}

        {topic === 'envios' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-6 h-6 text-[#C6A15B]" />
              <h3 className="font-serif text-2xl font-medium">Política de Envíos en Perú</h3>
            </div>
            <div className="text-xs text-stone-600 space-y-3 leading-relaxed">
              <p>
                Hacemos entregas a nivel nacional con empaque de protección exclusivo para joyería:
              </p>
              <div className="bg-white p-4 border border-[#E9DFCF] space-y-2">
                <div className="flex justify-between font-medium text-stone-800">
                  <span>Lima Metropolitana:</span>
                  <span className="font-mono">{CURRENCY} {SHIPPING_CONFIG.limaCost.toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-stone-500">Tiempo de entrega habitual: 24 a 48 horas hábiles.</p>
                <div className="flex justify-between font-medium text-stone-800 pt-2 border-t border-stone-100">
                  <span>Provincias (Todo el Perú):</span>
                  <span className="font-mono">{CURRENCY} {SHIPPING_CONFIG.provinciasCost.toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-stone-500">Tiempo de entrega habitual: 2 a 5 días hábiles vía Olva Courier o Shalom.</p>
                <div className="pt-2 border-t border-stone-100 text-emerald-700 font-semibold">
                  <span>¡Envío Gratis en compras mayores a {CURRENCY} {SHIPPING_CONFIG.freeShippingThreshold.toFixed(2)}!</span>
                </div>
              </div>
              <h4 className="font-semibold text-stone-900 text-sm pt-2">Recojo en tienda</h4>
              <p>
                Disponible previa confirmación en nuestro showroom de {SHIPPING_CONFIG.pickupAddress}.
              </p>
            </div>
          </div>
        )}

        {topic === 'cambios' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="w-6 h-6 text-[#C6A15B]" />
              <h3 className="font-serif text-2xl font-medium">Cambios y Devoluciones</h3>
            </div>
            <div className="text-xs text-stone-600 space-y-3 leading-relaxed">
              <p>
                Tu satisfacción es nuestra máxima prioridad. Contamos con un protocolo claro y transparente:
              </p>
              <h4 className="font-semibold text-stone-900 text-sm pt-1">1. Plazo para solicitud</h4>
              <p>
                Puedes solicitar un cambio de talla o modelo dentro de los <strong>7 días calendario</strong> posteriores a la recepción de tu joya.
              </p>
              <h4 className="font-semibold text-stone-900 text-sm pt-1">2. Condiciones de la joya</h4>
              <p>
                La pieza debe encontrarse sin señales de uso, con su estuche original, protectores y empaque intacto.
              </p>
              <h4 className="font-semibold text-stone-900 text-sm pt-1">3. Excepciones de higiene y personalización</h4>
              <p>
                Por razones higiénicas y sanitarias, los aretes de uso directo en perforaciones no admiten cambio salvo defecto de fábrica manifiesto. Asimismo, las joyas con grabado personalizado no son elegibles para cambio por ser piezas únicas hechas a medida.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#E9DFCF] flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 bg-brand-primary hover:bg-[#C6A15B] text-white text-xs uppercase tracking-wider transition-colors shadow-xs"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
