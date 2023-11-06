import { useNavigate } from 'react-router-dom';

export const PrivateRoute = (props) => {
  const navigate = useNavigate();

  const authToken = localStorage.getItem('authToken');

  return (
    <>
      {!authToken ? (
        <div>
          <p>NO TIENES PERMISO PARA ESTAR AQUI</p>
          <button onClick={() => navigate('/')}>Ingresar</button>
        </div>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
};
