export enum Department {
  Engineering = 'Engineering',
  Design = 'Design',
  HR = 'HR',
  Marketing = 'Marketing'
}

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: Department;
  salary: number;
  isFullTime: boolean;
}

export type GroupedEmployees = Record<Department, Employee[]>;