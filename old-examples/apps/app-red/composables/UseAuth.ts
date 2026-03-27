import { IUseAuth } from '../../interfaces/IUseAuth';

const useAuth = (): IUseAuth => {
    const login = async (user = 'qwe', pass = '456') => {
        // Logica di autenticazione
        if (user === 'qwe' && pass === '456') {
            return true;
        } else {
            return false;
        }
    };

    return {
        login,
    };
};

export default useAuth;