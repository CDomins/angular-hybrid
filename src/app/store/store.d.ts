export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface AppState {
  tasks: Task[];
  users: [];
  categories: [];
  nextId: number;
}

export declare const store: {
  getState(): AppState;
  dispatch(action: any): void;
  subscribe(listener: () => void): () => void;
};

export declare const addTask: (task: Task) => any;
export declare const updateTask: (task: Task) => any;
export declare const deleteTask: (id: number) => any;
export declare const setTasks: (tasks: Task[]) => any;

export const setCategories: (categories: any[]) => any;
export const setUsers: (users: any[]) => any;
