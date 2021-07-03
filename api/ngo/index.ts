import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {Ngo} from '../model/Ngo';
import NgoClient from'../shared/NgoClient';
import { v4 as uuidv4 } from 'uuid';
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const ngoClient= new NgoClient();
     if (req.method === 'POST')  {
         
        await createProfile(context, req, req.body);
        return;
    }
    if (req.method === 'GET')  {
        await getProfile(context, req.params.id);
        return;
    }

    async function createPostIdList (context: Context, request: HttpRequest, ngo:Ngo) {
       

        if (ngo.email &&ngo.phone &&ngo.address  ) {
            if (!ngo.id) {
                ngo.id = uuidv4();
            }
            ngo.partitionKey = ngo.id;
            await ngoClient.createUpdateProfile(ngo);
            context.res = { status: 204 };
        } else {
            context.res = {
                status: 400,
                body: 'Please provide a valid ngo Profile'
            };
        }
    };
    async function createProfile (context: Context, request: HttpRequest, ngo:Ngo) {
       

        if (ngo.email &&ngo.phone &&ngo.address  ) {
            if (!ngo.id) {
                ngo.id = uuidv4();
            }
            ngo.partitionKey = ngo.id;
            await ngoClient.createUpdateProfile(ngo);
            context.res = { status: 204 };
        } else {
            context.res = {
                status: 400,
                body: 'Please provide a valid ngo Profile'
            };
        }
    };
    async function getProfile (context: Context,  userId:string) {
       
        const ngo = await ngoClient.getProfile(userId);
        
        context.res = {
            status: 200,
            body: ngo
        };
    }
   

};

export default httpTrigger;