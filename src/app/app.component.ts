import { Component } from '@angular/core';
import { store } from './store/store';
import { TaskManagerServiceService } from './services/task-manager-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'taskmanager-hybrid';
  categories: any[] = [];
  constructor(private service: TaskManagerServiceService) {
    this.service.getAllTaskRxjs().subscribe({
      next: (categories) => {
        store.dispatch({ type: 'SET_CATEGORIES', payload: categories });
      },
    });
  }
}
