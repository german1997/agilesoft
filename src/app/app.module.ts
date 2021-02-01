import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from 'src/interceptors/auth-interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from 'src/services/login/login-service.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieService } from 'src/services/movies/movie-service.service';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DetailsMovieComponent } from './pages/details-movie/details-movie.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CanActivateViaAuthGuard } from 'src/guard/guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DetailsMovieComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    IvyCarouselModule,
    InfiniteScrollModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    LoginService,
    MovieService,
    CanActivateViaAuthGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
