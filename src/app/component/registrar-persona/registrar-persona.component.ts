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
import { IPersonaRequest } from '../../model/persona-request';
import Swal from 'sweetalert2';
import { error } from 'console';

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
  personaRequest: IPersonaRequest = {} as IPersonaRequest;

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
    this.personaForm.reset();
    this.personaForm.controls['idTipoDocumento'].setValue(1);
    this.personaForm.controls['idUbigeo'].setValue(150101);
    this.getPersonas();
  }
  getPersonas(): void {
    this.personaService.getPersonas().subscribe((result: any) => {
      //console.log('Result', result);
      this.personaArray = result;
      //console.log(this.personaArray[0]);
    });
  }
  setPersona(): void {
    this.personaRequest.idPersona = this.personaForm.get('id_persona')?.value;
    this.personaRequest.apellidoPaterno =
      this.personaForm.get('apellidoPaterno')?.value;
    this.personaRequest.apellidoMaterno =
      this.personaForm.get('apellidoMaterno')?.value;
    this.personaRequest.nombres = this.personaForm.get('nombres')?.value;
    this.personaRequest.fechaNacimiento =
      this.personaForm.get('fechaNacimiento')?.value;
    this.personaRequest.idTipoDocumento =
      this.personaForm.get('idTipoDocumento')?.value;
    this.personaRequest.ndocumento = this.personaForm.get('ndocumento')?.value;
    this.personaRequest.direccion = this.personaForm.get('direccion')?.value;
    this.personaRequest.idUbigeo = this.personaForm.get('idUbigeo')?.value;
  }

  registrarPersona(): void {
    console.log('registrando persona');
    this.setPersona();
    this.personaService.registrarPersona(this.personaRequest).subscribe(
      (result: any) => {
        console.log('registrarPersona', result);
        this.ngOnInit();
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'registrarPersona....',
          text: '!Se registro exitosamente la persona!',
        });
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error al registrar Persona',
        });
      }
    );
  }
  editarPersona(personaResponse: IPersonaResponse): void {
    console.log('editando persona');
  }

  eliminarPersona(personaResponse: IPersonaResponse): void {
    console.log('eliminando persona');
    this.personaRequest.idPersona = personaResponse.idPersona;
    this.personaService.eliminarPersona(this.personaRequest).subscribe(
      (result: any) => {
        console.log('eliminarPersona', result);
        this.ngOnInit();
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'eliminarPersona....',
          text: '!Se elimino exitosamente la persona!',
        });
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error al eliminar Persona',
        });
      }
    );
  }
}
