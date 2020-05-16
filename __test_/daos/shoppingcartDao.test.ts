import express from 'express';
import bodyParser from 'body-parser';
import * as shoppingCartDao from '../../src/daos/shoppingCartDao';
import { cartRouter } from '../../src/routers/shoppingCart-router';
import request from 'supertest';


jest.mock('../../src/daos/shoppingCartDao');

const mockCartDao = shoppingCartDao as any;

const app = express();
app.use(bodyParser.json());
app.use('/shoppingcart', cartRouter);
