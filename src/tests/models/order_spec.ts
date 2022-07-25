import { Order, OrdersModel } from '../../models/order';

const ordersModel = new OrdersModel();

describe("Orders model", () => {
    it('should have an index method', () => {
        expect(ordersModel.index).toBeDefined();
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

    it('create method should create an order', async () => {
        const result = await ordersModel.create({
            order_id: 3,
            order_date: '20/07/2022',
            order_status: 'active',
            order_quantity: 5
        });
        expect(result).toEqual({
            order_id: 3,
            order_date: '20/07/2022',
            order_status: 'active',
            order_quantity: 5
        });
    });

    // it('index method should return a list of orders', async () => {
    //     const result = await ordersModel.index();
    //     expect(result).toEqual([{
    //         order_id: 1,
    //         order_date: '20/7/2022',
    //         order_status: 'active',
    //         order_quantity: 5
    //     }]);
    // });

    // it('show method should return the correct order', async () => {
    //     const result = await ordersModel.show(1);
    //     expect(result).toEqual([{
    //         order_id: 1,
    //         order_date: '20/7/2022',
    //         order_status: 'active',
    //         order_quantity: 5
    //     }]);
    //   });


    it('delete method should remove the book', async () => {
        ordersModel.delete(2);
        const result = await ordersModel.index()
        expect(result).toEqual([]);
    });

});