import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GesturesComponent } from './gestures/gestures.component';
import { NotificationComponent } from './notification/notification.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GesturesComponent, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'blossom_website';

  constructor() { }

  ngOnInit(): void {

  }
}
