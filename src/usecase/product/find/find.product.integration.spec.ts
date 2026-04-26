import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { FindProductUseCase } from "./find.product.usecase";
import { CreateProductUseCase } from "../create/create.product.usecase";


describe("Test find product use case", () => {
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

    it("should find a product", async () => {
        const findProductUseCase = new FindProductUseCase(new ProductRepository());
        const createProductUseCase = new CreateProductUseCase(new ProductRepository());
        
        const createdProduct = await createProductUseCase.execute({
            name: "Product",
            price: 10.00
        });
        const input = {
            id: createdProduct.id,
        };

        const output = await findProductUseCase.execute(input);

        expect(output).toEqual({
            id: createdProduct.id,
            name: createdProduct.name,
            price: createdProduct.price,
        });
    });
});
