import {RouteComponentProps} from '../../routes/types';

export interface ShopState {
  products: ShopStateProduct[];
  cart: ShopStateCartItem[];
}

export type ShopStateProduct = {
  id: number;
  price: number;
  name: string;
  description: string;
  maximumQuantity: number;
  images: string[];
};

export type ShopStateCartItem = {
  id: number;
  price: number;
  name: string;
  description: string;
  maximumQuantity: number;
  images: string[];
  quantity: number;
};
