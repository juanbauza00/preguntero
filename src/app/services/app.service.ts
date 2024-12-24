import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Question } from '../models/question';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // Archivo 
  selectedFileName: string = '';
  selectedFile: File | null = null;

  // Data
  preguntas: Question[] = [];
  unidadesDisponibles: number[] = [];

  // Observables
  private datosActualizados = new Subject<void>();
  datosActualizados$ = this.datosActualizados.asObservable();

  readExcel(file: File): Promise<any[]> {
    // Se eliminan los últimos 5 caracteres (".xlsx")
    this.selectedFileName = file.name.slice(0, -5);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        resolve(jsonData);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }

  loadData(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.readExcel(this.selectedFile).then((data) => {
        this.unidadesDisponibles = [];
        // Carga de preguntas
        this.preguntas = data;

        // Carga de unidades
        for (const pregunta of this.preguntas) {
          const unidad = Number(pregunta.unidad);
          if (!isNaN(unidad) && !this.unidadesDisponibles.includes(unidad)) {
            this.unidadesDisponibles.push(unidad);
          }
        }

        // Ordenar unidades de menor a mayor
        this.unidadesDisponibles.sort((a, b) => a - b);

        // Notificar cambios
        this.datosActualizados.next();
      });
    }
  }

  getCurrentFileName(): string {
    return this.selectedFileName;
  }
}
