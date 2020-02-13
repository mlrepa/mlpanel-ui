import urlPaths from './constants/urlPaths';

// Pages
import Tours from './pages/tours';

const routes = [
  {
    id: 0,
    exact: true,
    path: urlPaths.ROOT_PATH,
    component: Tours
  },
  {
    id: 1,
    exact: true,
    path: urlPaths.TOURS_PAGE_PATH,
    component: Tours
  }
];

export default routes;
