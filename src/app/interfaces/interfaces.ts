import { FormControl } from '@angular/forms';

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

export interface CatalogTableElement {
  code: string;
  name: string;
  unit: string;
  price: number;
  availability: string;
  actions: string;
}


// ========================Store=======================
export interface IDays {
  Mon: boolean;
  Tue: boolean;
  Wed: boolean;
  Thu: boolean;
  Fri: boolean;
  Sat: boolean;
  Sun: boolean;
}

export interface ICustomers {
  customerNo?: string;
  name?: string;
  address?: string;
  days?: IDays;
  notify?: boolean;
  productsCodes?: string[];
  contactName?: string;
  contactPhone?: string;
}

export interface ICustomersState {
  [code: string]: ICustomers;
}

export interface IUnits {
  unit?: string;
  price?: string;
}

export interface ICatalog {
  code?: string;
  name?: string;
  units?: IUnits[];
  availability?: string;
  actions?: string;
  exclusively?: string[];
  replacementProducts?: string[];
}

export interface ICatalogState {
  [code: string]: ICatalog;
}
export interface IProducts {
  productCode?: string;
  productName?: string;
  unit?: string;
  quantity?: number;
}

export interface IOrders {
  dropdown?: string;
  orderNo?: number;
  customer?: string;
  customerNo?: string;
  items?: number;
  notes?: string;
  ordered?: number;
  delivery?: number;
  status?: boolean;
  address?: string;
  products?: IProducts[];
}

export interface IOrdersState {
  [code: string]: IOrders;
}
