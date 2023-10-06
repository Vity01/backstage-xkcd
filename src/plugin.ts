import {
    createComponentExtension,
    createPlugin,
    createReactExtension,
    createRoutableExtension
} from '@backstage/core-plugin-api';

import {rootRouteRef} from './routes';
import {
    homePlugin
} from '@backstage/plugin-home';
import {LAST_INDEX} from "./components/ComicButtons/ComicButtons";


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

export const HomePageXkcdComic = homePlugin.provide(
    createReactExtension({
        name: 'XkcdComicCard',
        data: {
            title: 'xkcd',
            description: 'xkcd comic',
            'home.widget.config': {
                layout: {
                    height: {minRows: 1},
                    width: {minColumns: 3},
                },
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
                            }
                        },
                    },
                },
            },
        },
        component: {
            lazy: () => import('./components/XkcdComicCardHomePage').then(c => c.Content)
        },
    }),
);