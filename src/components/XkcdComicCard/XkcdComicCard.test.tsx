import React from 'react';
import { render, screen } from '@testing-library/react';
import { XkcdComicCard } from './XkcdComicCard';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { setupRequestMockHandlers } from '@backstage/test-utils';

describe('XkcdComicCard', () => {
  const server = setupServer();
  // Enable sane handlers for network requests
  setupRequestMockHandlers(server);

  // setup mock response
  beforeEach(() => {
    server.use(
      rest.get('https://randomuser.me/*', (_, res, ctx) =>
        res(ctx.status(200), ctx.delay(2000), ctx.json({})),
      ),
    );
  });
  it('should render', async () => {
    await render(<XkcdComicCard />);
    expect(await screen.findByTestId('progress')).toBeInTheDocument();
  });
});
