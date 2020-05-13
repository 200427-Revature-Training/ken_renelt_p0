import express from 'express';
import bodyParser from 'body-parser';
import { db } from './daos/db';
import { userRouter } from './routers/user-router';
import { itemRouter } from './routers/item-router';
import { cartRouter } from './routers/shoppingCart-router';

// initialize our express app
const app = express();

// declare our port to port or default
const port = process.env.PORT || 3000;

// middleware
app.set('port', port);

// regestration
app.use(bodyParser.json());
app.use('/users', userRouter);// for adding and deleting patching users
app.use('/items', itemRouter);// for adding and deleting patching items also adding items to cart table
app.use('/shoppingcart', cartRouter);// shopping cart router

// if something breaks lets end the db
process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});

// start listening at this port
app.listen(port, ()=>{
    console.log(`app is listening at http://localhost:${port}`);
})

