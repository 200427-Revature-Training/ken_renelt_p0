import express from 'express';
import bodyParser from 'body-parser';
import * as shoppingCartService from '../../src/services/shoppingCart-service';
import { cartRouter } from '../../src/routers/shoppingCart-router';
import request from 'supertest';

jest.mock('../../src/services/shoppingCart-service');

const mockCartService = shoppingCartService as any;

const app = express();
app.use(bodyParser.json())
app.use('/shoppingcart', cartRouter);

describe('Get /shoppingcart', () => {
    test('Returns normal', async () => {
        mockCartService.getShoppingCart.mockImplementation(async () => ({}));

        await request(app)
            .get('/shoppingcart')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });

    test('Returns normally under normal circumstances throw error', async () => {
        mockCartService.getShoppingCart.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/shoppingcart')
            .expect(500);
    });
});

describe('Get cart by id', () => {
    test('Get cart by user Id', async () => {
        mockCartService.getAllCartsForUser.mockImplementation(async () => ({}));

        await request(app)
        .get('/shoppingcart/1')
        .expect(200);
    });

    test('Get cart by user id server error', async() => {
        mockCartService.getAllCartsForUser.mockImplementation(async () => {throw new Error()});

        await request(app)
        .get('/shoppingcart/1')
        .expect(500);
    });
});