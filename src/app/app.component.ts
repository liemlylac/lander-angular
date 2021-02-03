import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InitUserService } from '@theme/services/init-user.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly initUserService: InitUserService,
  ) {
    this.initUser();
  }

  initUser(): void {
    this.initUserService.initCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
