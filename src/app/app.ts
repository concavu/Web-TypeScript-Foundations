import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Employee } from './models/employee.model';
import { EMPLOYEES } from './models/employee.data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('team-directory');
  
  // Quản lý danh sách nhân viên
  employees: Employee[] = EMPLOYEES;

  // Hàm lọc nhân viên theo phòng ban
  filterByDepartment(dept: string): void {
    if (!dept) {
      this.employees = EMPLOYEES;
    } else {
      this.employees = EMPLOYEES.filter(emp => emp.department === dept);
    }
  }
  sortByName(): void {
    this.employees.sort((a, b) => a.name.localeCompare(b.name));
  }
  get groupedEmployees() {
    return this.employees.reduce((groups, emp) => {
      const key = emp.department;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(emp);
      return groups;
    }, {} as { [key: string]: Employee[] });
  }
}