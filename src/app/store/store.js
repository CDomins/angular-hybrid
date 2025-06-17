import { createStore } from "redux";

const ADD_TASK = "ADD_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const DELETE_TASK = "DELETE_TASK";
const SET_TASKS = "SET_TASKS";

const SET_CATEGORIES = "SET_CATEGORIES";
const SET_USERS = "SET_USERS";

export const addTask = (task) => ({ type: ADD_TASK, payload: task });
export const updateTask = (task) => ({ type: UPDATE_TASK, payload: task });
export const deleteTask = (id) => ({ type: DELETE_TASK, payload: id });
export const setTasks = (tasks) => ({ type: SET_TASKS, payload: tasks });

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});
export const setUsers = (users) => ({ type: SET_USERS, payload: users });

const initialState = {
  tasks: [],
  users: [],
  categories: [],
  nextId: 1,
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_TASKS:
      return { ...state, tasks: action.payload };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { id: state.nextId, ...action.payload }],
        nextId: state.nextId + 1,
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

export const store = createStore(tasksReducer);
