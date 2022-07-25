import { Order, OrdersModel } from '../../models/order';

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

    it('should CREATE an order using create method', async () => {
        const result = await ordersModel.create(testOrder);
        expect({ order_status: result.order_status, user_id: result.user_id }).toEqual({
            order_status: testOrder.order_status, user_id: testOrder.user_id
        });
    });

    it('should UPDATE order using update method', async () => {
        const updatedOrder = await ordersModel.update(expectedOrder);
        expect(updatedOrder).toEqual(expectedOrder);
    });


    it('should DELETE order using delete method', async () => {
        const deletedOrder = await ordersModel.delete(expectedOrder.order_id as number);
        expect(deletedOrder.order_id).toEqual(expectedOrder.order_id);
    });

});