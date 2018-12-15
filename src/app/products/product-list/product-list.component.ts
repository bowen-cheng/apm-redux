import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { AppState, ProductState } from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;
  // $$: Notice here we imported the AppState defined in ProductReducer, not the global one
  constructor(private productService: ProductService, private productStore: Store<AppState>) { }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );

    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (err: any) => this.errorMessage = err.error
    );

    // $$: "products" matches the name of the store we defined in the ProductModule
    this.productStore.pipe(select('products')).subscribe(
      (productState: ProductState) => {
        //$$: The store is initialized to an non-null initial state, so no need to check null
        this.displayCode = productState.showProductCode;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(value: boolean): void {
    // $$: Action is an object with type and payload
    this.productStore.dispatch({type: 'TOGGLE_PRODUCT_CODE', payload: value});
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }

}
