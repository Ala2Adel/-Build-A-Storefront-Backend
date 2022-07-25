import { Product, ProductModel } from '../../models/product';

const productModel = new ProductModel();

const testProduct: Product = {
    prod_name: 'shampoo',
    prod_price: 256,
    prod_category: "cosmetics"
};

let expectedProduct: Product;

describe("Testing product model", () => {
    it('should have an index method', () => {
        expect(productModel.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(productModel.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(productModel.create).toBeDefined();
    });

    it('should have a update method', () => {
        expect(productModel.update).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(productModel.delete).toBeDefined();
    });

    it('should CREATE product using create method', async () => {
        const createdProd = await productModel.create(testProduct);
        expect(createdProd).toEqual(testProduct);
    });

    it('should UPDATE product using update method', async () => {
        const updatedProd = await productModel.update(expectedProduct.prod_id as number, expectedProduct.prod_price);
        expect(updatedProd).toEqual(testProduct);
    });

    it('should DELETE product using delete method', async () => {
        const deletedProd = await productModel.delete(expectedProduct.prod_id as number);
        expect(deletedProd.prod_id).toEqual(expectedProduct.prod_id);
    });

});