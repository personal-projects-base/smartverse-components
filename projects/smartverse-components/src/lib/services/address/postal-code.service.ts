import {HttpClient, HttpParams} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SMARTVERSE_COMPONENTS_CONFIG, SmartverseComponentsConfig} from '../../config/smartverse-components.config';
export interface PostalCodeAddress { postalCode: string; address: string; neighborhood: string; complement: string; city: unknown; }
@Injectable({providedIn: 'root'})
export class PostalCodeService {
  constructor(private readonly http: HttpClient,
              @Inject(SMARTVERSE_COMPONENTS_CONFIG) private readonly config: SmartverseComponentsConfig) {}
  lookup(postalCode: string): Observable<PostalCodeAddress> {
    return this.http.get<PostalCodeAddress>(this.config.endpoints.postalCode, {params: new HttpParams().set('postalCode', postalCode)});
  }
}
