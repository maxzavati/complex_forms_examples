import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Loader } from './components/ui/loader';

const DynamicNestedFormsView = lazy(() =>
  import('./features/dynamic-nested-forms').then((module) => ({
    default: module.DynamicNestedFormsView,
  }))
);

const ServerSideDataGridView = lazy(() =>
  import('./features/server-side-data-grid').then((module) => ({
    default: module.ServerSideDataGridView,
  }))
);

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: (
      <Suspense fallback={<Loader />}>
        <DynamicNestedFormsView />
      </Suspense>
    ),
  },
  {
    path: '/data-grid',
    element: (
      <Suspense fallback={<Loader />}>
        <ServerSideDataGridView />
      </Suspense>
    ),
  },
]);

export default router;
