import {Donor } from '../model/Donor';
import { CosmosClient } from '@azure/cosmos';
export default class DonorClient {
    private databaseId = process.env.DATABASE_NAME as string;

    private containerName = 'donor';

    private client: any;

    constructor () {
      this.client = new CosmosClient({
        endpoint: process.env.COSMOSDB_ENDPOINT as string,
        key: process.env.COSMOSDB_KEY as string
    });
    }

    createUpdateProfile = async (donor: Donor): Promise<Donor> => {
        const startTime = Date.now();
        const { item } = await this.client
            .database(this.databaseId)
            .container(this.containerName)
            .items.upsert(donor);

       return item as any as Donor;
    };
    public async getProfile (userId: string): Promise<Donor> {
        
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
