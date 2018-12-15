import { Product } from '../product';

import * as globalStates from '../../state/app.state'

//$$: The following sate should be imported instead of the global one
export interface AppState extends globalStates.AppState {
  products: ProductState;
}

export interface ProductState {
  products: Product[];
  currentProduct: Product;
  showProductCode: boolean;
}

const initialState: ProductState =  {
  products: [],
  currentProduct: null,
  showProductCode: true
};

/**
 * Product reducer function
 */
export function productReducer(state = initialState, action): ProductState {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      return {
        ...state,
        // $$: overwrite the existing "showProductCode" property
        showProductCode: action.payload
      };
    default:
      return state;
  }
}
