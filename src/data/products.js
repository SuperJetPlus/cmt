import mockProducts from './mockProducts';

const featuredIds = ['prod-1', 'prod-5', 'prod-9'];

export const featuredProducts = mockProducts.filter(product =>
  featuredIds.includes(product.id)
);
