import httpTrigger from './index';
import context from '../shared/testing/defaultContext';
import { HttpRequest } from '@azure/functions';
import DonationClient from '../shared/DonationClient';
import { Donation } from '../model/Donation';
import { v4 as uuidv4 } from 'uuid';


jest.setTimeout(500000);
const donationClient = new DonationClient();
const donorId="1234";
const postId="2345";
test('Can create a donation with proper Id', async () => {
    // Arrange
    

    // Act
    var donation: Donation = createDonation(new Donation( donorId,postId));
    console.log(donation);
    var request = {
        method: 'POST',
               
        body: donation,
        url: 'http://testing.addDonation'
    };
    await httpTrigger(context, request as any as HttpRequest);
    // Assert
    expect(context.res?.status).toEqual(204);
    expect(request.body.id).toEqual(donation.id);
  
    
});
test('Can fetch all donation by Post ID and not other donation', async () => {
    // Arrange
    var Donation:Donation[]  = await donationClient.getDonation(postId);
    let count=0;
    for(let i=0;i<Donation.length;i++)
    {
      if(Donation[i].postId===postId)
      count++;

      expect(count).toEqual(Donation.length);
    }
    
});

function createDonation(donation:Donation)
{
    donation.id=uuidv4();
    donation.partitionKey=donation.id;
    return donation;
}