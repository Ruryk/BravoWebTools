export interface OrdersTableElement {
  dropdown: string;
  order: string;
  customer: string;
  customerNo: string;
  items: number;
  notes: string;
  ordered: number;
  delivery: number;
  status: string;
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


// ========================Store=======================
export interface ICustomers {
  customerNo?: string;
  name?: string;
  address?: string;
  days?: string[];
  productsCodes?: string[];
  contactName?: string;
  phone?: string;
}

export interface ICustomersState {
  [code: string]: ICustomers;
}
