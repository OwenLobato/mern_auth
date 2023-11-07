import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/routing/PrivateRoute';
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Private,
  NotFoundPage,
} from './components/screens';

const PublicAppRoutes = [
  { path: '/*', component: <NotFoundPage /> },
  { path: '/login', component: <Login /> },
  { path: '/register', component: <Register /> },
  { path: '/passwordForgot', component: <ForgotPassword /> },
  { path: '/passwordReset/:resetToken', component: <ResetPassword /> },
];
const AppRoutes = [{ path: '/', component: <Private /> }];

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
