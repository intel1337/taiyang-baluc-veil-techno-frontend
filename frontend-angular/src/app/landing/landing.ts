import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, RouterOutlet], // import de router link pour rediriger vers d'autre pages, import de router outlet pour la navigation
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {
  }


