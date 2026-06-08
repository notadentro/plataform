export type ProductCategory = 'virtual' | 'physical' | 'cosmetic' | 'lives';
export type CurrencyType = 'cache' | 'brl';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  currency: CurrencyType;
  image?: string;
  stock?: number; // Relevante para produtos físicos
  metadata?: any; // Informações adicionais (cores, tamanhos, quantidade de vidas concedidas, etc)
  isActive: boolean;
}
