import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { CURRENCY } from '../data/config';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onOpenRingGuide?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onOpenRingGuide,
}) => {
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const [imageError, setImageError] = useState(false);
  const [quickSize, setQuickSize] = useState<number | undefined>(
    product.tallas && product.tallas.length > 0 ? product.tallas[0] : undefined
  );
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const isFavorite = isWishlisted(product.id);

  const discountPercent = product.precioAnterior
    ? Math.round(((product.precioAnterior - product.precio) / product.precioAnterior) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.tallas && product.tallas.length > 0 && !showQuickAdd) {
      setShowQuickAdd(true);
      return;
    }
    addItem(product, 1, quickSize);
    setShowQuickAdd(false);
  };

  return (
    <article
      className="group bg-white border border-[#E9DFCF]/80 flex flex-col h-full transition-all duration-300 hover:shadow-md hover:border-[#C6A15B]/50 relative"
      onClick={() => onViewDetails(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onViewDetails(product);
      }}
      aria-label={`Ver detalles de ${product.nombre}`}
    >
      {/* Zona de imagen */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#F8F5EF] cursor-pointer">
        {!imageError ? (
          <img
            src={product.imagen}
            alt={product.nombre}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#F8F5EF] to-[#E9DFCF] text-[#171717]">
            <span className="font-serif text-lg tracking-wider text-center">{product.nombre}</span>
            <span className="text-[11px] text-stone-500 mt-1 uppercase tracking-widest">{product.categoria}</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 shadow-xs z-10 ${
            isFavorite
              ? 'bg-brand-primary text-[#C6A15B]'
              : 'bg-white/90 text-stone-600 hover:bg-white hover:text-brand-primary'
          }`}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#C6A15B]' : ''}`} />
        </button>

        {/* Descuento o etiqueta sutil */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.enOferta && discountPercent > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase bg-brand-primary text-[#C6A15B] shadow-xs">
              -{discountPercent}%
            </span>
          )}
          {product.nuevo && !product.enOferta && (
            <span className="px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase bg-[#F8F5EF]/95 text-stone-800 border border-[#E9DFCF]">
              Novedad
            </span>
          )}
        </div>

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between text-white text-xs">
          <span className="flex items-center gap-1 font-medium">
            <Eye className="w-3.5 h-3.5" /> Ver detalle
          </span>
          <span className="text-[11px] text-stone-300">
            {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
          </span>
        </div>
      </div>

      {/* Selector rápido de tallas desplegable en tarjeta si aplica */}
      {showQuickAdd && product.tallas && product.tallas.length > 0 && (
        <div
          className="p-3 bg-[#F8F5EF] border-b border-[#E9DFCF] text-xs animate-in slide-in-from-top-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-stone-700">Elige tu talla:</span>
            {onOpenRingGuide && (
              <button
                type="button"
                onClick={onOpenRingGuide}
                className="text-[11px] text-brand-primary hover:underline font-medium"
              >
                Guía de tallas
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {product.tallas.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setQuickSize(t)}
                className={`w-7 h-7 text-xs font-mono transition-colors ${
                  quickSize === t
                    ? 'bg-brand-primary text-white font-semibold'
                    : 'bg-white border border-[#E9DFCF] text-stone-700 hover:border-stone-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-1.5 bg-brand-primary hover:bg-[#C6A15B] text-white text-[11px] font-medium tracking-wide uppercase transition-colors"
          >
            Confirmar y agregar (Talla {quickSize})
          </button>
        </div>
      )}

      {/* Información del producto */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Metadata sin píldoras */}
          <div className="flex items-center gap-2 text-[11px] text-stone-500 uppercase tracking-widest mb-1">
            <span>{product.categoria}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.coleccion}</span>
          </div>

          <h3 className="font-serif text-lg text-stone-900 leading-snug line-clamp-1 group-hover:text-[#C6A15B] transition-colors">
            {product.nombre}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
            {product.material}
          </p>

          {/* Rating de demostración */}
          <div className="flex items-center gap-1.5 mt-2 text-stone-400 text-xs">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-500 text-amber-500'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono tabular-nums text-stone-600">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[10px] text-stone-400">
              ({product.numReviews})
            </span>
          </div>
        </div>

        {/* Precio y botón de acción */}
        <div className="pt-2 border-t border-[#E9DFCF]/60 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-semibold text-stone-900 font-mono tabular-nums">
                {CURRENCY} {product.precio.toFixed(2)}
              </span>
              {product.precioAnterior && (
                <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                  {CURRENCY} {product.precioAnterior.toFixed(2)}
                </span>
              )}
            </div>
            <span className="block text-[10px] text-stone-400">Precio demo</span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className={`p-2.5 transition-all duration-200 shadow-xs ${
              product.stock > 0
                ? 'bg-brand-primary hover:bg-[#C6A15B] text-white'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
            title={product.stock > 0 ? 'Agregar a la bolsa' : 'Agotado'}
            aria-label={`Agregar ${product.nombre} a la bolsa`}
          >
            <ShoppingBag className="w-4 h-4 text-[#C6A15B]" />
          </button>
        </div>
      </div>
    </article>
  );
};
