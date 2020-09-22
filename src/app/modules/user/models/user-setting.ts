import { Observable } from 'rxjs';

export interface UserSetting {
  theme: string;
}

export abstract class UserSettingModel {
  abstract getSetting(key): Observable<UserSetting>;

  abstract editSetting(key: string, value): Observable<UserSetting>;
}
