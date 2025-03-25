import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  private http = inject(HttpClient);

  constructor() {}

  get() {
    return this.http.get<any>('/videos');
  }
}
