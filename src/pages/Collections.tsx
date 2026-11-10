import React from 'react';
import { ActivePage, Category } from '../types';
import { COLLECTIONS_DATA, PRODUCTS_DATA } from '../data/products';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CollectionsProps {
  onNavigateToShopWithCollection: (collectionName: string) => void;
  onNavigate: (page: ActivePage) => void;
}

export const Collections: React.FC<CollectionsProps> = ({
  onNavigateToShopWithCollection,
  onNavigate,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Cabecera Editorial */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-semibold block">
          Curaduría de Alta Gama
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 font-light leading-tight">
          Colecciones que inspiran
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">
          Cada una de nuestras colecciones representa un capítulo de estilo: desde la calidez solar del dorado hasta la sobria geometría del minimalismo moderno.
        </p>
      </div>

      {/* Grid Editorial de Colecciones */}
      <div className="space-y-12">
        {COLLECTIONS_DATA.map((col, index) => {
          const matchingProducts = PRODUCTS_DATA.filter((p) => p.coleccion === col.nombre);
          const isEven = index % 2 === 0;

          return (
            <div
              key={col.nombre}
              className={`bg-white border border-[#E9DFCF] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-xs hover:border-[#C6A15B]/50 transition-colors duration-300`}
            >
              {/* Imagen Editorial */}
              <div
                className={`lg:col-span-6 relative aspect-16/10 lg:aspect-auto overflow-hidden bg-stone-900 ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <img
                  src={col.imagen}
                  alt={col.nombre}
                  className="w-full h-full object-cover min-h-[300px] hover:scale-105 transition-transform duration-700 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Contenido Editorial */}
              <div
                className={`lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C6A15B]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{col.lema}</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
                    {col.nombre}
                  </h2>

                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                    {col.descripcion}
                  </p>

                  <div className="pt-2 text-xs text-stone-500 space-y-1">
                    <span className="block font-medium text-stone-700">Piezas destacadas en esta colección:</span>
                    <p className="italic text-stone-500">
                      {matchingProducts.map((p) => p.nombre).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-[#E9DFCF] mt-6 flex items-center justify-between">
                  <span className="text-xs font-mono text-stone-400">
                    {matchingProducts.length} diseños disponibles
                  </span>

                  <button
                    onClick={() => onNavigateToShopWithCollection(col.nombre)}
                    className="py-3 px-6 bg-brand-primary hover:bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 shadow-sm"
                  >
                    Explorar Colección
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
