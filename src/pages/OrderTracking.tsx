import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { CURRENCY } from '../data/config';

export const OrderTracking: React.FC = () => {
  const [trackingCode, setTrackingCode] = useState('AUR-104285');
  const [searched, setSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Cabecera */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-semibold block">
          Estado de Despacho
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 font-light leading-tight">
          Seguimiento de Pedidos
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">
          Consulta en tiempo real la etapa en la que se encuentra tu joya desde nuestro taller hasta tu puerta.
        </p>
      </div>

      {/* Cartel técnico requerido por prompt */}
      <div className="p-4 bg-stone-100 border border-stone-300 text-stone-700 text-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#C6A15B] shrink-0" />
          <span>
            Arquitectura de seguimiento: <strong>PENDIENTE DE CONEXIÓN AL BACKEND</strong> (Módulo de consulta con API REST / Webhook de Courier).
          </span>
        </div>
        <span className="px-2 py-0.5 bg-stone-200 text-stone-600 font-mono text-[10px] uppercase font-bold shrink-0">
          Simulación
        </span>
      </div>

      {/* Formulario de Búsqueda */}
      <div className="bg-white p-6 sm:p-8 border border-[#E9DFCF] shadow-xs">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="Ingresa tu código de pedido (ej: AUR-104285)..."
              className="w-full pl-10 pr-4 py-3 bg-[#F8F5EF] border border-[#E9DFCF] text-xs font-mono uppercase text-stone-900 focus:outline-none focus:border-[#C6A15B]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          </div>
          <button
            type="submit"
            className="py-3 px-8 bg-brand-primary hover:bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-medium transition-colors shadow-sm"
          >
            Rastrear Pedido
          </button>
        </form>
      </div>

      {/* Resultado de Demostración */}
      {searched && (
        <div className="bg-white border border-[#E9DFCF] p-6 sm:p-8 shadow-xs space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-[#E9DFCF] pb-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-mono">Pedido identificado</span>
              <h2 className="font-serif text-2xl text-stone-900 font-medium font-mono">{trackingCode}</h2>
            </div>
            <div className="text-right sm:text-right">
              <span className="text-xs text-stone-500 block">Destino: Lima, Miraflores</span>
              <span className="text-xs text-emerald-700 font-medium">En ruta de entrega estimada hoy</span>
            </div>
          </div>

          {/* Línea de tiempo visual */}
          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E9DFCF]">
            {/* Paso 1 */}
            <div className="relative flex items-start gap-4">
              <div className="absolute -left-6 sm:-left-8 w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B]" />
              </div>
              <div>
                <h4 className="font-serif text-base text-stone-900 font-medium">Pedido Confirmado</h4>
                <p className="text-xs text-stone-500 mt-0.5">El pedido fue registrado y aprobado en sistema.</p>
                <span className="text-[10px] text-stone-400 font-mono mt-1 block">Ayer, 10:30 am</span>
              </div>
            </div>

            {/* Paso 2 */}
            <div className="relative flex items-start gap-4">
              <div className="absolute -left-6 sm:-left-8 w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs shadow-xs">
                <Package className="w-3.5 h-3.5 text-[#C6A15B]" />
              </div>
              <div>
                <h4 className="font-serif text-base text-stone-900 font-medium">Preparado en Taller & Embalaje de Lujo</h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  La joya fue pulida, inspeccionada y colocada en su estuche aterciopelado con precinto de seguridad.
                </p>
                <span className="text-[10px] text-stone-400 font-mono mt-1 block">Ayer, 04:15 pm</span>
              </div>
            </div>

            {/* Paso 3 (Activo) */}
            <div className="relative flex items-start gap-4">
              <div className="absolute -left-6 sm:-left-8 w-6 h-6 rounded-full bg-[#C6A15B] text-white flex items-center justify-center text-xs">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-base text-stone-900 font-medium">En Ruta de Entrega (Courier)</h4>
                  <span className="text-[10px] uppercase font-bold text-[#C6A15B] tracking-wider">Etapa Actual</span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  El mensajero se encuentra en camino a tu dirección con la guía de remisión asignada.
                </p>
                <span className="text-[10px] text-stone-400 font-mono mt-1 block">Hoy, 09:20 am</span>
              </div>
            </div>

            {/* Paso 4 (Pendiente) */}
            <div className="relative flex items-start gap-4 opacity-50">
              <div className="absolute -left-6 sm:-left-8 w-6 h-6 rounded-full bg-stone-200 text-stone-400 flex items-center justify-center text-xs">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="font-serif text-base text-stone-700 font-medium">Entregado en Destino</h4>
                <p className="text-xs text-stone-400 mt-0.5">Firma de recepción por el cliente o persona autorizada.</p>
                <span className="text-[10px] text-stone-400 font-mono mt-1 block">Estimado: Hoy antes de las 6:00 pm</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
