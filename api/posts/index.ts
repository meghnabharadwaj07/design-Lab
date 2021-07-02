import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {Post} from '../model/Post';
import PostClient from'../shared/PostClient';
import { v4 as uuidv4 } from 'uuid';
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const postClient= new PostClient();
     if (req.method === 'POST')  {
        await createPost(context, req, req.body,req.params.id);
               return;
    }
    if (req.method === 'GET')  {
      if(!req.params.id)
       await getAllPosts(context);//get all posts
      else if (!req.params.subEntity)
       await getPost(context, req.params.id);// get post with id
        
        else
        await getPosts(context, req.params.id);//get posts with ngo id
        return;
    }
    if (req.method === 'PUT')  {
      
       await updatePosts(context,req, req.body,req.params.id);
      
    }

    async function createPost (context: Context, request: HttpRequest, post:Post,ngoId:string) {
       

        if (post.Name&& post.description&&post.startDate  ) {
            if (!post.id) {
                post.id = uuidv4();
            }
            post.ngoId=ngoId;
            post.partitionKey = post.id;
            await postClient.createUpdatePost(post);
            context.res = { status: 204 };
        } else {
            context.res = {
                status: 400,
                body: 'Please provide a valid post '
            };
        }
    };
    async function updatePosts (context: Context, request: HttpRequest, post:Post,postId:string) {
 

        if (post.id===postId ) {
            post.partitionKey = post.id;
            await postClient.createUpdatePost(post);
            context.res = { status: 204 };
        } else {
            context.res = {
                status: 400,
                body: 'Please provide a valid postId '
            };
        }
    };
    async function getPosts (context: Context,  ngoId:string) {
       
        const post = await postClient.getPost(ngoId);
          if(!post)
        {
        context.res = {
            status: 200,
            body: post
        };
        }
        else
        context.res = {
            status: 400,
            body:'Invalid Invalid'
        };
    }
    async function getAllPosts (context: Context) {
       
        const post = await postClient.getAllPosts();
        
        context.res = {
            status: 200,
            body: post
        };
      
    }
        async function getPost (context: Context,  postId:string) {
       
        const post = await postClient.getOnePost(postId);
          if(!post)
        {
        context.res = {
            status: 200,
            body: post
        };
        }
        else
        context.res = {
            status: 400,
            body:'Invalid id'
        };
    }
   

};

export default httpTrigger;