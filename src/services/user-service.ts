import { User, UserRow } from '../data-models/user';
import * as userDao from '../daos/userDao';

export function getAllUsers(): Promise<User[]> {
    return userDao.getAllUsers();
}

export function getUserById(id:number): Promise<User> {
    return userDao.getUserById(id);
}



// create user
export function saveUser(user:User): Promise<User> {
   /*
    console.log(user);
    const newUser = new User(
        undefined, user.firstName, user.lastName,
        user.passWord, user.adminPriv,
        new Date(user.birthdate)
    );

    */
    // if we validate here we want to validate on the server also
    if (user.firstName && user.lastName && user.birthdate)
    {
        // data is valid continue
        return userDao.saveUser(user);
    }
    else
    {
        console.warn('Person invalid');
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchUser(input:any): Promise<User> {
    const user = new User(
        input.id, input.firstName,
        input.passWord, input.adminPriv,
        input.lastName, new Date(input.birthdate)
    );
    if(!user.id)
    {
        throw new Error('400');
    }
    return userDao.patchUser(user);
}

export function deleteUser(user: User): Promise<User> {
    if(!user.id)
    {
        throw new Error('400');
    }
    return userDao.deleteUser(user);
}