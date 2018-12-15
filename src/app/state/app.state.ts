import { ProductState } from '../products/state/product.reducer';

export interface AppState {
  // Notice that by including the ProductState directly in the global AppState, lazy loading of Product module is broken
  products: ProductState;
  user: any;
}
