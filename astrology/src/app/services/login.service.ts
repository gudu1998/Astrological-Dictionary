import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ROUTES } from './server-route';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends ApiService {
  login(payload: any): Observable<any> {
    return this.post(ROUTES.SIGNIN, {
      body: payload,
    });
  }
}
