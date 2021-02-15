import Home from './pages/Home';
import Error404 from './pages/Error404';

const routes: RoutesType = [
  {
    name: 'home',
    url: '/',
    component: Home,
    exact: true,
  },
  {
    name: 'error404',
    url: '**',
    component: Error404,
    exact: false,
  },
];

export {routes};
