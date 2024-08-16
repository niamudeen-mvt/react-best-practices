import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store';
import { Provider } from 'react-redux';
import { ToastContainerNotification } from './utils/notifications';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 2,
            retryDelay: 1000,
        },
    },
});

root.render(
    <QueryClientProvider client={client}>
        <Provider store={store}>
            <App />
            <ToastContainerNotification />
        </Provider>
    </QueryClientProvider>
);
