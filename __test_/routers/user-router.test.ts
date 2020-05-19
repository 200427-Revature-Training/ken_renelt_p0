import express from 'express';
import bodyParser from 'body-parser';
import * as userService from '../../src/services/user-service';
import { userRouter } from '../../src/routers/user-router';
import request from 'supertest';

jest.mock('../../src/services/user-service');

const mockUserService = userService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/users', userRouter);

describe('GET /users', () => {
    test('Returns normally under normal circumstances', async () => {
        mockUserService.getAllUsers.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/users')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });

    test('Returns normally under normal circumstances throw error', async () => {
        mockUserService.getAllUsers.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/users')
            .expect(500);
    });
});

describe('POST /users', () => {
    test('Successful creation should return 201 status', async () => {
        mockUserService.saveUser.mockImplementation(async () => ({}));
        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2020-01-01'
        };

        await request(app)
            .post('/users')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockUserService.saveUser.mockImplementation(async () => {throw new Error()});

        const payload = {
            firstName:'jacky',
            lastName: 'Smith',
            passord: 'kasdjfk',
            adminPriv: "none",
            birthdate: '2020-01-01'
        }

        await request(app)
            .post('/users')
            .send(payload)
            .expect(500);
    });

});

describe('Patch /users', () => {
    test('Normal behavior patching user id status 200', async () => {
        mockUserService.patchUser.mockImplementation(async () => ({}));

        const payload =     {
            "id": 1,
            "firstName": "Alice",
            "lastName": "Wonderland",
            "passWord": "Derp",
            "adminPriv": "Your Momma",
            "birthdate": "2010-01-02T06:00:00.000Z"
        }

        await request(app)
            .patch('/users')
            .send(payload)
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Patch Throw error', async () => {
        mockUserService.patchUser.mockImplementation(async () => {throw new Error()});

        const payload = {
            firstName:'jacky',
            lastName: 'Smith',
            passord: 'kasdjfk',
            adminPriv: "none",
            birthdate: '2020-01-01'
        }

        await request(app)
            .patch('/users')
            .send(payload)
            .expect(500);
    });
});

describe('GET /users/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockUserService.getUserById.mockImplementation(async () => ({}));
        await request(app)
        .get('/users/1')
        .expect(200)
        .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockUserService.getUserById.mockImplementation(async () => (0))
        await request(app)
        .get('/users/blahblahblah')
        .expect(404);
    });

    test('500 internal server error', async() => {
        mockUserService.getUserById.mockImplementation(async () => {throw new Error()});
        await request(app)
        .get('/users')
        .expect(500)
    });
});


// how to install jest
// npm install --save-dev jest @types/jest
// npm install --save-dev ts-jest

// how to install supertest
// npm install supertest
// npm install --save-dev supertest @types/supertest
// npm test --coverage