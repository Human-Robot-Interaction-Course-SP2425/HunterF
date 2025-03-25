import { Component, OnInit, inject } from '@angular/core';
import { VideosService } from '../services/videos.service';

@Component({
  selector: 'app-videos',
  imports: [],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css',
})
export class VideosComponent implements OnInit {
  private videosService = inject(VideosService);

  ngOnInit(): void {
    this.videosService.get().subscribe((videos) => {
      console.log(videos);
    });
  }
}
