import {Post} from '../model/Post';
import { CosmosClient } from '@azure/cosmos';
export default class PostrClient {
    private databaseId = process.env.DATABASE_NAME as string;

    private containerName = 'post';

    private client: any;

    constructor () {
      this.client = new CosmosClient({
        endpoint: process.env.COSMOSDB_ENDPOINT as string,
        key: process.env.COSMOSDB_KEY as string
    });
    }

    createUpdatePost = async (post:Post): Promise<Post> => {
        
        const { item } = await this.client
            .database(this.databaseId)
            .container(this.containerName)
            .items.upsert(post);

       return item as any as Post;
    };
    public async getPost (userId: string): Promise<Post[]> {
        
        const querySpec = {
            query: 'SELECT * FROM c WHERE c.ngoId=@userId ',
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
    };
    public async getAllPosts (): Promise<Post[]> {
        
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
