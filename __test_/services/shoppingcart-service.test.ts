import * as cartService from '../../src/services/shoppingCart-service';
import * as cartDao from '../../src/daos/shoppingCartDao';
import { ShoppingCartItem } from '../../src/data-models/shoppingCart';
import { request } from 'http';

jest.mock('../../src/daos/shoppingCartDao');

const mockCartDao = cartDao as any;

describe('Create shopping cart-service test', () => {
    test('422 no ownerId', async () => {

        expect.assertions(0);
        mockCartDao.createShoppingCart.mockImplementation(async () => ({}));

        const payload:any = {
            productId: 12,
            quantitiy: 12
        };
        // let result;

        try {
          await cartService.createShoppingCart(payload);
          fail('cart service did not throw expected error');
        } catch (err) {
            expect(422);
        };
    });
});

describe('Delete shopping cart item', () => {

    test('Delete shopping cart item', async () => {
        mockCartDao.deleteShoppingCart.mockImplementation(async () => ({}));

        expect.assertions(0);

        const payload = {
            id:1,
            ownerId:1,
            productId:2,
            quantity:2
        }
        const result = await cartService.deleteShoppingCart(payload);

        expect(200);
    })
});
