import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AppService } from '../../services/app.service';
import { Question } from '../../models/question';
import { SelectFirstQuestionerComponent } from "../../components/select-first-questioner/select-first-questioner.component";

@Component({
  selector: 'app-questioner',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent, SelectFirstQuestionerComponent],
  templateUrl: './questioner.component.html',
  styleUrl: './questioner.component.css'
})
export class QuestionerComponent implements OnInit {
  private readonly service = inject(AppService);
  listadoPreguntas: Question[] = [];
  preguntas: Question[] = [];
  unidadesDisponibles: number[] = [];
  selectedFileName: string = '';

  configuracionesForm: FormGroup = new FormGroup({
    cantidadPreguntas: new FormControl('', [Validators.required, Validators.min(1)]),
    unidades: new FormControl([], [Validators.required, Validators.minLength(1)]),
    tipo: new FormControl('porUnidad', [Validators.required])
  });

  // Subscripcion a cambios
  ngOnInit() {
    // Carga inicial
    this.listadoPreguntas = this.service.preguntas;
    this.unidadesDisponibles = this.service.unidadesDisponibles;
    this.selectedFileName = this.service.selectedFileName;

    // Subscripción a cambios
    this.service.datosActualizados$.subscribe(() => {
      this.listadoPreguntas = this.service.preguntas;
      this.unidadesDisponibles = this.service.unidadesDisponibles;
      this.selectedFileName = this.service.selectedFileName;
      console.log('Archivo seleccionado: ', this.selectedFileName);
      console.log('Preguntas: ', this.listadoPreguntas);
      console.log('Unidades: ', this.unidadesDisponibles);
    });
  }

  onCheckboxChange(e: any) {
    const unidades = this.configuracionesForm.get('unidades')!.value as number[];
    if (e.target.checked) {
      unidades.push(+e.target.value);
    } else {
      const index = unidades.indexOf(+e.target.value);
      if (index > -1) {
        unidades.splice(index, 1);
      }
    }
    this.configuracionesForm.get('unidades')!.setValue(unidades);
  }

  generarPreguntas() {
    if (this.configuracionesForm.valid) {
      const configs = this.configuracionesForm.value;
      const unidadesSeleccionadas = configs.unidades as number[];
      const cantidadTotal = configs.cantidadPreguntas as number;

      if (cantidadTotal < unidadesSeleccionadas.length && configs.tipo === 'porUnidad') {
        alert('La cantidad de preguntas debe ser al menos igual al número de unidades seleccionadas');
        return;
      }

      const preguntasFiltradas = this.listadoPreguntas.filter(p => unidadesSeleccionadas.includes(p.unidad));

      if (configs.tipo === 'porUnidad') {
        this.generarPreguntasPorUnidad(preguntasFiltradas, unidadesSeleccionadas, cantidadTotal);
      } else {
        this.generarPreguntasAleatorias(preguntasFiltradas, unidadesSeleccionadas, cantidadTotal);
      }
    }
    else {
      console.log(this.configuracionesForm.errors);
    }
  }

  private generarPreguntasPorUnidad(preguntas: Question[], unidades: number[], total: number) {
    this.preguntas = [];
    const preguntasPorUnidad = Math.floor(total / unidades.length);
    const preguntasExtra = total % unidades.length;

    // Mantenemos una copia de todas las preguntas originales
    const todasLasPreguntas = [...preguntas];

    // Distribuimos las preguntas base por unidad
    unidades.forEach(unidad => {
      const preguntasUnidad = preguntas.filter(p => p.unidad === unidad);
      const seleccionadas = this.seleccionarAleatorio(preguntasUnidad, preguntasPorUnidad);
      this.preguntas.push(...seleccionadas);

      // Removemos las preguntas seleccionadas del pool total
      seleccionadas.forEach(pregunta => {
        const index = todasLasPreguntas.findIndex(p => p.nro === pregunta.nro);
        if (index > -1) {
          todasLasPreguntas.splice(index, 1);
        }
      });
    });

    // Agregamos las preguntas extra del pool completo de preguntas no seleccionadas
    if (preguntasExtra > 0) {
      const preguntasAdicionales = this.seleccionarAleatorio(todasLasPreguntas, preguntasExtra);
      this.preguntas.push(...preguntasAdicionales);
    }
  }

  private generarPreguntasAleatorias(preguntas: Question[], unidades: number[], total: number) {
    this.preguntas = [];
    // Simplemente seleccionamos la cantidad total de preguntas del pool filtrado
    this.preguntas = this.seleccionarAleatorio(preguntas, total);
  }

  private seleccionarAleatorio(preguntas: Question[], cantidad: number): Question[] {
    const resultado: Question[] = [];
    const preguntasCopy = [...preguntas];

    for (let i = 0; i < cantidad && preguntasCopy.length > 0; i++) {
      const indice = Math.floor(Math.random() * preguntasCopy.length);
      resultado.push(preguntasCopy[indice]);
      preguntasCopy.splice(indice, 1);
    }

    return resultado;
  }

  // Selector de archivos
  onFileChange(event: any): void {
    this.service.loadData(event);
    console.log(this.listadoPreguntas);
  }

  cleanQuestions() {
    this.preguntas = [];
  }
}
