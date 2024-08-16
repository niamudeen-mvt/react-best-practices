import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuthUser, userlogout } from '../store/features/authSlice';
import { getDataFromLc, removeDataFromLc } from '../utils/helper';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../utils/axios';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
    const authUser = useSelector((state) => state.authUser.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.get('/user');
            return response?.data?.user || {};
        },
        onSuccess: (user) => {
            dispatch(updateAuthUser(user));
        },
    });

    useEffect(() => {
        mutate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = () => {
        dispatch(userlogout());
        removeDataFromLc('token');
        removeDataFromLc('userId');
        navigate('/');
    };

    const isLoggedIn = getDataFromLc('token');

    return {
        isLoggedIn,
        handleLogout,
        authUser,
    };
}
