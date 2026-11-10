export type Category = 
  | 'Anillos'
  | 'Collares'
  | 'Pulseras'
  | 'Aretes'
  | 'Dijes'
  | 'Conjuntos'
  | 'Personalizados'
  | 'Estuches';

export type Collection = 
  | 'Esencia Dorada'
  | 'Brillo Eterno'
  | 'Minimalismo'
  | 'Elegancia Clásica'
  | 'Momentos Especiales'
  | 'Colección Personalizada';

export interface Product {
  id: number;
  nombre: string;
  categoria: Category;
  coleccion: Collection;
  precio: number;
  precioAnterior: number | null;
  material: string;
  acabado: string;
  descripcion: string;
  detalles: {
    longitud?: string;
    cierre?: string;
    piedras?: string;
    pesoAprox?: string;
    dimensiones?: string;
  };
  imagen: string;
  imagenesSecundarias?: string[];
  stock: number;
  tallas?: number[]; // For rings: e.g. [5, 6, 7, 8, 9]
  longitudes?: string[]; // For necklaces/bracelets: e.g. ['40 cm', '45 cm', '50 cm']
  personalizable: boolean;
  destacado: boolean;
  nuevo: boolean;
  enOferta: boolean;
  rating: number; // Demo rating
  numReviews: number; // Demo reviews count
}

export interface CartItem {
  id: string; // Unique cart item ID (product.id + variant specs)
  productId: number;
  product: Product;
  quantity: number;
  talla?: number;
  longitud?: string;
  personalizacion?: {
    texto?: string;
    inicial?: string;
    tipoGrabado?: string;
    fechaDeseada?: string;
    observaciones?: string;
  };
}

export interface FilterState {
  searchQuery: string;
  categoria: string;
  coleccion: string;
  material: string;
  acabado: string;
  precioMin: number;
  precioMax: number;
  soloEnStock: boolean;
  soloEnOferta: boolean;
  orden: 'recientes' | 'precio-asc' | 'precio-desc' | 'mas-vendidos' | 'mejor-valorados';
}

export type ActivePage = 
  | 'inicio'
  | 'tienda'
  | 'producto'
  | 'colecciones'
  | 'personalizados'
  | 'carrito'
  | 'checkout'
  | 'nosotros'
  | 'contacto'
  | 'guia-tallas'
  | 'cuidado-joyas'
  | 'seguimiento'
  | 'politicas';
