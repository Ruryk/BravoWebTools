export enum EAnimation {
  DetailExpand = 'detailExpand',
  Collapsed = 'collapsed',
  Expanded = 'expanded'
}

export enum EStatus {
  Confirm = 'confirm',
  Confirmed = 'confirmed',
  All = ''
}

export enum EOrdersColumn {
  Dropdown = 'dropdown',
  OrderNo = 'orderNo',
  Customer = 'customer',
  CustomerNo = 'customerNo',
  Items = 'items',
  Notes = 'notes',
  Ordered = 'ordered',
  Delivery = 'delivery',
  Status = 'status'
}

export enum ECatalogColumn {
  Code = 'code',
  Name = 'name',
  Unit = 'unit',
  Price = 'price',
  Availability = 'availability',
  Actions = 'actions',
}

export enum EErrorMessages {
  CustomerAdd = 'Customer was not added. Error',
  CustomerEdit = 'Customer was not edited. Error',
  CatalogEdit = 'Product was not edited. Error',
  CatalogAdd = 'Product was not added. Error',
  CatalogDelete = 'Product was not deleted. Error',
  OrderCompleted =  'Error confirmed order'
}
