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

export interface IStatus {
  value: string;
  viewValue: string;
}

export interface IFilterValues {
  customer: string[];
  column: string;
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
  _id: string;
  customerNo: string;
  name: string;
  address: string;
  days: IDays;
  notify: boolean;
  productsCodes: string[];
  contactName: string;
  contactPhone: string;
}

export interface ICustomersData {
  [code: string]: ICustomers;
}

export interface ICustomersState {
  errorMessage: string;
  data: ICustomersData;
}

export interface IUnits {
  unit?: string;
  price?: string;
}

export interface ICatalog {
  _id: string;
  code: string;
  name: string;
  units: IUnits[];
  availability: string;
  actions: string;
  exclusively: string[];
  replacementProducts: string[];
}

export interface ICatalogData {
  [code: string]: ICatalog;
}

export interface ICatalogState {
  errorMessage: string;
  data: ICatalogData;
}

export interface IProducts {
  productCode: string;
  productName: string;
  unit: string;
  quantity: number;
}

export interface IOrders {
  dropdown: string;
  orderNo: number;
  customer: string;
  customerNo: string;
  items: number;
  notes: string;
  ordered: number;
  delivery: number;
  status: boolean;
  address: string;
  products: IProducts[];
}

export interface IOrdersData {
  [code: string]: IOrders;
}

export interface IOrdersState {
  errorMessage: string;
  data: IOrdersData;
}


export interface IErrorState {
  catalog: {
    addAction?: boolean;
    editAction?: boolean;
    replaceAction?: boolean;
    deleteAction?: boolean;
  };
  customers: {
    addAction?: boolean;
    editAction?: boolean;
  };
}
