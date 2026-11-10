/**
 * CONFIGURACIÓN GENERAL DE LA TIENDA DE JOYERÍA
 * Modifica estos valores para personalizar la marca, números de contacto y opciones comerciales.
 */

// Nombre de la marca o joyería (propuesta elegante editable)
export const STORE_NAME = "AURELIA";
export const STORE_FULL_NAME = "AURELIA · Joyería de Lujo";
export const STORE_TAGLINE = "La belleza está en los detalles";

// Paleta principal llamativa de la marca (reemplazo del color negro)
// Opciones disponibles: 'rubi' (#58111A - Borgoña Rubí de Lujo), 'esmeralda' (#0B3B2C), 'zafiro' (#0F2A52), 'amatista' (#4A1238)
export const DEFAULT_COLOR_THEME = 'rubi';

/**
 * CONFIGURACIÓN DE WHATSAPP:
 * Número comercial oficial: 953323578 (Perú: 51953323578)
 */
export const WHATSAPP_NUMBER: string = "51953323578";

// Moneda oficial
export const CURRENCY = "S/";

// Opciones de envío en Perú
export const SHIPPING_CONFIG = {
  limaCost: 10.00,
  provinciasCost: 18.00,
  freeShippingThreshold: 150.00, // Envío gratis a partir de S/ 150
  pickupAddress: "Av. Panamericana (Previa coordinación)",
};

// Datos comerciales oficiales
export const STORE_CONTACT = {
  email: "contacto@aureliajoyeria.pe",
  phone: "+51 953 323 578",
  phoneRaw: "953323578",
  address: "Av. Panamericana, Perú",
  hours: "Lunes a Sábado: 10:00 am - 8:00 pm",
  city: "Av. Panamericana, Perú",
  social: {
    whatsapp: "https://wa.me/51953323578?text=Hola%20Aurelia,%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20joyas",
    facebook: "https://facebook.com/aureliajoyeria",
    instagram: "https://instagram.com/aurelia.joyas",
    tiktok: "https://tiktok.com/@aureliajoyas",
  }
};

// Cupones de descuento para demostración
export const DEMO_COUPONS = [
  { code: "LUJO10", discountPercent: 10, label: "10% de descuento de bienvenida" },
  { code: "AURELIA15", discountPercent: 15, label: "15% en compras mayores a S/ 120" },
  { code: "DETALLE", discountPercent: 5, label: "5% de descuento adicional" },
];

// Departamentos de Perú para el formulario de checkout
export const PERU_DEPARTMENTS = [
  "Lima",
  "Arequipa",
  "Cusco",
  "La Libertad (Trujillo)",
  "Lambayeque (Chiclayo)",
  "Piura",
  "Junín (Huancayo)",
  "Áncash",
  "Ica",
  "Tacna",
  "San Martín",
  "Loreto",
  "Puno",
  "Cajamarca",
  "Ucayali",
  "Huánuco",
  "Ayacucho",
  "Moquegua",
  "Madre de Dios",
  "Pasco",
  "Tumbes",
  "Amazonas",
  "Apurímac",
  "Huancavelica"
];

// Helper para generar URLs seguras de WhatsApp
export function getWhatsAppUrl(message: string): { url: string; isConfigured: boolean } {
  const isConfigured = Boolean(
    WHATSAPP_NUMBER && 
    WHATSAPP_NUMBER !== "51XXXXXXXXX" && 
    !WHATSAPP_NUMBER.includes("X")
  );

  if (!isConfigured) {
    return {
      url: "",
      isConfigured: false,
    };
  }

  const encodedMessage = encodeURIComponent(message.trim());
  return {
    url: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
    isConfigured: true,
  };
}
