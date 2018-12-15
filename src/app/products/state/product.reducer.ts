import { Product } from '../product';

import * as globalStates from '../../state/app.state'

//$$: once loaded, the following sate overwrites the global AppState and adds the products slice
export interface AppState extends globalStates.AppState {
  products: ProductState;
}

export interface ProductState {
  products: Product[];
  currentProduct: Product;
  showProductCode: boolean;
}

/**
 * Product reducer function
 */
export function productReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      console.log('existing state:', state);
      console.log('Action:', action);
      return {
        ...state,
        // $$: overwrite the existing "showProductCode" property
        showProductCode: action.payload
      };
    default:
      return state;
  }
}
