import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {Donation} from '../model/Donation';
import DonationClient from'../shared/DonationClient';
import { v4 as uuidv4 } from 'uuid';
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const donationClient= new DonationClient();
     if (req.method === 'POST')  {
        await createDonation(context, req, req.body);
        
        return;
    }
    if (req.method === 'GET')  {
      if(!req.params.id)
       await getAllDonations(context);//get all posts
      else if (!req.params.subEntity)
       await getDonation(context, req.params.id);// get post with id
        
        else
        await getDonations(context, req.params.id);//get donations with post id
        return;
    }
    if (req.method === 'PUT')  {
      
       await updateDonations(context,req, req.body,req.params.id);
      
    }

    async function createDonation (context: Context, request: HttpRequest, donation:Donation) {
       

        if (donation.donorId && donation.postId  ) {
            if (!donation.id) {
                donation.id = uuidv4();
            }
            donation.partitionKey = donation.id;
            await donationClient.createUpdateDonation(donation);
            context.res = { status: 204 };
        } else {
            context.res = {
                status: 400,
                body: 'Please provide a valid donation '
            };
        }
    };
    async function updateDonations (context: Context, request: HttpRequest, donation:Donation,donationId:string) {
 

        if (donation.id===donationId ) {
            donation.partitionKey = donation.id;
            await donationClient.createUpdateDonation(donation);
            context.res = { status: 204 };
        } else {
            context.res = {
                status: 400,
                body: 'Please provide a valid donationId '
            };
        }
    };
    async function getDonations (context: Context,  postId:string) {
       
        const donation = await donationClient.getDonation(postId);
        context.res = {
            status: 200,
            body: donation
        };
    }
    async function getAllDonations (context: Context) {
       
        const donation = await donationClient.getAllDonation();
        context.res = {
            status: 200,
            body: donation
        };
    }
        async function getDonation (context: Context,  donationId:string) {
       
        const donation = await donationClient.getOneDonation(donationId);
        context.res = {
            status: 200,
            body: donation
        };
    }
   

};

export default httpTrigger;