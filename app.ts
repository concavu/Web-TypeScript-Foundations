import { Employee, Department } from './types.js';
import { filterByDepartment, sortEmployeesByName, groupByDepartment } from './utils.js';

const mockEmployees: Employee[] = [
  { id: 1, name: 'An', role: 'Frontend Dev', department: Department.Engineering, salary: 1500, isFullTime: true },
  { id: 2, name: 'Bình', role: 'UI/UX Designer', department: Department.Design, salary: 1300, isFullTime: true },
  { id: 3, name: 'Cường', role: 'Backend Dev', department: Department.Engineering, salary: 1600, isFullTime: true },
  { id: 4, name: 'Dung', role: 'HR Specialist', department: Department.HR, salary: 1100, isFullTime: false }
];

// Test các utility functions
console.log('--- Lọc phòng Engineering ---', filterByDepartment(mockEmployees, Department.Engineering));
console.log('--- Sắp xếp theo tên ---', sortEmployeesByName(mockEmployees));
console.log('--- Nhóm theo phòng ban ---', groupByDepartment(mockEmployees));