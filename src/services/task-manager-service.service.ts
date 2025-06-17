import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerServiceService {
  constructor(private http: HttpClient) {}

  private taskList: any[] = [];
  private taskObr = new BehaviorSubject<any[]>([]);
  private nextId = 5;

  getAllTaskRxjs(): Observable<any> {
    return this.http.get('http://localhost:3000/tasks');
  }

  getAllTasks(): Observable<any[]> {
    return this.taskObr.asObservable();
  }
  // ========================================
  getAllByIdRxjs(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/tasks/${id}`);
  }

  getTaskById(id: number): Observable<Task | undefined> {
    return this.taskObr.pipe(
      map((tasks) => tasks.find((task) => task.id === id))
    );
  }
  // =========================================

  addTaskRxjs(task: any) {
    return this.http.post(`http://localhost:3000/tasks/`, task);
  }

  addTask(taskData: any): void {
    const newTask: any = {
      id: this.nextId++,
      title: taskData.title || '',
      description: taskData.description || '',
      priority: taskData.priority || 'medium',
      completed: false,
      createdAt: new Date(),
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : new Date(),
    };

    this.taskList = [...this.taskList, newTask];
    this.taskObr.next(this.taskList);
  }

  // =========================================
  updateTaskRxjs(id: number, task: any) {
    return this.http.put(`http://localhost:3000/tasks/${id}`, task);
  }

  updateTask(id: number, updates: any): void {
    this.taskList = this.taskList.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          ...updates,
          updatedAt: new Date(),
        };
      }
      return task;
    });

    this.taskObr.next(this.taskList);
  }
  // =========================================

  deleteTaskRxjs(id: number) {
    return this.http.delete(`http://localhost:3000/tasks/${id}`);
  }

  deleteTask(id: number): void {
    this.taskList = this.taskList.filter((task) => task.id !== id);
    this.taskObr.next(this.taskList);
  }

  // =========================================

  toggleTaskComplete(id: number): void {
    this.taskList = this.taskList.map((task) => {
      if (task.id === id) {
        const completed = !task.completed;
        return {
          ...task,
          completed,
          completedAt: completed ? new Date() : null,
        };
      }
      return task;
    });

    this.taskObr.next(this.taskList);
  }
}
