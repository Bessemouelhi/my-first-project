import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  items = this.cartService.getItems();
  options: any[] = [];

  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
    selectedOption: ''
  });

  ngOnInit(): void {
    this.loadOptions();
  }

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  onSubmit(): void {
    // Process checkout data here
    // const name = this.checkoutForm.get('name')?.value;
    // const address = this.checkoutForm.get('address')?.value;
    // const selectedOption = this.checkoutForm.get('selectedOption')?.value;
    const {name, address, selectedOption} = this.checkoutForm.value;
    const option = this.options.find(option => option.type === selectedOption);
    console.log('Price : ', option.price);
    

    console.log(name);
    console.log(address);
    console.log(selectedOption);

    this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }

  getOptions(): Observable<any[]> {
    return this.http.get<any[]>('assets/shipping.json');
  }

  loadOptions(): void {
    this.getOptions().subscribe((data) => {
      this.options = data;
    });
  }

  clearCart() {
    this.items = this.cartService.clearCart();
    console.log('clear');
  }

  removeItem(index: number){
    this.cartService.removeItem(index);
  }

}
