import { FiClock, FiShoppingBag, FiPercent } from 'react-icons/fi';

export const promotions = [
  {
    id: 1,
    title: "Oferta Relámpago",
    description: "20% de descuento en productos seleccionados",
    icon: <FiClock className="promo-icon" />,
    duration: 5 * 60 * 60, // 5 horas en segundos
    promoCode: "FLASH20"
  },
  {
    id: 2,
    title: "Compra Grande",
    description: "Envío gratis en compras mayores a $500",
    icon: <FiShoppingBag className="promo-icon" />,
    duration: 24 * 60 * 60, // 1 día
    promoCode: "GRATISENVIO"
  },
  {
    id: 3,
    title: "Nuevos Clientes",
    description: "15% de descuento en tu primera compra",
    icon: <FiPercent className="promo-icon" />,
    duration: null, // permanente
    promoCode: "BIENVENIDO15"
  }
];
