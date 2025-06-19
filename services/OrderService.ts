import * as repository from "../repositories/OrderRepository";
import * as orderItemRepository from "../repositories/OrderItemRepository";
import { NewOrder } from "../types/Order";
import { NewOrderItem } from "../types/OrderItem";

export const OrderService = {
  async add(data: NewOrder, items: Omit<NewOrderItem, "id" | "orderId">[]) {
    await repository.createOrder(data, items);
  },

  async getAll() {
    return await repository.getAllOrders();
  },

  async getAllWithTotals() {
    return await repository.getAllOrdersWithTotals();
  },

  async getById(id: number) {
    const order = await repository.getOrderById(id);
    if (!order) return undefined;

    const items = await orderItemRepository.getOrderItemsByOrderId(id);

    return { order, items };
  },

  async update(id: number, data: NewOrder) {
    await repository.updateOrder(id, data);
  },

  async delete(id: number) {
    await repository.deleteOrder(id);
  },
};
