export class BlockchainDataProvider {
  private data: string[] = [];
  constructor() {
    this.data = (process.env.BLOCKCHAINS ?? '').split(',');
  }

  getData() {
    return this.data;
  }
}
