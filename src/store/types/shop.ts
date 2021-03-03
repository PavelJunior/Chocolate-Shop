export interface ShopState {
  products: ShopStateProduct[];
  cart: ShopStateCartItem[];
}

export type ShopStateProduct = {
  id: string;
  price: number;
  name: string;
  description: string;
  maximumQuantity: number;
  images: string[];
};

export type ShopStateCartItem = {
  id: string;
  price: number;
  name: string;
  description: string;
  maximumQuantity: number;
  images: string[];
  quantity: number;
};
