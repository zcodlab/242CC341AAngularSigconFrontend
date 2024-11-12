import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrarPersonaComponent } from './component/registrar-persona/registrar-persona.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistrarPersonaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = '242CC341AAngularSigconFrontend';
}
