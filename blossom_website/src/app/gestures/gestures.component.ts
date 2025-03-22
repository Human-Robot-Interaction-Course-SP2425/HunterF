import { Component, inject, OnInit } from '@angular/core';
import { debounceTime, filter, map, Observable, of, startWith, switchMap } from 'rxjs';
import { GesturesService } from './state/gestures.service';
import { Gesture } from './state/gestures.interface';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestures',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestures.component.html',
  styleUrl: './gestures.component.css'
})
export class GesturesComponent implements OnInit {
  private gesturesService = inject(GesturesService)
  form = new FormGroup({
    name: new FormControl<string>('')
  });
  gestures: Observable<Gesture[]> = of();
  filteredGestures: Observable<Gesture[]> = of();

  testData: Gesture[] = (() => {
    const data: Gesture[] = [];
    for (let i = 0; i < 60; i++) {
      data.push({
        name: `Test Gesture ${i + 1}`,
        duration: `${i + 1}`,
      });
    }
    return data;
  })();

  constructor() {}

  ngOnInit(): void {
    this.gestures = this.gesturesService.get();
    // this.gestures = of(this.testData);

    this.filteredGestures = this.form.valueChanges.pipe(
      startWith(this.form.value),
      debounceTime(200),
      switchMap(({ name }) => {
        return this.gestures.pipe(
          map(gestures => gestures.filter(g => 
            g.name.toLowerCase().includes((name || '').toLowerCase())
          ))
        );
      })
    );
  }

  playGesture(gesture: Gesture) {
    this.gesturesService.play(gesture).subscribe();
  }
}
