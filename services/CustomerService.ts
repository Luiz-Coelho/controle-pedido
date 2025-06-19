import * as repository from "../repositories/CustomerRepository";
import { NewCustomer } from "../types/Customer";

export const CustomerService = {
  async add(data: NewCustomer) {
    await repository.createCustomer(data);
  },

  async getAll() {
    return await repository.getAllCustomers();
  },

  async delete(id: number) {
    await repository.deleteCustomer(id);
  },

  async update(id: number, data: NewCustomer) {
    await repository.updateCustomer(id, data);
  },

  async getById(id: number) {
    return await repository.getCustomerById(id);
  },
};
