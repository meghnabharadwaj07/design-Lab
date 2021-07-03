import {Donation} from '../model/Donation';
import { CosmosClient } from '@azure/cosmos';
export default class DonationClient {
    private databaseId = process.env.DATABASE_NAME as string;

    private containerName = 'donation';

    private client: any;

    constructor () {
      this.client = new CosmosClient({
        endpoint: process.env.COSMOSDB_ENDPOINT as string,
        key: process.env.COSMOSDB_KEY as string
    });
    }

    createUpdateDonation = async (donation:Donation): Promise<Donation> => {
        
        const { item } = await this.client
            .database(this.databaseId)
            .container(this.containerName)
            .items.upsert(Donation);

       return item as any as Donation;
    };
    public async getDonation (postId: string): Promise<Donation[]> {
        
        const querySpec = {
            query: 'SELECT * FROM c WHERE c.postId=@postId ',
            parameters: [
                { name: '@postId', value: postId }
                      ]
        };
        const { resources: results } = await this.client
            .database(this.databaseId)
            .container(this.containerName)
            .items.query(querySpec)
            .fetchAll();

        

        return results;
    };
        public async getOneDonation (donationId: string): Promise<Donation> {
        
        const querySpec = {
            query: 'SELECT * FROM c WHERE c.id=@donationId ',
            parameters: [
                { name: '@donationId', value: donationId }
                      ]
        };
        const { resources: results } = await this.client
            .database(this.databaseId)
            .container(this.containerName)
            .items.query(querySpec)
            .fetchAll();

        

        return results;
    };
    public async getAllDonation (): Promise<Donation[]> {
        
        const querySpec = {
            query: 'SELECT * FROM c '
            
        };
        const { resources: results } = await this.client
            .database(this.databaseId)
            .container(this.containerName)
            .items.query(querySpec)
            .fetchAll();

        

        return results;
    }

  
}
