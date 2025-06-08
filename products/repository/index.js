import Product from "../../model/product.model.js";

class ProductRepository {
  // 상품 생성
  async create(productData) {
    const createdProduct = await Product.create(productData);
    return createdProduct;
  }
}

export default new ProductRepository();
