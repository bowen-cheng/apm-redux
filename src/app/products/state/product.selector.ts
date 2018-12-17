import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

// $$: note that the feature state name (matches the one defined in ProductModule.ts) is used here
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);
