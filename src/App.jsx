import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/routing/PrivateRoute';
import { PublicAppRoutes, AppRoutes } from './routes';

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
