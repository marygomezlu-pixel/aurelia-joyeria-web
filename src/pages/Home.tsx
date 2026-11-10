import React, { useState } from 'react';
import { Product, ActivePage, Category, Collection } from '../types';
import { PRODUCTS_DATA, CATEGORIES_DATA, COLLECTIONS_DATA, DEMO_TESTIMONIALS, heroImg } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { STORE_NAME, CURRENCY, STORE_CONTACT } from '../data/config';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  Gem, 
  CheckCircle2, 
  Instagram, 
  Facebook,
  MessageCircle,
  MapPin,
  Star,
  Compass
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: ActivePage, categoryFilter?: Category | string) => void;
  onViewProduct: (product: Product) => void;
  onOpenRingGuide: () => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onViewProduct, onOpenRingGuide }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // Joyas destacadas (favoritas)
  const featuredProducts = PRODUCTS_DATA.filter((p) => p.destacado).slice(0, 8);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@') || !newsletterEmail.includes('.')) {
      setNewsletterError('Por favor ingresa un correo electrónico válido.');
      return;
    }
    setNewsletterSubscribed(true);
    setNewsletterError('');
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO PRINCIPAL EDITORIAL */}
      <section className="relative overflow-hidden bg-brand-primary text-white shadow-lg transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Texto Hero */}
            <div className="lg:col-span-6 space-y-6 lg:pr-6 z-10">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Boutique de Alta Joyería en Perú</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15] text-[#F8F5EF]" style={{ textWrap: 'balance' }}>
                La belleza está en los detalles.
              </h1>

              <p className="text-base text-stone-200 font-light leading-relaxed max-w-lg">
                Descubre joyas que expresan tu esencia y acompañan los momentos más especiales de tu vida. Diseñadas con precisión, acabados dorados y destellos eternos.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onNavigate('tienda')}
                  className="px-8 py-3.5 bg-[#C6A15B] hover:bg-[#b5924d] text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-md flex items-center justify-center gap-3 text-center"
                >
                  Explorar Colección
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('tienda', 'novedades')}
                  className="px-8 py-3.5 bg-transparent border border-[#C6A15B]/50 hover:border-white text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 text-center"
                >
                  Descubrir Novedades
                </button>
              </div>

              {/* Métricas sutiles de la marca */}
              <div className="pt-6 grid grid-cols-3 gap-6 border-t border-white/15 text-xs">
                <div>
                  <span className="block font-serif text-2xl text-[#C6A15B] tabular-nums font-normal">24+</span>
                  <span className="text-stone-300 text-[11px]">Diseños Exclusivos</span>
                </div>
                <div>
                  <span className="block font-serif text-2xl text-[#C6A15B] tabular-nums font-normal">100%</span>
                  <span className="text-stone-300 text-[11px]">Envíos en Perú</span>
                </div>
                <div>
                  <span className="block font-serif text-2xl text-[#C6A15B] tabular-nums font-normal">4.9★</span>
                  <span className="text-stone-300 text-[11px]">Calidad Declarada</span>
                </div>
              </div>
            </div>

            {/* Imagen Hero */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-16/10 sm:aspect-4/3 w-full overflow-hidden shadow-2xl border border-white/20">
                <img
                  src={heroImg}
                  alt="Collar de oro con gema brillante y anillo solitario de lujo"
                  className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-brand-dark/95 backdrop-blur-md border border-[#C6A15B]/40 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#C6A15B] uppercase tracking-wider text-[10px] block">Pieza Insignia</span>
                    <span className="font-serif text-sm text-white">Conjunto Perla & Solitario Aurora</span>
                  </div>
                  <button
                    onClick={() => onNavigate('tienda')}
                    className="text-[#C6A15B] hover:text-white flex items-center gap-1 text-[11px] uppercase tracking-wider font-medium"
                  >
                    Ver detalles <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORÍAS DE JOYERÍA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-medium block mb-2">
            Categorías
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal" style={{ textWrap: 'balance' }}>
            Encuentra tu próxima joya favorita
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 font-light">
            Explora piezas cuidadosamente elaboradas para acompañar cada estilo, desde el minimalismo diario hasta la máxima sofisticación.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.nombre}
              onClick={() => onNavigate('tienda', cat.nombre)}
              className="group cursor-pointer bg-white border border-[#E9DFCF] overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#C6A15B]/60 flex flex-col"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-[#F8F5EF]">
                <img
                  src={cat.imagen}
                  alt={cat.nombre}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-lg text-stone-900 group-hover:text-[#C6A15B] transition-colors">
                    {cat.nombre}
                  </h3>
                  <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                    {cat.descripcion}
                  </p>
                </div>
                <div className="pt-3 mt-2 border-t border-[#E9DFCF]/60 flex items-center justify-between text-xs text-stone-700 group-hover:text-[#C6A15B]">
                  <span className="text-[11px] tracking-wider uppercase font-medium">Explorar</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. COLECCIONES DESTACADAS */}
      <section className="bg-brand-primary text-[#F8F5EF] py-16 lg:py-20 shadow-inner transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-medium block mb-2">
                Curaduría Exclusiva
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                Colecciones que inspiran
              </h2>
            </div>
            <button
              onClick={() => onNavigate('colecciones')}
              className="text-xs uppercase tracking-widest text-[#C6A15B] hover:text-white flex items-center gap-2 transition-colors self-start md:self-auto"
            >
              Ver todas las colecciones <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COLLECTIONS_DATA.map((col) => (
              <div
                key={col.nombre}
                className="group relative bg-brand-dark/95 border border-white/15 p-6 flex flex-col justify-between hover:border-[#C6A15B]/70 transition-all duration-300 shadow-md"
              >
                <div className="relative aspect-16/10 mb-4 overflow-hidden">
                  <img
                    src={col.imagen}
                    alt={col.nombre}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-3 text-[10px] uppercase tracking-widest text-[#C6A15B]">
                    {col.lema}
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  <h3 className="font-serif text-2xl text-white group-hover:text-[#C6A15B] transition-colors">
                    {col.nombre}
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {col.descripcion}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate('tienda', col.nombre)}
                  className="w-full py-2.5 px-4 bg-transparent border border-white/20 hover:border-[#C6A15B] text-xs uppercase tracking-widest text-white hover:text-[#C6A15B] transition-colors flex items-center justify-center gap-2"
                >
                  Explorar Colección
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRODUCTOS DESTACADOS: JOYAS FAVORITAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-medium block mb-2">
              Selección Exclusiva
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal">
              Joyas favoritas
            </h2>
          </div>
          <button
            onClick={() => onNavigate('tienda')}
            className="text-xs uppercase tracking-widest text-stone-800 hover:text-[#C6A15B] flex items-center gap-2 transition-colors self-start md:self-auto font-medium"
          >
            Ver catálogo completo ({PRODUCTS_DATA.length} piezas) <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProduct}
              onOpenRingGuide={onOpenRingGuide}
            />
          ))}
        </div>
      </section>

      {/* 5. SECCIÓN DE NOVEDADES & PROMOCIÓN DESTACADA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E9DFCF]/40 border border-[#C6A15B]/30 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-xl space-y-4 relative z-10">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-semibold block">
              Detalles especiales, precios especiales
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light leading-tight">
              Una joya, una historia que perdura para siempre.
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Explora nuestras piezas en oferta y joyas personalizables. Graba nombres, fechas o iniciales sobre acero dorado y plata fina sin perder la elegancia.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('personalizados')}
                className="px-6 py-3 bg-brand-primary hover:bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-medium transition-colors shadow-sm"
              >
                Personalizar mi Joya
              </button>
              <button
                onClick={() => onNavigate('tienda', 'ofertas')}
                className="px-6 py-3 bg-white border border-brand-primary hover:bg-stone-50 text-brand-primary text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Ver Joyas en Oferta
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONFIANZA Y SERVICIO (4 BLOQUES ESPECIFICADOS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 border border-[#E9DFCF] text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-subtle flex items-center justify-center text-brand-primary mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-stone-900 font-medium mb-2">Diseños con personalidad</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Encuentra piezas que acompañen tu estilo cotidiano y resalten tu esencia en cada celebración.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#E9DFCF] text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#25D366] mb-4">
              <MessageCircle className="w-6 h-6 fill-[#25D366]" />
            </div>
            <h3 className="font-serif text-lg text-stone-900 font-medium mb-1">WhatsApp Directo</h3>
            <span className="font-mono text-xs font-bold text-stone-800 mb-2">953 323 578</span>
            <p className="text-xs text-stone-500 leading-relaxed">
              Atención cercana y asesoría inmediata para resolver cualquier consulta sobre diseños y tallas.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#E9DFCF] text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-subtle flex items-center justify-center text-brand-primary mb-4">
              <MapPin className="w-6 h-6 text-[#C6A15B]" />
            </div>
            <h3 className="font-serif text-lg text-stone-900 font-medium mb-1">Ubicación</h3>
            <span className="text-xs font-semibold text-stone-800 mb-2">{STORE_CONTACT.address}</span>
            <p className="text-xs text-stone-500 leading-relaxed">
              Punto de entrega y coordinación directa, con envíos a todo el territorio de Perú.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#E9DFCF] text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-subtle flex items-center justify-center text-brand-primary mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-stone-900 font-medium mb-2">Compra transparente</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Consulta los materiales declarados, medidas exactas en milímetros y opciones claras de garantía.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#E9DFCF] text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-subtle flex items-center justify-center text-brand-primary mb-4">
              <Gem className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-stone-900 font-medium mb-2">Cuidado de tus joyas</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Recomendaciones y guías prácticas para conservar el brillo inalterable de tus piezas.
            </p>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIOS: EXPERIENCIAS QUE BRILLAN */}
      <section className="bg-white border-y border-[#E9DFCF] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-medium block mb-2">
              Opiniones de Demostración
            </span>
            <h2 className="font-serif text-3xl text-stone-900 font-normal">
              Experiencias que brillan
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Testimonios ilustrativos preparados para reflejar la experiencia de nuestros clientes en Perú.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO_TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-[#F8F5EF] p-6 border border-[#E9DFCF] flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-700 italic leading-relaxed">
                    "{t.comentario}"
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E9DFCF] flex justify-between items-end text-xs">
                  <div>
                    <span className="font-semibold text-stone-900 block">{t.cliente}</span>
                    <span className="text-[11px] text-stone-500">Joya: {t.producto}</span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">Verificado demo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GALERÍA EDITORIAL & REDES SOCIALES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-medium block mb-2">
            Conexión en Redes Sociales
          </span>
          <h2 className="font-serif text-3xl text-stone-900 font-normal">
            El arte de los pequeños detalles
          </h2>
          <p className="text-xs text-stone-500 mt-1 max-w-lg mx-auto">
            Síguenos en nuestras redes oficiales y escríbenos a nuestro WhatsApp para una atención personalizada desde cualquier lugar de Perú.
          </p>

          {/* Botones de Conexión Directa */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-5">
            <a
              href={STORE_CONTACT.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp: 953 323 578</span>
            </a>
            <a
              href={STORE_CONTACT.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-5 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-transform hover:scale-105"
            >
              <Facebook className="w-4 h-4 fill-white" />
              <span>Facebook Oficial</span>
            </a>
            <a
              href={STORE_CONTACT.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-transform hover:scale-105"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram @aurelia.joyas</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { img: heroImg, title: "Anillo Aurora & Collar Sol" },
            { img: CATEGORIES_DATA[0].imagen, title: "Alianzas y Solitarios" },
            { img: CATEGORIES_DATA[1].imagen, title: "Medallón Luz de Luna" },
            { img: CATEGORIES_DATA[2].imagen, title: "Pulsera Tenis & Aretes" },
          ].map((item, idx) => (
            <a
              key={idx}
              href={STORE_CONTACT.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden group border border-[#E9DFCF] bg-brand-dark block"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                <Instagram className="w-5 h-5 text-[#C6A15B] mb-2" />
                <span className="font-serif text-sm">{item.title}</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-200 mt-1">Ver en Instagram</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 9. NEWSLETTER: SÉ PARTE DE NUESTRO UNIVERSO */}
      <section className="bg-brand-primary text-[#F8F5EF] py-16 shadow-lg transition-colors duration-500">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-semibold block">
            Comunidad Exclusiva
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
            Sé parte de nuestro universo
          </h2>
          <p className="text-xs sm:text-sm text-stone-200 font-light max-w-lg mx-auto">
            Recibe novedades, nuevas colecciones y noticias sobre nuestras joyas antes que nadie.
          </p>

          {!newsletterSubscribed ? (
            <form onSubmit={handleNewsletterSubmit} className="pt-4 max-w-md mx-auto space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Tu correo electrónico..."
                  className="flex-1 px-4 py-3 bg-brand-dark/90 border border-white/20 text-xs text-white placeholder:text-stone-300 focus:outline-none focus:border-[#C6A15B]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C6A15B] hover:bg-[#b5924d] text-white text-xs uppercase tracking-widest font-medium transition-colors shadow-sm"
                >
                  Suscribirme
                </button>
              </div>
              {newsletterError && <p className="text-xs text-red-300 text-left">{newsletterError}</p>}
              <p className="text-[10px] text-stone-300">
                Al suscribirte aceptas nuestra política de privacidad. Demostración simulada sin registro permanente.
              </p>
            </form>
          ) : (
            <div className="p-4 bg-brand-dark border border-[#C6A15B]/50 max-w-md mx-auto text-xs text-amber-200 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C6A15B]" />
              <span>¡Gracias por unirte! Te notificaremos de nuestras próximas colecciones.</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
