import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Gesture, GesturePlayResponse } from './gestures.interface';
import { NotificationService } from '../notification/state/notification.service';

@Injectable({
  providedIn: 'root',
})
export class GesturesService {
  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);

  constructor() {}

  get(): Observable<Gesture[]> {
    return this.http.get<[]>('/sequences').pipe(
      map((gesture) => {
        return gesture.map((g) => ({
          name: g[0],
          duration: g[1],
        }));
      })
    );
  }

  getNames(): Observable<string[]> {
    return this.http.get<string[]>('/sequences/names');
  }

  play(gesture: Gesture) {
    return this.http.get<GesturePlayResponse>(`/s/${gesture.name}`).pipe(
      tap((res) => {
        this.notificationService.success(`Playing gesture: ${res.gesture}!`);
      }),
      catchError((err) => {
        this.notificationService.error(`Error playing gesture!`);
        return throwError(() => err);
      })
    );
  }

  reset() {
    return this.http.post('/reset', {}).pipe(
      tap(() => {
        this.notificationService.success('Reset Successful!');
      }),
      catchError((err) => {
        this.notificationService.error('Error resetting!');
        return throwError(() => err);
      })
    );
  }

  playNewGesture(code: string) {
    return this.http.post('/s/new', { code }).pipe(
      tap(() => {
        this.notificationService.success('Gesture played!');
      }),
      catchError((err) => {
        this.notificationService.error('Error playing gesture!');
        return throwError(() => err);
      })
    );
  }

  saveGesture(code: string) {
    return this.http.post('/s/save', { code }).pipe(
      tap(() => {
        this.notificationService.success('Gesture saved!');
        }),
      catchError((err) => {
        this.notificationService.error('Error saving gesture!');
        return throwError(() => err);
      })
    );
  }
}
