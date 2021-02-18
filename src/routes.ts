import Home from './pages/Home';
import Product from './pages/Product';
import Error404 from './pages/Error404';

const routes: RoutesType = [
  {
    name: 'home',
    url: '/',
    component: Home,
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
