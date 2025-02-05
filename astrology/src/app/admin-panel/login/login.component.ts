import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService,
    private toastr: ToastrService,
    private _router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      let payload = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };
      this._loginService.login(payload).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userName', res.userName);
          this.toastr.success(res.message, '', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
          this._router.navigate(['/admin/astrological-dictionary']);
        },
        error: (err) => {
          this.toastr.error(err, '', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        },
      });
    }
  }
}
