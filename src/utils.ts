import { Employee, Department, GroupedEmployees } from './types.js';

// 1. Filter: Lọc nhân viên theo phòng ban
export function filterByDepartment(employees: Employee[], dept: Department): Employee[] {
  return employees.filter(emp => emp.department === dept);
}

// 2. Sort: Sắp xếp theo tên hoặc lương
export function sortEmployeesByName(employees: Employee[], ascending = true): Employee[] {
  return [...employees].sort((a, b) => {
    return ascending 
      ? a.name.localeCompare(b.name) 
      : b.name.localeCompare(a.name);
  });
}

// 3. Group: Nhóm danh sách nhân viên theo phòng ban
export function groupByDepartment(employees: Employee[]): GroupedEmployees {
  return employees.reduce<GroupedEmployees>((acc, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = [];
    }
    acc[emp.department].push(emp);
    return acc;
  }, {} as GroupedEmployees);
}