import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { EMAIL_REGEX } from '../../../core/regex';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  errors: string[] = [];
  formDto: any = {};
  form: FormGroup;

  constructor(
    private readonly authService: NbAuthService,
    private readonly cdr: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
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
    this.errors = [];
    this.submitted = true;

    this.authService
      .register('email', this.formDto)
      .subscribe((result: NbAuthResult) => {
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
