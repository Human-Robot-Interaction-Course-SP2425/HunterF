import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './state/notification.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapX } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-notification',
  imports: [CommonModule, NgIcon],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  viewProviders: [provideIcons({ bootstrapX })],
})
export class NotificationComponent implements OnInit {
  private notificationService = inject(NotificationService);
  showNotification = signal(false);
  notification = computed(() => this.notificationService.notification());

  private timoutId: any;

  constructor() {
    effect(() => {
      if (!this.notification()) {
        return;
      }

      if (this.timoutId) {
        clearTimeout(this.timoutId);
      }

      this.showNotification.set(true);

      this.timoutId = setTimeout(() => {
        this.showNotification.set(false);
      }, 4000);
    })
  }

  closeNotification() {
    this.showNotification.set(false);
    if (this.timoutId) {
      clearTimeout(this.timoutId);
    }
  }

  ngOnInit(): void {
  }
}
