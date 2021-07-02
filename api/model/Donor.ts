export class Donor{
  id: string | undefined;
  email?: string;
  phone?: string;
  firstName?: string ;
  lastName?: string ;
  address?:string;
  profileUrl:string|undefined;
  itemList:string|undefined;
  partitionKey: string | undefined;

  constructor ( email?:string, phone?:string,firstName?:string,lastName?:string,address?:string) {
      this.email = email;
      this.phone = phone;
       this.address=address;
       this.firstName = firstName;
       this.lastName = lastName;
  }
}
