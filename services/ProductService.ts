import * as repository from "../repositories/ProductRepository";
import { NewProduct } from "../types/Product";

export const ProductService = {
  async add(data: NewProduct) {
    console.log("🔧 Inserindo produto...", data);
    await repository.createProduct(data);
    console.log("✅ Produto inserido com sucesso");
  },

  async getAll() {
    return await repository.getAllProducts();
  },

  async delete(id: number) {
    await repository.deleteProduct(id);
  },

  async update(id: number, data: NewProduct) {
    await repository.updateProduct(id, data);
  },

  async getById(id: number) {
    return await repository.getProductById(id);
  },
};
