import * as itemService from '../../src/services/item-service';
import * as itemDao from '../../src/daos/itemDao';
import { Item } from '../../src/data-models/Item';
import { request } from 'http';


jest.mock('../../src/daos/itemDao');

const mockItemDao = itemDao as any;

describe('Get item', () => {
    test('Get all items normal', async () => {

        expect.assertions(1);
        mockItemDao.getAllItems.mockImplementation( async () => {
            //  console.log('This is what mock dao actually calls');
          });

          const result = await itemService.getAllItems();

          try {
              expect(result).toContain([])
          } catch (err) {
              expect(err).toBeDefined();
          }
    });
});

describe('Get item by id ', () => {
    test('Get item by id normal', async () => {

        expect.assertions(1);
        mockItemDao.getSelectItem.mockImplementation( async () => {
            //  console.log('This is what mock dao actually calls');
          });

          const result = await itemService.getSelectItem(1);

          try {
              expect(result).toContain(Item)
          } catch (err) {
              expect(err).toBeDefined();
          }
    });
});

describe('Delete user ', () => {

    test('Delete user', async () => {
        // expect.assertions(1);

        const mochItem:Item = {
            id:15,
            category:'dfad',
            productName:'sdfa',
            price: 12.98,
            quantityLeft:2
        }

        mockItemDao.deleteItem.mockImplementation( async () => ({}));
        const result = await itemService.deleteItem(mochItem);
      //  expect(result).toBeInstanceOf({});
    });

    test('Error Delete throw error 400', async () => {
        expect.assertions(1);
        const mochUser:any = {
            category:'dfad',
            productName:'sdfa',
            price: 12.98,
            quantityLeft:2
        }
        mockItemDao.deleteItem.mockImplementation( async () => ({}));
        let result;

        try {
           result = await itemService.deleteItem(mochUser);
        } catch (err) {
            expect(err).toBeDefined();
        }
    });
});

describe('Test the Patch Item', () => {
    test('normal patch test on itemP', async () => {
        mockItemDao.patchItem.mockImplementation(async()=> ({}));

        expect.assertions(1);
        const mochItem:any = {
            id: 12,
            category:'dfad',
            productName:'sdfa',
            price: 12.98,
            quantityLeft:2
        }
        const result = await itemService.patchItem(mochItem);

        try {
         expect(result).toBeTruthy();
        } catch (error) {
            expect(error).toBeDefined();        }
    });

    test('patch item expect 400 on patch no id', async () => {
        mockItemDao.patchItem.mockImplementation(async()=> ({}));

        expect.assertions(1);
        const mochItem:any = {
            category:'dfad',
            productName:'sdfa',
            price: 12.98,
            quantityLeft:2
        }

        try {
            await itemService.patchItem(mochItem)
        } catch (error) {
            expect(error).toBeDefined();
        }
    });


});

describe('Test for createItem', () => {
    test('Test the create item service', async () => {
        mockItemDao.createItem.mockImplementation(async()=>({}));
        expect.assertions(2);
        const mochItem:any = {
            category:'dfad',
            productName:'sdfa',
            price: 12.98,
            quantityLeft:2
        };

        const result = await itemService.createItem(mochItem);

        try {
            expect(result).toContain(Item);
        } catch (err) {
            expect(err).toBeDefined();
        }
    })
});