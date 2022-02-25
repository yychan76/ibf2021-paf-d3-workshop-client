export interface Order {
  oId?: number;
  name: string;
  email: string;
  lineItems: LineItem[];
}

export interface LineItem {
  itemId?: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderSummary {
  oId: number;
  name: string;
  email: string;
  totalCost: number;
}
