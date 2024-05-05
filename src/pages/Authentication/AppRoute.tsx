import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import App from '../../App';
import AuthRoute from './AuthRoute';

const AppRoute = () => {
  const [userToken, setUserToken] = useState<string | null>(null);

  // Redux
  const token = useSelector((state: RootState) => state.data.token);

  useEffect(() => {
    setUserToken(token);
  }, [token]);

  return userToken ? <App /> : <AuthRoute />;
};

export default AppRoute;
