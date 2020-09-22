import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { NbThemeService } from '@nebular/theme';
import { EMAIL_REGEX } from '../../../core/regex';
import { InitUserService } from '../../../theme/services/init-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  errors: string[];
  formDto: any;
  submitted = false;
  form: FormGroup;

  constructor(
    private readonly authService: NbAuthService,
    private readonly cdr: ChangeDetectorRef,
    private readonly themeService: NbThemeService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly initUserService: InitUserService
  ) {
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  ngOnInit(): void {
    const emailValidator = [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)
    ];

    const passwordValidator = [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ];

    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', [...emailValidator]),
      password: this.formBuilder.control('', [...passwordValidator]),
      rememberMe: this.formBuilder.control(false)
    });
  }

  login(): void {
    this.formDto = this.form.value;
    this.errors = [];
    this.submitted = true;
    this.authService.authenticate('email', this.formDto)
      .subscribe((loginResult: NbAuthResult) => {
        this.submitted = false;
        if (loginResult.isFailure()) {
          this.errors = loginResult.getErrors();
        } else {
          this.initUserService.initLoggedUser().subscribe();
        }

        const redirect = loginResult.getRedirect();
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, 125);
        }
        this.cdr.detectChanges();
      });
  }
}
