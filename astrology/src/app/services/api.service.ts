import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

interface RequestOptions {
  params?: { [key: string]: any };
  body?: { [key: string]: any };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private createParams(params?: { [key: string]: any }): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return httpParams;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`; // use error.message to get the error message
    } else if (error.error.data == undefined || error.error.data.length == 0) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error.message; // use error.status and error.message to get the error details
    }
    return throwError(errorMessage);
  }

  replacePathInfo(route: string, pathInfo?: { [key: string]: any }): string {
    if (pathInfo) {
      const replaceableKeys = Object.keys(pathInfo);
      for (const key of replaceableKeys) {
        const str = '{' + key + '}';
        route = route.replace(str, pathInfo[key]);
      }
    }
    return route;
  }

  request<T>(
    method: string,
    endpoint: string,
    options?: RequestOptions
  ): Observable<T> {
    let httpOptions: any = {
      body: options?.body,
      params: this.createParams(options?.params),
    };

    const req = new HttpRequest<T>(method, endpoint, httpOptions.body, {
      headers: httpOptions.headers,
      params: httpOptions.params,
    });

    return this.http.request<T>(req).pipe(
      filter(
        (event): event is HttpResponse<T> => event instanceof HttpResponse
      ),
      map((response: HttpResponse<T>) => response.body as T),
      catchError(this.handleError)
    );
  }

  get<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    return this.request<T>('GET', endpoint, options);
  }

  post<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    return this.request<T>('POST', endpoint, options);
  }

  patch<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    return this.request<T>('PATCH', endpoint, options);
  }
}
