
import HomePage from './pages/home.jsx';
import AboutPage from './pages/about.jsx';
import FormPage from './pages/form.jsx';
import Dashboard from './pages/dashboard.jsx'
import Family from './pages/catalog.jsx';
import ViewAccount from './pages/viewAccount.jsx';
import AddAccount from './pages/addAccount.jsx';

import DynamicRoutePage from './pages/dynamic-route.jsx';
import NotFoundPage from './pages/404.js';

var routes = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/dashboard/',
    component: Dashboard,
  },
  {
    path: '/catalog/',
    component: Family,
  },
  {
    path: '/product/:id/',
    component: ViewAccount,
  },
  {
    path: '/add-account/',
    component: AddAccount,
  },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
