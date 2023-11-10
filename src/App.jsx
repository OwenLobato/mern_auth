import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import history from './utils/history';
import { PrivateRoute } from './components/globals';
import { PublicAppRoutes, AppRoutes } from './routes';

function App() {
  return (
    <Router history={history}>
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
    </Router>
  );
}

export default App;
