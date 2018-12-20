import { Action } from '@ngrx/store';
import { Product } from '../product';

// $$: Define actions as named constants
export enum ProductActionType {
  ToggleProductCode = '[Product] Toggle product code',
  SetCurrentProduct = '[Product] Set current product',
  ClearCurrentProduct = '[Product] Clear current product',
  InitializeCurrentProduct = '[Product] I nitialize current product'
}

// $$: build action creators
export class ToggleProductCode implements Action {
  readonly type = ProductActionType.ToggleProductCode;

  constructor(public  payload: boolean) {}
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionType.SetCurrentProduct;

  constructor(public  payload: Product) {}
}

export class ClearCurrentProduct implements Action {
  readonly type = ProductActionType.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action {
  readonly type = ProductActionType.InitializeCurrentProduct;
}

// $$: Define a union type for action creators
export type ProductAction = ToggleProductCode
| SetCurrentProduct
| ClearCurrentProduct
| InitializeCurrentProduct
