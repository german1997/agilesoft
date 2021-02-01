export class MovieActorsResponse {
    data: Array<DataDetailsMovieResponse>;
    imageBaseUrl: string;

    constructor() {
        this.data = new Array<DataDetailsMovieResponse>();
        this.imageBaseUrl = '';
    }
}

export class DataDetailsMovieResponse {
    adult: string;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: String;
    popularity: number;
    profile_path: string;

    constructor() {
        this.adult = '';
        this.cast_id = 0;
        this.character = '';
        this.credit_id = '';
        this.gender = 0;
        this.id = 0;
        this.known_for_department = '';
        this.name = '';
        this.order = 0;
        this.original_name = '';
        this.popularity = 0;
        this.profile_path = '';
    }
}