import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Login,
  RegisterPassword,
  ForgotPassword,
  ResetPassword,
} from './components/screens';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<RegisterPassword />} />
          <Route path='/passwordForgot' element={<ForgotPassword />} />
          <Route
            path='/passwordReset/:resetToken'
            element={<ResetPassword />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
