import Product from "../../model/product.model.js";

class ProductRepository {
  // 상품 생성
  async create(productData) {
    const createdProduct = await Product.create(productData);
    return createdProduct;
  }

  // ID기반 상품 조회
  async getProductById(id) {
    return await Product.findById(id);
  }

  // ID기반 상품 수정
  async updateProductById(id, updateData) {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
  }

  // ID기반 상품 삭제
  async deleteProductById(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default new ProductRepository();
