import express from 'express';
import bodyParser from 'body-parser';
import { db } from './daos/db';
import { userRouter } from './routers/user-router';
import { itemRouter } from './routers/item-router';
import { cartRouter } from './routers/shoppingCart-router';

const app = express();


const port = process.env.PORT || 3000;
// middleware
app.set('port', port);
// regestration
app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/items', itemRouter);
// shopping cart router
app.use('/shoppingcart', cartRouter);

process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});

app.listen(port, ()=>{
    console.log(`app is listening at http://localhost:${port}`);
})

