import productRepository from "../repository/index.js";

import {
  validateStringField,
  validateNumberField,
  validateStringArray,
  validateObjectId,
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

  // ID 기반 단일 상품 조회 로직
  getProductById = async (id) => {
    validateObjectId(id);

    const product = await productRepository.getProductById(id);
    if (!product) {
      const error = new Error("해당 ID의 상품이 존재하지 않습니다.");
      error.statusCode = 404;
      throw error;
    }
    return product;
  };

  // ID 기반 상품 수정 서비스 로직
  updateProductById = async (
    id,
    { title, imageUrl, description, price, tags }
  ) => {
    validateObjectId(id);
    validateStringField(title, "title");
    validateStringField(imageUrl, "imageUrl");
    validateStringField(description, "description");
    validateNumberField(price, "price");
    validateStringArray(tags, "tags");

    const updatedProduct = await productRepository.updateProductById(id, {
      title,
      imageUrl,
      description,
      price,
      tags,
    });

    if (!updatedProduct) {
      const error = new Error("해당 ID의 상품이 존재하지 않습니다.");
      error.statusCode = 404;
      throw error;
    }
    return updatedProduct;
  };

  // ID 기반 상품 삭제 서비스 로직
  deleteProductById = async (id) => {
    validateObjectId(id);

    const deletedProduct = await productRepository.deleteProductById(id);

    if (!deletedProduct) {
      const error = new Error("해당 ID의 상품이 존재하지 않습니다.");
      throw error;
    }
    return deletedProduct;
  };

  // 상품 조회 서비스 로직
  getProducts = async ({ offset, limit, orderBy, search }) => {
    // 정렬 기준 유효성 검사
    const validOrders = ["recent", "oldest"];
    if (!validOrders.includes(orderBy)) {
      const error = new Error("잘못된 정렬 기준입니다.");
      error.statusCode = 400;
      throw error;
    }

    // 검색 조건 구성
    const whereCondition = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // 정렬 조건 구성
    const sortCondition =
      orderBy === "recent" ? { createdAt: -1 } : { createdAt: 1 };

    const products = await productRepository.getProducts({
      whereCondition,
      sortCondition,
      offset,
      limit,
    });

    return products;
  };
}
export default new ProductService(productRepository);
