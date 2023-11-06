import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/routing/PrivateRoute';
import {
  Login,
  RegisterPassword,
  ForgotPassword,
  ResetPassword,
  Private,
} from './components/screens';

const PublicAppRoutes = [
  { path: '/', component: <Login /> },
  { path: '/register', component: <RegisterPassword /> },
];
const AppRoutes = [
  { path: '/welcome', component: <Private /> },
  { path: '/passwordForgot', component: <ForgotPassword /> },
  { path: '/passwordReset/:resetToken', component: <ResetPassword /> },
];

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          {/* PUBLIC ROUTES*/}
          {PublicAppRoutes.map(({ path, component }, index) => (
            <Route key={index} path={path} element={<>{component}</>} />
          ))}
          {/* PRIVATE ROUTES */}
          {AppRoutes.map(({ path, component }, index) => (
            <Route
              key={index}
              path={path}
              element={
                <>
                  <PrivateRoute>{component}</PrivateRoute>
                </>
              }
            />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
