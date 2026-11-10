import React from 'react';
import { X, Ruler, HelpCircle, Check } from 'lucide-react';

interface RingSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: number) => void;
}

export const RING_SIZES = [
  { size: 5, diameterMm: 15.7, circumferenceMm: 49.3, description: "Talla muy pequeña" },
  { size: 6, diameterMm: 16.5, circumferenceMm: 51.9, description: "Talla pequeña habitual" },
  { size: 7, diameterMm: 17.3, circumferenceMm: 54.4, description: "Talla estándar más común" },
  { size: 8, diameterMm: 18.1, circumferenceMm: 57.0, description: "Talla mediana / dedo medio" },
  { size: 9, diameterMm: 18.9, circumferenceMm: 59.5, description: "Talla grande" },
  { size: 10, diameterMm: 19.8, circumferenceMm: 62.1, description: "Talla extra grande" },
];

export const RingSizeModal: React.FC<RingSizeModalProps> = ({ isOpen, onClose, onSelectSize }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#F8F5EF] border border-[#E9DFCF] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative text-[#171717]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-500 hover:text-[#171717] p-1 transition-colors"
          aria-label="Cerrar guía de tallas"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#C6A15B]/15 flex items-center justify-center text-[#C6A15B]">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-medium text-[#171717]">Guía de Tallas de Anillos</h3>
            <p className="text-xs text-stone-500">Sistema estándar estadounidense (US / Perú)</p>
          </div>
        </div>

        {/* Tabla de tallas */}
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#C6A15B]/40 bg-[#E9DFCF]/40 text-stone-700">
                <th className="py-2.5 px-3 font-semibold uppercase tracking-wider">Talla US / PE</th>
                <th className="py-2.5 px-3 font-semibold uppercase tracking-wider">Diámetro Interior (mm)</th>
                <th className="py-2.5 px-3 font-semibold uppercase tracking-wider">Circunferencia (mm)</th>
                <th className="py-2.5 px-3 font-semibold uppercase tracking-wider">Referencia</th>
                {onSelectSize && <th className="py-2.5 px-3 font-semibold text-right">Elegir</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9DFCF]">
              {RING_SIZES.map((row) => (
                <tr key={row.size} className="hover:bg-white/60 transition-colors">
                  <td className="py-3 px-3 font-semibold text-stone-900 font-mono text-sm">{row.size}</td>
                  <td className="py-3 px-3 text-stone-700 font-mono tabular-nums">{row.diameterMm.toFixed(1)} mm</td>
                  <td className="py-3 px-3 text-stone-700 font-mono tabular-nums">{row.circumferenceMm.toFixed(1)} mm</td>
                  <td className="py-3 px-3 text-stone-500">{row.description}</td>
                  {onSelectSize && (
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          onSelectSize(row.size);
                          onClose();
                        }}
                        className="py-1 px-3 bg-brand-primary hover:bg-[#C6A15B] text-white text-xs uppercase tracking-wider font-medium transition-colors shadow-xs"
                      >
                        Seleccionar
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Instrucciones paso a paso */}
        <div className="bg-white p-5 border border-[#E9DFCF] mb-6">
          <h4 className="font-serif text-lg font-medium mb-3 flex items-center gap-2 text-stone-900">
            <HelpCircle className="w-4 h-4 text-[#C6A15B]" />
            ¿Cómo medir tu dedo en casa?
          </h4>
          <ol className="text-xs text-stone-600 space-y-2.5 list-decimal list-inside leading-relaxed">
            <li>
              <strong className="text-stone-800">Corta una tira de papel:</strong> Corta una tira de aproximadamente 1 cm de ancho y 10 cm de largo.
            </li>
            <li>
              <strong className="text-stone-800">Envuelve la base del dedo:</strong> Rodea el nudillo o base del dedo donde llevarás el anillo, asegurándote de que no quede demasiado apretado.
            </li>
            <li>
              <strong className="text-stone-800">Marca con un bolígrafo:</strong> Dibuja una línea en el punto exacto donde se cruza la tira.
            </li>
            <li>
              <strong className="text-stone-800">Mide con una regla milimetrada:</strong> Coloca la tira sobre una superficie plana y mide la distancia desde el extremo hasta la marca.
            </li>
            <li>
              <strong className="text-stone-800">Compara con la tabla:</strong> Busca tu medida en milímetros en la columna de Circunferencia para obtener tu talla exacta.
            </li>
          </ol>
        </div>

        {/* Nota de advertencia */}
        <div className="p-3.5 bg-stone-100 border border-stone-200 text-stone-600 text-xs leading-relaxed">
          <strong className="text-stone-800 block mb-1">Recomendación comercial:</strong>
          La medida de los dedos puede variar ligeramente según la temperatura y hora del día. Te sugerimos medirte al final de la tarde. Si dudas entre dos tallas, siempre es preferible optar por la talla mayor.
        </div>
      </div>
    </div>
  );
};
