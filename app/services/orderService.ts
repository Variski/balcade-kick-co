import { api } from "./api";

export const checkoutOrder = (data: any) =>
  api("/orders/checkout.php", "POST", data);

export const getOrders = (userId: number) =>
  api(`/orders/index.php?user_id=${userId}`);
