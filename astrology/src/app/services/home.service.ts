import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ROUTES } from './server-route';
import { AstrologicalTermResponse } from '../interfaces/astrology';

@Injectable({
  providedIn: 'root',
})
export class AstrologyService extends ApiService {
  fetchAstrologicalTermByLetter(
    letter: string
  ): Observable<AstrologicalTermResponse[]> {
    return this.get<AstrologicalTermResponse[]>(
      this.replacePathInfo(ROUTES.ASTROLOGICAL_TERM, {
        letter: letter,
      })
    );
  }

  fetchDreamTermByLetter(
    letter: string
  ): Observable<AstrologicalTermResponse[]> {
    return this.get<AstrologicalTermResponse[]>(
      this.replacePathInfo(ROUTES.DREAM_TERM, {
        letter: letter,
      })
    );
  }
}
