import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';

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
    // private _auth: AuthService,
  private router: Router
  ) {}

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get registerEmail() { return this.registerForm.get('registerEmail'); }
  get registerPassword() { return this.registerEmail.get('registerPassword'); }

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
    const email: string = this.email.value;
    const password: string = this.password.value;
    console.log(email);
    console.log(password);
    //  this._auth.loginUser(this.loginUserData).subscribe(
    //    res => {
    //      console.log(res),
    //        localStorage.setItem('token', res.token);
    //      this._router.navigate(['/home-page']);
    //    },
    //    err => console.log(err)//log them for now
    //  )
   }

   register() {

   }
}
