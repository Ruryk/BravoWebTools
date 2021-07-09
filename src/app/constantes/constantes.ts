export const CDisplayedCatalogColumns: string[] = ['code', 'name', 'unit', 'price', 'availability', 'actions'];

export const CAvailabilityList: string[] = ['In stock', 'Out of stock', 'Discontinued'];

export const CDisplayedOrdersColumns: string[] = ['dropdown', 'orderNo', 'customer', 'customerNo', 'items', 'notes', 'ordered', 'delivery', 'status'];

export const CDisplayedOrdersColumnsItems: string[] = ['productCode', 'productName', 'unit', 'quantity'];

export const config = {
  server: 'http://localhost:3000'
};

export const CStatusOrder = [
  { value: '', viewValue: 'All' },
  { value: 'confirm', viewValue: 'Confirm' },
  { value: 'confirmed', viewValue: 'Confirmed' }
];
