import { $host } from './index';

export const createOrder = async (name, email, phone, address, cart, price) => {
  const { data } = await $host.post('orders/create', {
    name, email, phone, address, cart, price,
  });
  return { data };
};
