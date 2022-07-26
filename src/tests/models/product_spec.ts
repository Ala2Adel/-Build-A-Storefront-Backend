import { Product, ProductModel } from '../../models/product';

const productModel = new ProductModel();

const testProduct: Product = {
    prod_name: 'shampoo',
    prod_price: 54,
    prod_category: "cosmetics"
};

let expectedProduct: Product;

describe("Testing product model, ", () => {
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
        expectedProduct = await productModel.create(testProduct);
        expect({
            prod_name: expectedProduct.prod_name,
            prod_price: parseInt(expectedProduct.prod_price.toString()),
            prod_category: expectedProduct.prod_category,
        }).toEqual({
            prod_name: testProduct.prod_name,
            prod_price: testProduct.prod_price,
            prod_category: testProduct.prod_category,
        });
    });

    it('should UPDATE product using update method', async () => {
        const updatedProd = await productModel.update(expectedProduct.prod_id as number, expectedProduct.prod_price);
        expect(updatedProd.prod_price).toEqual(expectedProduct.prod_price);
    });

    it('should DELETE product using delete method', async () => {
        const deletedProd = await productModel.delete(expectedProduct.prod_id as number);
        expect(deletedProd.prod_id).toEqual(expectedProduct.prod_id);
    });

});