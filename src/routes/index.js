import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import LandingPage from '../pages/LandingPage';

import NotFoundPage from '../pages/NotFoundPage';
import ProductsPage from '../pages/ProductsPage';
import LoginPage from '../pages/LoginPage';

export const ALL_ROUTES = [
    {
        id: 1,
        path: '/',
        element: <LandingPage />,
        title: 'Home',
    },
    {
        id: 2,
        path: '/login',
        element: <LoginPage />,
        title: 'Login',
        isButton: true,
    },
    {
        id: 3,
        path: '/products',
        element: <ProductsPage />,
        title: 'Products',
        isPrivate: true,
    },
];

export const PRIVATE_ROUTES =
    ALL_ROUTES &&
    ALL_ROUTES.filter((route) => route.isPrivate && !route.isHidden);

export const PUBLIC_ROUTES =
    ALL_ROUTES &&
    ALL_ROUTES.filter((menu) => !menu.isPrivate && !menu.isHidden);

export const _router = createBrowserRouter([
    {
        path: '',
        element: <AppLayout />,
        children: ALL_ROUTES,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
