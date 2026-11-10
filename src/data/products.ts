import { Product } from '../types';

// Rutas de imágenes generadas localmente
import ringsImg from '../assets/images/category_rings_diamonds_1792438484960.jpg';
import necklaceImg from '../assets/images/category_necklace_pendant_1792438484918.jpg';
import braceletsEarringsImg from '../assets/images/category_bracelets_earrings_1792438485348.jpg';
import heroImg from '../assets/images/hero_luxury_jewelry_1792438483997.jpg';

export { ringsImg, necklaceImg, braceletsEarringsImg, heroImg };

export const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    nombre: "Anillo Aurora",
    categoria: "Anillos",
    coleccion: "Esencia Dorada",
    precio: 79.90,
    precioAnterior: 99.90,
    material: "Acero quirúrgico con baño dorado",
    acabado: "Dorado champán brillante",
    descripcion: "Anillo solitario de diseño contemporáneo coronado con una circonia cúbica corte esmeralda y engaste refinado.",
    detalles: {
      dimensiones: "Piedra central: 6 mm x 4 mm",
      pesoAprox: "3.2 g",
      piedras: "Circonia cúbica calidad AAA"
    },
    imagen: ringsImg,
    stock: 8,
    tallas: [5, 6, 7, 8, 9],
    personalizable: false,
    destacado: true,
    nuevo: true,
    enOferta: true,
    rating: 4.9,
    numReviews: 28
  },
  {
    id: 2,
    nombre: "Collar Luz de Luna",
    categoria: "Collares",
    coleccion: "Brillo Eterno",
    precio: 99.90,
    precioAnterior: 129.90,
    material: "Acero inoxidable hipoalergénico",
    acabado: "Dorado cálido martillado",
    descripcion: "Delicada cadena de eslabones finos con dije medallón circular texturizado y micro-cristal central que refleja la luz suavemente.",
    detalles: {
      longitud: "Cadena ajustable 40 cm + 5 cm de extensión",
      cierre: "Mosquetón de seguridad",
      dimensiones: "Dije de 14 mm de diámetro"
    },
    imagen: necklaceImg,
    longitudes: ["40 cm", "45 cm"],
    stock: 12,
    personalizable: false,
    destacado: true,
    nuevo: false,
    enOferta: true,
    rating: 5.0,
    numReviews: 42
  },
  {
    id: 3,
    nombre: "Pulsera Elegance Tenis",
    categoria: "Pulseras",
    coleccion: "Elegancia Clásica",
    precio: 149.90,
    precioAnterior: 189.90,
    material: "Acero inoxidable bañado en oro",
    acabado: "Dorado pulido",
    descripcion: "Pulsera estilo tenis con engaste continuo de circonias facetadas en cuatro uñas, brindando un destello ininterrumpido en la muñeca.",
    detalles: {
      longitud: "17 cm con extensión a 19 cm",
      cierre: "Cierre de doble traba de seguridad",
      piedras: "Circonias cúbicas engastadas a mano"
    },
    imagen: braceletsEarringsImg,
    longitudes: ["17 cm", "19 cm"],
    stock: 6,
    personalizable: false,
    destacado: true,
    nuevo: false,
    enOferta: true,
    rating: 4.8,
    numReviews: 19
  },
  {
    id: 4,
    nombre: "Aretes Destello Circonia",
    categoria: "Aretes",
    coleccion: "Brillo Eterno",
    precio: 49.90,
    precioAnterior: 65.00,
    material: "Acero quirúrgico antialérgico",
    acabado: "Dorado champán",
    descripcion: "Aretes colgantes en cascada con silueta de lágrima y circonias que capturan el movimiento con total delicadeza.",
    detalles: {
      cierre: "Aro con pasador huggie articulado",
      dimensiones: "Largo total 32 mm",
      pesoAprox: "4.1 g el par"
    },
    imagen: braceletsEarringsImg,
    stock: 14,
    personalizable: false,
    destacado: true,
    nuevo: true,
    enOferta: true,
    rating: 4.9,
    numReviews: 35
  },
  {
    id: 5,
    nombre: "Anillo Brillo Eterno",
    categoria: "Anillos",
    coleccion: "Brillo Eterno",
    precio: 89.90,
    precioAnterior: null,
    material: "Acero inoxidable pulido",
    acabado: "Doble acabado: dorado y rodio plateado",
    descripcion: "Elegante alianza con media vuelta pavé de micro-circonias, ideal como anillo de aniversario o para combinar en layering.",
    detalles: {
      dimensiones: "Ancho de banda: 2.2 mm",
      pesoAprox: "2.8 g"
    },
    imagen: ringsImg,
    stock: 10,
    tallas: [6, 7, 8],
    personalizable: false,
    destacado: true,
    nuevo: true,
    enOferta: false,
    rating: 4.9,
    numReviews: 24
  },
  {
    id: 6,
    nombre: "Collar Inicial Personalizada",
    categoria: "Personalizados",
    coleccion: "Colección Personalizada",
    precio: 89.90,
    precioAnterior: 110.00,
    material: "Acero inoxidable 316L",
    acabado: "Dorado o plateado a elección",
    descripcion: "Collar personalizable con medalla circular grabada en láser de precisión con tu inicial o la de esa persona especial.",
    detalles: {
      longitud: "45 cm regulable",
      dimensiones: "Medalla de 15 mm de diámetro",
      cierre: "Reasa clásica resistente"
    },
    imagen: necklaceImg,
    longitudes: ["40 cm", "45 cm", "50 cm"],
    stock: 25,
    personalizable: true,
    destacado: true,
    nuevo: true,
    enOferta: true,
    rating: 5.0,
    numReviews: 53
  },
  {
    id: 7,
    nombre: "Cadena Minimal Eslabón",
    categoria: "Collares",
    coleccion: "Minimalismo",
    precio: 59.90,
    precioAnterior: null,
    material: "Acero inoxidable",
    acabado: "Dorado mate satinado",
    descripcion: "Gargantilla de eslabón alargado estilo clip paper, el accesorio atemporal indispensable para llevar solo o en capas.",
    detalles: {
      longitud: "42 cm con extensor de 5 cm",
      dimensiones: "Eslabón de 10 mm x 3 mm",
      cierre: "Mosquetón estilizado"
    },
    imagen: necklaceImg,
    longitudes: ["42 cm", "48 cm"],
    stock: 15,
    personalizable: false,
    destacado: false,
    nuevo: false,
    enOferta: false,
    rating: 4.7,
    numReviews: 16
  },
  {
    id: 8,
    nombre: "Pulsera Infinito Doble Hilo",
    categoria: "Pulseras",
    coleccion: "Momentos Especiales",
    precio: 69.90,
    precioAnterior: 85.00,
    material: "Acero inoxidable",
    acabado: "Dorado brillante",
    descripcion: "Brazalete de dos cadenas entrelazadas que culminan en un dije de infinito estilizado con micro pavé.",
    detalles: {
      longitud: "16 cm + 4 cm de extensión",
      cierre: "Broche langosta"
    },
    imagen: braceletsEarringsImg,
    stock: 9,
    personalizable: false,
    destacado: false,
    nuevo: false,
    enOferta: true,
    rating: 4.8,
    numReviews: 22
  },
  {
    id: 9,
    nombre: "Dije Corazón Dorado",
    categoria: "Dijes",
    coleccion: "Momentos Especiales",
    precio: 39.90,
    precioAnterior: 49.90,
    material: "Acero inoxidable",
    acabado: "Dorado alto brillo",
    descripcion: "Dije de corazón abombado con pulido espejo. Compatible con cadenas de hasta 3 mm de grosor.",
    detalles: {
      dimensiones: "16 mm x 15 mm",
      pesoAprox: "1.9 g"
    },
    imagen: necklaceImg,
    stock: 20,
    personalizable: true,
    destacado: false,
    nuevo: false,
    enOferta: true,
    rating: 4.8,
    numReviews: 31
  },
  {
    id: 10,
    nombre: "Conjunto Perla Real",
    categoria: "Conjuntos",
    coleccion: "Elegancia Clásica",
    precio: 139.90,
    precioAnterior: 179.90,
    material: "Acero inoxidable y perla sintética de río",
    acabado: "Dorado champán y nácar perlado",
    descripcion: "Juego completo que incluye collar con dije de perla barroca cultivada sintética y aretes a juego en base dorada.",
    detalles: {
      dimensiones: "Perlas de 9-10 mm",
      longitud: "Collar de 45 cm",
      cierre: "Cierre omega en aretes"
    },
    imagen: heroImg,
    stock: 5,
    personalizable: false,
    destacado: true,
    nuevo: false,
    enOferta: true,
    rating: 5.0,
    numReviews: 18
  },
  {
    id: 11,
    nombre: "Anillo Solitario Promesa",
    categoria: "Anillos",
    coleccion: "Momentos Especiales",
    precio: 99.90,
    precioAnterior: null,
    material: "Acero quirúrgico con baño en rodio plateado",
    acabado: "Plateado espejo",
    descripcion: "Anillo de compromiso y promesa con piedra central corte brillante de 6 puntas y silueta cónica esbelta.",
    detalles: {
      dimensiones: "Circonia principal de 6.5 mm",
      pesoAprox: "3.5 g"
    },
    imagen: ringsImg,
    stock: 7,
    tallas: [5, 6, 7, 8, 9],
    personalizable: false,
    destacado: true,
    nuevo: true,
    enOferta: false,
    rating: 4.9,
    numReviews: 29
  },
  {
    id: 12,
    nombre: "Arracadas Finas Minimal",
    categoria: "Aretes",
    coleccion: "Minimalismo",
    precio: 39.90,
    precioAnterior: null,
    material: "Acero inoxidable",
    acabado: "Dorado suave",
    descripcion: "Aros tubulares ultraligeros de 20 mm de diámetro, diseñados para el uso cotidiano sin sobrecargar el lóbulo.",
    detalles: {
      dimensiones: "Diámetro 20 mm, grosor 2.5 mm",
      cierre: "Bisagra oculta tipo clip"
    },
    imagen: braceletsEarringsImg,
    stock: 18,
    personalizable: false,
    destacado: false,
    nuevo: false,
    enOferta: false,
    rating: 4.7,
    numReviews: 14
  },
  {
    id: 13,
    nombre: "Brazalete Rígido Dorado",
    categoria: "Pulseras",
    coleccion: "Esencia Dorada",
    precio: 79.90,
    precioAnterior: 95.00,
    material: "Acero inoxidable macizo",
    acabado: "Dorado pulido espejo",
    descripcion: "Pulsera rígida de bisagra con diseño oval ergonómico que abraza la muñeca de forma impecable.",
    detalles: {
      dimensiones: "Diámetro interior: 58 mm x 50 mm",
      cierre: "Cierre invisible de presión"
    },
    imagen: braceletsEarringsImg,
    stock: 11,
    personalizable: true,
    destacado: false,
    nuevo: true,
    enOferta: true,
    rating: 4.9,
    numReviews: 27
  },
  {
    id: 14,
    nombre: "Collar Doble Cadena y Moneda",
    categoria: "Collares",
    coleccion: "Esencia Dorada",
    precio: 85.90,
    precioAnterior: 105.00,
    material: "Acero inoxidable",
    acabado: "Dorado vintage",
    descripcion: "Diseño compuesto de dos alturas: una gargantilla lisa y una cadena caída con medalla de relieve botánico.",
    detalles: {
      longitud: "38 cm y 44 cm en un solo broche",
      dimensiones: "Medalla de 18 mm"
    },
    imagen: necklaceImg,
    stock: 8,
    personalizable: false,
    destacado: false,
    nuevo: false,
    enOferta: true,
    rating: 4.8,
    numReviews: 12
  },
  {
    id: 15,
    nombre: "Anillo Sello Clásico Rectangular",
    categoria: "Anillos",
    coleccion: "Minimalismo",
    precio: 69.90,
    precioAnterior: null,
    material: "Acero inoxidable",
    acabado: "Dorado cepillado",
    descripcion: "Anillo de sello moderno con meseta rectangular plana, diseñado para uso individual o para grabar iniciales.",
    detalles: {
      dimensiones: "Superficie de grabado: 12 mm x 8 mm",
      pesoAprox: "5.4 g"
    },
    imagen: ringsImg,
    stock: 10,
    tallas: [6, 7, 8, 9],
    personalizable: true,
    destacado: false,
    nuevo: false,
    enOferta: false,
    rating: 4.8,
    numReviews: 21
  },
  {
    id: 16,
    nombre: "Dije Medalla Astral",
    categoria: "Dijes",
    coleccion: "Esencia Dorada",
    precio: 45.90,
    precioAnterior: null,
    material: "Acero inoxidable",
    acabado: "Dorado cálido",
    descripcion: "Medalla con grabado astral de sol y estrella del norte adornada con punto de luz cristalino central.",
    detalles: {
      dimensiones: "Diámetro 18 mm",
      pesoAprox: "2.4 g"
    },
    imagen: necklaceImg,
    stock: 14,
    personalizable: false,
    destacado: false,
    nuevo: true,
    enOferta: false,
    rating: 4.9,
    numReviews: 15
  },
  {
    id: 17,
    nombre: "Aretes Candongas Perla Barroca",
    categoria: "Aretes",
    coleccion: "Elegancia Clásica",
    precio: 54.90,
    precioAnterior: 69.90,
    material: "Acero bañado en oro y perla de agua dulce reconstituida",
    acabado: "Dorado pulido y perla natural",
    descripcion: "Aros huggie con colgante desmontable de perla barroca. Permite llevarse en dos estilos distintos.",
    detalles: {
      dimensiones: "Aro de 12 mm, largo total 28 mm",
      cierre: "Cierre clic seguro"
    },
    imagen: braceletsEarringsImg,
    stock: 13,
    personalizable: false,
    destacado: false,
    nuevo: false,
    enOferta: true,
    rating: 4.9,
    numReviews: 33
  },
  {
    id: 18,
    nombre: "Brazalete con Coordenadas Personalizadas",
    categoria: "Personalizados",
    coleccion: "Colección Personalizada",
    precio: 95.00,
    precioAnterior: 119.00,
    material: "Acero inoxidable de alta densidad",
    acabado: "Dorado o plateado mate",
    descripcion: "Brazalete de placa fina donde puedes inmortalizar las coordenadas del lugar donde se conocieron, una fecha o una palabra.",
    detalles: {
      dimensiones: "Placa de 40 mm x 5 mm",
      longitud: "Ajustable de 15 cm a 20 cm"
    },
    imagen: braceletsEarringsImg,
    stock: 15,
    personalizable: true,
    destacado: true,
    nuevo: true,
    enOferta: true,
    rating: 5.0,
    numReviews: 38
  },
  {
    id: 19,
    nombre: "Conjunto Nupcial Eternidad",
    categoria: "Conjuntos",
    coleccion: "Momentos Especiales",
    precio: 189.90,
    precioAnterior: 229.90,
    material: "Acero quirúrgico con rodio plateado y circonias",
    acabado: "Plateado brillante de alta pureza",
    descripcion: "Exclusivo set de collar y pulsera a juego con engaste pavé continuo, pensado para novias, graduaciones y galas.",
    detalles: {
      longitud: "Collar 42 cm, Pulsera 18 cm",
      cierre: "Broche joyero con seguro lateral"
    },
    imagen: heroImg,
    stock: 4,
    personalizable: false,
    destacado: true,
    nuevo: false,
    enOferta: true,
    rating: 5.0,
    numReviews: 11
  },
  {
    id: 20,
    nombre: "Anillo Banda Facetada Plata",
    categoria: "Anillos",
    coleccion: "Minimalismo",
    precio: 49.90,
    precioAnterior: null,
    material: "Acero inoxidable plateado",
    acabado: "Plateado con facetado geométrico",
    descripcion: "Banda de perfil facetado que produce destellos en múltiples ángulos gracias a sus caras pulidas.",
    detalles: {
      dimensiones: "Ancho: 3 mm",
      pesoAprox: "3.1 g"
    },
    imagen: ringsImg,
    stock: 12,
    tallas: [6, 7, 8, 9],
    personalizable: false,
    destacado: false,
    nuevo: false,
    enOferta: false,
    rating: 4.6,
    numReviews: 9
  },
  {
    id: 21,
    nombre: "Collar Gargantilla Eslabón Grueso",
    categoria: "Collares",
    coleccion: "Esencia Dorada",
    precio: 79.90,
    precioAnterior: 95.00,
    material: "Acero inoxidable hueco ligero",
    acabado: "Dorado de alto lustre",
    descripcion: "Cadena de eslabón trenzado gourmette con presencia escénica, sorprendentemente liviana para llevar todo el día.",
    detalles: {
      longitud: "42 cm",
      dimensiones: "Ancho de eslabón: 6 mm"
    },
    imagen: necklaceImg,
    stock: 9,
    personalizable: false,
    destacado: false,
    nuevo: false,
    enOferta: true,
    rating: 4.8,
    numReviews: 17
  },
  {
    id: 22,
    nombre: "Estuche de Joyería Terciopelo Esmeralda",
    categoria: "Estuches",
    coleccion: "Momentos Especiales",
    precio: 35.00,
    precioAnterior: null,
    material: "Estructura rígida forrada en suave terciopelo",
    acabado: "Verde esmeralda y herraje dorado",
    descripcion: "Caja de regalo premium acolchada interiormente con ranuras protectoras para anillo, aretes o dije delicado.",
    detalles: {
      dimensiones: "7 cm x 7 cm x 5 cm",
      pesoAprox: "95 g"
    },
    imagen: heroImg,
    stock: 30,
    personalizable: false,
    destacado: false,
    nuevo: true,
    enOferta: false,
    rating: 5.0,
    numReviews: 25
  },
  {
    id: 23,
    nombre: "Caja Organizadora Marfil para Joyas",
    categoria: "Estuches",
    coleccion: "Elegancia Clásica",
    precio: 89.90,
    precioAnterior: 110.00,
    material: "Ecopiel textura saffiano con forro de ante",
    acabado: "Marfil con broche dorado champaña",
    descripcion: "Joyero de viaje con doble compartimento: espacio para 6 anillos, 4 ganchos para cadenas con bolsillo y divisores ajustables.",
    detalles: {
      dimensiones: "16 cm x 11 cm x 5 cm",
      cierre: "Broche a presión con botón bañado"
    },
    imagen: heroImg,
    stock: 14,
    personalizable: false,
    destacado: false,
    nuevo: false,
    enOferta: true,
    rating: 4.9,
    numReviews: 30
  },
  {
    id: 24,
    nombre: "Anillo Sello con Letra Cursiva",
    categoria: "Personalizados",
    coleccion: "Colección Personalizada",
    precio: 75.00,
    precioAnterior: 90.00,
    material: "Acero inoxidable",
    acabado: "Dorado espejo",
    descripcion: "Anillo sello ovalado grabado con la inicial caligráfica que elijas. Elegante, sobrio y personal.",
    detalles: {
      dimensiones: "Meseta oval: 10 mm x 8 mm",
      pesoAprox: "3.9 g"
    },
    imagen: ringsImg,
    stock: 16,
    tallas: [5, 6, 7, 8],
    personalizable: true,
    destacado: true,
    nuevo: true,
    enOferta: true,
    rating: 4.9,
    numReviews: 44
  }
];

