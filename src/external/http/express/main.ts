import { App } from './app';

new App().server.listen(3000, () =>
  console.log('[EXPRESS SERVER RUNNING ON PORT 3000]')
);