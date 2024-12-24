import { Component, inject } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-select-first-questioner',
  standalone: true,
  imports: [],
  templateUrl: './select-first-questioner.component.html',
  styleUrl: './select-first-questioner.component.css'
})
export class SelectFirstQuestionerComponent {
  private readonly service = inject(AppService);

  // Selector de archivos
  onFileChange(event: any): void {
    this.service.loadData(event);
  }

}
