import { FindProductUseCase } from "./find.product.usecase";

describe('Unit test create product use case', () => {

    const input = {
        id: '123',
    };

    const MockRepository = () => {
        return {
            find: jest.fn().mockReturnValue(Promise.resolve({
                id: '123',
                name: 'Product',
                price: 10.00
            })),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        };
    };

    it('should find a product', async () => {
        const productRepository = MockRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const output = await findProductUseCase.execute(input);
        expect(output).toEqual({
            id: '123',
            name: 'Product',
            price: 10.00
        });
    });

});