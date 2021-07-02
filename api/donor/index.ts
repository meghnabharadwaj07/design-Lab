import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {Donor} from '../model/Donor';
import DonorClient from'../shared/DonorClient';
import { v4 as uuidv4 } from 'uuid';
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const donorClient= new DonorClient();
     if (req.method === 'POST')  {
        await createProfile(context, req, req.body);
        return;
    }
    if (req.method === 'GET')  {
        await getProfile(context, req.params.id);
        return;
    }

    async function createProfile (context: Context, request: HttpRequest, donor:Donor) {
       

        if (donor.email &&donor.phone &&donor.address  ) {
            if (!donor.id) {
                donor.id = uuidv4();
            }
            donor.partitionKey = donor.id;
            await donorClient.createUpdateProfile(donor);
            context.res = { status: 204 };
        } else {
            context.res = {
                status: 400,
                body: 'Please provide a valid donor Profile'
            };
        }
    };
    async function getProfile (context: Context,  userId:string) {
       
        const donor = await donorClient.getProfile(userId);
        console.log(donor);
        context.res = {
            status: 200,
            body: donor
        };
    }
   

};

export default httpTrigger;