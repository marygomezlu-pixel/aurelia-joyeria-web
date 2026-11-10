import React, { useState, useMemo, useEffect } from 'react';
import { Product, ActivePage, Category, FilterState } from '../types';
import { PRODUCTS_DATA, CATEGORIES_DATA } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CURRENCY } from '../data/config';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  X, 
  ChevronDown,
  Sparkles,
  Check
} from 'lucide-react';

interface ShopProps {
  initialCategory?: string;
  initialQuery?: string;
  onViewProduct: (product: Product) => void;
  onOpenRingGuide: () => void;
}

export const Shop: React.FC<ShopProps> = ({
  initialCategory,
  initialQuery = '',
  onViewProduct,
  onOpenRingGuide,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'todos');
  const [selectedCollection, setSelectedCollection] = useState<string>('todas');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('todos');
  const [priceRange, setPriceRange] = useState<number>(250);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyOffers, setOnlyOffers] = useState(initialCategory === 'ofertas');
  const [sortBy, setSortBy] = useState<FilterState['orden']>('recientes');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      if (initialCategory === 'ofertas') {
        setOnlyOffers(true);
        setSelectedCategory('todos');
      } else if (initialCategory === 'novedades') {
        setSortBy('recientes');
        setSelectedCategory('todos');
      } else {
        setSelectedCategory(initialCategory);
      }
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  // Extraer materiales únicos
  const materialsList = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS_DATA.forEach((p) => {
      if (p.material.toLowerCase().includes('bañado en oro')) set.add('Baño en oro');
      else if (p.material.toLowerCase().includes('acero')) set.add('Acero inoxidable');
      else if (p.material.toLowerCase().includes('perla')) set.add('Con perla');
      else set.add('Otros acabados');
    });
    return Array.from(set);
  }, []);

  // Extraer colecciones únicas
  const collectionsList = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS_DATA.forEach((p) => set.add(p.coleccion));
    return Array.from(set);
  }, []);

  // Filtrado y Ordenamiento
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      // Búsqueda de texto
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.nombre.toLowerCase().includes(q) ||
          p.categoria.toLowerCase().includes(q) ||
          p.coleccion.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Categoría
      if (selectedCategory !== 'todos' && p.categoria !== selectedCategory) {
        return false;
      }

      // Colección
      if (selectedCollection !== 'todas' && p.coleccion !== selectedCollection) {
        return false;
      }

      // Material simplificado
      if (selectedMaterial !== 'todos') {
        if (selectedMaterial === 'Baño en oro' && !p.material.toLowerCase().includes('baño') && !p.acabado.toLowerCase().includes('dorad')) {
          return false;
        }
        if (selectedMaterial === 'Acero inoxidable' && !p.material.toLowerCase().includes('acero')) {
          return false;
        }
        if (selectedMaterial === 'Con perla' && !p.material.toLowerCase().includes('perla') && !p.descripcion.toLowerCase().includes('perla')) {
          return false;
        }
      }

      // Precio
      if (p.precio > priceRange) return false;

      // Disponibilidad
      if (onlyInStock && p.stock <= 0) return false;

      // Ofertas
      if (onlyOffers && !p.enOferta) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'precio-asc') return a.precio - b.precio;
      if (sortBy === 'precio-desc') return b.precio - a.precio;
      if (sortBy === 'mejor-valorados') return b.rating - a.rating;
      if (sortBy === 'mas-vendidos') return b.numReviews - a.numReviews;
      // 'recientes'
      return (b.nuevo ? 1 : 0) - (a.nuevo ? 1 : 0);
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedCollection,
    selectedMaterial,
    priceRange,
    onlyInStock,
    onlyOffers,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('todos');
    setSelectedCollection('todas');
    setSelectedMaterial('todos');
    setPriceRange(250);
    setOnlyInStock(false);
    setOnlyOffers(false);
    setSortBy('recientes');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'todos' ||
    selectedCollection !== 'todas' ||
    selectedMaterial !== 'todos' ||
    priceRange < 250 ||
    onlyInStock ||
    onlyOffers;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Título de la Tienda */}
      <div className="border-b border-[#E9DFCF] pb-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-medium block mb-1">
              Catálogo Oficial
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
              {selectedCategory !== 'todos' ? selectedCategory : 'Tienda de Joyería Exclusiva'}
            </h1>
            <p className="text-xs text-stone-500 mt-1 max-w-xl">
              Anillos, collares, pulseras y aretes en soles peruanos ({CURRENCY}). Selecciona tus filtros para encontrar la pieza ideal.
            </p>
          </div>

          {/* Ordenamiento Desktop */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-500 uppercase tracking-wider whitespace-nowrap">
              Ordenar por:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as FilterState['orden'])}
              className="text-xs bg-white border border-[#E9DFCF] px-3 py-2 text-stone-800 focus:outline-none focus:border-[#C6A15B]"
            >
              <option value="recientes">Más recientes</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
              <option value="mas-vendidos">Más vendidos (Demo)</option>
              <option value="mejor-valorados">Mejor valorados (Demo)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Barra de Búsqueda y Botón Filtros Móvil */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, material o colección..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E9DFCF] text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#C6A15B]"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden flex-1 sm:flex-none py-2.5 px-4 bg-white border border-[#E9DFCF] text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 text-stone-800"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#C6A15B]" />
            Filtros {hasActiveFilters && '(Activos)'}
          </button>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="py-2.5 px-3 text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1.5 underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Grid Principal: Sidebar de Filtros + Catálogo */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR DE FILTROS (Desktop & Móvil colapsable) */}
        <aside
          className={`lg:block ${
            mobileFiltersOpen ? 'block' : 'hidden'
          } bg-white lg:bg-transparent p-6 lg:p-0 border lg:border-none border-[#E9DFCF] space-y-6 lg:space-y-8`}
        >
          {/* Categorías */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 mb-3 border-b border-[#E9DFCF] pb-2">
              Categoría
            </h3>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => setSelectedCategory('todos')}
                className={`w-full text-left py-1 px-2 flex justify-between items-center transition-colors ${
                  selectedCategory === 'todos'
                    ? 'font-semibold text-[#C6A15B] bg-[#F8F5EF]'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>Todas las categorías</span>
                <span className="font-mono text-stone-400 text-[11px]">{PRODUCTS_DATA.length}</span>
              </button>
              {CATEGORIES_DATA.map((cat) => {
                const count = PRODUCTS_DATA.filter((p) => p.categoria === cat.nombre).length;
                return (
                  <button
                    key={cat.nombre}
                    onClick={() => setSelectedCategory(cat.nombre)}
                    className={`w-full text-left py-1 px-2 flex justify-between items-center transition-colors ${
                      selectedCategory === cat.nombre
                        ? 'font-semibold text-[#C6A15B] bg-[#F8F5EF]'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <span>{cat.nombre}</span>
                    <span className="font-mono text-stone-400 text-[11px]">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rango de Precios */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 mb-3 border-b border-[#E9DFCF] pb-2 flex justify-between">
              <span>Precio Máximo</span>
              <span className="font-mono text-[#C6A15B] font-semibold">{CURRENCY} {priceRange}</span>
            </h3>
            <input
              type="range"
              min="30"
              max="250"
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#C6A15B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
              <span>{CURRENCY} 30.00</span>
              <span>{CURRENCY} 250.00</span>
            </div>
          </div>

          {/* Colecciones */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 mb-3 border-b border-[#E9DFCF] pb-2">
              Colección
            </h3>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => setSelectedCollection('todas')}
                className={`w-full text-left py-1 px-2 transition-colors ${
                  selectedCollection === 'todas'
                    ? 'font-semibold text-[#C6A15B] bg-[#F8F5EF]'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Todas las colecciones
              </button>
              {collectionsList.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedCollection(col)}
                  className={`w-full text-left py-1 px-2 transition-colors ${
                    selectedCollection === col
                      ? 'font-semibold text-[#C6A15B] bg-[#F8F5EF]'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>

          {/* Material Declarado */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 mb-3 border-b border-[#E9DFCF] pb-2">
              Material Declarado
            </h3>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => setSelectedMaterial('todos')}
                className={`w-full text-left py-1 px-2 transition-colors ${
                  selectedMaterial === 'todos'
                    ? 'font-semibold text-[#C6A15B] bg-[#F8F5EF]'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Todos los materiales
              </button>
              {materialsList.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`w-full text-left py-1 px-2 transition-colors ${
                    selectedMaterial === mat
                      ? 'font-semibold text-[#C6A15B] bg-[#F8F5EF]'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Disponibilidad y Ofertas */}
          <div className="space-y-2 pt-2 border-t border-[#E9DFCF]">
            <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="accent-[#C6A15B]"
              />
              <span>Solo piezas en stock</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyOffers}
                onChange={(e) => setOnlyOffers(e.target.checked)}
                className="accent-[#C6A15B]"
              />
              <span>Solo piezas en oferta</span>
            </label>
          </div>
        </aside>

        {/* CATÁLOGO DE PRODUCTOS */}
        <main className="lg:col-span-3">
          {/* Contador de resultados */}
          <div className="flex justify-between items-center mb-6 text-xs text-stone-500 pb-2 border-b border-[#E9DFCF]">
            <span>
              Mostrando <strong className="text-stone-800 font-mono">{filteredProducts.length}</strong> de {PRODUCTS_DATA.length} joyas
            </span>
            {hasActiveFilters && (
              <span className="text-[11px] text-[#C6A15B]">Filtros aplicados</span>
            )}
          </div>

          {/* Estado Vacío */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-[#E9DFCF] p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F8F5EF] flex items-center justify-center text-stone-400 mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl text-stone-900">No encontramos coincidencias</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                No hay joyas que cumplan con todos los criterios seleccionados. Prueba modificando el rango de precio o limpiando los filtros.
              </p>
              <button
                onClick={handleResetFilters}
                className="py-2.5 px-6 bg-brand-primary hover:bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-medium transition-colors shadow-sm"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewProduct}
                  onOpenRingGuide={onOpenRingGuide}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
