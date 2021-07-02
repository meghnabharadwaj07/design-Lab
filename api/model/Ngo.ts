export class Ngo{
    id: string | undefined;
    email?: string;
    phone?: string;
    firstName?: string ;
    lastName?: string ;
    address?:string;
    description?:string;
    profileUrl:string|undefined;
    itemList:string|undefined;
    postListId:string[]|undefined;
    partitionKey: string | undefined;
  
    constructor ( email?:string, phone?:string,firstName?:string,lastName?:string,address?:string,description?:string) {
        this.email = email;
        this.phone = phone;
         this.address=address;
         this.description=description;
         this.firstName = firstName;
         this.lastName = lastName;
    }
  }
  