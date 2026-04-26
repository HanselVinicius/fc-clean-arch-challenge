import Product from "../../../domain/product/entity/product";
import { UpdateProductUseCase } from "./update.product.usecase";

const product = {
    id: "123",
    name: "Product 1",
    price: 10,
};

const input = {
    id: product.id,
    name: "Product 1 Updated",
    price: 20,
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(new Product(product.id, product.name, product.price))),
        update: jest.fn(),
    };
};

describe("Unit test for product update use case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});
