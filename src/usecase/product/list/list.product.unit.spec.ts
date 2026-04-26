import { ListProductUseCase } from "./list.product.usecase";

describe('Unit test create product use case', () => {

    const input = {};

    const MockRepository = () => {
        return {
            find: jest.fn(),
            findAll: jest.fn().mockReturnValue(Promise.resolve([{
                id: '123',
                name: 'Product',
                price: 10.00
            },
            {
                id: '321',
                name: 'Product2',
                price: 10.00
            }
            ])),
            create: jest.fn(),
            update: jest.fn(),
        };
    };

    it('should list products', async () => {
        const productRepository = MockRepository();
        const listProductUseCase = new ListProductUseCase(productRepository);

        const output = await listProductUseCase.execute(input);
        expect(output).toEqual({
            products: {
                product: [
                    {
                        id: '123',
                        name: 'Product',
                        price: 10.00
                    },
                    {
                        id: '321',
                        name: 'Product2',
                        price: 10.00
                    }
                ]
            }
        });
    });

});