import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/common/services/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lineItems: this.fb.array([
        this.fb.group({
          productName: ['', Validators.required],
          quantity: ['', Validators.required],
          unitPrice: ['', Validators.required],
        }),
      ]),
    });
  }

  get lineItems() {
    return this.form.get('lineItems') as FormArray;
  }

  addItem() {
    this.lineItems.push(
      this.fb.group({
        productName: ['', Validators.required],
        quantity: ['', Validators.required],
        unitPrice: ['', Validators.required],
      })
    );
  }

  removeItem(index: number) {
    this.lineItems.removeAt(index);
  }

  submitOrder() {
    const value = this.form.value;
    console.info(value);
    this.orderService.addOrder(value).then((result) => {
      console.info('Success: ', result);
      alert('Order is successful. ' + result.message);
      this.resetAndGoHome();
    });
  }

  resetAndGoHome() {
    this.form.reset();
    this.router.navigate(['/']);
  }
}
