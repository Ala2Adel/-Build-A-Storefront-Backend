import { Order, OrdersModel } from '../../models/order';
import { User, UsersModel } from '../../models/user';


const ordersModel = new OrdersModel();
const usersModel = new UsersModel();


describe("Orders model", () => {
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

    describe("Testing order methods",() =>{


    });


    // it('create method should create an order', async () => {
    //     const result: Order = await ordersModel.create(testOrder);
    //     expect(result).toEqual({
    //         originalOrder
    //     });
    // });

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


    // it('delete method should remove the book', async () => {
    //     ordersModel.delete(2);
    //     const result = await ordersModel.index()
    //     expect(result).toEqual([]);
    // });

});