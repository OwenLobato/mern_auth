import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header, Login, Signup, Welcome } from './components';

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/user' element={<Welcome />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
