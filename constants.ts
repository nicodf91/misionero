import { Product, ProductCategory } from './types';

export const SHIPPING_THRESHOLD = 50000;
export const CUSTOMIZATION_PRICE = 3000;

export const PRODUCTS: Product[] = [
  // Mates
  {
    id: 'm1',
    name: 'Mate Imperial Premium',
    subtitle: 'Cuero crudo y virola de alpaca cincelada',
    price: 32000,
    category: ProductCategory.MATE,
    description: 'Una pieza única hecha a mano por artesanos. El compañero ideal para quien valora la tradición y la elegancia en cada cebada.',
    features: ['Calabaza seleccionada', 'Virola de alpaca', 'Costura tiento'],
    image: 'https://cdn.pixabay.com/photo/2017/07/02/21/16/chimarrao-2465868_1280.jpg',
    tags: ['premium', 'gift_ready'],
    rating: 4.9,
    reviews: 124,
    stock: true,
    color: 'Marrón',
    model: 'Imperial',
    customizable: true
  },
  {
    id: 'm2',
    name: 'Mate Camionero Clásico',
    subtitle: 'Robusto, amplio y compañero',
    price: 18000,
    category: ProductCategory.MATE,
    description: 'El clásico de todos los días. Boca ancha para cebar con comodidad y calabaza gruesa para mantener el sabor.',
    features: ['Boca ancha', 'Alta durabilidad', 'Estilo rústico'],
    image: 'https://cdn.pixabay.com/photo/2021/05/17/04/34/mate-tea-6259745_1280.jpg',
    tags: ['clasico', 'daily'],
    rating: 4.7,
    reviews: 310,
    stock: true,
    color: 'Negro',
    model: 'Camionero',
    customizable: true
  },
  {
    id: 'm3',
    name: 'Mate de Vidrio Forrado',
    subtitle: 'Fácil de limpiar, ideal para empezar',
    price: 8500,
    category: ProductCategory.MATE,
    description: 'Olvidate de curar el mate. Lavalo y usalo. La mejor opción para iniciarte en el mundo del mate sin complicaciones.',
    features: ['No requiere curado', 'Fácil lavado', 'Económico'],
    image: 'https://cdn.pixabay.com/photo/2021/02/03/02/12/mate-5976225_1280.jpg',
    tags: ['beginner_friendly', 'price'],
    rating: 4.5,
    reviews: 89,
    stock: true,
    color: 'Rojo',
    model: 'Urbano',
    customizable: false
  },
  
  // Bombillas
  {
    id: 'b1',
    name: 'Bombilla Pico de Loro Alpaca',
    subtitle: 'Filtrado perfecto y curvatura ergonómica',
    price: 12000,
    category: ProductCategory.BOMBILLA,
    description: 'Diseñada para que el mate no se tape y llegue a la boca con la temperatura justa.',
    features: ['100% Alpaca', 'Filtro ranurado', 'Curva cómoda'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR55yVgP-q3a5x0Wigh2WydY7rK2MqmVkBstQ&s',
    tags: ['premium', 'clasico'],
    rating: 4.8,
    reviews: 200,
    stock: true,
    color: 'Plateado',
    model: 'Pico de Loro'
  },
  {
    id: 'b2',
    name: 'Bombilla Resorte Inox',
    subtitle: 'La todoterreno indestructible',
    price: 4500,
    category: ProductCategory.BOMBILLA,
    description: 'Acero inoxidable de alta calidad con sistema de resorte para un filtrado rápido.',
    features: ['Acero Inoxidable', 'Sistema resorte', 'Eterna'],
    image: 'https://cdn.pixabay.com/photo/2017/06/26/21/08/mate-2445221_1280.jpg',
    tags: ['beginner_friendly', 'daily'],
    rating: 4.6,
    reviews: 150,
    stock: true,
    color: 'Plateado',
    model: 'Resorte'
  },

  // Yerbas
  {
    id: 'y1',
    name: 'Yerba Barbacuá Artesanal',
    subtitle: 'Sabor ahumado intenso, 18 meses de estacionamiento',
    price: 4200,
    category: ProductCategory.YERBA,
    description: 'Para paladares exigentes. Secado lento tipo barbacuá que otorga notas ahumadas y profundas.',
    features: ['Sabor ahumado', 'Estacionamiento natural', 'Sin acidez'],
    image: 'https://cdn.pixabay.com/photo/2017/06/06/23/21/dishes-2378848_1280.jpg',
    tags: ['premium', 'expert'],
    rating: 5.0,
    reviews: 45,
    stock: true,
    model: 'Barbacuá'
  },
  {
    id: 'y2',
    name: 'Yerba Suave Especial',
    subtitle: 'Bajo contenido de polvo, amable con el estómago',
    price: 3500,
    category: ProductCategory.YERBA,
    description: 'Ideal para quienes arrancan o prefieren mates que no laven rápido pero sean gentiles.',
    features: ['Sabor suave', 'Poco polvo', 'Palo equilibrado'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKvU1UV_VbFxbZ76oHtNoAC73KO_nmF7iT1Q&s',
    tags: ['beginner_friendly', 'daily'],
    rating: 4.7,
    reviews: 500,
    stock: true,
    model: 'Suave'
  },

  // Packs
  {
    id: 'p1',
    name: 'Pack Iniciación: "Mi Primer Mate"',
    subtitle: 'Todo lo que necesitás para arrancar sin fallar',
    price: 15000,
    discountPrice: 13500,
    category: ProductCategory.PACK,
    description: 'Incluye Mate de Vidrio, Bombilla Resorte y Yerba Suave. La combinación perfecta para entrar al ritual sin complicaciones.',
    features: ['Ahorrás 10%', 'Guía de "Cómo cebar" incluida', 'Caja de regalo'],
    image: 'https://images.pexels.com/photos/13011098/pexels-photo-13011098.jpeg',
    tags: ['beginner_friendly', 'gift_ready'],
    rating: 4.9,
    reviews: 80,
    stock: true,
    color: 'Beige'
  },
  {
    id: 'p2',
    name: 'Pack Experiencia Premium',
    subtitle: 'El regalo definitivo para el matero de ley',
    price: 48000,
    discountPrice: 42000,
    category: ProductCategory.PACK,
    description: 'Mate Imperial, Bombilla de Alpaca y Yerba Barbacuá. Presentación de lujo.',
    features: ['Selección premium', 'Caja de madera', 'Tarjeta dedicatoria'],
    image: 'https://cdn.pixabay.com/photo/2019/02/17/21/03/yerba-4003176_1280.jpg',
    tags: ['premium', 'gift_ready', 'expert'],
    rating: 5.0,
    reviews: 32,
    stock: true,
    color: 'Negro',
    customizable: true
  }
];

export const TESTIMONIALS = [
  { text: "Nunca supe cómo elegir un mate hasta que usé el asesor. ¡El pack inicial es genial!", author: "Sofía M.", type: "Primeriza" },
  { text: "La calidad del Imperial es increíble. Llegó en 24hs.", author: "Juan P.", type: "Matero Exigente" },
  { text: "Compré un regalo para mi jefe y quedó encantado con la presentación.", author: "Micaela R.", type: "Regalo" }
];
