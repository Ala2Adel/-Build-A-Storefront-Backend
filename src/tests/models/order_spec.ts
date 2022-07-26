import { Order, OrdersModel } from '../../models/order';
import { User, UsersModel } from '../../models/user';

const usersModel = new UsersModel();
const testUser: User = {
    first_name: 'Mohammed',
    last_name: 'Adel',
    password: '2021#moh'
};
let expectedUser: User;

const ordersModel = new OrdersModel();
let expectedOrder: Order;

const testOrder: Order = {
    order_status: 'active',
    user_id: 1
};

describe("Testing order model", () => {
    it('should have an index method', () => {
        expect(ordersModel.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(ordersModel.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(ordersModel.create).toBeDefined();
    });

    it('should have a update method', () => {
        expect(ordersModel.update).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(ordersModel.delete).toBeDefined();
    });
    
    beforeAll(async () => {
        expectedUser = await usersModel.create(testUser);
        if (expectedUser.user_id) testOrder.user_id = expectedUser.user_id;
    });

    it('should CREATE order using create method', async () => {
        expectedOrder = await ordersModel.create(testOrder);
        expect({
            order_status: expectedOrder.order_status,
            user_id: parseInt(expectedOrder.user_id.toString()),
        }).toEqual({
            order_status: testOrder.order_status,
            user_id: testOrder.user_id,
        });
    });

    it('should UPDATE order using update method', async () => {
        const updatedOrder = await ordersModel.update(expectedOrder);
        expect(updatedOrder.order_status).toEqual(expectedOrder.order_status);
    });

    it('should DELETE order using delete method', async () => {
        const deletedOrder = await ordersModel.delete(expectedOrder.order_id as number);
        expect(deletedOrder.user_id).toEqual(deletedOrder.user_id);
    });

});