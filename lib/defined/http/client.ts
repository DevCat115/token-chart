import { DefinedApiResponse } from '@/lib/defined/types';
import { GraphQLClient } from 'graphql-request';
class DefinedHttpApiClient {
  private static instance: DefinedHttpApiClient;
  private client: GraphQLClient;

  private constructor() {
    this.client = new GraphQLClient(process.env.NEXT_PUBLIC_DEFINED_API_URL ?? '', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.NEXT_PUBLIC_DEFINED_API_KEY ?? '',
      },
    });
  }

  /**
   * Get an instance of DefinedApiClient.
   *
   * @return {DefinedHttpApiClient} the instance of DefinedApiClient
   */
  public static getInstance(): DefinedHttpApiClient {
    if (!DefinedHttpApiClient.instance) {
      DefinedHttpApiClient.instance = new DefinedHttpApiClient();
    }

    return DefinedHttpApiClient.instance;
  }

  /**
   * A function that asynchronously sends a GraphQL query and returns the result.
   *
   * @param {string} operationName - the name of the operation
   * @param {string} query - the GraphQL query
   * @param {Record<string, any>} variables - optional variables for the query
   * @return {Promise<T>} a promise that resolves with the result of the query
   */
  async query<T>(
    operationName: string,
    query: string,
    variables?: Record<string, unknown>,
  ): Promise<T> {
    try {
      return this.client.request<DefinedApiResponse<T>>(query, variables).then((res) => {
        return res[operationName];
      });
    } catch (error) {
      throw new Error(`GraphQL query failed: ${error}`);
    }
  }
}

export { DefinedHttpApiClient };
