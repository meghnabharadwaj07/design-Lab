import {Ngo } from '../model/Ngo';
import { CosmosClient } from '@azure/cosmos';
export default class NgoClient {
    private databaseId = process.env.DATABASE_NAME as string;

    private containerName = 'ngo';

    private client: any;

    constructor () {
      this.client = new CosmosClient({
        endpoint: process.env.COSMOSDB_ENDPOINT as string,
        key: process.env.COSMOSDB_KEY as string
    });
    }

    createUpdateProfile = async (ngo: Ngo): Promise<Ngo> => {
        const startTime = Date.now();
        const { item } = await this.client
            .database(this.databaseId)
            .container(this.containerName)
            .items.upsert(ngo);

       return item as any as Ngo;
    };
    public async getProfile (userId: string): Promise<Ngo> {
        
        const querySpec = {
            query: 'SELECT * FROM c WHERE c.id=@userId ',
            parameters: [
                { name: '@userId', value: userId }
                      ]
        };
        const { resources: results } = await this.client
            .database(this.databaseId)
            .container(this.containerName)
            .items.query(querySpec)
            .fetchAll();

        

        return results;
    }

  
}
