import camisaAlgodon from '../components/assets/inventory/camisa-algodon.jpg';
import pantalonesJeans from '../components/assets/inventory/pantalones-jeans.jpg';
import chaquetaCuero from '../components/assets/inventory/chaqueta-cuero.jpg';
import zapatillasDeportivas from '../components/assets/inventory/zapatillas-deportivas.jpg';
import bufandaLana from '../components/assets/inventory/bufanda-lana.jpg';
import toallaAlgodon from '../components/assets/inventory/toalla-algodon.jpg';
import mantelBordado from '../components/assets/inventory/mantel-bordado.jpg';
import bolsoReciclado from '../components/assets/inventory/bolso-reciclado.jpg';
import ponchoAndino from '../components/assets/inventory/poncho-andino.jpg';
import alfombraTejida from '../components/assets/inventory/alfombra-tejida.jpg';
import pantalonEntrenamiento from "../components/assets/inventory/pantalon-entrenamiento.jpg"

const mockProducts = [ 
  {
    id: 'prod-1',
    name: 'Camisa de Algodón',
    price: 29.99,
    image: camisaAlgodon,
    rating: 4.5,
    stock: 85,
    description: 'Camisa de algodón 100% suave y transpirable.',
    category: 'Ropa'
  },
  {
    id: 'prod-2',
    name: 'Pantalones Jeans',
    price: 49.99,
    image: pantalonesJeans,
    rating: 4.7,
    stock: 65,
    description: 'Jeans clásicos de corte recto con bolsillos reforzados.',
    category: 'Ropa'
  },
  {
    id: 'prod-3',
    name: 'Chaqueta de Cuero',
    price: 89.99,
    image: chaquetaCuero,
    rating: 4.2,
    stock: 30,
    description: 'Chaqueta de cuero sintético resistente al viento.',
    category: 'Ropa'
  },
  {
    id: 'prod-4',
    name: 'Zapatillas Deportivas',
    price: 59.99,
    image: zapatillasDeportivas,
    rating: 4.3,
    stock: 24,
    description: 'Zapatillas ligeras con suela antideslizante.',
    category: 'Deportes'
  },
  {
    id: 'prod-5',
    name: 'Bufanda de Lana',
    price: 19.99,
    image: bufandaLana,
    rating: 4.8,
    stock: 30,
    description: 'Bufanda hecha con lana natural, ideal para el invierno.',
    category: 'Ropa'
  },
  {
    id: 'prod-6',
    name: 'Toalla de Algodón',
    price: 14.99,
    image: toallaAlgodon,
    rating: 4.6,
    stock: 50,
    description: 'Toalla absorbente 100% algodón suave al tacto.',
    category: 'Hogar'
  },
  {
    id: 'prod-7',
    name: 'Mantel Bordado',
    price: 34.99,
    image: mantelBordado,
    rating: 4.4,
    stock: 28,
    description: 'Mantel de mesa bordado a mano con diseño tradicional.',
    category: 'Hogar'
  },
  {
    id: 'prod-8',
    name: 'Bolso de Tela Reciclada',
    price: 9.99,
    image: bolsoReciclado,
    rating: 4.5,
    stock: 0,
    description: 'Bolso ecológico confeccionado con tela reciclada.',
    category: 'Ropa'
  },
  {
    id: 'prod-9',
    name: 'Poncho Andino',
    price: 74.99,
    image: ponchoAndino,
    rating: 4.9,
    stock: 19,
    description: 'Poncho tradicional hecho con tejidos andinos.',
    category: 'Ropa'
  },
  {
    id: 'prod-10',
    name: 'Alfombra Tejida a Mano',
    price: 129.99,
    image: alfombraTejida,
    rating: 4.7,
    stock: 32,
    description: 'Alfombra artesanal con diseños étnicos coloridos.',
    category: 'Hogar'
  },
  {
    id: 'prod-11',
    name: 'Pantalón de Entrenamiento',
    price: 99.99,
    image: pantalonEntrenamiento,
    rating: 4.6,
    stock: 42,
    description: 'Pantalón de poliester para entrenamiento.',
    category: 'Deportes'
  }
];

export default mockProducts;