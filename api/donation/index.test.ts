import httpTrigger from './index';
import context from '../shared/testing/defaultContext';
import { HttpRequest } from '@azure/functions';
import DonationClient from '../shared/DonationClient';
import { Donation } from '../model/Donation';
import { v4 as uuidv4 } from 'uuid';


jest.setTimeout(500000);
const donationClient = new DonationClient();
const ngoId="1234";
test('Can create a donation with proper Id', async () => {
    // Arrange
    

    // Act
    var donation: Donation = createDonation(new Donation('smile', 'test desc',new Date("11-12-21") ),ngoId);
    
    var request = {
        method: 'POST',
        params: {
            id: "ngoId",
        },
        
        body: donation,
        url: 'http://testing.addDonation'
    };
    await httpTrigger(context, request as any as HttpRequest);
    // Assert
    expect(context.res?.status).toEqual(204);
    expect(request.body.id).toEqual(donation.id);
  
    
});
test('Can fetch all posts by NGO ID and not other posts', async () => {
    // Arrange
    var ngoDonation:Donation[]  = await donationClient.getDonation(ngoId);
    let count=0;
    for(let i=0;i<ngoDonation.length;i++)
    {
      if(ngoDonation[i].ngoId===ngoId)
      count++;

      expect(count).toEqual(ngoDonation.length);
    }
    
});
test('Can fetch by posts by Post ID ', async () => {
     var donation: Donation = createDonation(new Donation('smile', 'test desc',new Date("11-12-21") ),ngoId);
    
    var request = {
        method: 'POST',
        params: {
            id: "ngoId",
        },
        
        body: donation,
        url: 'http://testing.addDonation'
    };
    await httpTrigger(context, request as any as HttpRequest);
  
    
});
function createDonation(donation:Donation,ngoId:string)
{
    donation.id=uuidv4();
    donation.partitionKey=donation.id;
    donation.ngoId=ngoId;
    return donation;
}