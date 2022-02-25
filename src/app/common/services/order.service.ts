import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Order, OrderSummary } from '../models';

const URL_API_POST_ORDER = 'api/orders';
const URL_API_GET_ALL_ORDERS = 'api/orders';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  addOrder(order: Order): Promise<any> {
    return lastValueFrom(this.http.post<any>(URL_API_POST_ORDER, order));
  }

  getAllOrders(): Observable<OrderSummary[]> {
    return this.http.get<OrderSummary[]>(URL_API_GET_ALL_ORDERS);
  }
}
