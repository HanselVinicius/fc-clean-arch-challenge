import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { CreateProductUseCase } from "../create/create.product.usecase";
import { ListProductUseCase } from "./list.product.usecase";


describe("Test list products use case", () => {
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

    it("should list products", async () => {
        const listProductUseCase = new ListProductUseCase(new ProductRepository());
        const createProductUseCase = new CreateProductUseCase(new ProductRepository());
        
        const createdProduct1 = await createProductUseCase.execute({
            name: "Product",
            price: 10.00
        });

        const createdProduct2 = await createProductUseCase.execute({
            name: "Product2",
            price: 20.00
        });

        const input = {};

        const output = await listProductUseCase.execute(input);

        expect(output).toEqual({
            products: {
                product: [
                    {
                        id: createdProduct1.id,
                        name: createdProduct1.name,
                        price: createdProduct1.price,
                    },
                    {
                        id: createdProduct2.id,
                        name: createdProduct2.name,
                        price: createdProduct2.price,
                    }
                ]
            }
        });
    });
});
