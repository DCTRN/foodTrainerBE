import { Product, ProductDTO } from '../models';

export class ProductToDTOConverter {
  private readonly errorText = 'Missing data from DB';

  public convertProduct(product: Product): ProductDTO {
    try {
      return {
        id: product.id,
        producer: product.producer,
        name: product.name,
        unit: product.unit,
        amount: product.amount,
        kcal: product.kcal,
        protein: product.protein,
        carbohydrates: product.carbohydrates,
        fats: product.fats,
        creatorId: product.creator.id,
      };
    } catch {
      throw Error(this.errorText);
    }
  }

  public convertProducts(product: Product[]): ProductDTO[] {
    return product.map(p => this.convertProduct(p)).sort((a, b) => a.id - b.id);
  }
}
