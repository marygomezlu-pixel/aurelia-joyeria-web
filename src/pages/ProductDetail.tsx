import React, { useState } from 'react';
import { Product, ActivePage } from '../types';
import { useCart } from '../context/CartContext';
import { CURRENCY } from '../data/config';
import { PRODUCTS_DATA } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { WhatsAppModal } from '../components/WhatsAppModal';
import { 
  Heart, 
  ShoppingBag, 
  Ruler, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  MessageCircle, 
  Star, 
  ChevronRight,
  Sparkles,
  Minus,
  Plus
} from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onNavigate: (page: ActivePage) => void;
  onSelectProduct: (p: Product) => void;
  onOpenRingGuide: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onNavigate,
  onSelectProduct,
  onOpenRingGuide,
}) => {
  const { addItem, toggleWishlist, isWishlisted, setIsCartOpen } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedTalla, setSelectedTalla] = useState<number | undefined>(
    product.tallas && product.tallas.length > 0 ? product.tallas[0] : undefined
  );
  const [selectedLongitud, setSelectedLongitud] = useState<string | undefined>(
    product.longitudes && product.longitudes.length > 0 ? product.longitudes[0] : undefined
  );
  const [customText, setCustomText] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [activeTab, setActiveTab] = useState<'descripcion' | 'materiales' | 'cuidados' | 'envios'>('descripcion');
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  const isFavorite = isWishlisted(product.id);

  const discountPercent = product.precioAnterior
    ? Math.round(((product.precioAnterior - product.precio) / product.precioAnterior) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(
      product,
      quantity,
      selectedTalla,
      selectedLongitud,
      product.personalizable ? { texto: customText, observaciones: customNotes } : undefined
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    onNavigate('checkout');
  };

  // Mensaje exacto para WhatsApp según el prompt:
  // "Hola, quisiera consultar por esta joya: Producto: Anillo Aurora, Precio mostrado: S/ 79.90, Cantidad: 1, Talla: [talla seleccionada], Personalización: [si corresponde]..."
  const generateWhatsAppMessage = () => {
    let msg = `Hola, quisiera consultar por esta joya:\n\n`;
    msg += `Producto: ${product.nombre}\n`;
    msg += `Precio mostrado: ${CURRENCY} ${product.precio.toFixed(2)}\n`;
    msg += `Cantidad: ${quantity}\n`;
    if (selectedTalla) {
      msg += `Talla: ${selectedTalla}\n`;
    }
    if (selectedLongitud) {
      msg += `Longitud: ${selectedLongitud}\n`;
    }
    if (product.personalizable && customText.trim()) {
      msg += `Personalización solicitada: "${customText.trim()}"\n`;
      if (customNotes.trim()) msg += `Observaciones: ${customNotes.trim()}\n`;
    }
    msg += `\n¿Podrían brindarme más información sobre su disponibilidad y entrega? Muchas gracias.`;
    return msg;
  };

  // Productos relacionados de la misma categoría o colección
  const relatedProducts = PRODUCTS_DATA.filter(
    (p) => p.id !== product.id && (p.categoria === product.categoria || p.coleccion === product.coleccion)
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb de navegación */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-widest">
        <button onClick={() => onNavigate('inicio')} className="hover:text-stone-900 transition-colors">
          Inicio
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <button onClick={() => onNavigate('tienda')} className="hover:text-stone-900 transition-colors">
          Tienda
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-stone-400">{product.categoria}</span>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-stone-800 font-medium truncate">{product.nombre}</span>
      </nav>

      {/* Grid Contiguo de Compra (PDP) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Columna Izquierda: Galería de Imágenes */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 w-full bg-white border border-[#E9DFCF] overflow-hidden shadow-sm">
            <img
              src={product.imagen}
              alt={product.nombre}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {product.enOferta && discountPercent > 0 && (
              <span className="absolute top-4 left-4 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase bg-brand-primary text-[#C6A15B] shadow-sm">
                -{discountPercent}% Descuento
              </span>
            )}
          </div>

          {/* Miniaturas de muestra */}
          <div className="grid grid-cols-4 gap-3">
            {[product.imagen, product.imagen, product.imagen].map((img, i) => (
              <button
                key={i}
                className="aspect-square border border-[#E9DFCF] bg-white overflow-hidden opacity-90 hover:opacity-100 hover:border-[#C6A15B] transition-all p-1"
              >
                <img src={img} alt={`${product.nombre} vista ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Garantías de compra rápida */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E9DFCF] text-stone-600 text-xs text-center">
            <div className="p-3 bg-white border border-[#E9DFCF]/60 flex flex-col items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#C6A15B]" />
              <span className="font-medium text-stone-800">Envíos en Perú</span>
              <span className="text-[10px] text-stone-500">Lima & Provincias</span>
            </div>
            <div className="p-3 bg-white border border-[#E9DFCF]/60 flex flex-col items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
              <span className="font-medium text-stone-800">Acabado Fino</span>
              <span className="text-[10px] text-stone-500">Material declarado</span>
            </div>
            <div className="p-3 bg-white border border-[#E9DFCF]/60 flex flex-col items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-[#C6A15B]" />
              <span className="font-medium text-stone-800">Cambios Fáciles</span>
              <span className="text-[10px] text-stone-500">Hasta 7 días</span>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Módulo de Compra y Selección */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 mb-1">
              <span>{product.categoria}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#C6A15B]">{product.coleccion}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal leading-tight">
              {product.nombre}
            </h1>

            {/* Valoraciones y Disponibilidad */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono tabular-nums text-stone-800 font-semibold">{product.rating.toFixed(1)}</span>
                <span className="text-stone-400">({product.numReviews} reseñas demo)</span>
              </div>

              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 border border-emerald-200">
                {product.stock > 0 ? `En Stock (${product.stock} disp.)` : 'Agotado'}
              </span>
            </div>

            {/* Precios */}
            <div className="pt-4 flex items-baseline gap-3 border-b border-[#E9DFCF] pb-4">
              <span className="font-serif text-3xl font-normal text-stone-900 font-mono tabular-nums">
                {CURRENCY} {product.precio.toFixed(2)}
              </span>
              {product.precioAnterior && (
                <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                  {CURRENCY} {product.precioAnterior.toFixed(2)}
                </span>
              )}
              <span className="text-[11px] text-stone-400 ml-auto">IGV incluido</span>
            </div>
          </div>

          {/* Opciones Específicas por Producto */}
          {/* 1. Selector de Talla para Anillos */}
          {product.tallas && product.tallas.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-stone-800 uppercase tracking-wider">
                  Talla de Anillo (US / PE): <strong className="text-[#C6A15B]">{selectedTalla}</strong>
                </span>
                <button
                  type="button"
                  onClick={onOpenRingGuide}
                  className="text-stone-600 hover:text-[#C6A15B] flex items-center gap-1 underline"
                >
                  <Ruler className="w-3.5 h-3.5" /> Guía de tallas
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.tallas.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTalla(t)}
                    className={`w-10 h-10 text-xs font-mono transition-all ${
                      selectedTalla === t
                        ? 'bg-brand-primary text-white font-bold border-2 border-brand-primary shadow-xs'
                        : 'bg-white border border-[#E9DFCF] text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Selector de Longitud para Collares/Pulseras */}
          {product.longitudes && product.longitudes.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-stone-800 uppercase tracking-wider block">
                Longitud de Cadena:
              </span>
              <div className="flex gap-2">
                {product.longitudes.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setSelectedLongitud(l)}
                    className={`py-2 px-3 text-xs transition-colors ${
                      selectedLongitud === l
                        ? 'bg-brand-primary text-white font-medium border border-brand-primary shadow-xs'
                        : 'bg-white border border-[#E9DFCF] text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Campos de Personalización para Joyas Personalizadas */}
          {product.personalizable && (
            <div className="p-4 bg-white border border-[#C6A15B]/40 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-primary uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Opciones de Grabado Personalizado</span>
              </div>
              <div>
                <label className="block text-[11px] text-stone-600 mb-1 font-medium">
                  Nombre, inicial o texto a grabar (máx. 18 caracteres):
                </label>
                <input
                  type="text"
                  maxLength={18}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Ej: Luciana · 12.10.2026"
                  className="w-full text-xs px-3 py-2 bg-[#F8F5EF] border border-[#E9DFCF] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-stone-600 mb-1 font-medium">
                  Observaciones adicionales o fecha deseada:
                </label>
                <textarea
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Ej: Grabar en tipografía cursiva en el reverso."
                  className="w-full text-xs px-3 py-2 bg-[#F8F5EF] border border-[#E9DFCF] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>
            </div>
          )}

          {/* Selector de Cantidad */}
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-wider font-medium text-stone-800">
              Cantidad:
            </span>
            <div className="flex items-center border border-[#E9DFCF] bg-white">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-stone-100 text-stone-600 transition-colors"
                aria-label="Reducir cantidad"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-4 text-xs font-mono font-semibold text-stone-800 tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
                className="p-2 hover:bg-stone-100 text-stone-600 disabled:opacity-30 transition-colors"
                aria-label="Aumentar cantidad"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Botones de Acción de Compra */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 py-3.5 px-6 bg-brand-primary hover:bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-[#C6A15B]" />
                Agregar a la Bolsa
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 border transition-colors ${
                  isFavorite
                    ? 'border-brand-primary bg-brand-subtle text-brand-primary'
                    : 'border-[#E9DFCF] bg-white text-stone-600 hover:text-stone-900'
                }`}
                title="Favoritos"
                aria-label="Guardar en favoritos"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              className="w-full py-3.5 px-6 bg-white border border-brand-primary hover:bg-brand-primary hover:text-white text-brand-primary text-xs uppercase tracking-widest font-medium transition-colors shadow-xs"
            >
              Comprar Ahora
            </button>

            {/* Botón WhatsApp funcional */}
            <button
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="w-full py-3 px-6 bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/40 text-xs uppercase tracking-widest font-medium transition-all duration-200 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Consultar por WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Pestañas de Información Técnica */}
      <div className="bg-white border border-[#E9DFCF] p-6 lg:p-8">
        <div className="flex border-b border-[#E9DFCF] gap-6 text-xs uppercase tracking-wider mb-6 overflow-x-auto">
          {[
            { id: 'descripcion', label: 'Descripción' },
            { id: 'materiales', label: 'Materiales & Acabados' },
            { id: 'cuidados', label: 'Cuidados' },
            { id: 'envios', label: 'Envíos en Perú' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-brand-primary text-brand-primary font-semibold'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-stone-600 leading-relaxed max-w-3xl space-y-3">
          {activeTab === 'descripcion' && (
            <div>
              <p>{product.descripcion}</p>
              {product.detalles && (
                <ul className="mt-4 space-y-1.5 list-disc list-inside text-stone-700">
                  {product.detalles.dimensiones && <li>Dimensiones: {product.detalles.dimensiones}</li>}
                  {product.detalles.longitud && <li>Longitud: {product.detalles.longitud}</li>}
                  {product.detalles.cierre && <li>Tipo de cierre: {product.detalles.cierre}</li>}
                  {product.detalles.piedras && <li>Piedras y engastes: {product.detalles.piedras}</li>}
                  {product.detalles.pesoAprox && <li>Peso aproximado: {product.detalles.pesoAprox}</li>}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'materiales' && (
            <div className="space-y-2">
              <p>
                <strong>Material base:</strong> {product.material}.
              </p>
              <p>
                <strong>Acabado visual:</strong> {product.acabado}.
              </p>
              <p className="text-stone-500 pt-2 text-[11px]">
                Nuestras piezas de acero quirúrgico inoxidable son hipoalergénicas y resistentes a la decoloración bajo condiciones de uso normal.
              </p>
            </div>
          )}

          {activeTab === 'cuidados' && (
            <div className="space-y-2">
              <p>• Evitar el contacto directo con perfumes, lociones químicas, lejía o agua de piscina clorada.</p>
              <p>• Limpiar suavemente con una franela seca y suave después de cada uso.</p>
              <p>• Guardar de forma individual en su estuche o bolsa de terciopelo para evitar roces y rayaduras.</p>
            </div>
          )}

          {activeTab === 'envios' && (
            <div className="space-y-2">
              <p>• <strong>Lima Metropolitana:</strong> S/ 10.00 (Entrega en 24 a 48 horas hábiles).</p>
              <p>• <strong>Provincias:</strong> S/ 18.00 (Entrega en 2 a 5 días hábiles vía Olva Courier o Shalom).</p>
              <p>• <strong>Envío Gratis:</strong> En todos los pedidos que superen los S/ 150.00.</p>
            </div>
          )}
        </div>
      </div>

      {/* Joyas Relacionadas */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex justify-between items-end border-b border-[#E9DFCF] pb-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-medium block">
                Combinaciones Sugeridas
              </span>
              <h2 className="font-serif text-2xl text-stone-900 font-normal mt-1">
                Completa tu estilo
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onViewDetails={onSelectProduct}
                onOpenRingGuide={onOpenRingGuide}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modal WhatsApp */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        message={generateWhatsAppMessage()}
        title="Consultar por esta joya en WhatsApp"
      />
    </div>
  );
};
