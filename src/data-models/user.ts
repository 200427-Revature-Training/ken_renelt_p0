export class User {
    id:number;
    firstName:string;
    lastName:string;
    birthdate:Date;

   static from (obj: UserRow)
   {
       const user = new User(
           obj.id, obj.first_name, obj.last_name,  new Date(obj.birthdate)
       );
       return user;
   }
    constructor(id, firstName, lastName, birthdate)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
    }
}

export interface UserRow {
    id:number;
    first_name: string;
    last_name: string;
    birthdate: string;
}

