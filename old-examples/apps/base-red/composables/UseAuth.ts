import { IUseAuth } from '../../interfaces/IUseAuth';

const useAuth = (): IUseAuth => {
    const login = async (user = 'asd', pass = '123') => {
        // Logica di autenticazione
        if (user === 'asd' && pass === '123') {
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