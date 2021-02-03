import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  submitted = false;
  errors: string[] = [];
  formDto: any = {};
  form: FormGroup;
  token: string;

  constructor(
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  get password(): AbstractControl {
    return this.form.get('password');
  }

  get confirmPassword(): AbstractControl {
    return this.form.get('confirmPassword');
  }

  ngOnInit(): void {
    const passwordValidators = [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ];

    this.form = this.formBuilder.group({
      password: this.formBuilder.control('', [...passwordValidators]),
      confirmPassword: this.formBuilder.control('', [...passwordValidators])
    });

    this.route.queryParams.subscribe(params => {
      this.token = params.token;
      this.verifyResetToken(this.token);
    });
  }

  verifyResetToken(token: string): void {
    this.authService.passwordVerifyResetToken(token).subscribe(
      result => {
        if (result.isFailure()) {
          this.errors = result.getErrors();
        }
        const redirect = result.getRedirect();
        if (redirect) {
          return this.router.navigateByUrl(redirect);
        }
        this.cdr.detectChanges();
      }
    );
  }

  resetPassword(): void {
    this.formDto = {...this.formDto, ...this.form.value};
    this.errors = [];
    this.submitted = true;

    this.authService.passwordReset(this.formDto, this.token).subscribe(result => {
      this.submitted = false;
      if (result.isFailure()) {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        return this.router.navigateByUrl(redirect);
      }
      this.cdr.detectChanges();
    });
  }
}
