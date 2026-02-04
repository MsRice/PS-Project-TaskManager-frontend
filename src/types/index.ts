export interface User {
  username: string;
  email: string;
  password: string;
  areas: [Area];
  _id: string;
}
export interface Area {
  name: string;
  color: string;
}
export interface Todo {
  id: string;
  item: string;
  completed: boolean;
}
export interface Task {
  _id: string;
  title: string;
  area: Area;
  description?: string;
  todos?: Todo[];
  tags?: string[];
  dueDate?: Date;
  status: boolean;
}
export type NewTask = Omit<Task, "id">;
export type DueDateProps = Pick<Task, "dueDate">;
export type TodosProps = Pick<Task, "todos">;

export interface Credentials {
  email: string;
  username: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: Credentials) => Promise<void>;
  register: (userData: Credentials) => Promise<void>;
  logout: () => void;
  addUserArea: (area: Area) => void;
}

export interface AuthenticationProviderProps {
  children: React.ReactNode;
}
export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

export type TasksContextType = {
  taskList: Task[] | null;
  addTask: (task: NewTask) => void;
  deleteTask: (taskId: string) => void;
  updateStatus: (taskId: string, status: boolean) => void;
  toggleTodo: (taskId: string, todoId: string) => void;
  addTodo: (taskId: string, text: string) => void;
  editTodo: (taskId: string, todoId: string, text: string) => void;
  deleteTodo: (taskId: string, todoId: string) => void;
};

export interface TasksProviderProps {
  children: React.ReactNode;
}

export interface TaskUIProps {
  task: Task;
}
export type Theme = "light" | "dark";

import type { Dispatch, SetStateAction } from "react";
export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setOpenTasks: Dispatch<SetStateAction<Record<string, boolean>>>;
  openTasks: Record<string, boolean>;
  toggleTaskView: (taskId: string) => void;
};

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export type ModalContextType = {
  isSidebarOpen: boolean;
  toggleSidebarModal: (isSidebarOpen: boolean) => void;
  isFormOpen: boolean;
  toggleFormModal: (isFormOpen: boolean) => void;
};

export interface ModalProviderProps {
  children: React.ReactNode;
}
