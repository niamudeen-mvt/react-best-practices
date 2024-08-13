import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LandingPage from "../pages/LandingPage";

import NotFoundPage from "../pages/NotFoundPage";
import ProductsPage from "../pages/ProductsPage";

export const ALL_ROUTES = [
  {
    id: 1,
    path: "/",
    element: <LandingPage />,
    title: "Home",
  },
  {
    id: 2,
    path: "/products",
    element: <ProductsPage />,
    title: "Products",
    isPrivate: true,
  },
];

export const PRIVATE_ROUTES = ALL_ROUTES.filter(
  (route) => route.isPrivate && !route.ishidden
);

export const PUBLIC_ROUTES =
  ALL_ROUTES && ALL_ROUTES.filter((menu) => !menu.isPrivate && !menu.ishidden);

export const _router = createBrowserRouter([
  {
    path: "",
    element: <AppLayout />,
    children: ALL_ROUTES,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
