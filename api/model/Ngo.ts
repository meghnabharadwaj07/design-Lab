export class Ngo{
    id: string | undefined;
    email?: string;
    phone?: string;
     address?:string;
     Name?:string;
    description?:string;
    profileUrl:string|undefined;
    itemList:string|undefined;
    postListId:string[]|undefined;
    partitionKey: string | undefined;
  
    constructor ( email?:string, phone?:string,Name?:string,address?:string,description?:string) {
        this.email = email;
        this.phone = phone;
         this.address=address;
         this.description=description;
          this.Name  =Name;    
    }
  }
  