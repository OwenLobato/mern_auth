import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Private,
  NotFoundPage,
} from './components/screens';

export const PublicAppRoutes = [
  { path: '/*', component: <NotFoundPage /> },
  { path: '/login', component: <Login /> },
  { path: '/register', component: <Register /> },
  { path: '/passwordForgot', component: <ForgotPassword /> },
  { path: '/passwordReset/:resetToken', component: <ResetPassword /> },
];

export const AppRoutes = [{ path: '/', component: <Private /> }];
