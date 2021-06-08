export interface OrdersTableElement {
  dropdown: string;
  order: string;
  customer: string;
  customerNo: string;
  items: number;
  notes: string;
  ordered: string;
  delivery: string;
  status: boolean;
  position: string;
}

export interface OrdersTableElementItem {
  code: string;
  product: string;
  unit: string;
  quantity: number;
}

export interface CustomersTableElement {
  customer: string;
  name: string;
  address: string;
  days: string;
}


export interface CatalogTableElement {
  code: string;
  name: string;
  unit: string;
  price: number;
  availability: string;
  actions: string;
}
