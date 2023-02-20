import { Navigate, Outlet } from 'react-router-dom';
import { useGlobalContext } from '../contexts/GlobalContext';

const RequireAuth = ({ redirectPath = '/auth', children }) => {
    const { user } = useGlobalContext();
    return !user ? <Navigate to={redirectPath} replace /> : children || <Outlet />;
};

export default RequireAuth;
