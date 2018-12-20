import * as globalStates from '../../state/app.state';
import { Product } from '../product';
import { ProductAction, ProductActionType } from './product.action';

//$$: The following sate should be imported instead of the global one
export interface AppState extends globalStates.AppState {
  products: ProductState;
}

/**
 * State type definition of Product feature module
 */
export interface ProductState {
  products: Product[];
  currentProduct: Product;
  showProductCode: boolean;
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  showProductCode: true
};

/**
 * Product reducer function
 */
export function productReducer(state = initialState, action: ProductAction): ProductState {
  switch (action.type) {
    case ProductActionType.ToggleProductCode:
      return {
        ...state,
        // $$: overwrite the existing "showProductCode" property
        showProductCode: action.payload
      };
    case ProductActionType.SetCurrentProduct:
      return {
        ...state,
        currentProduct: action.payload
      };
    case ProductActionType.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      };
    case ProductActionType.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: ' ',
          description: '',
          starRating: 0
        }
      };
    default:
      return state;
  }
}
