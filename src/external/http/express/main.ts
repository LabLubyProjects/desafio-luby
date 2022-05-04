import { App } from './app';
import { db } from '@src/external/database/sequelize/database';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

(async (): Promise<void> => {
  try {
    await db.authenticate();
    console.log("[Connected to Database]")

    new App().server.listen(3000, () =>
      console.log('[EXPRESS SERVER RUNNING ON PORT 3000]')
    );

    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    exitSignals.map((sig) =>
      process.on(sig, async () => {
        try {
          db.close();
          console.log('[Database Conection Closed]');
          process.exit(ExitStatus.Success);
        } catch (error) {
          process.exit(ExitStatus.Failure);
        }
      })
    );
  } catch (error) {
    process.exit(ExitStatus.Failure);
  }
})();
