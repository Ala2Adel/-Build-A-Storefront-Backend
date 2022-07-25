import { Order, OrdersModel } from '../../models/order';
import { User, UsersModel } from '../../models/user';
import { Product, ProductsModel } from '../../models/product';


const ordersModel = new OrdersModel();
const usersModel = new UsersModel();
const productsModel = new ProductsModel();


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

    describe("Testing order methods", () => {


    });



});