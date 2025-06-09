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

  //Get /products/:id - 단일상품조회
  getProductById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const product = await this.productService.getProductById(id);
      return res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  };

  //Patch /products/:id - 상품수정
  updateProductById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const { title, imageUrl, description, price, tags } = req.body;

      const updatedProduct = await this.productService.updateProductById(id, {
        title,
        imageUrl,
        description,
        price,
        tags,
      });

      return res.status(200).json(updatedProduct);
    } catch (err) {
      next(err);
    }
  };

  //Delete /products/:id - 상품삭제
  deleteProductById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedProduct = await this.productService.deleteProductById(id);

      return res.status(200).json(deletedProduct);
    } catch (err) {
      next(err);
    }
  };

  //Get /products - 상품조회
  getProducts = async (req, res, next) => {
    try {
      const offset = Number(req.query.offset) || 0;
      const limit = Number(req.query.limit) || 10;
      const orderBy = req.query.orderBy || "recent";
      const search = req.query.search || "";

      const products = await this.productService.getProducts({
        offset,
        limit,
        orderBy,
        search,
      });

      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  };
}

export default new ProductController(productService);
