import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { routes } from '../app.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  private router = inject(Router);
  validRotues = signal<(string | undefined)[]>(routes.filter(route => route.path !== '**').map(route => route.path));
  activeRoute = signal<string>('')

  constructor() {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => {
        const url = event.url.substring(1);

        if (this.validRotues().includes(url)) {
          this.activeRoute.set(url);
        } else {
          this.activeRoute.set('gestures');
        }
      })
    ).subscribe();
  }

}
