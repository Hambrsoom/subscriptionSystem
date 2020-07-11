import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  passwordHide = true;
  user: User;
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get registerEmail() { return this.registerForm.get('registerEmail'); }
  get registerPassword() { return this.registerForm.get('registerPassword'); }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
    });
    this.registerForm = new FormGroup({
      registerEmail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      registerPassword: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]).{8,}')
      ]),
    });
  }

  login(): void {
     this.authService.login({email: this.email.value, password: this.password.value}).subscribe(
      res => {
        this.authService.setLoggedIn(true);
        this.router.navigate(['/home']);
      },
      () => this.openSnackBar('Your Email or Passowrd is incorrect')
     );
   }

   register(): void {
    this.authService.register({email: this.registerEmail.value, password: this.registerPassword.value}).subscribe(
      () => {
        this.login();
      },
      err => {
        console.log(err);
        console.log(err.error);
        console.log(err.error.statusCode);
        if (err.error.statusCode === 409) {
          this.openSnackBar('Email already exists');
        }
      }
     );
   }

   openSnackBar(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['red-snackbar']
    });
  }
}
