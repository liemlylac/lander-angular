import { District, Region, Ward } from '@core/interfaces/directory';

export interface UserSetting {
  theme: string;
}

export interface UserAddress {
  userId: string;
  region: Region;
  district: District;
  ward: Ward;
  street: string;
  isDefault: boolean;
  isVerified: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  address?: UserAddress[];
  settings?: UserSetting;
}
