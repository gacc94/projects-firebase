import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rick-morty-app';

  constructor() {
    console.log(`App is running ==> ${environment.name}`);
  }
}
