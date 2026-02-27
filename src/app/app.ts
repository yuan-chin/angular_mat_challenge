import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SummitComponent } from './summit/summit';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SummitComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular_mat');
}
