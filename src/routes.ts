
import AboutPage from './pages/about';
import FormPage from './pages/form';
import Dashboard from './pages/dashboard'
import Family from './pages/family';
import ViewAccount from './pages/AccountDetail';
import AddAccount from './pages/addAccount';
import AuthLandingPage from "@/pages/auth/AuthForm";
import DynamicRoutePage from './pages/dynamic-route';
import LoginPage from "@/pages/auth/login";
import SignupPage from "@/pages/auth/signup";
import NotFoundPage from './pages/404';
import HomePage from './pages/home.js';
import SplashPage from './pages/splash';
import AccountDetail from './pages/AccountDetail';

var routes = [
  {
    path: '/',
    component: SplashPage,
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
    path: '/family/',
    component: Family,
  },
  {
    path: '/product/:id/',
    component: ViewAccount,
  },
  {
    path: "/auth/",
    component: AuthLandingPage,
  },
  {
    path: "/request/new/",
    component: AccountDetail,
  },
  {
    path: "/request/:requestId/edit/",
    component: AccountDetail,
  },

{
  path: "/auth/login/",
  component: LoginPage,
},
{
  path: "/auth/signup/",
  component: SignupPage,
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
