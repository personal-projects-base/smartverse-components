import {Injectable, Type} from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
export interface ModalConfig<T = unknown> { component: Type<unknown>; data?: T; header?: string; width?: string; }
@Injectable({providedIn: 'root'})
export class ModalService {
  constructor(private readonly dialogs: DialogService) {}
  open<T, R = unknown>(config: ModalConfig<T>): DynamicDialogRef<R> | null {
    return this.dialogs.open(config.component, {header: config.header, width: config.width ?? '80vw', modal: true,
      draggable: true, maximizable: false, data: config.data, baseZIndex: 999999}) as DynamicDialogRef<R> | null;
  }
}
