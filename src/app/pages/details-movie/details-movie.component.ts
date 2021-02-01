import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieActorsResponse } from 'src/models/movies/response/details-movie.model';
import { DataMoviesResponse, MoviesResponse } from 'src/models/movies/response/movies-reponse.model';
import { MovieService } from 'src/services/movies/movie-service.service';

@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.component.html',
  styleUrls: ['./details-movie.component.css']
})
export class DetailsMovieComponent implements OnInit {

  id: number = 0;
  private sub: any;
  movieActors: MovieActorsResponse;
  showImages: boolean = false;
  movie: DataMoviesResponse;
  urlBase: string = '';

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
  ) {
    this.movieActors = new MovieActorsResponse();
    this.movie = new DataMoviesResponse();
  }

  ngOnInit(): void {
    this.loadDataMovie();
    //OBTENER ID PARA RECUPERAR DATOS DE ACTORES.
    this.sub = this.route.params.subscribe(async params => {
      this.id = params.id;
      await this.loadMovieDetailsActors();
    });
  }

  //OBTENER DATOS DE LOS ACTORES.
  async loadMovieDetailsActors() {
    await this.movieService.getActors(this.id).toPromise().then(movieActorsResponse => {
      this.movieActors = movieActorsResponse;
      this.showImages = true;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadDataMovie() {
    const data = sessionStorage.getItem('movie');
    const dataParse = data !== null ? JSON.parse(data) : null;

    this.movie = dataParse.movie;
    this.urlBase = dataParse.urlBase;
  }
}
