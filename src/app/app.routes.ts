import { Routes } from '@angular/router';
import { QuestionerComponent } from './pages/questioner/questioner.component';
import { QuestionListComponent } from './pages/question-list/question-list.component';

export const routes: Routes = [
    { path: 'questions', component: QuestionerComponent },
    { path: 'question-list', component: QuestionListComponent },
    { path: '**', component: QuestionerComponent }
];
