import productRepository from "../repository/index.js";
import {
  validateStringField,
  validateNumberField,
  validateStringArray,
} from "../../utils/validate.js";

class ProductService {
  productRepository;
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  // 상품생성 서비스 로직
  create = async ({ title, imageUrl, description, price, tags }) => {
    validateStringField(title, "title");
    validateStringField(imageUrl, "imageUrl");
    validateStringField(description, "description");
    validateNumberField(price, "price");
    validateStringArray(tags, "tags");

    const createdProduct = await productRepository.create({
      title,
      imageUrl,
      description,
      price,
      tags,
    });

    return createdProduct;
  };
}
export default new ProductService(productRepository);
