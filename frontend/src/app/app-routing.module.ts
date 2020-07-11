import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth-guard.service';
import { ProfileComponent } from './components/profile/profile.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginRegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
