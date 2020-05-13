/**
 * this is our file for getting the connection to the db
 * it has our role, port, host, database, password info
 */

import { Pool } from 'pg';

export const db = new Pool({
    database: 'postgres',
    host: process.env.NODE_APP_URL,
    port: 5432,
    user: process.env.NODE_APP_P0_ROLE,
    password: process.env.P0_KR_PASS
});
