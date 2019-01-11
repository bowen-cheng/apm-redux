import * as globalStates from '../../state/app.state';
import { Product } from '../product';
import { ProductAction, ProductActionType } from './product.action';

// $$: The following sate should be imported instead of the global one
export interface AppState extends globalStates.AppState {
  // $$: this field name here is not the name of the slice of the state for products. Instead, the slice name "products"
  // is defined in ProductModule by "StoreModule.forFeature('products', productReducer)"
  productState: ProductState;
}

/**
 * State type definition of Product feature module
 */
export interface ProductState {
  products: Product[];
  currentProductId: number | null;
  showProductCode: boolean;
  error: string;
}

const initialState: ProductState = {
  products: [],
  currentProductId: null,
  showProductCode: true,
  error: ''
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
        currentProductId: action.payload.id
      };
    case ProductActionType.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null
      };
    case ProductActionType.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0
      };
    case ProductActionType.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: '' // clear any residual error info on load success
      };
    case ProductActionType.LoadFailure:
      return {
        ...state,
        products: [],
        error: action.payload
      };
    default:
      return state;
  }
}
