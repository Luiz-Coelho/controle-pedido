import * as repository from "../repositories/OrderItemRepository";
import { NewOrderItem } from "../types/OrderItem";

export const OrderItemService = {
  async getByOrderId(orderId: number) {
    return await repository.getOrderItemsByOrderId(orderId);
  },

  async getById(id: number) {
    return await repository.getOrderItemById(id);
  },

  async add(data: NewOrderItem) {
    await repository.createOrderItem(data);
  },

  async update(id: number, data: NewOrderItem) {
    await repository.updateOrderItem(id, data);
  },

  async delete(id: number, orderId: number) {
    await repository.deleteOrderItem(id, orderId);
  },
};
