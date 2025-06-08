import productService from "../service/index.js";

class ProductController {
  productService;
  constructor(productService) {
    this.productService = productService;
  }

  //POST /products - 상품생성
  create = async (req, res, next) => {
    try {
      const { title, imageUrl, description, price, tags } = req.body;
      const newProduct = await this.productService.create({
        title,
        imageUrl,
        description,
        price,
        tags,
      });

      return res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  };
}

export default new ProductController(productService);
