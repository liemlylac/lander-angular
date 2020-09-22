import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  submitted = false;
  errors: string[] = [];
  formDto: any;
  form: FormGroup;

  constructor(
    private readonly authService: NbAuthService,
    private readonly cdr: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
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
  }

  resetPassword(): void {
    this.formDto = this.form.value;
    this.errors = [];
    this.submitted = true;

    this.authService.resetPassword('email', this.form).subscribe(result => {
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
