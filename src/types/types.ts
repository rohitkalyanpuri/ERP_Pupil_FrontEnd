export type AuthProps = {
  isAuthenticated: boolean;
  userName: string;
  password: string;
  authId: 0;
  userType: string;
  message: string;
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
