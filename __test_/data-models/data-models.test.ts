import { ShoppingCartItem } from '../../src/data-models/shoppingCart';
import { PrettyShoppingCartItem } from '../../src/data-models/PrettyShoppingCart';
import { User } from '../../src/data-models/user';
import { Item } from '../../src/data-models/Item';

describe ('Testing the shopping cart data model', () => {
    test('Check the shpopping cart normal', () => {

        const payload:any = {
            id: 1,
            ownerId: 2,
            productId: 3,
            quantity: 3
        };

        expect(ShoppingCartItem.from(payload)).toBeInstanceOf(ShoppingCartItem)
    });
});

describe('Test for PrettyShopping Cart', () => {
    test('Test for pretty cart normal', () => {

        const tempCart:any = {
            firstName: 'skj',
            productName: 'dkhjf',
            price: 12.99,
            quantity: 3
        };
        expect(PrettyShoppingCartItem.from(tempCart))
            .toBeInstanceOf(PrettyShoppingCartItem);

    });
});

describe('Test for User', () => {
    test('Normal test for user data model', () => {
        const tempUser:any = {
            id: 1,
            firstName: 'kjkljd',
            lastName: 'kdjfk',
            passWord: 'KJFS',
            adminPriv: 'none',
            birthdate: '2020-02-01'
        };

        expect(User.from(tempUser)).toBeInstanceOf(User);
    });
});

describe('test for item', () => {
    test('Normal test for item-data model', () => {
        const tempItem:any = {
            id: 1,
            category: 'djf',
            productName: 'dfkh',
            price: 12.99,
            quantity: 2
        };

        expect(Item.from(tempItem)).toBeInstanceOf(Item);
    });
});