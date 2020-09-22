import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { Observable, of } from 'rxjs';

@Injectable()
export class ModulesMenuService {
  getMenu(): Observable<NbMenuItem[]> {
    const houseMenu: NbMenuItem[] = [
      {
        title: 'Dashboard',
        icon: 'activity-outline',
        link: '/dashboard'
      },
      {
        title: 'House',
        icon: 'home-outline',
        link: '/houses'
      },
      {
        title: 'User',
        icon: 'person-outline',
        link: '/users'
      }
    ];
    return of([...houseMenu]);
  }
}
