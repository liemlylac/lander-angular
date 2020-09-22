import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { EMAIL_REGEX } from '../../../core/regex';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent implements OnInit {
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

    this.authService.requestPassword('email', this.form).subscribe(result => {
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
