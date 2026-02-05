import { createComponentExtension, createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { createCardExtension } from '@backstage/plugin-home-react';
import { LAST_INDEX } from "./config";
import { XkcdComicProps } from './types';


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

export const HomePageXkcdComic = xkcdPlugin.provide(
    createCardExtension<XkcdComicProps>({
        name: 'XkcdComicCard',
        title: 'xkcd',
        description: 'xkcd comic',
        layout: {
            height: {minRows: 1},
            width: {minColumns: 3},
        },
        components: () => import('./components/XkcdComicCardHomePage'),
        settings: {
            schema: {
                title: 'xkcd',
                type: 'object',
                properties: {
                    showNav: {
                        title: 'Show Navigation',
                        type: 'boolean',
                        default: true,
                        description: 'Show navigation buttons'
                    },
                    showExplain: {
                        title: 'Show Explain',
                        type: 'boolean',
                        default: true,
                        description: 'Show an external link to xkcd wiki'
                    },
                    comicNumber: {
                        title: 'Show specific comic number',
                        type: 'number',
                        default: LAST_INDEX,
                        description: 'Show specific comic number. Default - show the last released comic'
                    },
                    title: {
                        title: 'Card title',
                        type: 'string',
                        description: 'Override the card title, which defaults to the name of the comic'
                    }
                },
            },
        },
    }),
);
