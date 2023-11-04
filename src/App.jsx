import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header, Login, Signup, Welcome } from './components';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          {isLoggedIn && <Route path='/user' element={<Welcome />} />}{' '}
        </Routes>
      </main>
    </>
  );
}

export default App;