// Categorías oficiales con metadatos
export const CATEGORIES_DATA = [
  {
    nombre: "Anillos",
    descripcion: "Solitarios, alianzas de compromiso y sellos contemporáneos.",
    imagen: ringsImg,
    cantidad: 5
  },
  {
    nombre: "Collares",
    descripcion: "Cadenas finas, gargantillas y medallones con luz propia.",
    imagen: necklaceImg,
    cantidad: 5
  },
  {
    nombre: "Pulseras",
    descripcion: "Brazaletes rígidos y pulseras tenis con acabados impecables.",
    imagen: braceletsEarringsImg,
    cantidad: 4
  },
  {
    nombre: "Aretes",
    descripcion: "Arracadas, candongas y pendientes en cascada luminosa.",
    imagen: braceletsEarringsImg,
    cantidad: 4
  },
  {
    nombre: "Dijes",
    descripcion: "Colgantes con simbolismo para acompañar tus cadenas.",
    imagen: necklaceImg,
    cantidad: 2
  },
  {
    nombre: "Conjuntos",
    descripcion: "Sets coordinados para ocasiones únicas y regalos memorables.",
    imagen: heroImg,
    cantidad: 2
  },
  {
    nombre: "Personalizados",
    descripcion: "Piezas grabadas con nombres, fechas e iniciales.",
    imagen: necklaceImg,
    cantidad: 3
  },
  {
    nombre: "Estuches",
    descripcion: "Cajas y organizadores para el cuidado de tus tesoros.",
    imagen: heroImg,
    cantidad: 2
  }
];

