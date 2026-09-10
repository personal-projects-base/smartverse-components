import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {SMARTVERSE_COMPONENTS_CONFIG, SmartverseComponentsConfig} from '../../config/smartverse-components.config';

@Injectable({providedIn: 'root'})
export class FieldsService {
  private readonly verifyFieldsValid = new Subject<void>();
  readonly invokeVerifyValid = this.verifyFieldsValid.asObservable();
  constructor(private readonly forms: FormBuilder, private readonly http: HttpClient,
              @Inject(SMARTVERSE_COMPONENTS_CONFIG) private readonly config: SmartverseComponentsConfig) {}
  verifyIsValid(): void { this.verifyFieldsValid.next(); }
  loadForm(_entity: string, service: string): Observable<unknown> {
    const endpoint = this.config.endpoints.metadata.replace('{service}', service);
    return this.http.post(endpoint, {metadata: 'FIELDS'});
  }
  createDynamicForm(fields: any[]): FormGroup {
    const form = this.forms.group({});
    for (const field of fields) {
      form.addControl(field.fieldName, field.type === 'object' ? this.createDynamicForm(field.fields) : this.createControl(field));
    }
    return form;
  }
  onCreateFormBuiderDynamic(fields: any[]): FormGroup { return this.createDynamicForm(fields); }
  private createControl(field: any): FormControl {
    const validators = [];
    if (field.required && !field.hidden) validators.push(Validators.required);
    if (field.type === 'email') validators.push(Validators.email);
    return new FormControl(null, validators);
  }
}
