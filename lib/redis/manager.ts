import { RedisClient } from './client';

class RedisManager {
  private static instance: RedisManager;

  private client: RedisClient;
  private publisherClient?: RedisClient;
  private subscriberClient?: RedisClient;

  private constructor() {
    this.client = new RedisClient();
  }

  static getInstance() {
    if (!RedisManager.instance) {
      RedisManager.instance = new RedisManager();
    }

    return RedisManager.instance;
  }

  getClient() {
    return this.client;
  }

  getPublisherClient() {
    if (!this.publisherClient) {
      this.publisherClient = new RedisClient();
    }

    return this.publisherClient;
  }

  getSubscriberClient() {
    if (!this.subscriberClient) {
      this.subscriberClient = new RedisClient();
    }

    return this.subscriberClient;
  }
}

export default RedisManager;
