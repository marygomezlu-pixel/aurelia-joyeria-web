# AURELIA · Joyería de Lujo (Online Store)

Plataforma de comercio electrónico de alta gama desarrollada para una boutique exclusiva de joyería fina y accesorios en Perú. Interfaz completamente en español, precios en Soles peruanos (`S/`), catálogo enriquecido, filtros interactivos, personalización de joyas con grabado láser, carrito persistente con cupones, checkout adaptado a Perú y sincronización de pedidos con WhatsApp.

---

## 1. Estructura del Proyecto

```text
joyeria-online/
├── public/
│   └── assets/                     # Recursos visuales y logotipos
├── src/
│   ├── assets/
│   │   └── images/                 # Fotografías editoriales de joyas en alta resolución
│   ├── components/
│   │   ├── Header.tsx              # Encabezado con Top Bar Contract, barra informativa y menú
│   │   ├── Footer.tsx              # Pie de página con 4 columnas, políticas y enlaces
│   │   ├── ProductCard.tsx         # Tarjeta de producto de lujo con selector rápido y wishlist
│   │   ├── CartDrawer.tsx          # Carrito lateral deslizable con cálculo de envío y cupones
│   │   ├── SearchModal.tsx         # Buscador inteligente en tiempo real
│   │   ├── RingSizeModal.tsx       # Guía modal interactiva de tallas de anillos (mm y US/PE)
│   │   ├── WhatsAppModal.tsx       # Generador de consultas y pedidos formateados para WhatsApp
│   │   ├── LegalModal.tsx          # Modal de políticas (Privacidad, Términos, Envíos, Cambios)
│   │   ├── FloatingWhatsApp.tsx    # Widget flotante interactivo de WhatsApp (953 323 578) y redes sociales
│   │   └── ToastContainer.tsx      # Contenedor de notificaciones de bolsa y favoritos
│   ├── context/
│   │   └── CartContext.tsx         # Estado global del carrito y favoritos con persistencia
│   ├── data/
│   │   ├── config.ts               # Configuración comercial (WhatsApp, marca, envíos, cupones)
│   │   └── products.ts             # Base de datos con 24 joyas, categorías, colecciones y reseñas
│   ├── pages/
│   │   ├── Home.tsx                # Inicio con Hero editorial, colecciones, favoritos y newsletter
│   │   ├── Shop.tsx                # Catálogo con búsqueda, filtros combinables y ordenamiento
│   │   ├── ProductDetail.tsx       # Detalle de joya con galería, tallas, WhatsApp y tabs
│   │   ├── Collections.tsx         # Colecciones editoriales con acceso directo
│   │   ├── CustomJewelry.tsx       # Taller de personalización con previsualización en vivo
│   │   ├── CartPage.tsx            # Página completa de bolsa de compras con desglose
│   │   ├── Checkout.tsx            # Finalizar compra con departamentos de Perú y pagos simulados
│   │   ├── About.tsx               # Manifiesto, historia y filosofía de la joyería
│   │   ├── Contact.tsx             # Formulario de contacto validado y preguntas frecuentes (FAQ)
│   │   ├── JewelryCareGuide.tsx    # Guía de cuidado según material (acero, dorado, perla, circonia)
│   │   ├── RingSizeGuidePage.tsx   # Guía completa de medición de dedos y tabla milimétrica
│   │   └── OrderTracking.tsx       # Módulo de seguimiento de despacho con timeline visual
│   ├── types/
│   │   └── index.ts                # Tipos e interfaces TypeScript del proyecto
│   ├── App.tsx                     # Componente raíz y enrutador fluido
│   ├── index.css                   # Tailwind CSS v4, tipografía y paleta dorada
│   └── main.tsx                    # Punto de entrada React 19
├── index.html                      # HTML5 con Google Fonts (Cormorant & Jakarta) y SEO Schema
├── metadata.json                   # Metadatos del applet en Google AI Studio
├── package.json                    # Dependencias y scripts de ejecución
└── vite.config.ts                  # Configuración de Vite con Tailwind CSS
```

---

## 2. Instalación y Ejecución Paso a Paso

### Requisitos Previos
- Node.js 18+ o superior instalado en tu sistema.
- Gestor de paquetes npm o bun.

### Pasos:
1. **Clonar o descargar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd joyeria-online
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**
   Ingresa a `http://localhost:3000` (o el puerto indicado en tu terminal).

5. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 3. Guía de Personalización

Todos los elementos comerciales de la tienda están centralizados para una modificación rápida sin alterar la lógica interna:

### A. Nombre de la Joyería y Marca
Edita el archivo `src/data/config.ts`:
```typescript
export const STORE_NAME = "AURELIA";
export const STORE_FULL_NAME = "AURELIA · Joyería de Lujo";
export const STORE_TAGLINE = "La belleza está en los detalles";
```

### B. Celular y WhatsApp Comercial
Configurado oficialmente en `src/data/config.ts`:
```typescript
export const WHATSAPP_NUMBER = "51953323578"; // Número oficial 953323578 con código Perú (+51)
```
La aplicación conecta directamente con este número a través del widget flotante de WhatsApp, la barra superior, la sección de contacto, el pie de página y la confirmación de pedidos.

### C. Ubicación Oficial y Tarifas de Envío
En `src/data/config.ts`:
```typescript
export const SHIPPING_CONFIG = {
  limaCost: 10.00,                 // Tarifa Lima en Soles
  provinciasCost: 18.00,           // Tarifa Provincias en Soles
  freeShippingThreshold: 150.00,   // Envío gratis a partir de S/ 150
  pickupAddress: "Av. Panamericana (Previa coordinación)",
};

export const STORE_CONTACT = {
  phone: "+51 953 323 578",
  phoneRaw: "953323578",
  address: "Av. Panamericana, Perú",
  social: {
    whatsapp: "https://wa.me/51953323578",
    facebook: "https://facebook.com/aureliajoyeria",
    instagram: "https://instagram.com/aurelia.joyas",
  }
};
```

### D. Productos, Precios, Stock y Tallas
En `src/data/products.ts`, cada joya sigue la estructura oficial:
```typescript
{
  id: 1,
  nombre: "Anillo Aurora",
  categoria: "Anillos",
  coleccion: "Esencia Dorada",
  precio: 79.90,
  precioAnterior: 99.90,
  material: "Acero quirúrgico con baño dorado",
  acabado: "Dorado champán brillante",
  descripcion: "Anillo solitario de diseño contemporáneo...",
  imagen: ringsImg,
  stock: 8,
  tallas: [5, 6, 7, 8, 9],
  personalizable: false,
  destacado: true
}
```

### E. Paleta de Colores de Alta Joyería (Llamativa y Personalizable)
Configurada mediante variables CSS dinámicas en `src/index.css` y clases utilitarias (`.bg-brand-primary`, `.text-brand-primary`, etc.):
- **Rubí Imperial / Borgoña Joyero (Predeterminado):** `#58111A` (Tono llamativo, radiante y distinguido que reemplaza al negro puro)
- **Esmeralda Joyero:** `#0B3B2C` (Verde imperial profundo)
- **Zafiro Real:** `#0F2A52` (Azul nocturno majestuoso)
- **Amatista Noble:** `#4A1238` (Púrpura joyero aterciopelado)
- **Dorado Champán:** `#C6A15B` (Acentos dorados metálicos y bisutería fina)
- **Marfil Suave:** `#F8F5EF` (Fondo cálido y luminoso)
- **Beige Cálido:** `#E9DFCF` (Bordes y separadores sutiles)

*Nota: La tienda incluye un selector interactivo de gemas en la barra superior y en el pie de página que permite alternar entre Rubí, Esmeralda, Zafiro y Amatista en tiempo real, persistiendo la elección en `localStorage`.*

---

## 4. Estado Técnico y Arquitectura para Backend Futuro

Actualmente, las siguientes funcionalidades operan con datos simulados y están preparadas para su conexión con una API REST o base de datos:
1. **Registro permanente de pedidos:** Preparado en `src/pages/Checkout.tsx`. Actualmente genera el resumen y permite enviarlo por WhatsApp.
2. **Pasarelas de Pago Reales:** Identificadas en el checkout como simuladas (Yape, Plin, Transferencia, Tarjeta).
3. **Seguimiento de Courier:** Con interfaz interactiva en `src/pages/OrderTracking.tsx`, señalizada con `PENDIENTE DE CONEXIÓN AL BACKEND`.
4. **Boletín de Newsletter:** Validación en cliente y simulación de registro en `src/pages/Home.tsx`.
