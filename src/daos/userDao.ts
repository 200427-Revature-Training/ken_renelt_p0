import { db } from "../daos/db";
import { User, UserRow } from '../data-models/user';;

// query to get all the users
export function getAllUsers(): Promise<User[]> {

    // create the query string
    const sql = 'SELECT * FROM users';

    // return the query as a promise
    return db.query<UserRow>(sql, []).then(result => {
        const rows:UserRow[] = result.rows;

        const allUsers: User[] = rows.map(row => User.from(row));
       // console.log(rows);
        return allUsers;
    });
}

// query to get just the specified user
export function getUserById(id: number): Promise<User> {

    // create the query string
     const sql = 'SELECT * FROM users WHERE id = $1';

     // return the query
     return db.query<UserRow>(sql, [id])
         .then(result => result.rows.map(r => User.from(r))[0]);
 }

 // query to save a user
 export function saveUser(user: User) : Promise<User>
 {
     // create the query string
    const sql = `INSERT INTO users (first_name, last_name, p_word, admin_privaleges, birthdate) \
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    // return the query of the saved user
     return db.query<UserRow>(sql, [
        user.firstName,
        user.lastName,
        user.passWord,
        user.adminPriv,
        user.birthdate
    ]).then(result => result.rows.map(row => User.from(row))[0]);
 }

 // query to patch a user with specified data
 export function patchUser(user: User) : Promise<User>{

    // create the query string
    const sql = `UPDATE users SET first_name = COALESCE($1, first_name), \
    last_name = COALESCE($2, last_name), p_word = COALESCE($3, p_word), \
    admin_privaleges = COALESCE($4, admin_privaleges), birthdate = COALESCE($5, birthdate) \
    WHERE id = $6 RETURNING *`;
   // console.log("user.last name = " + user.lastName , ' user pword ' + user.passWord);
    // retu.n the query as a promise
    return db.query<UserRow>(sql, [
        user.firstName,
        user.lastName,
        user.passWord,
        user.adminPriv,
        user.birthdate,
        user.id
    ]).then(result => result.rows.map(r => User.from(r))[0]);
 }

 // query to delete user should check for admin privaleges first
export function deleteUser(user: User) : Promise<User> {
    // create the query string
    const sql = 'DELETE FROM users WHERE id = $1';

    // return the qeury
    return db.query<UserRow>(sql, [user.id]).then(result => result.rows.map(r => User.from(r))[0]);
}