import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routesConfig } from 'config/routes';
import 'config/configureMobX';
import 'styles/index.scss';
import { RootStoreProvider } from 'store/globals/root/RootStore';

const router = createBrowserRouter(routesConfig);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <RootStoreProvider>
      <RouterProvider router={router} />
    </RootStoreProvider>
  </StrictMode>
);
