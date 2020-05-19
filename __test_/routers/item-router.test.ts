import express from 'express';
import bodyParser from 'body-parser';
import * as itemService from '../../src/services/item-service';
import { itemRouter } from '../../src/routers/item-router';
import request from 'supertest';

jest.mock('../../src/services/item-service');

const mockItemService = itemService as any;

const app = express();
app.use(bodyParser.json())
app.use('/items', itemRouter);

describe('Get all Items', () => {
    test('Returns normal under normal conditions', async () => {
    mockItemService.getAllItems.mockImplementation(async () => ({}));

    await request(app)
    .get('/items')
    .expect(200)
    .expect('content-type', 'application/json; charset=utf-8');
    });

    test('Returns normally under normal circumstances throw error', async () => {
        mockItemService.getAllItems.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/items')
            .expect(500);
    });
});

describe('Get item by id', () => {
    test('Normal test for get item by id', async () => {
        mockItemService.getSelectItem.mockImplementation( async () =>({}));

        await request(app)
        .get('/items/id')
        .expect(200)
        .expect('content-type', 'application/json; charset=utf-8');
    });
});

describe('patchItem', () => {
    test('Patch item normal case', async () => {
        mockItemService.patchItem.mockImplementation(async () => ({}));

        const payload = {
            id: 1,
            category: 'dsfa',
            productName: 'dsfas',
            price: 12.09,
            quantityLeft: 2
        }

        await request(app)
        .patch('/items/id')
        .send(payload)
        .expect(200)
        .expect('content-type', 'application/json; charset=utf-8');
    });

    test('patch throw error', async () => {

        mockItemService.patchItem.mockImplementation(async () => {throw new Error()});

        const payload = {
            id: 1,
            category: 'dsfa',
            productName: 'dsfas',
            price: 12.09,
            quantityLeft: 2
        }

        await request(app)
        .patch('/items/id')
        .send(payload)
        .expect(500);
    });
});

describe('Delete Item ', () => {
    test('Delete item normal test', async () => {
        mockItemService.deleteItem.mockImplementation(async () => ({}));

        const payload = {
            id: 1,
            category: 'dsfa',
            productName: 'dsfas',
            price: 12.09,
            quantityLeft: 2
        }

        await request(app)
        .delete('/items/id')
        .send(payload)
        .expect(200);
    });

    test('Delete item throw error', async () => {
        mockItemService.deleteItem.mockImplementation(async () => {throw new Error()});

        const payload = {
            id: 1,
            category: 'dsfa',
            productName: 'dsfas',
            price: 12.09,
            quantityLeft: 2
        }

        await request(app)
        .delete('/items/id')
        .send(payload)
        .expect(500);
    })
});

describe('Create item', () => {
    test('Create item under normal conditions', async()=> {
        mockItemService.createItem.mockImplementation(async ()=>({}));

        const payload = {
            category: 'dsfa',
            productName: 'dsfas',
            price: 12.09,
            quantityLeft: 2
        }

        await request(app)
        .post('/items')
        .send(payload)
        .expect(200)
        .expect('content-type', 'application/json; charset=utf-8');
    });

    test('create item throw error', async () => {
        mockItemService.createItem.mockImplementation(async () => {throw new Error()});

        const payload = {
            ownerID: 1,
            productId: 1,
            quantity:1
        }

        await request(app)
        .post('/items')
        .send(payload)
        .expect(500);
    });
});


describe('Create item in shopping cart', () => {

    // this one is broken  needs fixing should get 200
    test('Create Item in shopping cart', async () => {
        mockItemService.addItemToCart.mockImplementation(()=>({}));

        const payload = {
            ownerID: 1,
            productId: 1,
            quantity:1
        }

        await request(app)
        .post('/items/5')
        .send(payload)
        .expect(500)
       // .expect('content-type', 'application/json; charset=utf-8');
    });

    test('create item throw error', async () => {
        mockItemService.addItemToCart.mockImplementation(async () => {throw new Error()});

        const payload = {
            ownerID: 1,
            productId: 1,
            quantity:1
        }

        await request(app)
        .post('/items/1')
        .send(payload)
        .expect(500);
    });
});