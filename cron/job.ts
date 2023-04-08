//import fs from 'fs';
import { CronJob } from 'cron';
import RedisManager from '@/lib/redis/manager';
import { CacheKeys, TimeResolution } from '@/lib/constants';
import { DefinedHttpApiClient } from '@/lib/defined/http/client';
import { DefinedHttpApiNetworkClient } from '@/lib/defined/http/clients/network-client';
import { DefinedHttpApiTokenClient } from '@/lib/defined/http/clients/token-client';
import { DefinedApiTimeResolution } from '@/lib/defined/types';
import { Stopwatch } from './stopwatch';

//const jobLockFilePath = './cron/job.lock';
const timerExpr = process.env.CRON_JOB_EXPR ?? '*/5 * * * *'; // 5 minutes

const redisManager = RedisManager.getInstance();
const redisClient = redisManager.getClient();
const redisPublisherClient = redisManager.getPublisherClient().getClient();

const apiClient = DefinedHttpApiClient.getInstance();
const networkClient = new DefinedHttpApiNetworkClient(apiClient, redisClient);
const tokenClient = new DefinedHttpApiTokenClient(apiClient, redisClient);
const stopwatch = new Stopwatch();

console.log('Running job...');
stopwatch.start();

// TODO: CLEAN UP!!
const job = new CronJob(
  timerExpr,
  async () => {
    // if (fs.existsSync(jobLockFilePath)) {
    //   console.log('An existing job is still running. SKIPPING.');
    //   return;
    // }
    //fs.writeFileSync(jobLockFilePath, 'locked');

    const processBatchSize = 5;
    const processBatchDelayInMs = 2500;
    const connectionPool: (() => Promise<void>)[] = [];
    const timeResolutionToSync: DefinedApiTimeResolution[] = ['60', '240', '720', '1D'];
    const networks = await networkClient.getNetworksFromCache();

    const delay = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const processRequestsInBatches = async () => {
      const results = [];

      while (connectionPool.length > 0) {
        const batch = connectionPool.splice(0, processBatchSize);
        const batchResults = await Promise.all(batch.map((promise) => promise()));

        results.push(...batchResults);
      }

      return results;
    };

    timeResolutionToSync.forEach(async (r) => {
      const resolution: DefinedApiTimeResolution = r;

      networks.forEach((n) => {
        connectionPool.push(async () => {
          const topTokenCacheKey = CacheKeys.TOP_TOKEN(resolution, n.id);
          const dataForTopToken = await tokenClient.getTopTokens(resolution, n.id);

          //console.log('Syncing TOP_TOKEN data for:', { id: n.id, name: n.name });
          const topTokenJson = JSON.stringify(dataForTopToken);

          await redisClient.set(topTokenCacheKey, topTokenJson, TimeResolution[15]);
          const topTokenEventName = `top-tkn-updated:${resolution}:ntrwkId:${n.id}`;

          await redisPublisherClient.publish(topTokenEventName, topTokenJson);
          //console.log(`Publising event "${topTokenEventName}"`);

          await delay(processBatchDelayInMs);
        });
      });
    });

    // networks.forEach((n) => {
    //   connectionPool.push(async () => {
    //     const newTokenCacheKey = CacheKeys.NEW_TOKEN(n.id);
    //     const dataForNewToken = await tokenClient.getNewTokens(n.id);

    //     //console.log('Syncing NEW_TOKEN data for:', { id: n.id, name: n.name });
    //     const newTokenJson = JSON.stringify(dataForNewToken);

    //     await redisClient.set(newTokenCacheKey, newTokenJson, TimeResolution[15]);
    //     const newTokenEventName = `new-tkn-updated:ntrwkId:${n.id}`;

    //     await redisPublisherClient.publish(newTokenEventName, newTokenJson);
    //     //console.log(`Publising event "${newTokenEventName}"`);

    //     await delay(processBatchDelayInMs);
    //   });
    // });

    await processRequestsInBatches();

    //fs.unlinkSync(jobLockFilePath);
    console.log('Job complete');
    stopwatch.stop();

    console.log(stopwatch.convertToHHMMSS(stopwatch.getElapsedTime()));
  },
  null,
  true,
  'UTC',
);

job.start();
