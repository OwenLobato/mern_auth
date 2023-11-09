import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Private,
} from './components/modules';
import { NotFoundPage } from './components/globals';

export const PublicAppRoutes = [
  { path: '/*', component: <NotFoundPage /> },
  { path: '/login', component: <Login /> },
  { path: '/register', component: <Register /> },
  { path: '/passwordForgot', component: <ForgotPassword /> },
  { path: '/passwordReset/:resetToken', component: <ResetPassword /> },
];

export const AppRoutes = [{ path: '/', component: <Private /> }];
