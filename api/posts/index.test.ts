import httpTrigger from './index';
import context from '../shared/testing/defaultContext';
import { HttpRequest } from '@azure/functions';
import PostClient from '../shared/PostClient';
import { Post } from '../model/Post';
import { v4 as uuidv4 } from 'uuid';


jest.setTimeout(500000);
const postClient = new PostClient();
const ngoId="1234";
test('Can create a post with proper Id', async () => {
    // Arrange
    

    // Act
    var post: Post = createPost(new Post('smile', 'test desc',new Date("11-12-21") ),ngoId);
    
    var request = {
        method: 'POST',
        params: {
            id: "ngoId",
        },
        
        body: post,
        url: 'http://testing.addPost'
    };
    await httpTrigger(context, request as any as HttpRequest);
    // Assert
    expect(context.res?.status).toEqual(204);
    expect(request.body.id).toEqual(post.id);
  
    
});
test('Can fetch all posts by NGO ID and not other posts', async () => {
    // Arrange
    var ngoPost:Post[]  = await postClient.getPost(ngoId);
    let count=0;
    for(let i=0;i<ngoPost.length;i++)
    {
      if(ngoPost[i].ngoId===ngoId)
      count++;

      expect(count).toEqual(ngoPost.length);
    }
    
});
test('Can fetch by posts by Post ID ', async () => {
     var post: Post = createPost(new Post('smile', 'test desc',new Date("11-12-21") ),ngoId);
    
    var request = {
        method: 'POST',
        params: {
            id: "ngoId",
        },
        
        body: post,
        url: 'http://testing.addPost'
    };
    await httpTrigger(context, request as any as HttpRequest);
  
    
});
function createPost(post:Post,ngoId:string)
{
    post.id=uuidv4();
    post.partitionKey=post.id;
    post.ngoId=ngoId;
    return post;
}