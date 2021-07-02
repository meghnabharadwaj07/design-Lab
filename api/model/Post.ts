export class Post{
  id: string | undefined;
  ngoId?:string;
  Name?: string ;
  description: string|undefined ;
  imageUrl:string|undefined;
  postItemList:string|undefined;
  partitionKey: string | undefined;
  startDate?:Date;
  endDate:Date| undefined;


  constructor ( Name?:string,description?:string,startDate?:Date) {
      
       this.Name = Name;
       this.description = description;
       this.startDate=startDate;
  }
}
