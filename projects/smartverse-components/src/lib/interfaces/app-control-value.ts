import {Directive, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormGroup} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';
import {FieldsService} from '../services/fields/fields.service';

@Directive()
export abstract class AppControlValueAccessor implements ControlValueAccessor, OnInit, OnDestroy {
  value: any = null;
  isValid = true;
  @ViewChild('inputElement') inputElement?: ElementRef<HTMLElement>;
  @Input() focus = false;
  @Input() disabled = false;
  @Input() label = '';
  @Input() type = '';
  @Input() guidance = '';
  @Input() field?: FormGroup;
  @Input() name = '';
  private readonly destroyed = new Subject<void>();

  constructor(private readonly fields: FieldsService) {}
  ngOnInit(): void { this.fields.invokeVerifyValid.pipe(takeUntil(this.destroyed)).subscribe(() => this.onValid()); }
  ngOnDestroy(): void { this.destroyed.next(); this.destroyed.complete(); }
  writeValue(value: any): void { this.value = value === '' ? null : value; }
  registerOnChange(fn: (value: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouch = fn; }
  setDisabledState(disabled: boolean): void { this.disabled = disabled; }
  onChange = (value: any): void => { this.value = value === '' ? null : value; };
  onTouch = (): void => undefined;
  onValid(): void { this.isValid = this.field?.get(this.name)?.valid ?? true; }
}
