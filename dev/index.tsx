import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { xkcdPlugin, XkcdPage } from '../src/plugin';

createDevApp()
  .registerPlugin(xkcdPlugin)
  .addPage({
    element: <XkcdPage />,
    title: 'XKCD Root Page',
    path: '/xkcd'
  })
  .render();
