import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import LandingPage from '../pages/LandingPage';

import NotFoundPage from '../pages/NotFoundPage';
import ProductsPage from '../pages/ProductsPage';
import LoginPage from '../pages/LoginPage';
import GalleryPage from '../pages/GalleryPage';

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
    {
        id: 4,
        path: '/gallery-page',
        element: <GalleryPage />,
        title: 'Gallery',
        isPrivate: true,
        ishidden: true,
    },
];

export const PRIVATE_ROUTES =
    (ALL_ROUTES?.length > 0 &&
        ALL_ROUTES.filter((route) => route.isPrivate && !route.ishidden)) ||
    [];

export const PUBLIC_ROUTES =
    (ALL_ROUTES?.length > 0 &&
        ALL_ROUTES.filter((menu) => !menu.isPrivate && !menu.ishidden)) ||
    [];

export const _router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [...PUBLIC_ROUTES, ...PRIVATE_ROUTES],
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
