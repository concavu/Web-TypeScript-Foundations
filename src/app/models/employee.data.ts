import { Employee } from '../models/employee.model';

export const EMPLOYEES: Employee[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    role: 'Frontend Developer',
    department: 'Engineering',
    email: 'a.nguyen@company.com',
    avatarUrl: 'https://via.placeholder.com/150',
    isActive: true
  },
  {
    id: 2,
    name: 'Trần Thị B',
    role: 'UI/UX Designer',
    department: 'Design',
    email: 'b.tran@company.com',
    avatarUrl: 'https://via.placeholder.com/150',
    isActive: true
  },
  // Bạn có thể thêm các thành viên khác của nhóm vào đây...
];