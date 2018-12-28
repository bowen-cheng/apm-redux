import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';
import * as ProductActions from '../state/product.action';
import { AppState } from '../state/product.reducer';
import * as fromProducts from '../state/product.selector';

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
    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (err: any) => this.errorMessage = err.error
    );

    // $$: Code commented out since it uses plain string as selectors, not strongly typed ones
    // $$: "products" matches the name of the store we defined in the ProductModule
    // this.productStore.pipe(select('products')).subscribe(
    //   (productState: ProductState) => {
    //     //$$: The store is initialized to an non-null initial state, so no need to check null
    //     this.displayCode = productState.showProductCode;
    //   });

    // $$: Using the strongly typed selector, we will directly receive the ShowProductCode value.
    this.productStore.pipe(select(fromProducts.getShowProductCode)).subscribe(value => this.displayCode = value);
    this.productStore.pipe(select(fromProducts.getCurrentProduct)).subscribe(value => this.selectedProduct = value);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(value: boolean): void {
    // $$: Action is an object with type and payload
    this.productStore.dispatch(
      // { type: 'TOGGLE_PRODUCT_CODE', payload: value }
      new ProductActions.ToggleProductCode(value)
    );
  }

  newProduct(): void {
    // $$: dispatch an action to initialize the ProductEdit  from with empty values
    this.productStore.dispatch(new ProductActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // $$: Dispatch an action to update the slice of store of current product
    this.productStore.dispatch(new ProductActions.SetCurrentProduct(product));
  }

}
