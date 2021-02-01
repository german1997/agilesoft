import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesResponse } from 'src/models/movies/response/movies-reponse.model';
import { UserResponse } from 'src/models/user/response/user-reponse.model';
import { MovieService } from 'src/services/movies/movie-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  moviesPremiere: MoviesResponse;
  moviesPopular: MoviesResponse;
  userInfo: UserResponse;
  showImages: boolean = false;
  pagPopular: number = 1;
  showSpinner: boolean = false;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {

    this.moviesPremiere = new MoviesResponse();
    this.moviesPopular = new MoviesResponse();
    this.userInfo = new UserResponse();
  }

  ngOnInit(): void {
    this.getPremiereMovies();
    this.getPopulareMovies();
  }

  async getPremiereMovies() {
    await this.movieService.getPremiereMovies().toPromise().then(data => {
      this.moviesPremiere = data;
      this.showImages = true;
    })
  }

  async getPopulareMovies() {
    await this.movieService.getPopulareMovies(this.pagPopular).toPromise().then(data => {
      this.moviesPopular = data;
    });
  }

  detailsMovie(id: number) {

    const movie = this.moviesPopular.data.find(e => e.id === id);
    const urlBase = this.moviesPopular.imageBaseUrl;

    const data = {
      movie: movie,
      urlBase: urlBase
    }

    sessionStorage.setItem('movie', JSON.stringify(data));
    this.router.navigate(['details-movie', id]);
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  async onScroll(event: any) {
    if ((window.innerHeight + window.scrollY) > document.body.offsetHeight) {
      this.pagPopular = this.pagPopular + 1;
      this.showSpinner = true;
      await this.movieService.getPopulareMovies(this.pagPopular).toPromise().then(data => {
        data.data.forEach(element => {
          this.moviesPopular.data.push(element);
        });
      });
      this.showSpinner = false;
    }
  }
}
