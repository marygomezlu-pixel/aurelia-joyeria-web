import React, { useState, useEffect, useRef } from 'react';
import { Product, ActivePage } from '../types';
import { PRODUCTS_DATA } from '../data/products';
import { CURRENCY } from '../data/config';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigateToShop: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onNavigateToShop,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS_DATA.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.nombre.toLowerCase().includes(q) ||
          p.categoria.toLowerCase().includes(q) ||
          p.coleccion.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q)
        );
      }).slice(0, 6)
    : [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter' && query.trim()) {
      onNavigateToShop(query.trim());
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#F8F5EF] border border-[#E9DFCF] w-full max-w-2xl shadow-2xl p-6 relative animate-in slide-in-from-top-6 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 transition-colors"
          aria-label="Cerrar búsqueda"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b-2 border-[#C6A15B] pb-3 mb-5">
          <Search className="w-5 h-5 text-[#C6A15B]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Busca tu joya ideal (ej: anillo aurora, perla, oro, tenis)..."
            className="w-full bg-transparent text-base font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
        </div>

        {/* Sugerencias rápidas */}
        {!query && (
          <div className="py-4">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-medium block mb-2">
              Búsquedas populares
            </span>
            <div className="flex flex-wrap gap-2">
              {['Anillo Aurora', 'Pulsera Tenis', 'Collar Perla', 'Joyas Personalizadas', 'Compromiso'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 bg-white border border-[#E9DFCF] text-xs text-stone-700 hover:border-[#C6A15B] hover:text-[#C6A15B] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Resultados en tiempo real */}
        {query.trim() && (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-stone-500">
              <span>{filtered.length} resultados encontrados</span>
              {filtered.length > 0 && (
                <button
                  onClick={() => {
                    onNavigateToShop(query.trim());
                    onClose();
                  }}
                  className="text-[#C6A15B] hover:underline flex items-center gap-1 font-medium"
                >
                  Ver todos en el catálogo <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="p-8 text-center text-stone-500 text-xs">
                No encontramos joyas con "{query}". Intenta buscar por categoría como "Anillos", "Collares" o acabados "Dorado".
              </div>
            ) : (
              <div className="divide-y divide-[#E9DFCF] max-h-80 overflow-y-auto">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectProduct(item);
                      onClose();
                    }}
                    className="py-3 flex items-center justify-between gap-3 hover:bg-white/60 px-2 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="w-12 h-12 object-cover bg-white border border-[#E9DFCF] shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-serif text-sm text-stone-900 truncate">{item.nombre}</h4>
                        <p className="text-[11px] text-stone-500 truncate">{item.categoria} · {item.material}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold font-mono tabular-nums text-stone-900 shrink-0">
                      {CURRENCY} {item.precio.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
