import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routesConfig } from 'config/routes';
import { AuthProvider } from 'context/AuthContext'; 
import 'config/configureMobX';
import 'styles/index.scss';

const router = createBrowserRouter(routesConfig);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <AuthProvider>
     <RouterProvider router={router} />
     </AuthProvider>
  </StrictMode>
);
