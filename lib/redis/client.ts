import { Redis } from 'ioredis';
import { TimeResolution } from '../constants';
export class RedisClient {
  private client: Redis;

  constructor() {
    this.client = new Redis(process.env.REDIS_URL ?? '');
  }

  /**
   * Get the client.
   *
   * @return {Redis} the client
   */
  getClient() {
    return this.client;
  }

  /**
   * Asynchronously sets the value of a key.
   *
   * @param {string} key - the key to set
   * @param {string} value - the value to set for the key
   * @param {number} expirationInSeconds - the expiration time in seconds (optional)
   * @return {Promise<void>} a Promise that resolves when the key is successfully set
   */
  async set(key: string, value: string, expirationInSeconds?: number) {
    try {
      const args: [string, string | number] = [key, value];

      if (expirationInSeconds) {
        args.push(...['EX', expirationInSeconds]);
      }

      await this.client.set(...args);
    } catch (error) {
      this.quit();
      throw error;
    }
  }

  /**
   * A description of the entire function.
   *
   * @param {string} key - description of parameter
   * @return {Promise<T | null>} description of return value
   */
  async get<T>(key: string): Promise<T | null> {
    const result = await this.client.get(key);

    if (result) return JSON.parse(result) as T;

    return null;
  }

  /**
   * Asynchronously retrieves the value associated with the specified key from the cache,
   * or sets the value using the provided data function if the key is not found in the cache.
   *
   * @param {string} key - The key associated with the cached data
   * @param {() => Promise<T>} dataFn - The function that returns the data to be cached
   * @param {number} expirationInSeconds - The expiration time for the cached data in seconds
   * @return {Promise<T>} The cached data associated with the specified key, or the new data if the key is not found
   */
  async getOrSet<T>(
    key: string,
    dataFn: () => Promise<T>,
    expirationInSeconds: number = TimeResolution[5],
  ) {
    const cachedData = await this.get<T>(key);

    if (cachedData && Array.isArray(cachedData) && cachedData.length !== 0) {
      return cachedData;
    }

    const newData = await dataFn();

    await this.set(key, JSON.stringify(newData), expirationInSeconds);

    return newData;
  }

  async quit() {
    await this.client.quit();
  }
}
