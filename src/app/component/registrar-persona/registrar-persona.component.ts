import { IPersonaResponse } from '../../model/persona-response';
import { PersonaService } from './../../service/persona.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-registrar-persona',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, ReactiveFormsModule],
  templateUrl: './registrar-persona.component.html',
  styleUrl: './registrar-persona.component.css',
})
export class RegistrarPersonaComponent {
  title = 'Registrar Persona';
  personaArray: IPersonaResponse[] = [];
  page: number = 1;
  personaForm: FormGroup;

  constructor(private personaService: PersonaService) {
    this.personaForm = new FormGroup({
      idPersona: new FormControl(''),
      apellidoPaterno: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      apellidoMaterno: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      fechaNacimiento: new FormControl(''),
      idTipoDocumento: new FormControl('1'),
      ndocumento: new FormControl(''),
      direccion: new FormControl(''),
      idUbigeo: new FormControl('150101'),
    });
  }

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

  editarPersona(personaResponse: IPersonaResponse): void {
    console.log('editando persona');
  }

  eliminarPersona(personaResponse: IPersonaResponse): void {
    console.log('eliminando persona');
  }
}
