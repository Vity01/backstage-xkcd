import {createPlugin, createRoutableExtension} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const xkcdPlugin = createPlugin({
  id: 'xkcd',
  routes: {
    root: rootRouteRef,
  },
});

export const XkcdPage = xkcdPlugin.provide(
  createRoutableExtension({
    name: 'XkcdPage',
    component: () =>
      import('./components/Router').then(m => m.Router),
    mountPoint: rootRouteRef,
  }),
);
