import { db } from "../daos/db";
import { User, UserRow } from '../data-models/user';
//import { request } from "http";


export function getAllUsers(): Promise<User[]> {
    const sql = 'SELECT * FROM people';

    return db.query<UserRow>(sql, []).then(result => {
        const rows:UserRow[] = result.rows;

        const allUsers: User[] = rows.map(row => User.from(row));
        console.log(rows);
        return allUsers;
    });
}

export function getUserById(id: number): Promise<User> {

    // $1 =
     const sql = 'SELECT * FROM people WHERE id = $1';

     return db.query<UserRow>(sql, [id])
         .then(result => result.rows.map(r => User.from(r))[0]);
 }

 export function saveUser(user: User) : Promise<User>
 {
    const sql = `INSERT INTO people (first_name, last_name, birthdate) \
    VALUES ($1, $2, $3) RETURNING *`;

     return db.query<UserRow>(sql, [
        user.firstName,
        user.lastName,
        user.birthdate.toISOString()
    ]).then(result => result.rows.map(row => User.from(row))[0]);
 }

 export function patchUser(user: User) : Promise<User>{

    const sql = `UPDATE people SET first_name = COALESCE($1, first_name), \
    last_name = COALESCE($2, last_name), birthdate = COALESCE($3, birthdate) \
    WHERE id = $4 RETURNING *`;

    return db.query<UserRow>(sql, [
        user.firstName,
        user.lastName,
        user.birthdate,
        user.id
    ]).then(result => result.rows.map(r => User.from(r))[0]);
 }
/*
 export function getPersonById(id: number): Promise<User> {

    // $1 =
     const sql = 'SELECT * FROM people WHERE id = $1';
 
     return db.query<UserRow>(sql, [id])
         .then(result => result.rows.map(r => Person.from(r))[0]);
 }
 */