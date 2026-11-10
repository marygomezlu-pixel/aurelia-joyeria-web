import React, { useState } from 'react';
import { Ruler, Check, HelpCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { RING_SIZES } from '../components/RingSizeModal';
import { ActivePage } from '../types';

interface RingSizeGuidePageProps {
  onNavigate: (page: ActivePage, category?: string) => void;
}

export const RingSizeGuidePage: React.FC<RingSizeGuidePageProps> = ({ onNavigate }) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(7);

  const selectedData = RING_SIZES.find((r) => r.size === selectedSize);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Cabecera */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-semibold block">
          Precisión en tu Joya
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 font-light leading-tight">
          Guía de Tallas de Anillos
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">
          Encuentra tu talla exacta según el sistema de medidas utilizado en Perú (escala numérica estándar estadounidense US).
        </p>
      </div>

      {/* Selector Interactivo de Talla */}
      <div className="bg-white p-6 sm:p-8 border border-[#E9DFCF] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E9DFCF] pb-4">
          <div>
            <h2 className="font-serif text-xl text-stone-900 font-medium">Tabla de Equivalencias</h2>
            <p className="text-xs text-stone-500">Haz clic en cualquier talla para ver su escala a escala milimétrica</p>
          </div>
          {selectedData && (
            <div className="bg-[#F8F5EF] px-4 py-2 border border-[#C6A15B]/40 text-xs">
              <span className="text-stone-500">Talla seleccionada: </span>
              <strong className="text-stone-900 font-mono text-sm">{selectedData.size}</strong>
              <span className="text-stone-500 font-mono"> ({selectedData.diameterMm} mm de diámetro)</span>
            </div>
          )}
        </div>

        {/* Tabla completa */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#C6A15B]/40 bg-[#F8F5EF] text-stone-700">
                <th className="py-3 px-4 font-semibold uppercase tracking-wider">Talla (US / PE)</th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider">Diámetro Interior</th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider">Circunferencia del Dedo</th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider">Ajuste habitual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9DFCF]">
              {RING_SIZES.map((row) => (
                <tr
                  key={row.size}
                  onClick={() => setSelectedSize(row.size)}
                  className={`cursor-pointer transition-colors ${
                    selectedSize === row.size
                      ? 'bg-[#C6A15B]/15 font-medium'
                      : 'hover:bg-[#F8F5EF]/60'
                  }`}
                >
                  <td className="py-3 px-4 font-mono font-bold text-sm text-stone-900">
                    Talla {row.size}
                  </td>
                  <td className="py-3 px-4 font-mono tabular-nums text-stone-700">
                    {row.diameterMm.toFixed(1)} mm
                  </td>
                  <td className="py-3 px-4 font-mono tabular-nums text-stone-700">
                    {row.circumferenceMm.toFixed(1)} mm
                  </td>
                  <td className="py-3 px-4 text-stone-500">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => onNavigate('tienda', 'Anillos')}
            className="py-2.5 px-6 bg-brand-primary hover:bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 shadow-sm"
          >
            Ver Anillos Disponibles
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2 Métodos de Medición en Casa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Método 1: Medir un anillo que ya tengas */}
        <div className="bg-white p-6 sm:p-8 border border-[#E9DFCF] space-y-4">
          <div className="flex items-center gap-2.5 text-[#C6A15B]">
            <Ruler className="w-5 h-5" />
            <h3 className="font-serif text-xl text-stone-900 font-medium">Método 1: Anillo existente</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Si ya tienes un anillo que te quede cómodo en el dedo donde llevarás tu nueva joya:
          </p>
          <ol className="text-xs text-stone-600 space-y-2 list-decimal list-inside leading-relaxed">
            <li>Coloca el anillo sobre una regla milimetrada plana.</li>
            <li>Mide la distancia interna de borde a borde (no incluyas el grosor del metal).</li>
            <li>Busca los milímetros resultantes en la columna "Diámetro Interior" de nuestra tabla.</li>
          </ol>
        </div>

        {/* Método 2: Tira de papel o hilo */}
        <div className="bg-white p-6 sm:p-8 border border-[#E9DFCF] space-y-4">
          <div className="flex items-center gap-2.5 text-[#C6A15B]">
            <HelpCircle className="w-5 h-5" />
            <h3 className="font-serif text-xl text-stone-900 font-medium">Método 2: Tira de papel</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Si no dispones de un anillo como referencia:
          </p>
          <ol className="text-xs text-stone-600 space-y-2 list-decimal list-inside leading-relaxed">
            <li>Corta una tira de papel de 1 cm de ancho y unos 10 cm de largo.</li>
            <li>Rodea la base de tu dedo sin apretar excesivamente.</li>
            <li>Marca con un lápiz el punto de unión exacto.</li>
            <li>Mide el papel estirado con tu regla y busca la "Circunferencia" en la tabla.</li>
          </ol>
        </div>
      </div>

      {/* Nota de advertencia comercial */}
      <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs flex gap-3 items-start">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block">Consejo de compra segura:</strong>
          <p className="text-amber-800 leading-relaxed">
            Los dedos pueden hincharse levemente con el calor del mediodía o tras actividad física. Te aconsejamos medirte en reposo a temperatura ambiente. Ante cualquier duda entre dos tallas, opta por la mayor para mayor comodidad.
          </p>
        </div>
      </div>
    </div>
  );
};
