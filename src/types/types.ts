export type AuthProps = {
  isAuthenticated: boolean;
  userName: string;
  password: string;
  authId: 0;
  userType: string;
  message: string;
  userId: number;
  roleType: string;
};

export type ParentProps = {
  parentId: number;
  tenantId: string;
  email?: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  mobile: string;
  status?: boolean;
  lastLoginDate?: Date;
  lastLoginIp?: string;
  dob?: string;
};

export type AlertProps = {
  showHide: boolean;
  color: string;
  message: string;
};

export type ApiResponseProps = {
  status: number;
  success: boolean;
  message: string | null;
  error: string | null;
  data: any | null;
};

export type StudentProps = {
  studentId: number;
  tenantId: string;
  password?: string;
  firstName: string;
  lastName: string;
  dob?: string;
  mobile: string;
  parentId: number;
  dateOfJoin?: string;
  status?: boolean;
};

export type GradeProps = {
  gradeId: number;
  gname: string;
  gdesc: string;
  tenantId: string;
};

export type DivisionProps = {
  divisionId: number;
  divisionName: string;
  divisionDesc: string;
  tenantId: string;
};
