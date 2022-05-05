import { App } from './app';
import { db } from '@src/external/database/sequelize/database';
import associate from '@src/external/database/sequelize/models/associations';
import dotenv from 'dotenv';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

dotenv.config();

try {
  db.sync();
  console.log('[Connected to Database]');
  associate();
} catch (error) {
  console.log('Could not connect to database');
}

(async (): Promise<void> => {
  try {
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

new App().server.listen(3000, () =>
  console.log('[EXPRESS SERVER RUNNING ON PORT 3000]')
);
