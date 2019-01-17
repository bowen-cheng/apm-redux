import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../product';
import { ProductService } from '../../product.service';
import * as ProductActions from '../../state/product.action';
import { AppState } from '../../state/product.reducer';
import * as fromProducts from '../../state/product.selector';

/**
 * This is a container component
 * It doesn't have much HTML or CSS
 * It cares more about the logic of loading and changing data
 * It loads and changes data via service classes or NgRx store once such event is emitted by presentational components
 */
@Component({
  templateUrl: './product-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {

  error: Observable<string>;
  displayCode: Observable<boolean>;
  products: Observable<Product[]>;
  selectedProduct: Observable<Product>;

  constructor(private productService: ProductService, private productStore: Store<AppState>) { }

  ngOnInit(): void {
    // $$: dispatch load action to load products
    this.productStore.dispatch(new ProductActions.Load());

    this.selectedProduct = this.productStore.pipe(select(fromProducts.getCurrentProduct));
    this.displayCode = this.productStore.pipe(select(fromProducts.getShowProductCode));
    this.products = this.productStore.pipe(select(fromProducts.getProducts));
    this.error = this.productStore.pipe(select(fromProducts.getError));
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
