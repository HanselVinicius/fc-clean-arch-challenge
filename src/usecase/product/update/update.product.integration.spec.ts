import { CreateProductUseCase } from "../create/create.product.usecase";
import { UpdateProductUseCase } from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { Sequelize } from "sequelize-typescript";
import { create } from "yup/lib/Reference";

describe('Integration test update product use case', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should update a product', async () => {
        const createProductUseCase = new CreateProductUseCase(new ProductRepository());
        const createdProduct = await createProductUseCase.execute({
            name: 'Product',
            price: 10.00
        });
        const productUpdateUseCase = new UpdateProductUseCase(new ProductRepository());

        const output = await productUpdateUseCase.execute({
            id: createdProduct.id,
            name: 'Product Updated',
            price: 20.00
        });
        expect(output).toEqual({
            id: createdProduct.id,
            name: output.name,
            price: output.price,
        });
    });

});