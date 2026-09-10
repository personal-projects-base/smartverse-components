import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RequestData} from '../../interfaces/request-data';

export interface PageResponse<T> { contents: T[]; totalRecords?: number; }

@Injectable({providedIn: 'root'})
export class CrudService {
  constructor(private readonly http: HttpClient) {}
  save<T>(route: string, body: unknown): Observable<T> { return this.http.post<T>(route, body); }
  update<T>(route: string, id: string | number, body: unknown): Observable<T> { return this.http.put<T>(`${route}/${id}`, body); }
  delete<T>(route: string, id: string | number): Observable<T> { return this.http.delete<T>(`${route}/${id}`); }
  get<T>(route: string, id: string | number): Observable<T> { return this.http.get<T>(`${route}/${id}`); }
  list<T>(route: string, request: RequestData): Observable<PageResponse<T>> {
    const params = new HttpParams()
      .set('size', String(request.size ?? 10)).set('offset', String(request.offset ?? 0))
      .set('filter', request.filter ?? '').set('order', request.order ?? '')
      .set('displayFields', request.displayFields ?? '*');
    return this.http.get<PageResponse<T>>(route, {params});
  }
  onSave<T>(route: string, body: unknown): Observable<T> { return this.save(route, body); }
  onUpdate<T>(route: string, id: string | number, body: unknown): Observable<T> { return this.update(route, id, body); }
  onDelete<T>(route: string, id: string | number): Observable<T> { return this.delete(route, id); }
  onGet<T>(route: string, id: string | number): Observable<T> { return this.get(route, id); }
  onGetAll<T>(route: string, request: RequestData): Observable<PageResponse<T>> { return this.list(route, request); }
}
