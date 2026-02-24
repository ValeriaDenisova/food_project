import type { RouteObject } from 'react-router';
import App from '../App';
import Recipe from '../App/pages/Recipe';
import Main from '../App/pages/Main';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: ':id',
        element: <Recipe />,
      },
    ],
  },
];
