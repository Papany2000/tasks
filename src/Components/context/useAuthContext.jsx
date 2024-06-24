import { useContext } from 'react';
import { AuthContext } from './AuthContext.js';

export default function useAuthContext() {
    const authContext = useContext(AuthContext)
    return authContext
}