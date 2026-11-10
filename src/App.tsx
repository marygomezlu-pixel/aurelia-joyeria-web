import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { ActivePage, Category, Product } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { RingSizeModal } from './components/RingSizeModal';
import { LegalModal } from './components/LegalModal';
import { ToastContainer } from './components/ToastContainer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

// Páginas
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Collections } from './pages/Collections';
import { CustomJewelry } from './pages/CustomJewelry';
import { CartPage } from './pages/CartPage';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { JewelryCareGuide } from './pages/JewelryCareGuide';
import { RingSizeGuidePage } from './pages/RingSizeGuidePage';
import { OrderTracking } from './pages/OrderTracking';
import { PRODUCTS_DATA } from './data/products';

function MainApp() {
  const [activePage, setActivePage] = useState<ActivePage>('inicio');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS_DATA[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modales globales
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRingSizeModalOpen, setIsRingSizeModalOpen] = useState(false);
  const [legalTopic, setLegalTopic] = useState<'privacidad' | 'terminos' | 'envios' | 'cambios' | null>(null);

  // Desplazar arriba al cambiar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedProduct]);

  const handleNavigate = (page: ActivePage, category?: Category | string) => {
    if (category) {
      setCategoryFilter(category);
      setActivePage('tienda');
    } else {
      setActivePage(page);
    }
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('producto');
  };

  const handleSearchToShop = (query: string) => {
    setSearchQuery(query);
    setCategoryFilter('todos');
    setActivePage('tienda');
  };

  const handleSelectCollection = (collectionName: string) => {
    setSearchQuery(collectionName);
    setCategoryFilter('todos');
    setActivePage('tienda');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5EF] text-[#171717]">
      {/* Encabezado Principal */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Contenido Dinámico de la Página */}
      <main className="flex-1">
        {activePage === 'inicio' && (
          <Home
            onNavigate={handleNavigate}
            onViewProduct={handleViewProduct}
            onOpenRingGuide={() => setIsRingSizeModalOpen(true)}
          />
        )}

        {activePage === 'tienda' && (
          <Shop
            initialCategory={categoryFilter}
            initialQuery={searchQuery}
            onViewProduct={handleViewProduct}
            onOpenRingGuide={() => setIsRingSizeModalOpen(true)}
          />
        )}

        {activePage === 'producto' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onNavigate={handleNavigate}
            onSelectProduct={handleViewProduct}
            onOpenRingGuide={() => setIsRingSizeModalOpen(true)}
          />
        )}

        {activePage === 'colecciones' && (
          <Collections
            onNavigateToShopWithCollection={handleSelectCollection}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'personalizados' && (
          <CustomJewelry
            onNavigate={handleNavigate}
            onViewProduct={handleViewProduct}
          />
        )}

        {activePage === 'carrito' && (
          <CartPage onNavigate={handleNavigate} />
        )}

        {activePage === 'checkout' && (
          <Checkout onNavigate={handleNavigate} />
        )}

        {activePage === 'nosotros' && (
          <About onNavigate={handleNavigate} />
        )}

        {activePage === 'contacto' && (
          <Contact />
        )}

        {activePage === 'cuidado-joyas' && (
          <JewelryCareGuide />
        )}

        {activePage === 'guia-tallas' && (
          <RingSizeGuidePage onNavigate={handleNavigate} />
        )}

        {activePage === 'seguimiento' && (
          <OrderTracking />
        )}
      </main>

      {/* Pie de Página */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegal={(topic) => setLegalTopic(topic)}
      />

      {/* Drawer Lateral del Carrito */}
      <CartDrawer onNavigate={handleNavigate} />

      {/* Modal de Búsqueda Inteligente */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleViewProduct}
        onNavigateToShop={handleSearchToShop}
      />

      {/* Modal Guía Rápida de Tallas */}
      <RingSizeModal
        isOpen={isRingSizeModalOpen}
        onClose={() => setIsRingSizeModalOpen(false)}
      />

      {/* Modal de Políticas Legales */}
      <LegalModal
        topic={legalTopic}
        onClose={() => setLegalTopic(null)}
      />

      {/* Botón Flotante de WhatsApp y Redes Sociales */}
      <FloatingWhatsApp />

      {/* Notificaciones Flotantes */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
