import { Action } from '@ngrx/store';
import { Product } from '../product';

// $$: Define actions as named constants
export enum ProductActionType {
  ToggleProductCode = '[Product] Toggle product code',
  SetCurrentProduct = '[Product] Set current product',
  ClearCurrentProduct = '[Product] Clear current product',
  InitializeCurrentProduct = '[Product] Initialize current product',
  Load = '[Product] Load',
  LoadSuccess = '[Product] Load success',
  LoadFailure = '[Product] Load failure',
  Update = '[Product] Update',
  UpdateSuccess = '[Product] Update success',
  UpdateFailure = '[Product] Update failure'
}

// $$: build action creators
export class ToggleProductCode implements Action {
  readonly type = ProductActionType.ToggleProductCode;

  constructor(public payload: boolean) {}
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionType.SetCurrentProduct;

  constructor(public payload: Product) {}
}

export class ClearCurrentProduct implements Action {
  readonly type = ProductActionType.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action {
  readonly type = ProductActionType.InitializeCurrentProduct;
}

export class Load implements Action {
  readonly type = ProductActionType.Load;
}

export class LoadSuccess implements Action {
  readonly type = ProductActionType.LoadSuccess;

  constructor(public payload: Product[]) {}
}

export class LoadFailure implements Action {
  readonly type = ProductActionType.LoadFailure;

  constructor(public payload: string) {}
}

export class Update implements Action {
  readonly type = ProductActionType.Update;

  constructor(public payload: Product) {}
}

export class UpdateSuccess implements Action {
  readonly type = ProductActionType.UpdateSuccess;

  constructor(public payload: Product) {}
}

export class UpdateFailure implements Action {
  readonly type = ProductActionType.UpdateFailure;

  constructor(public payload: string) {}
}

// $$: Define a union type for action creators
export type ProductAction = ToggleProductCode
  | SetCurrentProduct
  | ClearCurrentProduct
  | InitializeCurrentProduct
  | Load
  | LoadSuccess
  | LoadFailure
  | Update
  | UpdateSuccess
  | UpdateFailure
