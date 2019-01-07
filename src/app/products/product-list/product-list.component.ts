import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
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

  // $$: unsubscribe method 1, takeWhile() operator
  isComponentActive = true;
  // $$: unsubscribe method 2, async pipe
  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  // $$: Notice here we imported the AppState defined in ProductReducer, not the global one
  constructor(private productService: ProductService, private productStore: Store<AppState>) { }

  ngOnInit(): void {
    // $$: dispatch load action to load products
    this.productStore.dispatch(new ProductActions.Load());

    // $$: Code commented out since it uses plain string as selectors, not strongly typed ones
    // $$: "products" matches the name of the store we defined in the ProductModule
    // this.productStore.pipe(select('products')).subscribe(
    //   (productState: ProductState) => {
    //     //$$: The store is initialized to an non-null initial state, so no need to check null
    //     this.displayCode = productState.showProductCode;
    //   });

    // $$: Using the strongly typed selector, we will directly receive the ShowProductCode value.
    this.productStore.pipe(select(fromProducts.getShowProductCode)).subscribe(value => this.displayCode = value);

    // $$: unsubscribe method 1: use the takeWhile operator to automatically unsubscribe if component is inactive
    this.productStore.pipe(
      select(fromProducts.getCurrentProduct),
      takeWhile(() => this.isComponentActive)
    ).subscribe(value => this.selectedProduct = value);

    // $$: subscribe to the store to get the list of products once the request is finished
    // this.productStore.pipe(select(fromProducts.getProducts)).subscribe((val: Product[]) => this.products = val);

    // $$: unsubscribe method 2: use an async pipe to let Angular automatically unsubscribe if component is inactive
    this.products$ = this.productStore.pipe(select(fromProducts.getProducts));
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
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
