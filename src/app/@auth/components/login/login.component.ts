import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResult } from '@auth/auth-result';
import { AuthService } from '@auth/services/auth.service';
import { SessionService } from '@auth/services/session.service';
import { EMAIL_REGEX } from '@core/regex';
import { InitUserService } from '@theme/services/init-user.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  errors: string[];
  formDto: any;
  submitted = false;
  form: FormGroup;
  deviceInfo: any;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly initUserService: InitUserService,
    private readonly deviceDetector: DeviceDetectorService,
    private readonly sessionService: SessionService
  ) {
    this.detectDevice();
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
    this.formDto.clientId = this.sessionService.get();
    this.errors = [];
    this.submitted = true;
    this.authService.passwordLogin(this.formDto)
      .subscribe((loginResult: AuthResult) => {
        this.submitted = false;
        if (loginResult.isFailure()) {
          this.errors = loginResult.getErrors();
        } else {
          this.initUserService.initCurrentUser().subscribe();
        }

        const redirect = loginResult.getRedirect();
        if (redirect) {
          return this.router.navigateByUrl(redirect);
        }
      });
  }

  private detectDevice(): void {
    this.deviceInfo = this.deviceDetector.getDeviceInfo();
    console.log(JSON.stringify(this.deviceInfo));
  }
}
