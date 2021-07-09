export class Donation{
    id: string | undefined;
    name: string | undefined;
    donorId?: string;
    postId?: string;
    imageUrl:string|undefined;
    donationItemList:string[]|undefined;
    startDate:Date|undefined;
    endDate: Date | undefined;
    description: string | undefined;
    itemList: string | undefined;
    state:Enumerator|undefined;
    pickupAddress:string|undefined;
    partitionKey: string | undefined;
  
    constructor (donorId?:string, postId?:string) {
        this.donorId = donorId;
        this.postId = postId;
    }
  }
  