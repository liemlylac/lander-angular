import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

import { EMAIL_REGEX } from '@core/regex';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
})
export class RequestPasswordComponent implements OnInit {
  submitted = false;
  errors: string[] = [];
  formDto: any;
  form: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  get email(): AbstractControl {
    return this.form.get('email');
  }

  ngOnInit(): void {
    const emailValidators = [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)
    ];
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', [...emailValidators])
    });
  }

  requestPassword(): void {
    this.formDto = this.form.value;
    this.errors = [];
    this.submitted = true;

    this.authService.passwordRequest(this.formDto).subscribe(result => {
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
