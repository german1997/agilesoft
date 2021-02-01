import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAuthGuard } from 'src/guard/guard';
import { DetailsMovieComponent } from './pages/details-movie/details-movie.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'home', 
    component: HomeComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: 'details-movie/:id',
    component: DetailsMovieComponent,
    canActivate: [CanActivateViaAuthGuard]

  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
