import { Observable } from 'rxjs';
import { District, Region, Ward } from '../../directory/model/directory';
import { User } from './user';

export interface UserAddress {
  userId: string;
  region: Region;
  district: District;
  ward: Ward;
  street: string;
  isDefault: boolean;
  isVerified: boolean;
}

export abstract class UserAddressModel {
  abstract getUserAddress(id: string, user: User): Observable<UserAddress>;

  abstract getListUserAddresses(user: string | User): Observable<UserAddress[]>;
}
