import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Department, Employee } from '../types';
import { filterByDepartment, groupByDepartment, sortEmployeesByName } from '../utils';

interface DepartmentGroup {
  department: Department;
  employees: Employee[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  providers: [CurrencyPipe],
  template: `
    <div class="page-shell">
      <header class="page-header">
        <p class="eyebrow">Team Directory</p>
        <h1>Employee Directory</h1>
      </header>

      <main class="directory" aria-label="Employee directory">
        <section class="toolbar" aria-label="Employee directory options">
          <label class="control">
            <span>Department</span>
            <select [value]="selectedDepartment" (change)="onDepartmentChange($event)">
              <option value="All">All departments</option>
              @for (department of departmentOptions; track department) {
                <option [value]="department">{{ department }}</option>
              }
            </select>
          </label>

          <button type="button" class="sort-button" (click)="toggleSort()">
            {{ sortDirection === 'asc' ? 'Sort: A–Z' : 'Sort: Z–A' }}
          </button>
        </section>

        @for (group of departmentGroups; track group.department) {
          <section class="department-group" aria-labelledby="{{ group.department }}-heading">
            <h2 id="{{ group.department }}-heading">{{ group.department }}</h2>

            <div class="employee-grid">
              @for (employee of group.employees; track employee.id) {
                <article class="employee-card" aria-label="Employee card for {{ employee.name }}">
                  <div class="card-header">
                    <div class="avatar" aria-hidden="true">{{ employee.name.charAt(0).toUpperCase() }}</div>
                    <div>
                      <h3>{{ employee.name }}</h3>
                      <p class="role">{{ employee.role }}</p>
                    </div>
                  </div>

                  <dl class="employee-meta">
                    <div>
                      <dt>Department</dt>
                      <dd>{{ employee.department }}</dd>
                    </div>
                    <div>
                      <dt>Salary</dt>
                      <dd>{{ employee.salary | currency: 'USD' : 'symbol' : '1.0-0' }}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>{{ employee.isFullTime ? 'Full-time' : 'Contract' }}</dd>
                    </div>
                  </dl>
                </article>
              }
            </div>
          </section>
        }
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background: #eef3f9;
        color: #1f2937;
      }

      .page-shell {
        max-width: 1200px;
        margin: 0 auto;
        padding: 32px 20px 48px;
      }

      .page-header {
        margin-bottom: 24px;
      }

      .eyebrow {
        margin: 0 0 8px;
        color: #2563eb;
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        font-size: clamp(2rem, 3vw, 3rem);
        line-height: 1.2;
      }

      .toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        align-items: end;
        margin-bottom: 24px;
        padding: 18px;
        background: #fff;
        border: 1px solid #dfe7f2;
        border-radius: 14px;
        box-shadow: 0 12px 24px rgba(15, 23, 42, 0.04);
      }

      .control {
        display: grid;
        gap: 8px;
        font-weight: 600;
        color: #334155;
      }

      select,
      .sort-button {
        min-height: 42px;
        padding: 0 12px;
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        background: #fff;
        color: #0f172a;
        font: inherit;
      }

      .sort-button {
        cursor: pointer;
      }

      .directory {
        display: grid;
        gap: 28px;
      }

      .department-group {
        background: #ffffff;
        border: 1px solid #dfe7f2;
        border-radius: 18px;
        box-shadow: 0 16px 32px rgba(15, 23, 42, 0.05);
        padding: 20px;
      }

      .department-group h2 {
        margin: 0 0 20px;
        font-size: 1.4rem;
        color: #0f172a;
      }

      .employee-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .employee-card {
        padding: 18px;
        border: 1px solid #e2e8f0;
        background: #f8fafc;
        border-radius: 14px;
      }

      .card-header {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 12px;
      }

      .avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #2563eb, #60a5fa);
        color: #fff;
        font-weight: 700;
      }

      .card-header h3 {
        margin: 0;
        font-size: 1.2rem;
      }

      .role {
        margin: 4px 0 0;
        color: #475569;
      }

      .employee-meta {
        margin: 0;
        display: grid;
        gap: 8px;
      }

      .employee-meta div {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        padding-top: 8px;
        border-top: 1px solid #e2e8f0;
      }

      dt {
        color: #64748b;
        font-weight: 600;
      }

      dd {
        margin: 0;
        font-weight: 600;
        color: #0f172a;
      }

      @media (min-width: 768px) {
        .employee-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (min-width: 1024px) {
        .employee-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
    `
  ]
})
export class AppComponent {
  readonly departmentOptions = Object.values(Department);
  selectedDepartment: Department | 'All' = 'All';
  sortDirection: 'asc' | 'desc' = 'asc';

  readonly employees: Employee[] = [
    { id: 1, name: 'An', role: 'Frontend Developer', department: Department.Engineering, salary: 1500, isFullTime: true },
    { id: 2, name: 'Bình', role: 'UI/UX Designer', department: Department.Design, salary: 1300, isFullTime: true },
    { id: 3, name: 'Cường', role: 'Backend Developer', department: Department.Engineering, salary: 1600, isFullTime: true },
    { id: 4, name: 'Dung', role: 'HR Specialist', department: Department.HR, salary: 1100, isFullTime: false },
    { id: 5, name: 'Hà', role: 'Marketing Manager', department: Department.Marketing, salary: 1400, isFullTime: true },
    { id: 6, name: 'Lan', role: 'Product Designer', department: Department.Design, salary: 1250, isFullTime: true },
    { id: 7, name: 'Minh', role: 'Platform Engineer', department: Department.Engineering, salary: 1700, isFullTime: true },
    { id: 8, name: 'Oanh', role: 'Recruitment Lead', department: Department.HR, salary: 1200, isFullTime: true }
  ];

  onDepartmentChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedDepartment = value === 'All' ? 'All' : (value as Department);
  }

  toggleSort(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  get visibleEmployees(): Employee[] {
    const filteredEmployees =
      this.selectedDepartment === 'All'
        ? this.employees
        : filterByDepartment(this.employees, this.selectedDepartment);

    return sortEmployeesByName(filteredEmployees, this.sortDirection === 'asc');
  }

  get groupedEmployees(): Record<Department, Employee[]> {
    return groupByDepartment(this.visibleEmployees);
  }

  get departmentGroups(): DepartmentGroup[] {
    return this.departmentOptions
      .filter((department) => (this.groupedEmployees[department] ?? []).length > 0)
      .map((department) => ({
        department,
        employees: this.groupedEmployees[department] ?? []
      }));
  }
}
