import * as userService from '../../src/services/user-service';
import * as userDao from '../../src/daos/userDao';
import { User } from '../../src/data-models/user';
import { request } from 'http';

jest.mock('../../src/daos/userDao');
const mockUserDao = userDao as any;

describe('saveUser user-service-test', () => {
    test('422 returned if no firstName provided', async () => {
        // userDao.saveUser will return undefined rather than execute
        expect.assertions(1);

        // Stubbing - Replacing a method with a fake method implementation
        mockUserDao.saveUser.mockImplementation(() => {
          //  console.log('This is what mock dao actually calls');
        });


        const payload = {
            lastName: 'Smith',
            passord: 'kasdjfk',
            adminPriv: "none",
            birthdate: '2020-01-01'
        }

        try {
            // This async function should reject due to missing firstName
            await userService.saveUser(payload);
            fail('userService.savePerson did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
    });


    test('422 returned if no birthdate is provided', async () => {
        // userDao.saveUser will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockUserDao.saveUser.mockImplementation(() => {
            // console.log('This is what mock dao actually calls');
        });

        const payload = {
            firstName:'jacky',
            lastName: 'Smith',
            passord: 'kasdjfk',
            adminPriv: "none"
        }

        try {
            // This async function should reject due to missing firstName
            await userService.saveUser(payload);
            fail('userService.savePerson did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('422 returned if no lastName provided', async () => {
        // userDao.saveUser will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockUserDao.saveUser.mockImplementation(() => {
          //  console.log('This is what mock dao actually calls');
        });

        const payload = {
            firstName:'jacky',
            passord: 'kasdjfk',
            adminPriv: "none"
        }

        try {
            // This async function should reject due to missing firstName
            await userService.saveUser(payload);
            fail('userService.savePerson did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
    });

    test('ID value of input replaced in output', async () => {
        mockUserDao.saveUser.mockImplementation(o => o);

        const payload = {
            id:15,
            firstName:'jacky',
            lastName: 'Smith',
            passord: 'kasdjfk',
            adminPriv: "none",
            birthdate: '2020-01-01'
        }

        let result;
        try{
             result = await userService.saveUser(payload);
        }catch(err){
            expect(result.id).not.toBe(payload.id);
        }
    });

    test('Input object transformed to User object', async () => {
        mockUserDao.saveUser.mockImplementation(o => o);

        const payload = {
            firstName:'jacky',
            lastName: 'Smith',
            passord: 'kasdjfk',
            adminPriv: "none",
            birthdate: '2020-01-01'
        }

       let result;
        try{
            result = await userService.saveUser(payload);
       }catch(err){
           expect(payload).not.toBeInstanceOf(User);
           expect(result).toBeInstanceOf(User);
       }
    });


/*
    test('Extraneous fields in input are not in output', async () => {
        mockUserDao.saveUser.mockImplementation(o => o);

        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2000-01-01',
            likesSkateboards: true
        };

        const result = await userService.saveUser(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });
*/
});


describe ('Patch users:', () => {

    test('patch fails when no valid id is provided', async () => {
        mockUserDao.getAllUsers.mockImplementation(async () => []);
        expect.assertions(1);

        mockUserDao.patchUser
            .mockImplementation(() => ({}));

        const payload = {
            firstName: 'Abby',
            lastName: 'Adams',
            birthdate: '2020-01-01'
        };

        try {
            const result = await userService.patchUser(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});

describe ('Get all Users: by id',  () => {
    test('get all users by id', async () => {

        mockUserDao.getAllUsers.mockImplementation(async () => ({}));

        const result = await userService.getAllUsers();
    });
});


describe ('Get all Users:',  () => {
    test('get all users', async () => {

        mockUserDao.getAllUsers.mockImplementation(async () => ({}));

        let result;

        try {
            result = await userService.getUserById(1);
        } catch (err) {
            expect(err).toBeDefined();
            expect(result).toBeInstanceOf(User);
        }
    });
});

describe('Delete user ', () => {

    test('Delete user', async () => {
        const mochUser:User = {
            id:15,
            firstName:'jacky',
            lastName: 'Smith',
            birthdate:new Date("2020-01-01"),
            passWord: 'kasdjfk',
            adminPriv: "none"
        }
        mockUserDao.deleteUser.mockImplementation( async () => ({}));
        const result = await userService.deleteUser(mochUser);
    });

    test('Error Delete throw error 400', async () => {
        expect.assertions(1);
        const mochUser:any = {
            firstName:'jacky',
            lastName: 'Smith',
            birthdate:new Date("2020-01-01"),
            passWord: 'kasdjfk',
            adminPriv: "none"
        }
        mockUserDao.deleteUser.mockImplementation( async () => ({}));
        let result;

        try {
           result = await userService.deleteUser(mochUser);
        } catch (err) {
            expect(err).toBeDefined();
        }
    });
});

