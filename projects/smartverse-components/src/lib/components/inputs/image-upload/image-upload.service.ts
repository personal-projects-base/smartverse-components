import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";
import {SMARTVERSE_COMPONENTS_CONFIG, SmartverseComponentsConfig} from '../../../config/smartverse-components.config';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private readonly http: HttpClient,
              @Inject(SMARTVERSE_COMPONENTS_CONFIG) private readonly config: SmartverseComponentsConfig) { }

  public onRequestUpload(imageName: string) : Observable<any> {
    return this.http.get<any>(this.config.endpoints.requestUpload, {params: this.params(imageName)});
  }

  public onRequestDonwload(imageName: string) : Observable<any> {
    return this.http.get<any>(this.config.endpoints.requestDownload, {params: this.params(imageName)});
  }

  public onDeleteObject(imageName: string) : Observable<any> {
    return this.http.get<any>(this.config.endpoints.deleteObject, {params: new HttpParams().set('fileName', imageName)});
  }

  public onUpload(url: string, file: ArrayBuffer) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream', // Define o tipo como binário
    });
    return this.http.put<any>(url, file, { headers });
  }

  private params(fileName: string): HttpParams {
    return new HttpParams().set('fileName', fileName).set('expired', '10000');
  }
}
