import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export class FindProductUseCase {

    constructor(private readonly productRepository: ProductRepositoryInterface) { }

    public async execute(inputFindProductDto: InputFindProductDto): Promise<OutputFindProductDto> {
        const product = await this.productRepository.find(inputFindProductDto.id);
        return {
            id: product.id,
            name: product.name,
            price: product.price
        };
    }

}