import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieActorsResponse } from 'src/models/movies/response/details-movie.model';
import { DataMoviesResponse, MoviesResponse } from 'src/models/movies/response/movies-reponse.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private serviceUrl: string = environment.microservice.movieUrl;
  private subject = new Subject<any>();

  constructor(
    private http: HttpClient,
  ) { }

  getPremiereMovies() {
    return this.http.get<MoviesResponse>(this.serviceUrl + 'now_playing?page=2');
  }

  getPopulareMovies(pagina: number) {
    return this.http.get<MoviesResponse>(this.serviceUrl + 'popular?page=' + pagina);
  }

  getActors(id: number) {
    return this.http.get<MovieActorsResponse>(this.serviceUrl + id + '/actors');
  }
}
