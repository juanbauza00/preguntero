import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { AppService } from '../../services/app.service';
import { Question } from '../../models/question';
import { SelectFirstQuestionerComponent } from "../../components/select-first-questioner/select-first-questioner.component";

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [NavbarComponent, SelectFirstQuestionerComponent],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css'
})
export class QuestionListComponent {
  private readonly service = inject(AppService);
  preguntas: Question[] = this.service.preguntas;
  selectedFileName: string = this.service.selectedFileName;


  ngOnInit() {
    // Carga inicial
    this.preguntas = this.service.preguntas;
    this.selectedFileName = this.service.selectedFileName;

    // Subscripción a cambios
    this.service.datosActualizados$.subscribe(() => {
      this.preguntas = this.service.preguntas;
      this.selectedFileName = this.service.selectedFileName;
    });
  }
}
