import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';
export interface ToastMessage { summary: string; detail: string; }
@Injectable({providedIn: 'root'})
export class ToastService {
  constructor(private readonly messages: MessageService) {}
  success(message: ToastMessage): void { this.add('success', message); }
  warn(message: ToastMessage): void { this.add('warn', message); }
  info(message: ToastMessage): void { this.add('info', message); }
  error(message: ToastMessage): void { this.add('error', message); }
  private add(severity: string, message: ToastMessage): void { this.messages.add({severity, ...message}); }
}
