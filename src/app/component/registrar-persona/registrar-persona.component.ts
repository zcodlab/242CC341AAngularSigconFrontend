import { IPersonaResponse } from '../../model/persona-response';
import { PersonaService } from './../../service/persona.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-registrar-persona',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './registrar-persona.component.html',
  styleUrl: './registrar-persona.component.css',
})
export class RegistrarPersonaComponent {
  title = 'Registrar Persona';
  personaArray: IPersonaResponse[] = [];
  page: number = 1;
  constructor(private personaService: PersonaService) {}
  ngOnInit(): void {
    this.getPersonas();
  }
  getPersonas(): void {
    this.personaService.getPersonas().subscribe((result: any) => {
      //console.log('Result', result);
      this.personaArray = result;
      //console.log(this.personaArray[0]);
    });
  }
}
