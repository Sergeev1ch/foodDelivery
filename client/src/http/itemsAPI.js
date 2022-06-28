import { $host } from './index';

export const getAll = async () => {
  const { data } = await $host.get('items/getAll');
  return data;
};

export const getAllForShop = async (shop) => {
  const { data } = await $host.get(`items/getAllForShop/${shop}`);
  return data;
};

export const getShops = async () => {
  const { data } = await $host.get('items/getShops');
  return data;
};
