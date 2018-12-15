import { Product } from '../product';

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
