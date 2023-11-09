import { request } from '../utils/requests';

const authVersion = process.env.REACT_APP_AUTH_VERSION;

const useAuth = (headers) => {
  const login = async (email, password) => {
    return await request('POST', `${authVersion}/login`, headers, {
      data: { email, password },
      api: false,
    });
  };

  const register = async (username, email, password) => {
    return await request('POST', `${authVersion}/register`, headers, {
      data: { username, email, password },
      api: false,
    });
  };

  const forgotPassword = async (email) => {
    return await request('POST', `${authVersion}/forgotPassword`, headers, {
      data: { email },
      api: false,
    });
  };

  const resetPassword = async (password, resetToken) => {
    return await request(
      'PUT',
      `${authVersion}/resetPassword/${resetToken}`,
      headers,
      {
        data: { password },
        api: false,
      }
    );
  };

  return {
    login,
    register,
    forgotPassword,
    resetPassword,
  };
};

export default useAuth;
