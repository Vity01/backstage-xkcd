import React from 'react';
import {createDevApp} from '@backstage/dev-utils';
import {xkcdPlugin, XkcdPage} from '../src/plugin';
import { HomePage } from './HomePage';

createDevApp()
    .registerPlugin(xkcdPlugin)
    .addPage({
        element: <XkcdPage/>,
        title: 'XKCD Root Page',
        path: '/xkcd'
    })
    .addPage({
        element: <HomePage/>,
        title: 'Home Page',
        path: '/home',
    })
    .render();
