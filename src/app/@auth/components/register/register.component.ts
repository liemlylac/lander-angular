import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResult } from '@auth/auth-result';
import { AuthService } from '@auth/services/auth.service';
import { SessionService } from '@auth/services/session.service';
import { EMAIL_REGEX } from '@core/regex';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  submitted = false;
  errors: string[] = [];
  formDto: any = {};
  form: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly sessionService: SessionService
  ) {}

  get firstName(): AbstractControl {
    return this.form.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.form.get('lastName');
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  get confirmPassword(): AbstractControl {
    return this.form.get('confirmPassword');
  }

  get terms(): AbstractControl {
    return this.form.get('terms');
  }

  ngOnInit(): void {
    const nameValidators = [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
    ];

    const emailValidators = [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)
    ];

    const passwordValidators = [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ];

    this.form = this.formBuilder.group({
      firstName: this.formBuilder.control('', [...nameValidators]),
      lastName: this.formBuilder.control('', [...nameValidators]),
      email: this.formBuilder.control('', [...emailValidators]),
      password: this.formBuilder.control('', [...passwordValidators]),
      confirmPassword: this.formBuilder.control('', [...passwordValidators]),
      terms: this.formBuilder.control('')
    });
  }

  register(): void {
    this.formDto = this.form.value;
    this.formDto.clientId = this.sessionService.get();
    this.errors = [];
    this.submitted = true;

    this.authService.passwordRegister(this.formDto).subscribe((result: AuthResult) => {
        this.submitted = false;
        if (result.isFailure()) {
          this.errors = result.getErrors();
        }

        const redirect = result.getRedirect();
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, 125);
        }
        this.cdr.detectChanges();
      });
  }
}
