import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ROUTES } from './server-route';
import { AstrologicalTermResponse } from '../interfaces/astrology';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends ApiService {
  fetchAstrologicalDictionary(): Observable<AstrologicalTermResponse[]> {
    return this.get<AstrologicalTermResponse[]>(ROUTES.ASTROLOGICAL_DICTIONARY);
  }

  addAstrologicalDictionary(body: any) {
    return this.post(ROUTES.ADD_ASTROLOGICAL_DICTIONARY, {
      body: body,
    });
  }

  deleteAstrologicalTermByID(
    termId: string
  ): Observable<AstrologicalTermResponse> {
    return this.get<AstrologicalTermResponse>(
      ROUTES.DELETE_ASTROLOGICAL_DICTIONARY + '/' + termId
    );
  }

  fetchAstrologicalTermById(
    termId: string
  ): Observable<AstrologicalTermResponse> {
    return this.get<AstrologicalTermResponse>(
      ROUTES.ASTROLOGICAL_DICTIONARY + '/' + termId
    );
  }

  editAstrologicalDictionary(termId: string, body: any) {
    return this.post(ROUTES.EDIT_ASTROLOGICAL_DICTIONARY + '/' + termId, {
      body: body,
    });
  }

  fetchDreamDictionary(): Observable<AstrologicalTermResponse[]> {
    return this.get<AstrologicalTermResponse[]>(ROUTES.DREAM_DICTIONARY);
  }

  fetchDreamTermById(termId: string): Observable<AstrologicalTermResponse> {
    return this.get<AstrologicalTermResponse>(
      ROUTES.DREAM_DICTIONARY + '/' + termId
    );
  }

  addDreamDictionary(body: any) {
    return this.post(ROUTES.ADD_DREAM_DICTIONARY, {
      body: body,
    });
  }

  deleteDreamTermByID(termId: string): Observable<AstrologicalTermResponse> {
    return this.get<AstrologicalTermResponse>(
      ROUTES.DELETE_DREAM_DICTIONARY + '/' + termId
    );
  }

  editDreamDictionary(termId: string, body: any) {
    return this.post(ROUTES.EDIT_DREAM_DICTIONARY + '/' + termId, {
      body: body,
    });
  }

  fetchZodiacSign(): Observable<AstrologicalTermResponse[]> {
    return this.get<AstrologicalTermResponse[]>(ROUTES.ZODIAC_SIGN);
  }

  fetchZodiacSignById(termId: string): Observable<AstrologicalTermResponse> {
    return this.get<AstrologicalTermResponse>(
      ROUTES.ZODIAC_SIGN + '/' + termId
    );
  }

  addZodiacSign(body: any) {
    return this.post(ROUTES.ADD_ZODIAC_SIGN, {
      body: body,
    });
  }

  deleteZodiacSignByID(termId: string): Observable<AstrologicalTermResponse> {
    return this.get<AstrologicalTermResponse>(
      ROUTES.DELETE_ZODIAC_SIGN + '/' + termId
    );
  }

  editZodiacSign(termId: string, body: any) {
    return this.post(ROUTES.EDIT_ZODIAC_SIGN + '/' + termId, {
      body: body,
    });
  }
}
