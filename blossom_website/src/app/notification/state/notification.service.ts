import { inject, Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from './notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification = signal<Notification | undefined>(undefined)

  success(message: string) {
    this.notification.set({
      message,
      type: 'success'
    });
  }

  error(message: string) {
    this.notification.set({
      message,
      type: 'error'
    });
  }

  clear() {
    this.notification.set(undefined);
  }
} 