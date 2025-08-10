// Importing necessary modules
import config from './configs/app.config'
import databaseService from './services/database.services/database.service'
import logger from './utils/logger'
import app from './app';
import { initRateLimiter } from './configs/rateLimiter.config';
import { initWebSocketServer } from './ws';
import http from 'http';

const server = http.createServer(app);

initWebSocketServer(server);

server.listen(config.PORT)

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  ; (async () => {
    try {
      // Database Connection
      const connection = await databaseService.connect()
      logger.info(`DATABASE_CONNECTION`, {
        meta: {
          CONNECTION_NAME: connection.name
        }
      })

      initRateLimiter(connection)
      logger.info(`RATE_LIMITER_INITIATED`)


      logger.info(`APPLICATION_STARTED`, {
        meta: {
          PORT: config.PORT,
          SERVER_URL: config.SERVER_URL
        }
      })
    } catch (err) {
      logger.error(`APPLICATION_ERROR`, { meta: err })

      server.close((error) => {
        if (error) {
          logger.error(`APPLICATION_ERROR`, { meta: error })
        }

        process.exit(1)
      })
    }
  })()
