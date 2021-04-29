import {Injectable} from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import * as fromLoader from '../../store/actions/loader.actions'
import {Store} from "@ngrx/store";
import {AppState} from "../../store";
import {finalize} from "rxjs/operators";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    Promise.resolve(null).then(() => this.store.dispatch(fromLoader.showLoader()));

    return next.handle(req).pipe(
      finalize(() => this.store.dispatch(fromLoader.hideLoader()))
    );
    // this.requests.push(req);
    // this.loaderService.isLoading.next(true);
    //
    // return new Observable(observer => {
    //   const subscription = next.handle(req).subscribe(
    //     event => {
    //       if (event instanceof HttpResponse) {
    //         this.removeRequest(req);
    //         observer.next(event);
    //       }
    //     },
    //     err => {
    //       this.removeRequest(req);
    //       observer.error(err);
    //     },
    //     () => {
    //       this.removeRequest(req);
    //       observer.complete();
    //     }
    //   );
    //   // teardown logic in case of cancelled request
    //   return () => {
    //     this.removeRequest(req);
    //     subscription.unsubscribe();
    //   };
    // })
  }

}

export const loaderInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, userClass: LoaderInterceptor, multi: true}
]
