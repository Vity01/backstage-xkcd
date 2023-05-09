import {createComponentExtension, createPlugin, createRoutableExtension} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import {
  createCardExtension, homePlugin
} from '@backstage/plugin-home';

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

export const XkcdComicCard =
    xkcdPlugin.provide(
        createComponentExtension({
            name: 'XkcdComicCard',
            component: {
                lazy: () =>
                    import('./components/XkcdComicCard').then(
                        m => m.XkcdComicCard,
                    ),
            },
        }),
    );

export const XkcdComicHomePageComponent = homePlugin.provide(
    createCardExtension<{ defaultCategory?: 'any' | 'humor' }>({
        name: 'XkcdComicCard',
        title: 'xkcd',
        components: () => import('./components/XkcdComicCardHomePage'),
        layout: {
            height: { minRows: 1 },
            width: { minColumns: 3 },
        },
        description: 'xkcd comic'
    }),
);