// Colecciones emblemáticas
export const COLLECTIONS_DATA = [
  {
    nombre: "Esencia Dorada",
    lema: "El resplandor cálido de la distinción",
    descripcion: "Piezas con baños dorados intensos inspirados en la luz solar y la sofisticación contemporánea.",
    imagen: heroImg,
  },
  {
    nombre: "Brillo Eterno",
    lema: "Destellos puros que nunca se apagan",
    descripcion: "Circonias de corte diamante engastadas a mano para celebrar promesas y fechas inolvidables.",
    imagen: ringsImg,
  },
  {
    nombre: "Minimalismo",
    lema: "Líneas depuradas, presencia rotunda",
    descripcion: "Geometría esencial y acabados limpios que complementan el estilo diario con absoluta sutileza.",
    imagen: necklaceImg,
  },
  {
    nombre: "Elegancia Clásica",
    lema: "La atemporalidad de lo bien hecho",
    descripcion: "Perlas seleccionadas y formas tradicionales reinterpretadas para la mujer actual.",
    imagen: heroImg,
  },
  {
    nombre: "Momentos Especiales",
    lema: "Joyas que atesoran tus mayores memorias",
    descripcion: "Anillos de compromiso, conjuntos nupciales y piezas diseñadas para conmemorar grandes pasos.",
    imagen: ringsImg,
  },
  {
    nombre: "Colección Personalizada",
    lema: "Una joya, una historia única",
    descripcion: "Graba iniciales, nombres y coordenadas geográficas para llevar tu historia siempre contigo.",
    imagen: necklaceImg,
  }
];

// Testimonios de demostración identificados claramente como demo
export const DEMO_TESTIMONIALS = [
  {
    id: 1,
    cliente: "Camila V. (Lima)",
    comentario: "El Anillo Aurora superó mis expectativas. El brillo de la piedra y el acabado dorado se ven finísimos. La presentación en estuche es impecable.",
    rating: 5,
    producto: "Anillo Aurora",
    fecha: "Demo reciente"
  },
  {
    id: 2,
    cliente: "Mateo R. (Arequipa)",
    comentario: "Compré el collar con inicial personalizada para el aniversario de mi novia. La atención por WhatsApp fue muy amable y el grabado quedó perfecto.",
    rating: 5,
    producto: "Collar Inicial Personalizada",
    fecha: "Demo reciente"
  },
  {
    id: 3,
    cliente: "Luciana G. (Trujillo)",
    comentario: "La pulsera tenis tiene un broche muy seguro y las circonias no se enganchan en la ropa. Se nota el cuidado en los detalles.",
    rating: 5,
    producto: "Pulsera Elegance Tenis",
    fecha: "Demo reciente"
  }
];
