import { Observable } from 'rxjs';
import { User } from '../models/user';

export abstract class UserApi {
  abstract get(id: string): Observable<User>;
}
