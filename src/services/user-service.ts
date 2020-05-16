/**
 * user-service is a layer in the userAPI
 * getAllUsers()
 * getUserById()
 * saveUser()
 * patchUser()
 * deleteUser()
 */
import { User, UserRow } from '../data-models/user';
import * as userDao from '../daos/userDao';

// retrieve all the users from the userDao
export function getAllUsers(): Promise<User[]> {
    return userDao.getAllUsers();
}

// retrieve only the specified user from the userDao
export function getUserById(id:number): Promise<User> {
    return userDao.getUserById(id);
}

// check the values before we ask the server to create new user
// tell the userDao to create user
export function saveUser(user:any): Promise<User> {

    // if we validate here we want to validate on the server also
    if (user.firstName && user.lastName && user.birthdate)
    {
        // data is valid continue
        return userDao.saveUser(user);
    }
    else
    {
       // console.warn('User invalid');
        return new Promise((resolve, reject) => reject(422));
    }
}

// check and make sure the user is valid before we patch them
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

// remove user if you have admin privaleges
export function deleteUser(user: User): Promise<User> {
    if(!user.id)
    {
        throw new Error('400');
    }
    return userDao.deleteUser(user);
}