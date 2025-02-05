export type Customer = {
  name: string;
  productsQuantity: number;
};

export type CheckoutCollectionType = {
  name: string;
  customers: Customer[];
};
