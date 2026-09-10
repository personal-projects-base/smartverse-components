import {HttpClient, HttpParams} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SMARTVERSE_COMPONENTS_CONFIG, SmartverseComponentsConfig} from '../../config/smartverse-components.config';
import {GenerateScreenReportRequest, GenerateScreenReportResponse, ScreenReportsResponse} from './screen-report.models';
@Injectable({providedIn: 'root'})
export class ScreenReportService {
  constructor(private readonly http: HttpClient,
              @Inject(SMARTVERSE_COMPONENTS_CONFIG) private readonly config: SmartverseComponentsConfig) {}
  getByScreen(screen: string): Observable<ScreenReportsResponse> {
    return this.http.get<ScreenReportsResponse>(this.config.endpoints.screenReports, {params: new HttpParams().set('screen', screen)});
  }
  generate(request: GenerateScreenReportRequest): Observable<GenerateScreenReportResponse> {
    return this.http.post<GenerateScreenReportResponse>(this.config.endpoints.generateScreenReport, request);
  }
}
