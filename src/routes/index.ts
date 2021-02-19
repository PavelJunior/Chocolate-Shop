import Home from '../pages/Home';
import Product from '../pages/Product';
import Error404 from '../pages/Error404';
import Cart from '../pages/Cart';

import {RouteType} from './types';

const routes: RouteType[] = [
  {
    name: 'home',
    url: '/',
    component: Home,
    exact: true,
  },
  {
    name: 'cart',
    url: '/cart',
    component: Cart,
    exact: true,
  },
  {
    name: 'product',
    url: '/product/:id',
    component: Product,
    exact: true,
  },
  {
    url: '**',
    component: Error404,
  },
];

export {routes};
