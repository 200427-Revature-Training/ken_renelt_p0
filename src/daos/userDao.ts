import { db } from "../daos/db";
import { User, UserRow } from '../data-models/user';;


export function getAllUsers(): Promise<User[]> {
    const sql = 'SELECT * FROM users';

    return db.query<UserRow>(sql, []).then(result => {
        const rows:UserRow[] = result.rows;

        const allUsers: User[] = rows.map(row => User.from(row));
        console.log(rows);
        return allUsers;
    });
}

export function getUserById(id: number): Promise<User> {

    // $1 =
     const sql = 'SELECT * FROM users WHERE id = $1';

     return db.query<UserRow>(sql, [id])
         .then(result => result.rows.map(r => User.from(r))[0]);
 }

 export function saveUser(user: User) : Promise<User>
 {
    const sql = `INSERT INTO users (first_name, last_name, p_word, admin_privaleges, birthdate) \
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;

     return db.query<UserRow>(sql, [
        user.firstName,
        user.lastName,
        user.passWord,
        user.adminPriv,
        user.birthdate
    ]).then(result => result.rows.map(row => User.from(row))[0]);
 }

 export function patchUser(user: User) : Promise<User>{

    const sql = `UPDATE users SET first_name = COALESCE($1, first_name), \
    last_name = COALESCE($2, last_name), p_word = COALESCE($3, p_word), \
    admin_privaleges = COALESCE($4, admin_privaleges), birthdate = COALESCE($5, birthdate) \
    WHERE id = $6 RETURNING *`;

    return db.query<UserRow>(sql, [
        user.firstName,
        user.lastName,
        user.passWord,
        user.adminPriv,
        user.birthdate,
        user.id
    ]).then(result => result.rows.map(r => User.from(r))[0]);
 }

export function deleteUser(user: User) : Promise<User> {
    const sql = 'DELETE FROM users WHERE id = $1';

   return db.query<UserRow>(sql, [user.id]).then(result => result.rows.map(r => User.from(r))[0]);
}