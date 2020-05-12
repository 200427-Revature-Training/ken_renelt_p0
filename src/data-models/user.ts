export class User {
    id:number;
    firstName:string;
    lastName:string;
    passWord:string;
    adminPriv:string;
    birthdate:Date;

   static from (obj: UserRow)
   {
       const user = new User(
           obj.id, obj.first_name, obj.last_name, obj.p_word, obj.admin_privaleges,  new Date(obj.birthdate)
       );
       return user;
   }
    constructor(id, firstName, lastName, passWord, adminPriv, birthdate)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.passWord = passWord;
        this.adminPriv = adminPriv;
        this.birthdate = birthdate;
    }
}

export interface UserRow {
    id:number;
    first_name: string;
    last_name: string;
    p_word: string;
    admin_privaleges:string;
    birthdate: string;
}

