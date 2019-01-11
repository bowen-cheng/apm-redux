import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

// $$: note that the feature state name (matches the one defined in ProductModule.ts) is used here
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  // $$: More selectors can be inserted here. Their resulting state will be passed to the projector function in order
  state => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  // $$: These parameters are passed in by order of the above two selector
  (state, currentProductId) => {
    switch (currentProductId) {
      case 0:
        return {
          id: 0,
          productName: '',
          productCode: ' ',
          description: '',
          starRating: 0
        };
      case null:
        return null;
      default:
        return state.products.find(aProduct => aProduct.id === currentProductId);
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);
