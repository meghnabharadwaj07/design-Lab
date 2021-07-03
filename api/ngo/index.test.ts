import httpTrigger from './index';
import context from '../shared/testing/defaultContext';
import { HttpRequest } from '@azure/functions';
import NgoClient from '../shared/NgoClient';
import { Ngo } from '../model/Ngo';
import { v4 as uuidv4 } from 'uuid';


jest.setTimeout(500000);
const ngoClient = new NgoClient();

test('Can create a ngo and get that with its id', async () => {
    // Arrange
    

    // Act
    var ngo: Ngo = createNgo(new Ngo('teacher@gmail.com', '9433','teacher','data', 'Test User'));
    
    var request = {
        method: 'POST',
        
        body: ngo,
        url: 'http://testing.addNgo'
    };
    await httpTrigger(context, request as any as HttpRequest);
    // Assert
    expect(context.res?.status).toEqual(204);
  
    
});
function createNgo(ngo:Ngo)
{
    ngo.id=uuidv4();
    ngo.partitionKey=ngo.id;
    return ngo
}