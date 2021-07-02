import httpTrigger from './index';
import context from '../shared/testing/defaultContext';
import { HttpRequest } from '@azure/functions';
import DonorClient from '../shared/DonorClient';
import { Donor } from '../model/Donor';
import { v4 as uuidv4 } from 'uuid';


jest.setTimeout(500000);
const donorClient = new DonorClient();

test('Can create a donor and get that with its id', async () => {
    // Arrange
    

    // Act
    var donor: Donor = createDonor(new Donor('teacher@gmail.com', '9433','teacher','data', 'Test User'));
    
    var request = {
        method: 'POST',
        
        body: donor,
        url: 'http://testing.addDonor'
    };
    await httpTrigger(context, request as any as HttpRequest);
    // Assert
    expect(context.res?.status).toEqual(204);
  
    
});
function createDonor(donor:Donor)
{
    donor.id=uuidv4();
    donor.partitionKey=donor.id;
    return donor
}