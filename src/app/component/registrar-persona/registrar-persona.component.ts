import { IPersonaResponse } from '../../model/persona-response';
import { PersonaService } from './../../service/persona.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-persona',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registrar-persona.component.html',
  styleUrl: './registrar-persona.component.css',
})
export class RegistrarPersonaComponent {
  title = 'RegistrarPersonaComponent';
  personaArray: IPersonaResponse[] = [];
  constructor(private personaService: PersonaService) {}
  ngOnInit(): void {
    this.getPersonas();
  }
  getPersonas(): void {
    this.personaService.getPersonas().subscribe((result: any) => {
      console.log('Result', result);
      this.personaArray = result;
      console.log(this.personaArray);
    });
  }
}
