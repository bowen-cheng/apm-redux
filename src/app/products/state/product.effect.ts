import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Load, LoadFailure, LoadSuccess, ProductActionType } from './product.action';

@Injectable({
  providedIn: 'root'
})
export class ProductEffect {

  constructor(private actions: Actions, private productService: ProductService) { }

  @Effect()
  loadProducts = this.actions.pipe(
    ofType(ProductActionType.Load),
    // $$: Use merge map to merge multiple inner observables returned from calling productService into one stream
    mergeMap((action: Load) => {
      return this.productService.getProducts().pipe(
        map((products: Product[]) => new LoadSuccess(products)),
        catchError(err => of(new LoadFailure(err)))
      );
    })
  );

}
